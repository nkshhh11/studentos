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

export type ThemeMode = 'dark' | 'light';

interface StudentOSContextType {
  user: UserProfile;
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
  isAdminView: boolean;
  theme: ThemeMode;
  userList: UserProfile[];
  
  // Handlers
  updateUserProfile: (updates: Partial<UserProfile>) => void;
  completeOnboarding: (data: Partial<UserProfile>) => void;
  createNewUserAccount: () => void;
  switchUserAccount: (userId: string) => void;
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
  sendAIMessage: (text: string) => void;
  toggleAdminView: () => void;
  toggleTheme: () => void;
  logStudyTime: (minutes: number) => void;
}

const StudentOSContext = createContext<StudentOSContextType | undefined>(undefined);

export const StudentOSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);
  const [userList, setUserList] = useState<UserProfile[]>([INITIAL_USER]);
  const [streak, setStreak] = useState<StreakData>(INITIAL_STREAK);
  const [gamification, setGamification] = useState<GamificationState>(INITIAL_GAMIFICATION);
  const [problems, setProblems] = useState<Problem[]>(MOCK_PROBLEMS);
  const [dsaTopics, setDsaTopics] = useState<DSATopic[]>(DSA_TOPICS);
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>(MOCK_ROADMAPS);
  const [dailyQuests, setDailyQuests] = useState<DailyQuest[]>(DAILY_QUESTS);
  const [weeklyQuests, setWeeklyQuests] = useState<WeeklyQuest[]>(WEEKLY_QUESTS);
  const [friends] = useState<Friend[]>(MOCK_FRIENDS);
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
  const [notes, setNotes] = useState<PersonalNote[]>([]);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [careerReport] = useState<CareerReadinessReport>(MOCK_CAREER_REPORT);
  const [adminStats] = useState<AdminStats>(MOCK_ADMIN_STATS);
  const [isAdminView, setIsAdminView] = useState<boolean>(false);
  const [theme, setTheme] = useState<ThemeMode>('dark');

  const [aiMessages, setAiMessages] = useState<AIMessage[]>([
    {
      id: 'm1',
      sender: 'ai',
      text: "Hello! I'm your StudentOS AI Mentor. Ask me any question about DSA, Roadmap, or Career prep!",
      timestamp: '10:00 AM',
      suggestions: ['Explain DP vs Recursion', 'Create a 7-day study plan', 'Give me a binary tree quiz'],
    },
  ]);

  // Load state for active user from localStorage
  const loadUserData = (targetUser: UserProfile) => {
    setUser(targetUser);
    const userId = targetUser.id;

    try {
      const savedStreak = localStorage.getItem(`studentos_streak_${userId}`);
      if (savedStreak) setStreak(JSON.parse(savedStreak));
      else setStreak(INITIAL_STREAK);

      const savedGami = localStorage.getItem(`studentos_gamification_${userId}`);
      if (savedGami) setGamification(JSON.parse(savedGami));
      else setGamification(INITIAL_GAMIFICATION);

      const savedProblems = localStorage.getItem(`studentos_problems_${userId}`);
      if (savedProblems) setProblems(JSON.parse(savedProblems));

      const savedNotes = localStorage.getItem(`studentos_notes_${userId}`);
      if (savedNotes) setNotes(JSON.parse(savedNotes));
      else setNotes([]);

      const savedBookmarks = localStorage.getItem(`studentos_bookmarks_${userId}`);
      if (savedBookmarks) setBookmarks(JSON.parse(savedBookmarks));
      else setBookmarks([]);

      const savedProjects = localStorage.getItem(`studentos_projects_${userId}`);
      if (savedProjects) setProjects(JSON.parse(savedProjects));
      else setProjects(MOCK_PROJECTS);
    } catch (e) {
      console.error('Error loading user isolated state:', e);
    }
  };

  // Initial load
  useEffect(() => {
    try {
      const savedList = localStorage.getItem('studentos_user_list');
      let currentUsers = [INITIAL_USER];
      if (savedList) {
        currentUsers = JSON.parse(savedList);
        setUserList(currentUsers);
      }

      const activeId = localStorage.getItem('studentos_active_user_id');
      const activeUser = currentUsers.find((u) => u.id === activeId) || currentUsers[0] || INITIAL_USER;
      loadUserData(activeUser);

      const savedTheme = localStorage.getItem('studentos_theme') as ThemeMode;
      if (savedTheme === 'light' || savedTheme === 'dark') {
        setTheme(savedTheme);
      }
    } catch (e) {
      console.error('Error in initial load:', e);
    }
  }, []);

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

  const saveToStorage = (key: string, val: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch (e) {
      console.error('Error saving to storage', e);
    }
  };

  const saveUserData = (userId: string, key: string, val: any) => {
    saveToStorage(`studentos_${key}_${userId}`, val);
  };

  const updateUserProfile = (updates: Partial<UserProfile>) => {
    setUser((prev) => {
      const next = { ...prev, ...updates };
      saveToStorage(`studentos_user_${prev.id}`, next);
      localStorage.setItem('studentos_active_user_id', prev.id);

      setUserList((list) => {
        const updatedList = list.map((u) => (u.id === prev.id ? next : u));
        saveToStorage('studentos_user_list', updatedList);
        return updatedList;
      });

      return next;
    });
  };

  const completeOnboarding = (data: Partial<UserProfile>) => {
    const newUserId = `usr_${Date.now()}`;
    const freshUser: UserProfile = {
      id: newUserId,
      name: data.name || 'New Student',
      email: data.email || `student_${Date.now()}@university.edu`,
      avatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250`,
      college: data.college || 'Engineering College',
      branch: data.branch || 'Computer Science',
      year: data.year || '1st Year',
      graduationYear: data.graduationYear || '2028',
      skillLevel: data.skillLevel || 'Beginner',
      careerGoal: data.careerGoal || 'Software Engineer',
      selectedLanguages: data.selectedLanguages || ['C++', 'Python'],
      connectedAccounts: [
        { platform: 'LeetCode', username: '', connected: false },
        { platform: 'Codeforces', username: '', connected: false },
        { platform: 'CodeChef', username: '', connected: false },
        { platform: 'GitHub', username: '', connected: false },
      ],
      availableStudyTime: data.availableStudyTime || '2 hours/day',
      isOnboarded: true,
      createdAt: new Date().toISOString().split('T')[0],
    };

    // Fresh isolated state for new user
    const freshStreak: StreakData = {
      currentStreak: 1,
      bestStreak: 1,
      streakFreezes: 1,
      lastActiveDate: new Date().toISOString().split('T')[0],
      history: [{ date: new Date().toISOString().split('T')[0], active: true, activityType: 'Account Created' }],
    };

    const freshGami: GamificationState = {
      xp: 100,
      level: 1,
      levelTitle: '🌱 Beginner',
      nextLevelXp: 200,
      totalProblemsSolved: 0,
      problemsSolvedToday: 0,
      problemsSolvedThisWeek: 0,
      studyTimeTodayMinutes: 0,
      studyTimeWeekMinutes: 0,
      badges: INITIAL_GAMIFICATION.badges.map((b) => (b.id === 'b1' ? { ...b, unlocked: true } : { ...b, unlocked: false })),
    };

    const freshProblems = MOCK_PROBLEMS.map((p) => ({ ...p, status: 'Unsolved' as const, solvedAt: undefined, personalNotes: undefined }));

    setUser(freshUser);
    setStreak(freshStreak);
    setGamification(freshGami);
    setProblems(freshProblems);
    setNotes([]);
    setBookmarks([]);
    setProjects(MOCK_PROJECTS);

    // Save to user-isolated localStorage
    saveUserData(newUserId, 'user', freshUser);
    saveUserData(newUserId, 'streak', freshStreak);
    saveUserData(newUserId, 'gamification', freshGami);
    saveUserData(newUserId, 'problems', freshProblems);
    saveUserData(newUserId, 'notes', []);
    saveUserData(newUserId, 'bookmarks', []);
    saveUserData(newUserId, 'projects', MOCK_PROJECTS);

    localStorage.setItem('studentos_active_user_id', newUserId);

    setUserList((list) => {
      const updatedList = [freshUser, ...list.filter((u) => u.id !== newUserId)];
      saveToStorage('studentos_user_list', updatedList);
      return updatedList;
    });
  };

  const createNewUserAccount = () => {
    // Reset to temporary blank slate for onboarding
    const tempUser: UserProfile = {
      id: `usr_temp_${Date.now()}`,
      name: '',
      email: '',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
      college: '',
      branch: '',
      year: '1st Year',
      graduationYear: '2028',
      skillLevel: 'Beginner',
      careerGoal: 'Software Engineer',
      selectedLanguages: ['C++', 'Python'],
      connectedAccounts: [],
      availableStudyTime: '2 hours/day',
      isOnboarded: false,
      createdAt: new Date().toISOString().split('T')[0],
    };

    setUser(tempUser);
    setStreak({ currentStreak: 0, bestStreak: 0, streakFreezes: 0, lastActiveDate: '', history: [] });
    setGamification({ xp: 0, level: 1, levelTitle: '🌱 Beginner', nextLevelXp: 100, totalProblemsSolved: 0, problemsSolvedToday: 0, problemsSolvedThisWeek: 0, studyTimeTodayMinutes: 0, studyTimeWeekMinutes: 0, badges: [] });
    setNotes([]);
    setBookmarks([]);
  };

  const switchUserAccount = (targetUserId: string) => {
    const targetUser = userList.find((u) => u.id === targetUserId);
    if (targetUser) {
      localStorage.setItem('studentos_active_user_id', targetUserId);
      loadUserData(targetUser);
    }
  };

  const addXp = (amount: number) => {
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
      saveUserData(user.id, 'gamification', updated);
      return updated;
    });
  };

  const solveProblem = (problemId: string, personalNotes?: string) => {
    const today = new Date().toISOString().split('T')[0];
    
    setProblems((prev) => {
      const updated = prev.map((p) => {
        if (p.id === problemId) {
          const isFirstSolve = p.status !== 'Solved';
          if (isFirstSolve) {
            let xpEarned = p.difficulty === 'Easy' ? 15 : p.difficulty === 'Medium' ? 30 : 60;
            addXp(xpEarned);

            // Update stats
            setGamification((g) => {
              const nextG = {
                ...g,
                totalProblemsSolved: g.totalProblemsSolved + 1,
                problemsSolvedToday: g.problemsSolvedToday + 1,
                problemsSolvedThisWeek: g.problemsSolvedThisWeek + 1,
              };
              saveUserData(user.id, 'gamification', nextG);
              return nextG;
            });

            // Update Streak
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

      saveUserData(user.id, 'problems', updated);
      return updated;
    });
  };

  const startProblem = (problemId: string) => {
    setProblems((prev) => {
      const updated = prev.map((p) => (p.id === problemId && p.status === 'Unsolved' ? { ...p, status: 'Attempted' as const } : p));
      saveUserData(user.id, 'problems', updated);
      return updated;
    });
  };

  const claimQuest = (questId: string, isWeekly = false) => {
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
  };

  const updateTopicProgress = (topicId: string, deltaSolved: number) => {
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
  };

  const updateNodeStatus = (roadmapId: string, nodeId: string, status: RoadmapNode['status']) => {
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
  };

  const addProjectTask = (projectId: string, title: string) => {
    setProjects((prev) => {
      const updated = prev.map((p) => {
        if (p.id === projectId) {
          const newTask = { id: `pt_${Date.now()}`, title, status: 'Not Started' as const };
          return { ...p, tasks: [...p.tasks, newTask] };
        }
        return p;
      });
      saveUserData(user.id, 'projects', updated);
      return updated;
    });
  };

  const toggleProjectTask = (projectId: string, taskId: string) => {
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
          return { ...p, tasks: updatedTasks, progressPercent };
        }
        return p;
      });
      saveUserData(user.id, 'projects', updated);
      return updated;
    });
  };

  const addNote = (note: Omit<PersonalNote, 'id' | 'updatedAt'>) => {
    const newNote: PersonalNote = {
      ...note,
      id: `note_${Date.now()}`,
      updatedAt: new Date().toISOString().split('T')[0],
    };
    setNotes((prev) => {
      const updated = [newNote, ...prev];
      saveUserData(user.id, 'notes', updated);
      return updated;
    });
  };

  const deleteNote = (id: string) => {
    setNotes((prev) => {
      const updated = prev.filter((n) => n.id !== id);
      saveUserData(user.id, 'notes', updated);
      return updated;
    });
  };

  const addBookmark = (bookmark: Omit<Bookmark, 'id'>) => {
    const newBm: Bookmark = {
      ...bookmark,
      id: `bm_${Date.now()}`,
    };
    setBookmarks((prev) => {
      const updated = [newBm, ...prev];
      saveUserData(user.id, 'bookmarks', updated);
      return updated;
    });
  };

  const deleteBookmark = (id: string) => {
    setBookmarks((prev) => {
      const updated = prev.filter((b) => b.id !== id);
      saveUserData(user.id, 'bookmarks', updated);
      return updated;
    });
  };

  const useStreakFreeze = () => {
    if (streak.streakFreezes > 0) {
      setStreak((s) => {
        const next = { ...s, streakFreezes: s.streakFreezes - 1 };
        saveUserData(user.id, 'streak', next);
        return next;
      });
      return true;
    }
    return false;
  };

  const logStudyTime = (minutes: number) => {
    setGamification((prev) => {
      const nextG = {
        ...prev,
        studyTimeTodayMinutes: prev.studyTimeTodayMinutes + minutes,
        studyTimeWeekMinutes: prev.studyTimeWeekMinutes + minutes,
      };
      saveUserData(user.id, 'gamification', nextG);
      return nextG;
    });
    addXp(Math.floor(minutes / 2));
  };

  const sendAIMessage = (text: string) => {
    const userMsg: AIMessage = {
      id: `msg_${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setAiMessages((prev) => [...prev, userMsg]);

    setTimeout(() => {
      let aiText = "That's a great question! Consistent practice and topic revision is key. Let's break this down into clear steps.";
      let suggestions: string[] = ['Give me practice problems', 'Show code example', 'Explain visual analogy'];

      const lower = text.toLowerCase();
      if (lower.includes('dp') || lower.includes('dynamic programming')) {
        aiText = "Dynamic Programming breaks down complex problems into overlapping subproblems. 1) Start with Recursion + Memoization (Top-Down). 2) Identify the state parameters. 3) Define base cases clearly. Try solving 'Climbing Stairs' first, then move to 'Coin Change'!";
        suggestions = ['Practice Coin Change', 'Explain 1D vs 2D DP', 'Show Memoization template'];
      } else if (lower.includes('recursion')) {
        aiText = "Recursion relies on call stacks. Every recursive function must have two parts: 1) Base Case (stop condition), and 2) Recursive Step (progressing toward base case).";
        suggestions = ['Solve Subsets', 'Explain call stack memory', 'Give a quiz'];
      } else if (lower.includes('tree') || lower.includes('binary tree')) {
        aiText = "Trees are naturally recursive! Common traversals: Inorder (Left, Root, Right), Preorder (Root, Left, Right), Postorder (Left, Right, Root), and BFS (Level Order using Queue).";
        suggestions = ['Practice Inorder Traversal', 'Explain BST properties', 'Show BFS template'];
      }

      const aiReply: AIMessage = {
        id: `ai_${Date.now()}`,
        sender: 'ai',
        text: aiText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions,
      };

      setAiMessages((prev) => [...prev, aiReply]);
    }, 600);
  };

  const toggleAdminView = () => setIsAdminView((prev) => !prev);

  return (
    <StudentOSContext.Provider
      value={{
        user,
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
        isAdminView,
        theme,
        userList,
        updateUserProfile,
        completeOnboarding,
        createNewUserAccount,
        switchUserAccount,
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
