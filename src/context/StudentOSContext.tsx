'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserProfile,
  StreakData,
  GamificationState,
  Problem,
  DSATopic,
  Roadmap,
  RoadmapNode,
  DailyQuest,
  WeeklyQuest,
  Friend,
  Project,
  PersonalNote,
  Bookmark,
  CareerReadinessReport,
  AdminStats,
  AIMessage,
  AuthMethod,
  AuthSession,
} from '../types/studentos';

import {
  INITIAL_USER,
  INITIAL_STREAK,
  INITIAL_GAMIFICATION,
  MOCK_PROBLEMS,
  DSA_TOPICS,
  MOCK_ROADMAPS,
  DAILY_QUESTS,
  WEEKLY_QUESTS,
  MOCK_FRIENDS,
  MOCK_PROJECTS,
  MOCK_CAREER_REPORT,
  MOCK_ADMIN_STATS,
} from '../data/mockData';

import {
  auth,
  googleProvider,
  microsoftProvider,
  isFirebaseConfigured,
} from '../lib/firebase';

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  ConfirmationResult,
} from 'firebase/auth';

import {
  fetchUserProfileDB,
  saveUserProfileDB,
  fetchStreakDB,
  saveStreakDB,
  fetchGamificationDB,
  saveGamificationDB,
  fetchNotesDB,
  saveNoteDB,
  deleteNoteDB,
  fetchBookmarksDB,
  saveBookmarkDB,
  deleteBookmarkDB,
  fetchProjectsDB,
  saveProjectDB,
} from '../lib/dbService';

export type ThemeMode = 'dark' | 'light';

interface StudentOSContextType {
  // Auth state
  isAuthenticated: boolean;
  user: UserProfile | null;
  authSession: AuthSession | null;
  isAuthModalOpen: boolean;
  authModalTitle: string;
  authModalSubtitle: string;
  isAuthLoading: boolean;
  
  // Data state
  streak: StreakData;
  gamification: GamificationState;
  problems: Problem[];
  dsaTopics: DSATopic[];
  roadmaps: Roadmap[];
  dailyQuests: DailyQuest[];
  weeklyQuests: WeeklyQuest[];
  friends: Friend[];
  projects: Project[];
  notes: PersonalNote[];
  bookmarks: Bookmark[];
  careerReport: CareerReadinessReport;
  adminStats: AdminStats;
  aiMessages: AIMessage[];
  isAILoading: boolean;
  isAdminView: boolean;
  theme: ThemeMode;
  
  // Auth actions
  signUpWithEmail: (name: string, email: string, pass: string) => Promise<void>;
  signInWithEmail: (email: string, pass: string) => Promise<void>;
  loginWithGoogle: (email?: string) => Promise<void>;
  loginWithMicrosoft: (email?: string) => Promise<void>;
  sendPhoneOTP: (phone: string, recaptchaContainerId: string) => Promise<ConfirmationResult | null>;
  verifyPhoneOTP: (confirmationResult: ConfirmationResult, otpCode: string) => Promise<void>;
  loginWithOTP: (phone: string, otp: string) => void;
  loginDemo: () => void;
  logout: () => Promise<void>;
  openAuthModal: (title?: string, subtitle?: string) => void;
  closeAuthModal: () => void;
  requireAuth: (callback: () => void, customSubtitle?: string) => void;

  // Data Actions
  updateUserProfile: (updates: Partial<UserProfile>) => void;
  completeOnboarding: (data: Partial<UserProfile>) => void;
  solveProblem: (problemId: string, personalNotes?: string) => void;
  startProblem: (problemId: string) => void;
  claimQuest: (questId: string, isWeekly?: boolean) => void;
  updateTopicProgress: (topicId: string, deltaSolved: number) => void;
  updateNodeStatus: (roadmapId: string, nodeId: string, status: RoadmapNode['status']) => void;
  addProjectTask: (projectId: string, title: string) => void;
  toggleProjectTask: (projectId: string, taskId: string) => void;
  addNote: (note: Omit<PersonalNote, 'id' | 'updatedAt'>) => void;
  deleteNote: (id: string) => void;
  addBookmark: (bookmark: Omit<Bookmark, 'id'>) => void;
  deleteBookmark: (id: string) => void;
  useStreakFreeze: () => boolean;
  sendAIMessage: (text: string) => Promise<void>;
  clearAIChat: () => void;
  toggleAdminView: () => void;
  toggleTheme: () => void;
  logStudyTime: (minutes: number) => void;
}

const StudentOSContext = createContext<StudentOSContextType | undefined>(undefined);

const EMPTY_STREAK: StreakData = {
  currentStreak: 0,
  bestStreak: 0,
  streakFreezes: 0,
  lastActiveDate: '',
  history: [],
};

const EMPTY_GAMIFICATION: GamificationState = {
  xp: 0,
  level: 1,
  levelTitle: '🌱 Beginner',
  nextLevelXp: 100,
  totalProblemsSolved: 0,
  problemsSolvedToday: 0,
  problemsSolvedThisWeek: 0,
  studyTimeTodayMinutes: 0,
  studyTimeWeekMinutes: 0,
  badges: INITIAL_GAMIFICATION.badges.map((b) => ({ ...b, unlocked: false })),
};

const EMPTY_PROBLEMS: Problem[] = MOCK_PROBLEMS.map((p) => ({
  ...p,
  status: 'Unsolved' as const,
  solvedAt: undefined,
  personalNotes: undefined,
}));

export const StudentOSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [authSession, setAuthSession] = useState<AuthSession | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalTitle, setAuthModalTitle] = useState<string>('Sign In to Student OS');
  const [authModalSubtitle, setAuthModalSubtitle] = useState<string>('Please sign in to save and manage your personal Student OS.');
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);

  // Data state
  const [streak, setStreak] = useState<StreakData>(EMPTY_STREAK);
  const [gamification, setGamification] = useState<GamificationState>(EMPTY_GAMIFICATION);
  const [problems, setProblems] = useState<Problem[]>(EMPTY_PROBLEMS);
  const [dsaTopics, setDsaTopics] = useState<DSATopic[]>(DSA_TOPICS);
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>(MOCK_ROADMAPS);
  const [dailyQuests, setDailyQuests] = useState<DailyQuest[]>(DAILY_QUESTS);
  const [weeklyQuests, setWeeklyQuests] = useState<WeeklyQuest[]>(WEEKLY_QUESTS);
  const [friends] = useState<Friend[]>(MOCK_FRIENDS);
  const [projects, setProjects] = useState<Project[]>([]);
  const [notes, setNotes] = useState<PersonalNote[]>([]);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [careerReport] = useState<CareerReadinessReport>(MOCK_CAREER_REPORT);
  const [adminStats] = useState<AdminStats>(MOCK_ADMIN_STATS);
  const [isAdminView, setIsAdminView] = useState<boolean>(false);
  const [theme, setTheme] = useState<ThemeMode>('dark');

  const [aiMessages, setAiMessages] = useState<AIMessage[]>([]);
  const [isAILoading, setIsAILoading] = useState<boolean>(false);

  // Load user data from Firestore or LocalStorage fallback
  const loadUserData = async (userId: string) => {
    try {
      const dbProfile = await fetchUserProfileDB(userId);
      const dbStreak = await fetchStreakDB(userId);
      const dbGami = await fetchGamificationDB(userId);
      const dbNotes = await fetchNotesDB(userId);
      const dbBookmarks = await fetchBookmarksDB(userId);
      const dbProjects = await fetchProjectsDB(userId);

      if (dbProfile) setUser(dbProfile);
      if (dbStreak) setStreak(dbStreak);
      else loadLocalStreak(userId);

      if (dbGami) setGamification(dbGami);
      else loadLocalGami(userId);

      if (dbNotes.length > 0) setNotes(dbNotes);
      else loadLocalNotes(userId);

      if (dbBookmarks.length > 0) setBookmarks(dbBookmarks);
      else loadLocalBookmarks(userId);

      if (dbProjects.length > 0) setProjects(dbProjects);
      else loadLocalProjects(userId);

      loadLocalAIChats(userId);
    } catch (e) {
      console.error('Error loading Firestore data, using local storage:', e);
      loadLocalUserData(userId);
    }
  };

  const loadLocalUserData = (userId: string) => {
    loadLocalStreak(userId);
    loadLocalGami(userId);
    loadLocalNotes(userId);
    loadLocalBookmarks(userId);
    loadLocalProjects(userId);
    loadLocalAIChats(userId);
  };

  const loadLocalStreak = (userId: string) => {
    const s = localStorage.getItem(`studentos_streak_${userId}`);
    if (s) setStreak(JSON.parse(s));
    else setStreak(EMPTY_STREAK);
  };

  const loadLocalGami = (userId: string) => {
    const g = localStorage.getItem(`studentos_gami_${userId}`);
    if (g) setGamification(JSON.parse(g));
    else setGamification(EMPTY_GAMIFICATION);
  };

  const loadLocalNotes = (userId: string) => {
    const n = localStorage.getItem(`studentos_notes_${userId}`);
    if (n) setNotes(JSON.parse(n));
    else setNotes([]);
  };

  const loadLocalBookmarks = (userId: string) => {
    const b = localStorage.getItem(`studentos_bookmarks_${userId}`);
    if (b) setBookmarks(JSON.parse(b));
    else setBookmarks([]);
  };

  const loadLocalProjects = (userId: string) => {
    const p = localStorage.getItem(`studentos_projects_${userId}`);
    if (p) setProjects(JSON.parse(p));
    else setProjects([]);
  };

  const loadLocalAIChats = (userId: string) => {
    const c = localStorage.getItem(`studentos_ai_chats_${userId}`);
    if (c) {
      try {
        setAiMessages(JSON.parse(c));
      } catch (e) {
        setAiMessages([]);
      }
    } else {
      setAiMessages([]);
    }
  };

  const saveUserData = (userId: string, key: string, val: any) => {
    try {
      localStorage.setItem(`studentos_${key}_${userId}`, JSON.stringify(val));
    } catch (e) {
      console.error('Error saving user data:', e);
    }
  };

  // Firebase Auth Listener
  useEffect(() => {
    if (isFirebaseConfigured && auth) {
      const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        if (firebaseUser) {
          const session: AuthSession = {
            token: await firebaseUser.getIdToken(),
            authMethod: 'email',
            authenticatedAt: new Date().toISOString(),
          };

          let profile = await fetchUserProfileDB(firebaseUser.uid);
          if (!profile) {
            profile = {
              id: firebaseUser.uid,
              name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Student',
              email: firebaseUser.email || '',
              avatar: firebaseUser.photoURL || 'https://api.dicebear.com/7.x/bottts/svg?seed=' + firebaseUser.uid,
              college: 'University',
              branch: 'Computer Science',
              year: '3rd Year',
              graduationYear: '2027',
              skillLevel: 'Intermediate',
              careerGoal: 'Software Engineer',
              selectedLanguages: ['C++', 'Python'],
              connectedAccounts: [],
              availableStudyTime: '3 hours/day',
              isOnboarded: true,
              createdAt: new Date().toISOString().split('T')[0],
            };
            await saveUserProfileDB(profile);
          }

          setUser(profile);
          setAuthSession(session);
          setIsAuthenticated(true);
          await loadUserData(firebaseUser.uid);
        } else {
          const savedSession = localStorage.getItem('studentos_auth_session');
          const savedUser = localStorage.getItem('studentos_auth_user');
          if (savedSession && savedUser) {
            const parsedSession: AuthSession = JSON.parse(savedSession);
            const parsedUser: UserProfile = JSON.parse(savedUser);
            setAuthSession(parsedSession);
            setUser(parsedUser);
            setIsAuthenticated(true);
            loadUserData(parsedUser.id);
          } else {
            setIsAuthenticated(false);
            setUser(null);
            setAuthSession(null);
            setStreak(EMPTY_STREAK);
            setGamification(EMPTY_GAMIFICATION);
            setNotes([]);
            setBookmarks([]);
            setProjects([]);
          }
        }
        setIsAuthLoading(false);
      });

      return () => unsubscribe();
    } else {
      const savedSession = localStorage.getItem('studentos_auth_session');
      const savedUser = localStorage.getItem('studentos_auth_user');
      if (savedSession && savedUser) {
        const parsedSession: AuthSession = JSON.parse(savedSession);
        const parsedUser: UserProfile = JSON.parse(savedUser);
        setAuthSession(parsedSession);
        setUser(parsedUser);
        setIsAuthenticated(true);
        loadUserData(parsedUser.id);
      }
      setIsAuthLoading(false);
    }
  }, []);

  // Sync theme
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      if (theme === 'dark') {
        root.classList.add('dark');
        root.classList.remove('light');
      } else {
        root.classList.remove('dark');
        root.classList.add('light');
      }
    }
  }, [theme]);

  // Authenticate helper
  const authenticateUser = async (profile: UserProfile, method: AuthMethod, phone?: string) => {
    const session: AuthSession = {
      token: `token_${profile.id}_${Date.now()}`,
      authMethod: method,
      authenticatedAt: new Date().toISOString(),
      phoneNumber: phone,
    };

    setUser(profile);
    setAuthSession(session);
    setIsAuthenticated(true);

    localStorage.setItem('studentos_auth_session', JSON.stringify(session));
    localStorage.setItem('studentos_auth_user', JSON.stringify(profile));

    await saveUserProfileDB(profile);
    await loadUserData(profile.id);
    closeAuthModal();
  };

  // Local storage user vault helpers
  const getLocalRegisteredUsers = () => {
    try {
      const raw = localStorage.getItem('studentos_registered_users');
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  };

  const saveLocalRegisteredUser = (userRecord: { id: string; name: string; email: string; passHash: string; profile: UserProfile }) => {
    try {
      const users = getLocalRegisteredUsers();
      users[userRecord.email.toLowerCase()] = userRecord;
      localStorage.setItem('studentos_registered_users', JSON.stringify(users));
    } catch (e) {
      console.error('Failed to save local user registration:', e);
    }
  };

  // Sign Up with Email & Password
  const signUpWithEmail = async (name: string, email: string, pass: string) => {
    if (isFirebaseConfigured && auth) {
      const res = await createUserWithEmailAndPassword(auth, email, pass);
      const profile: UserProfile = {
        id: res.user.uid,
        name: name.trim() || 'Student',
        email: email.trim(),
        avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=' + res.user.uid,
        college: 'Engineering College',
        branch: 'Computer Science & Engineering',
        year: '1st Year',
        graduationYear: '2028',
        skillLevel: 'Beginner',
        careerGoal: 'Software Engineer',
        selectedLanguages: ['C++', 'Python'],
        connectedAccounts: [],
        availableStudyTime: '3 hours/day',
        isOnboarded: false,
        createdAt: new Date().toISOString().split('T')[0],
      };
      await saveUserProfileDB(profile);
      await authenticateUser(profile, 'email');
    } else {
      const normalizedEmail = email.trim().toLowerCase();
      const existingUsers = getLocalRegisteredUsers();
      if (existingUsers[normalizedEmail]) {
        const err: any = new Error('An account with this email address already exists. Please sign in instead.');
        err.code = 'auth/email-already-in-use';
        throw err;
      }

      const userId = `usr_email_${Date.now()}`;
      const profile: UserProfile = {
        id: userId,
        name: name.trim() || 'Student',
        email: normalizedEmail,
        avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=' + userId,
        college: 'University',
        branch: 'Computer Science',
        year: '1st Year',
        graduationYear: '2028',
        skillLevel: 'Beginner',
        careerGoal: 'Software Engineer',
        selectedLanguages: ['Python'],
        connectedAccounts: [],
        availableStudyTime: '3 hours/day',
        isOnboarded: false,
        createdAt: new Date().toISOString().split('T')[0],
      };

      saveLocalRegisteredUser({
        id: userId,
        name: name.trim() || 'Student',
        email: normalizedEmail,
        passHash: btoa(pass),
        profile,
      });

      await authenticateUser(profile, 'email');
    }
  };

  // Sign In with Email & Password
  const signInWithEmail = async (email: string, pass: string) => {
    if (isFirebaseConfigured && auth) {
      const res = await signInWithEmailAndPassword(auth, email, pass);
      let profile = await fetchUserProfileDB(res.user.uid);
      if (!profile) {
        profile = {
          id: res.user.uid,
          name: res.user.displayName || email.split('@')[0],
          email: email,
          avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=' + res.user.uid,
          college: 'University',
          branch: 'Computer Science',
          year: '3rd Year',
          graduationYear: '2027',
          skillLevel: 'Intermediate',
          careerGoal: 'Software Engineer',
          selectedLanguages: ['C++', 'Python'],
          connectedAccounts: [],
          availableStudyTime: '3 hours/day',
          isOnboarded: true,
          createdAt: new Date().toISOString().split('T')[0],
        };
        await saveUserProfileDB(profile);
      }
      await authenticateUser(profile, 'email');
    } else {
      const normalizedEmail = email.trim().toLowerCase();
      const existingUsers = getLocalRegisteredUsers();
      const userRecord = existingUsers[normalizedEmail];

      if (!userRecord) {
        const err: any = new Error('No account found with this email address. Please sign up first.');
        err.code = 'auth/user-not-found';
        throw err;
      }

      if (userRecord.passHash !== btoa(pass)) {
        const err: any = new Error('Invalid password. Please check your credentials and try again.');
        err.code = 'auth/wrong-password';
        throw err;
      }

      await authenticateUser(userRecord.profile, 'email');
    }
  };

  // Google Login
  const loginWithGoogle = async (fallbackEmail?: string) => {
    if (isFirebaseConfigured && auth && googleProvider) {
      const res = await signInWithPopup(auth, googleProvider);
      let profile = await fetchUserProfileDB(res.user.uid);
      if (!profile) {
        profile = {
          id: res.user.uid,
          name: res.user.displayName || 'Google Scholar',
          email: res.user.email || fallbackEmail || '',
          avatar: res.user.photoURL || 'https://api.dicebear.com/7.x/bottts/svg?seed=' + res.user.uid,
          college: 'University',
          branch: 'Computer Science',
          year: '3rd Year',
          graduationYear: '2027',
          skillLevel: 'Intermediate',
          careerGoal: 'Software Engineer',
          selectedLanguages: ['C++', 'Python'],
          connectedAccounts: [],
          availableStudyTime: '3 hours/day',
          isOnboarded: true,
          createdAt: new Date().toISOString().split('T')[0],
        };
        await saveUserProfileDB(profile);
      }
      await authenticateUser(profile, 'google');
    } else {
      const email = fallbackEmail || 'user.google@studentos.edu';
      const nameFromEmail = email.split('@')[0].replace(/[._]/g, ' ');
      const formattedName = nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1);
      const userId = `usr_google_${Date.now()}`;

      const profile: UserProfile = {
        id: userId,
        name: formattedName || 'Google Student',
        email: email,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
        college: 'University',
        branch: 'Computer Science',
        year: '3rd Year',
        graduationYear: '2027',
        skillLevel: 'Intermediate',
        careerGoal: 'Software Engineer',
        selectedLanguages: ['C++', 'Python'],
        connectedAccounts: [],
        availableStudyTime: '3 hours/day',
        isOnboarded: true,
        createdAt: new Date().toISOString().split('T')[0],
      };
      await authenticateUser(profile, 'google');
    }
  };

  // Microsoft Login
  const loginWithMicrosoft = async (fallbackEmail?: string) => {
    if (isFirebaseConfigured && auth && microsoftProvider) {
      const res = await signInWithPopup(auth, microsoftProvider);
      let profile = await fetchUserProfileDB(res.user.uid);
      if (!profile) {
        profile = {
          id: res.user.uid,
          name: res.user.displayName || 'Microsoft Scholar',
          email: res.user.email || fallbackEmail || '',
          avatar: res.user.photoURL || 'https://api.dicebear.com/7.x/bottts/svg?seed=' + res.user.uid,
          college: 'Institute of Technology',
          branch: 'Software Engineering',
          year: '2nd Year',
          graduationYear: '2028',
          skillLevel: 'Intermediate',
          careerGoal: 'Full Stack Developer',
          selectedLanguages: ['JavaScript', 'TypeScript'],
          connectedAccounts: [],
          availableStudyTime: '2 hours/day',
          isOnboarded: true,
          createdAt: new Date().toISOString().split('T')[0],
        };
        await saveUserProfileDB(profile);
      }
      await authenticateUser(profile, 'microsoft');
    } else {
      const email = fallbackEmail || 'user.ms@studentos.edu';
      const userId = `usr_ms_${Date.now()}`;
      const profile: UserProfile = {
        id: userId,
        name: 'Microsoft Scholar',
        email: email,
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
        college: 'Institute of Technology',
        branch: 'Software Engineering',
        year: '2nd Year',
        graduationYear: '2028',
        skillLevel: 'Intermediate',
        careerGoal: 'Full Stack Developer',
        selectedLanguages: ['JavaScript', 'TypeScript'],
        connectedAccounts: [],
        availableStudyTime: '2 hours/day',
        isOnboarded: true,
        createdAt: new Date().toISOString().split('T')[0],
      };
      await authenticateUser(profile, 'microsoft');
    }
  };

  // Send Phone OTP SMS
  const sendPhoneOTP = async (phone: string, recaptchaContainerId: string): Promise<ConfirmationResult | null> => {
    if (isFirebaseConfigured && auth) {
      const verifier = new RecaptchaVerifier(auth, recaptchaContainerId, { size: 'invisible' });
      return await signInWithPhoneNumber(auth, phone, verifier);
    }
    return null;
  };

  // Verify Phone OTP SMS
  const verifyPhoneOTP = async (confirmationResult: ConfirmationResult, otpCode: string) => {
    if (isFirebaseConfigured && auth) {
      const res = await confirmationResult.confirm(otpCode);
      let profile = await fetchUserProfileDB(res.user.uid);
      if (!profile) {
        profile = {
          id: res.user.uid,
          name: `Student (${res.user.phoneNumber?.slice(-4) || 'User'})`,
          email: `${res.user.phoneNumber}@phone.studentos`,
          phoneNumber: res.user.phoneNumber || undefined,
          avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=' + res.user.uid,
          college: 'Engineering College',
          branch: 'Computer Science',
          year: '1st Year',
          graduationYear: '2029',
          skillLevel: 'Beginner',
          careerGoal: 'Software Engineer',
          selectedLanguages: ['Python'],
          connectedAccounts: [],
          availableStudyTime: '2 hours/day',
          isOnboarded: true,
          createdAt: new Date().toISOString().split('T')[0],
        };
        await saveUserProfileDB(profile);
      }
      await authenticateUser(profile, 'otp', res.user.phoneNumber || undefined);
    }
  };

  // Mobile OTP fallback
  const loginWithOTP = (phone: string, otp: string) => {
    const userId = `usr_otp_${Date.now()}`;
    const profile: UserProfile = {
      id: userId,
      name: `Student (${phone.slice(-4)})`,
      email: `user_${phone.slice(-4)}@mobile.studentos`,
      phoneNumber: phone,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250',
      college: 'Engineering College',
      branch: 'Computer Science',
      year: '1st Year',
      graduationYear: '2029',
      skillLevel: 'Beginner',
      careerGoal: 'Software Engineer',
      selectedLanguages: ['Python'],
      connectedAccounts: [],
      availableStudyTime: '2 hours/day',
      isOnboarded: true,
      createdAt: new Date().toISOString().split('T')[0],
    };

    authenticateUser(profile, 'otp', phone);
  };

  // Demo Login
  const loginDemo = () => {
    const userId = `demo_user_${Date.now()}`;
    const demoProfile: UserProfile = {
      id: userId,
      name: 'Alex Chen (Demo Account)',
      email: 'demo.alex@studentos.edu',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
      college: 'Stanford University',
      branch: 'Computer Science & Engineering',
      year: '3rd Year',
      graduationYear: '2027',
      skillLevel: 'Intermediate',
      careerGoal: 'Software Engineer',
      selectedLanguages: ['C++', 'Python', 'JavaScript'],
      connectedAccounts: [
        { platform: 'LeetCode', username: 'alex_code', connected: true, problemsSolved: 182, rating: 1745 },
        { platform: 'Codeforces', username: 'alex_cf', connected: true, problemsSolved: 45, rating: 1420 },
      ],
      availableStudyTime: '3 hours/day',
      isOnboarded: true,
      isDemoUser: true,
      createdAt: new Date().toISOString().split('T')[0],
    };

    authenticateUser(demoProfile, 'demo');
  };

  // Real Logout
  const logout = async () => {
    if (isFirebaseConfigured && auth) {
      await firebaseSignOut(auth);
    }
    localStorage.removeItem('studentos_auth_session');
    localStorage.removeItem('studentos_auth_user');

    setIsAuthenticated(false);
    setUser(null);
    setAuthSession(null);
    setStreak(EMPTY_STREAK);
    setGamification(EMPTY_GAMIFICATION);
    setProblems(EMPTY_PROBLEMS);
    setNotes([]);
    setBookmarks([]);
    setProjects([]);

    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  };

  const openAuthModal = (title = 'Sign In to Student OS', subtitle = 'Please sign in to save and manage your personal Student OS.') => {
    setAuthModalTitle(title);
    setAuthModalSubtitle(subtitle);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => setIsAuthModalOpen(false);

  const requireAuth = (callback: () => void, customSubtitle = 'Please sign in to save and manage your personal Student OS.') => {
    if (isAuthenticated && user) {
      callback();
    } else {
      openAuthModal('Sign In Required', customSubtitle);
    }
  };

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem('studentos_theme', next);
      } catch (e) {
        console.error(e);
      }
      return next;
    });
  };

  const updateUserProfile = (updates: Partial<UserProfile>) => {
    if (!user) return;
    const next = { ...user, ...updates };
    setUser(next);
    localStorage.setItem('studentos_auth_user', JSON.stringify(next));
    saveUserData(user.id, 'profile', next);
    saveUserProfileDB(next);
  };

  const completeOnboarding = (data: Partial<UserProfile>) => {
    if (!user) {
      signUpWithEmail(data.name || 'Student', data.email || 'student@university.edu', 'password123');
    } else {
      updateUserProfile({ ...data, isOnboarded: true });
    }
  };

  const addXp = (amount: number) => {
    if (!user) return;
    setGamification((prev) => {
      let newXp = prev.xp + amount;
      let newLevel = prev.level;
      let nextLevelXp = prev.nextLevelXp;
      let levelTitle = prev.levelTitle;

      if (newXp >= nextLevelXp) {
        newLevel += 1;
        nextLevelXp = Math.floor(nextLevelXp * 1.25);
        if (newLevel >= 50) levelTitle = 'Code Legend';
        else if (newLevel >= 30) levelTitle = 'Software Engineer';
        else if (newLevel >= 20) levelTitle = 'Developer';
        else if (newLevel >= 15) levelTitle = 'Problem Slayer';
        else if (newLevel >= 10) levelTitle = 'Code Explorer';
      }

      const updated = {
        ...prev,
        xp: newXp,
        level: newLevel,
        levelTitle,
        nextLevelXp,
      };
      saveUserData(user.id, 'gami', updated);
      saveGamificationDB(user.id, updated);
      return updated;
    });
  };

  const solveProblem = (problemId: string, personalNotes?: string) => {
    requireAuth(() => {
      if (!user) return;
      const today = new Date().toISOString().split('T')[0];

      setProblems((prev) => {
        const updated = prev.map((p) => {
          if (p.id === problemId) {
            const isFirstSolve = p.status !== 'Solved';
            if (isFirstSolve) {
              let xpEarned = p.difficulty === 'Easy' ? 15 : p.difficulty === 'Medium' ? 30 : 60;
              addXp(xpEarned);

              setGamification((g) => {
                const nextG = {
                  ...g,
                  totalProblemsSolved: g.totalProblemsSolved + 1,
                  problemsSolvedToday: g.problemsSolvedToday + 1,
                  problemsSolvedThisWeek: g.problemsSolvedThisWeek + 1,
                };
                saveUserData(user.id, 'gami', nextG);
                saveGamificationDB(user.id, nextG);
                return nextG;
              });

              setStreak((s) => {
                const alreadyActiveToday = s.lastActiveDate === today;
                const nextStreak = alreadyActiveToday ? s.currentStreak : s.currentStreak + 1;
                const nextBest = Math.max(s.bestStreak, nextStreak);
                const nextS = {
                  ...s,
                  currentStreak: nextStreak,
                  bestStreak: nextBest,
                  lastActiveDate: today,
                  history: [{ date: today, active: true, activityType: `Solved: ${p.title}` }, ...s.history],
                };
                saveUserData(user.id, 'streak', nextS);
                saveStreakDB(user.id, nextS);
                return nextS;
              });
            }
            return {
              ...p,
              status: 'Solved' as const,
              solvedAt: today,
              personalNotes: personalNotes || p.personalNotes,
            };
          }
          return p;
        });

        saveUserData(user.id, 'probs', updated);
        return updated;
      });
    }, 'Please sign in to solve problems and track your progress.');
  };

  const startProblem = (problemId: string) => {
    if (!user) return;
    setProblems((prev) => {
      const updated = prev.map((p) => (p.id === problemId && p.status === 'Unsolved' ? { ...p, status: 'Attempted' as const } : p));
      saveUserData(user.id, 'probs', updated);
      return updated;
    });
  };

  const claimQuest = (questId: string, isWeekly = false) => {
    requireAuth(() => {
      if (isWeekly) {
        setWeeklyQuests((prev) =>
          prev.map((q) => {
            if (q.id === questId && q.completed) {
              addXp(q.xpReward);
              return { ...q, current: q.target, xpReward: 0 };
            }
            return q;
          })
        );
      } else {
        setDailyQuests((prev) =>
          prev.map((q) => {
            if (q.id === questId && q.completed) {
              addXp(q.xpReward);
              return { ...q, current: q.target, xpReward: 0 };
            }
            return q;
          })
        );
      }
    }, 'Please sign in to claim quest rewards.');
  };

  const updateTopicProgress = (topicId: string, deltaSolved: number) => {
    requireAuth(() => {
      setDsaTopics((prev) =>
        prev.map((t) => {
          if (t.id === topicId) {
            const solved = Math.min(t.totalProblems, t.solvedProblems + deltaSolved);
            const percent = Math.round((solved / t.totalProblems) * 100);
            return {
              ...t,
              solvedProblems: solved,
              progressPercent: percent,
              confidenceScore: Math.min(100, t.confidenceScore + 5),
              recommendedStatus: percent >= 75 ? 'Strong' : percent >= 40 ? 'Needs Review' : 'Not Started',
            };
          }
          return t;
        })
      );
    }, 'Please sign in to track topic progress.');
  };

  const updateNodeStatus = (roadmapId: string, nodeId: string, status: RoadmapNode['status']) => {
    requireAuth(() => {
      if (!user) return;
      setRoadmaps((prev) =>
        prev.map((rm) => {
          if (rm.id === roadmapId) {
            const updatedNodes = rm.nodes.map((n) => (n.id === nodeId ? { ...n, status } : n));
            const masteredCount = updatedNodes.filter((n) => n.status === 'Mastered' || n.status === 'Strong').length;
            const overallPercent = Math.round((masteredCount / updatedNodes.length) * 100);
            return {
              ...rm,
              overallProgressPercent: overallPercent,
              nodes: updatedNodes,
            };
          }
          return rm;
        })
      );
      addXp(25);
    }, 'Please sign in to update your skill tree roadmap.');
  };

  const addProjectTask = (projectId: string, title: string) => {
    requireAuth(() => {
      if (!user) return;
      setProjects((prev) => {
        let found = false;
        const updated = prev.map((p) => {
          if (p.id === projectId) {
            found = true;
            const newTask = { id: `pt_${Date.now()}`, title, status: 'Not Started' as const };
            const nextP = { ...p, tasks: [...p.tasks, newTask] };
            saveProjectDB(user.id, nextP);
            return nextP;
          }
          return p;
        });

        if (!found) {
          const newProj: Project = {
            id: projectId,
            title: 'Personal Engineering Project',
            description: 'Student OS custom task manager project',
            techStack: ['TypeScript', 'Next.js'],
            progressPercent: 0,
            tasks: [{ id: `pt_${Date.now()}`, title, status: 'Not Started' as const }],
          };
          updated.push(newProj);
          saveProjectDB(user.id, newProj);
        }

        saveUserData(user.id, 'projects', updated);
        return updated;
      });
    }, 'Please sign in to add project tasks.');
  };

  const toggleProjectTask = (projectId: string, taskId: string) => {
    requireAuth(() => {
      if (!user) return;
      setProjects((prev) => {
        const updated = prev.map((p) => {
          if (p.id === projectId) {
            const updatedTasks = p.tasks.map((t) => {
              if (t.id === taskId) {
                const nextStatus = t.status === 'Completed' ? ('In Progress' as const) : ('Completed' as const);
                return { ...t, status: nextStatus };
              }
              return t;
            });
            const completedCount = updatedTasks.filter((t) => t.status === 'Completed').length;
            const progressPercent = Math.round((completedCount / updatedTasks.length) * 100);
            const nextP = { ...p, tasks: updatedTasks, progressPercent };
            saveProjectDB(user.id, nextP);
            return nextP;
          }
          return p;
        });
        saveUserData(user.id, 'projects', updated);
        return updated;
      });
    }, 'Please sign in to manage project tasks.');
  };

  const addNote = (note: Omit<PersonalNote, 'id' | 'updatedAt'>) => {
    requireAuth(() => {
      if (!user) return;
      const newNote: PersonalNote = {
        ...note,
        id: `note_${Date.now()}`,
        updatedAt: new Date().toISOString().split('T')[0],
      };
      setNotes((prev) => {
        const updated = [newNote, ...prev];
        saveUserData(user.id, 'notes', updated);
        saveNoteDB(user.id, newNote);
        return updated;
      });
    }, 'Please sign in to save personal notes.');
  };

  const deleteNote = (id: string) => {
    if (!user) return;
    setNotes((prev) => {
      const updated = prev.filter((n) => n.id !== id);
      saveUserData(user.id, 'notes', updated);
      deleteNoteDB(user.id, id);
      return updated;
    });
  };

  const addBookmark = (bookmark: Omit<Bookmark, 'id'>) => {
    requireAuth(() => {
      if (!user) return;
      const newBm: Bookmark = {
        ...bookmark,
        id: `bm_${Date.now()}`,
      };
      setBookmarks((prev) => {
        const updated = [newBm, ...prev];
        saveUserData(user.id, 'bookmarks', updated);
        saveBookmarkDB(user.id, newBm);
        return updated;
      });
    }, 'Please sign in to add bookmarks.');
  };

  const deleteBookmark = (id: string) => {
    if (!user) return;
    setBookmarks((prev) => {
      const updated = prev.filter((b) => b.id !== id);
      saveUserData(user.id, 'bookmarks', updated);
      deleteBookmarkDB(user.id, id);
      return updated;
    });
  };

  const useStreakFreeze = () => {
    if (!user) {
      openAuthModal('Sign In Required', 'Please sign in to manage your streak freezes.');
      return false;
    }
    if (streak.streakFreezes > 0) {
      setStreak((s) => {
        const next = { ...s, streakFreezes: s.streakFreezes - 1 };
        saveUserData(user.id, 'streak', next);
        saveStreakDB(user.id, next);
        return next;
      });
      return true;
    }
    return false;
  };

  const logStudyTime = (minutes: number) => {
    requireAuth(() => {
      if (!user) return;
      setGamification((prev) => {
        const nextG = {
          ...prev,
          studyTimeTodayMinutes: prev.studyTimeTodayMinutes + minutes,
          studyTimeWeekMinutes: prev.studyTimeWeekMinutes + minutes,
        };
        saveUserData(user.id, 'gami', nextG);
        saveGamificationDB(user.id, nextG);
        return nextG;
      });
      addXp(Math.floor(minutes / 2));
    }, 'Please sign in to log study time.');
  };

  const sendAIMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: AIMessage = {
      id: `msg_usr_${Date.now()}`,
      sender: 'user',
      role: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const updatedWithUser = [...aiMessages, userMsg];
    setAiMessages(updatedWithUser);
    setIsAILoading(true);

    if (user?.id) {
      saveUserData(user.id, 'ai_chats', updatedWithUser);
    }

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text.trim(),
          history: updatedWithUser,
          userProfile: user
            ? { name: user.name, careerGoal: user.careerGoal, skillLevel: user.skillLevel }
            : undefined,
        }),
      });

      const data = await response.json();
      setIsAILoading(false);

      if (data.error) {
        const errorMsg: AIMessage = {
          id: `msg_err_${Date.now()}`,
          sender: 'ai',
          role: 'assistant',
          text: `⚠️ **AI Mentor Notice**: ${data.error}`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isError: true,
        };
        const finalMessages = [...updatedWithUser, errorMsg];
        setAiMessages(finalMessages);
        if (user?.id) saveUserData(user.id, 'ai_chats', finalMessages);
        return;
      }

      const aiReply: AIMessage = {
        id: `msg_ai_${Date.now()}`,
        sender: 'ai',
        role: 'assistant',
        text: data.reply || "I'm sorry, I couldn't process that request.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      const finalMessages = [...updatedWithUser, aiReply];
      setAiMessages(finalMessages);
      if (user?.id) saveUserData(user.id, 'ai_chats', finalMessages);
    } catch (err: any) {
      setIsAILoading(false);
      const networkErrorMsg: AIMessage = {
        id: `msg_err_${Date.now()}`,
        sender: 'ai',
        role: 'assistant',
        text: `⚠️ **Connection Error**: Failed to reach AI Mentor service. Please check your connection.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isError: true,
      };
      const finalMessages = [...updatedWithUser, networkErrorMsg];
      setAiMessages(finalMessages);
      if (user?.id) saveUserData(user.id, 'ai_chats', finalMessages);
    }
  };

  const clearAIChat = () => {
    setAiMessages([]);
    if (user?.id) {
      saveUserData(user.id, 'ai_chats', []);
    }
  };

  const toggleAdminView = () => setIsAdminView((prev) => !prev);

  return (
    <StudentOSContext.Provider
      value={{
        isAuthenticated,
        user,
        authSession,
        isAuthModalOpen,
        authModalTitle,
        authModalSubtitle,
        isAuthLoading,
        streak,
        gamification,
        problems,
        dsaTopics,
        roadmaps,
        dailyQuests,
        weeklyQuests,
        friends,
        projects,
        notes,
        bookmarks,
        careerReport,
        adminStats,
        aiMessages,
        isAILoading,
        isAdminView,
        theme,
        signUpWithEmail,
        signInWithEmail,
        loginWithGoogle,
        loginWithMicrosoft,
        sendPhoneOTP,
        verifyPhoneOTP,
        loginWithOTP,
        loginDemo,
        logout,
        openAuthModal,
        closeAuthModal,
        requireAuth,
        updateUserProfile,
        completeOnboarding,
        solveProblem,
        startProblem,
        claimQuest,
        updateTopicProgress,
        updateNodeStatus,
        addProjectTask,
        toggleProjectTask,
        addNote,
        deleteNote,
        addBookmark,
        deleteBookmark,
        useStreakFreeze,
        sendAIMessage,
        clearAIChat,
        toggleAdminView,
        toggleTheme,
        logStudyTime,
      }}
    >
      {children}
    </StudentOSContext.Provider>
  );
};

export const useStudentOS = () => {
  const context = useContext(StudentOSContext);
  if (!context) {
    throw new Error('useStudentOS must be used within a StudentOSProvider');
  }
  return context;
};
