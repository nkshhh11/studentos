export type CareerGoal = 
  | 'Software Engineer'
  | 'Frontend Developer'
  | 'Backend Developer'
  | 'Full Stack Developer'
  | 'AI Engineer'
  | 'Machine Learning Engineer'
  | 'Data Scientist'
  | 'Android Developer'
  | 'DevOps Engineer'
  | 'Cybersecurity Engineer';

export type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export type AvailableStudyTime = '1 hour/day' | '2 hours/day' | '3 hours/day' | '4+ hours/day';

export type ProgrammingLanguage = 'C' | 'C++' | 'Java' | 'Python' | 'JavaScript' | 'TypeScript' | 'Go' | 'Rust' | 'Kotlin';

export type PlatformName = 'LeetCode' | 'CodeChef' | 'Codeforces' | 'HackerRank' | 'GeeksforGeeks' | 'GitHub';

export interface ConnectedAccount {
  platform: PlatformName;
  username: string;
  connected: boolean;
  problemsSolved?: number;
  rating?: number;
  avatarUrl?: string;
  profileUrl?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  college: string;
  branch: string;
  year: string;
  graduationYear: string;
  skillLevel: SkillLevel;
  careerGoal: CareerGoal;
  selectedLanguages: ProgrammingLanguage[];
  connectedAccounts: ConnectedAccount[];
  availableStudyTime: AvailableStudyTime;
  isOnboarded: boolean;
  bio?: string;
  createdAt: string;
}

export interface StreakData {
  currentStreak: number;
  bestStreak: number;
  streakFreezes: number;
  lastActiveDate: string; // YYYY-MM-DD
  history: { date: string; active: boolean; activityType: string }[];
}

export interface GamificationState {
  xp: number;
  level: number;
  levelTitle: string;
  nextLevelXp: number;
  totalProblemsSolved: number;
  problemsSolvedToday: number;
  problemsSolvedThisWeek: number;
  studyTimeTodayMinutes: number;
  studyTimeWeekMinutes: number;
  badges: Badge[];
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'Streak' | 'Coding' | 'Learning' | 'Milestone' | 'Special';
  unlocked: boolean;
  unlockedAt?: string;
}

export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface Problem {
  id: string;
  title: string;
  slug: string;
  platform: PlatformName;
  difficulty: Difficulty;
  topic: string;
  subtopic?: string;
  officialUrl: string;
  acceptanceRate?: number;
  companies?: string[];
  status: 'Unsolved' | 'Attempted' | 'Solved';
  solvedAt?: string;
  personalNotes?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface LanguageHubItem {
  id: ProgrammingLanguage;
  name: string;
  tagline: string;
  description: string;
  careerUses: string[];
  strategyPhases: { phase: number; title: string; desc: string }[];
  keyTopics: string[];
  commonMistakes: string[];
  documentationUrl: string;
  quizzes: QuizQuestion[];
}

export interface DSATopic {
  id: string;
  title: string;
  description: string;
  progressPercent: number; // 0 - 100
  totalProblems: number;
  solvedProblems: number;
  confidenceScore: number; // 0 - 100
  recommendedStatus: 'Strong' | 'Needs Review' | 'Not Started';
}

export interface RoadmapNode {
  id: string;
  title: string;
  description: string;
  category: 'Fundamentals' | 'Core CS' | 'DSA' | 'Development' | 'Advanced';
  status: 'Locked' | 'Started' | 'Learning' | 'Strong' | 'Mastered';
  childrenIds?: string[];
  resources: { name: string; url: string; type: 'Doc' | 'Video' | 'Article' }[];
}

export interface Roadmap {
  id: string;
  title: string;
  careerGoal: CareerGoal;
  description: string;
  overallProgressPercent: number;
  nodes: RoadmapNode[];
}

export interface DailyQuest {
  id: string;
  title: string;
  description: string;
  target: number;
  current: number;
  unit: string;
  xpReward: number;
  completed: boolean;
}

export interface WeeklyQuest {
  id: string;
  title: string;
  description: string;
  target: number;
  current: number;
  unit: string;
  xpReward: number;
  completed: boolean;
}

export interface Friend {
  id: string;
  name: string;
  avatar: string;
  college: string;
  streak: number;
  xp: number;
  level: number;
  levelTitle: string;
  problemsSolved: number;
  isFriend: boolean;
}

export interface ProjectTask {
  id: string;
  title: string;
  status: 'Not Started' | 'In Progress' | 'Completed';
  dueDate?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  progressPercent: number;
  tasks: ProjectTask[];
  notes?: string;
}

export interface PersonalNote {
  id: string;
  title: string;
  content: string;
  tags: string[];
  attachedToType?: 'Problem' | 'Topic' | 'Project' | 'General';
  attachedToId?: string;
  updatedAt: string;
}

export interface Bookmark {
  id: string;
  title: string;
  url: string;
  category: 'Study Later' | 'Important' | 'Revision' | 'Interview';
  type: 'Problem' | 'Article' | 'Video' | 'Documentation';
}

export interface AIMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  suggestions?: string[];
}

export interface CareerReadinessReport {
  scorePercent: number;
  targetRole: CareerGoal;
  strengths: string[];
  weakAreas: string[];
  recommendedNextStep: string;
  topicBreakdown: { topic: string; score: number }[];
}

export interface AdminStats {
  totalUsers: number;
  newUsersToday: number;
  dailyActiveUsers: number;
  weeklyActiveUsers: number;
  monthlyActiveUsers: number;
  avgSessionTimeMinutes: number;
  topLanguages: { language: string; count: number }[];
  topRoadmaps: { roadmap: string; count: number }[];
  topSolvedTopics: { topic: string; count: number }[];
  retentionRatePercent: number;
}
