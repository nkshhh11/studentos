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
  MOCK_NOTES,
  MOCK_BOOKMARKS,
  MOCK_CAREER_REPORT,
  MOCK_ADMIN_STATS,
} from '../data/mockData';

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
  
  // Handlers
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
  sendAIMessage: (text: string) => void;
  toggleAdminView: () => void;
  logStudyTime: (minutes: number) => void;
}

const StudentOSContext = createContext<StudentOSContextType | undefined>(undefined);

export const StudentOSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);
  const [streak, setStreak] = useState<StreakData>(INITIAL_STREAK);
  const [gamification, setGamification] = useState<GamificationState>(INITIAL_GAMIFICATION);
  const [problems, setProblems] = useState<Problem[]>(MOCK_PROBLEMS);
  const [dsaTopics, setDsaTopics] = useState<DSATopic[]>(DSA_TOPICS);
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>(MOCK_ROADMAPS);
  const [dailyQuests, setDailyQuests] = useState<DailyQuest[]>(DAILY_QUESTS);
  const [weeklyQuests, setWeeklyQuests] = useState<WeeklyQuest[]>(WEEKLY_QUESTS);
  const [friends] = useState<Friend[]>(MOCK_FRIENDS);
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
  const [notes, setNotes] = useState<PersonalNote[]>(MOCK_NOTES);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(MOCK_BOOKMARKS);
  const [careerReport] = useState<CareerReadinessReport>(MOCK_CAREER_REPORT);
  const [adminStats] = useState<AdminStats>(MOCK_ADMIN_STATS);
  const [isAdminView, setIsAdminView] = useState<boolean>(false);

  const [aiMessages, setAiMessages] = useState<AIMessage[]>([
    {
      id: 'm1',
      sender: 'ai',
      text: "Hello Alex! I'm your StudentOS AI Mentor. Based on your recent activity, your Recursion & Dynamic Programming foundations need some practice before tackling hard graph DP problems. How can I help you today?",
      timestamp: '10:00 AM',
      suggestions: ['Explain DP vs Recursion', 'Create a 7-day DP study plan', 'Give me a quick binary tree quiz'],
    },
  ]);

  // Load from localStorage if available
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('studentos_user');
      if (savedUser) setUser(JSON.parse(savedUser));
      
      const savedStreak = localStorage.getItem('studentos_streak');
      if (savedStreak) setStreak(JSON.parse(savedStreak));

      const savedGami = localStorage.getItem('studentos_gamification');
      if (savedGami) setGamification(JSON.parse(savedGami));
    } catch (e) {
      console.error('Error loading state from localStorage:', e);
    }
  }, []);

  const saveToStorage = (key: string, val: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch (e) {
      console.error('Error saving to storage', e);
    }
  };

  const updateUserProfile = (updates: Partial<UserProfile>) => {
    setUser((prev) => {
      const next = { ...prev, ...updates };
      saveToStorage('studentos_user', next);
      return next;
    });
  };

  const completeOnboarding = (data: Partial<UserProfile>) => {
    setUser((prev) => {
      const next = {
        ...prev,
        ...data,
        isOnboarded: true,
      };
      saveToStorage('studentos_user', next);
      return next;
    });
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
      saveToStorage('studentos_gamification', updated);
      return updated;
    });
  };

  const solveProblem = (problemId: string, personalNotes?: string) => {
    const today = new Date().toISOString().split('T')[0];
    
    setProblems((prev) =>
      prev.map((p) => {
        if (p.id === problemId) {
          const isFirstSolve = p.status !== 'Solved';
          if (isFirstSolve) {
            let xpEarned = p.difficulty === 'Easy' ? 15 : p.difficulty === 'Medium' ? 30 : 60;
            addXp(xpEarned);

            // Update stats
            setGamification((g) => ({
              ...g,
              totalProblemsSolved: g.totalProblemsSolved + 1,
              problemsSolvedToday: g.problemsSolvedToday + 1,
              problemsSolvedThisWeek: g.problemsSolvedThisWeek + 1,
            }));

            // Update Streak if needed
            setStreak((s) => {
              const alreadyActiveToday = s.lastActiveDate === today;
              const nextStreak = alreadyActiveToday ? s.currentStreak : s.currentStreak + 1;
              const nextBest = Math.max(s.bestStreak, nextStreak);
              const updated = {
                ...s,
                currentStreak: nextStreak,
                bestStreak: nextBest,
                lastActiveDate: today,
                history: [{ date: today, active: true, activityType: `Solved: ${p.title}` }, ...s.history],
              };
              saveToStorage('studentos_streak', updated);
              return updated;
            });

            // Update Daily Quests
            setDailyQuests((quests) =>
              quests.map((q) => {
                if (q.id === 'dq1') {
                  const curr = q.current + 1;
                  return { ...q, current: curr, completed: curr >= q.target };
                }
                return q;
              })
            );
          }
          return {
            ...p,
            status: 'Solved',
            solvedAt: today,
            personalNotes: personalNotes || p.personalNotes,
          };
        }
        return p;
      })
    );
  };

  const startProblem = (problemId: string) => {
    setProblems((prev) =>
      prev.map((p) => (p.id === problemId && p.status === 'Unsolved' ? { ...p, status: 'Attempted' } : p))
    );
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
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === projectId) {
          const newTask = { id: `pt_${Date.now()}`, title, status: 'Not Started' as const };
          return { ...p, tasks: [...p.tasks, newTask] };
        }
        return p;
      })
    );
  };

  const toggleProjectTask = (projectId: string, taskId: string) => {
    setProjects((prev) =>
      prev.map((p) => {
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
      })
    );
  };

  const addNote = (note: Omit<PersonalNote, 'id' | 'updatedAt'>) => {
    const newNote: PersonalNote = {
      ...note,
      id: `note_${Date.now()}`,
      updatedAt: new Date().toISOString().split('T')[0],
    };
    setNotes((prev) => [newNote, ...prev]);
  };

  const deleteNote = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  const addBookmark = (bookmark: Omit<Bookmark, 'id'>) => {
    const newBm: Bookmark = {
      ...bookmark,
      id: `bm_${Date.now()}`,
    };
    setBookmarks((prev) => [newBm, ...prev]);
  };

  const deleteBookmark = (id: string) => {
    setBookmarks((prev) => prev.filter((b) => b.id !== id));
  };

  const useStreakFreeze = () => {
    if (streak.streakFreezes > 0) {
      setStreak((s) => {
        const next = { ...s, streakFreezes: s.streakFreezes - 1 };
        saveToStorage('studentos_streak', next);
        return next;
      });
      return true;
    }
    return false;
  };

  const logStudyTime = (minutes: number) => {
    setGamification((prev) => ({
      ...prev,
      studyTimeTodayMinutes: prev.studyTimeTodayMinutes + minutes,
      studyTimeWeekMinutes: prev.studyTimeWeekMinutes + minutes,
    }));
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

    // Simulate AI response based on keywords
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
      } else if (lower.includes('quiz')) {
        aiText = "Here's a quick quiz: What is the worst-case time complexity of searching an element in a binary search tree (BST)?";
        suggestions = ['O(log N)', 'O(N)', 'O(1)'];
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
        toggleAdminView,
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
