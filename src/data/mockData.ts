import {
  UserProfile,
  StreakData,
  GamificationState,
  Problem,
  LanguageHubItem,
  DSATopic,
  Roadmap,
  DailyQuest,
  WeeklyQuest,
  Friend,
  Project,
  PersonalNote,
  Bookmark,
  CareerReadinessReport,
  AdminStats,
  Badge,
} from '../types/studentos';

export const INITIAL_USER: UserProfile = {
  id: 'usr_001',
  name: 'Alex Chen',
  email: 'alex.chen@university.edu',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
  college: 'Stanford University',
  branch: 'Computer Science & Engineering',
  year: '3rd Year',
  graduationYear: '2027',
  skillLevel: 'Intermediate',
  careerGoal: 'Software Engineer',
  selectedLanguages: ['C++', 'Python', 'JavaScript', 'TypeScript'],
  connectedAccounts: [
    { platform: 'LeetCode', username: 'alex_code', connected: true, problemsSolved: 182, rating: 1745, profileUrl: 'https://leetcode.com/u/alex_code' },
    { platform: 'Codeforces', username: 'alex_cf', connected: true, problemsSolved: 45, rating: 1420, profileUrl: 'https://codeforces.com/profile/alex_cf' },
    { platform: 'CodeChef', username: 'alex_chef', connected: true, problemsSolved: 20, rating: 1610, profileUrl: 'https://codechef.com/users/alex_chef' },
    { platform: 'GitHub', username: 'alexchen-dev', connected: true, problemsSolved: 0, profileUrl: 'https://github.com/alexchen-dev' },
    { platform: 'GeeksforGeeks', username: 'alex_gfg', connected: false },
    { platform: 'HackerRank', username: 'alex_hr', connected: false },
  ],
  availableStudyTime: '3 hours/day',
  isOnboarded: true,
  bio: 'Building full-stack apps & mastering DSA to land my dream SDE role!',
  createdAt: '2026-01-15',
};

export const INITIAL_STREAK: StreakData = {
  currentStreak: 15,
  bestStreak: 42,
  streakFreezes: 2,
  lastActiveDate: new Date().toISOString().split('T')[0],
  history: [
    { date: '2026-09-08', active: true, activityType: 'Solved Problem: Two Sum' },
    { date: '2026-09-07', active: true, activityType: 'Studied 2h 15m' },
    { date: '2026-09-06', active: true, activityType: 'Completed Daily Quest' },
    { date: '2026-09-05', active: true, activityType: 'Solved 3 Problems' },
    { date: '2026-09-04', active: true, activityType: 'Completed Trees Lesson' },
    { date: '2026-09-03', active: true, activityType: 'Solved Problem: 3Sum' },
    { date: '2026-09-02', active: true, activityType: 'Studied 3h' },
  ],
};

export const INITIAL_BADGES: Badge[] = [
  { id: 'b1', title: 'First Steps', description: 'Log in to StudentOS for the first time', icon: '🏅', category: 'Milestone', unlocked: true, unlockedAt: '2026-01-15' },
  { id: 'b2', title: 'First Blood', description: 'Solve your first coding problem on StudentOS', icon: '💻', category: 'Coding', unlocked: true, unlockedAt: '2026-01-16' },
  { id: 'b3', title: '7-Day Warrior', description: 'Maintain a 7-day Universal Streak', icon: '🔥', category: 'Streak', unlocked: true, unlockedAt: '2026-01-22' },
  { id: 'b4', title: 'Monthly Consistency', description: 'Maintain a 30-day Universal Streak', icon: '🔥🔥', category: 'Streak', unlocked: true, unlockedAt: '2026-02-14' },
  { id: 'b5', title: 'Centurion', description: 'Solve 100 coding problems across platforms', icon: '⚔️', category: 'Coding', unlocked: true, unlockedAt: '2026-03-01' },
  { id: 'b6', title: 'DSA Explorer', description: 'Complete 50% of the DSA Roadmap', icon: '🧠', category: 'Learning', unlocked: true, unlockedAt: '2026-04-10' },
  { id: 'b7', title: 'Project Master', description: 'Build and link 3 projects to StudentOS', icon: '🚀', category: 'Milestone', unlocked: true, unlockedAt: '2026-05-20' },
  { id: 'b8', title: 'Code Legend', description: 'Reach Level 50 in StudentOS', icon: '👑', category: 'Special', unlocked: false },
  { id: 'b9', title: 'DP Champion', description: 'Solve 25 Dynamic Programming problems', icon: '🧩', category: 'Coding', unlocked: false },
  { id: 'b10', title: 'AI Scholar', description: 'Have 20 interactions with AI Mentor', icon: '🤖', category: 'Learning', unlocked: true, unlockedAt: '2026-06-05' },
];

export const INITIAL_GAMIFICATION: GamificationState = {
  xp: 2450,
  level: 12,
  levelTitle: 'Code Explorer',
  nextLevelXp: 3000,
  totalProblemsSolved: 247,
  problemsSolvedToday: 3,
  problemsSolvedThisWeek: 18,
  studyTimeTodayMinutes: 135,
  studyTimeWeekMinutes: 750,
  badges: INITIAL_BADGES,
};

export const MOCK_PROBLEMS: Problem[] = [
  { id: 'p1', title: 'Two Sum', slug: 'two-sum', platform: 'LeetCode', difficulty: 'Easy', topic: 'Arrays', subtopic: 'Hashing', officialUrl: 'https://leetcode.com/problems/two-sum/', acceptanceRate: 52.4, companies: ['Google', 'Amazon', 'Apple'], status: 'Solved', solvedAt: '2026-09-08' },
  { id: 'p2', title: 'Valid Anagram', slug: 'valid-anagram', platform: 'LeetCode', difficulty: 'Easy', topic: 'Strings', subtopic: 'Hashing', officialUrl: 'https://leetcode.com/problems/valid-anagram/', acceptanceRate: 64.1, companies: ['Uber', 'Facebook'], status: 'Solved', solvedAt: '2026-09-07' },
  { id: 'p3', title: '3Sum', slug: '3sum', platform: 'LeetCode', difficulty: 'Medium', topic: 'Arrays', subtopic: 'Two Pointers', officialUrl: 'https://leetcode.com/problems/3sum/', acceptanceRate: 34.8, companies: ['Amazon', 'Microsoft'], status: 'Solved', solvedAt: '2026-09-03' },
  { id: 'p4', title: 'Longest Substring Without Repeating Characters', slug: 'longest-substring-without-repeating-characters', platform: 'LeetCode', difficulty: 'Medium', topic: 'Strings', subtopic: 'Sliding Window', officialUrl: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/', acceptanceRate: 34.5, companies: ['Amazon', 'Google', 'Meta'], status: 'Solved', solvedAt: '2026-09-01' },
  { id: 'p5', title: 'Binary Tree Inorder Traversal', slug: 'binary-tree-inorder-traversal', platform: 'LeetCode', difficulty: 'Easy', topic: 'Trees', subtopic: 'DFS', officialUrl: 'https://leetcode.com/problems/binary-tree-inorder-traversal/', acceptanceRate: 76.2, companies: ['Microsoft'], status: 'Solved', solvedAt: '2026-08-28' },
  { id: 'p6', title: 'Lowest Common Ancestor of a BST', slug: 'lowest-common-ancestor-of-a-binary-search-tree', platform: 'LeetCode', difficulty: 'Medium', topic: 'Trees', subtopic: 'BST', officialUrl: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/', acceptanceRate: 63.9, companies: ['Meta', 'Amazon'], status: 'Attempted' },
  { id: 'p7', title: 'Climbing Stairs', slug: 'climbing-stairs', platform: 'LeetCode', difficulty: 'Easy', topic: 'Dynamic Programming', subtopic: '1D DP', officialUrl: 'https://leetcode.com/problems/climbing-stairs/', acceptanceRate: 52.8, companies: ['Amazon', 'Adobe'], status: 'Solved', solvedAt: '2026-08-15' },
  { id: 'p8', title: 'Coin Change', slug: 'coin-change', platform: 'LeetCode', difficulty: 'Medium', topic: 'Dynamic Programming', subtopic: 'Unbounded Knapsack', officialUrl: 'https://leetcode.com/problems/coin-change/', acceptanceRate: 43.1, companies: ['Google', 'Amazon', 'Goldman Sachs'], status: 'Unsolved' },
  { id: 'p9', title: 'Longest Increasing Subsequence', slug: 'longest-increasing-subsequence', platform: 'LeetCode', difficulty: 'Medium', topic: 'Dynamic Programming', subtopic: 'DP on Sequences', officialUrl: 'https://leetcode.com/problems/longest-increasing-subsequence/', acceptanceRate: 55.3, companies: ['Microsoft', 'Apple'], status: 'Unsolved' },
  { id: 'p10', title: 'Watermelon', slug: 'watermelon', platform: 'Codeforces', difficulty: 'Easy', topic: 'Math', officialUrl: 'https://codeforces.com/problemset/problem/4/A', acceptanceRate: 85.0, companies: ['Competitive Programming'], status: 'Solved', solvedAt: '2026-07-10' },
  { id: 'p11', title: 'Way Too Long Words', slug: 'way-too-long-words', platform: 'Codeforces', difficulty: 'Easy', topic: 'Strings', officialUrl: 'https://codeforces.com/problemset/problem/71/A', acceptanceRate: 80.2, status: 'Solved', solvedAt: '2026-07-12' },
  { id: 'p12', title: 'Subarray Sum Equals K', slug: 'subarray-sum-equals-k', platform: 'LeetCode', difficulty: 'Medium', topic: 'Arrays', subtopic: 'Prefix Sum', officialUrl: 'https://leetcode.com/problems/subarray-sum-equals-k/', acceptanceRate: 43.9, companies: ['Meta', 'Amazon'], status: 'Solved', solvedAt: '2026-09-02' },
  { id: 'p13', title: 'Top K Frequent Elements', slug: 'top-k-frequent-elements', platform: 'LeetCode', difficulty: 'Medium', topic: 'Hashing', subtopic: 'Heaps', officialUrl: 'https://leetcode.com/problems/top-k-frequent-elements/', acceptanceRate: 62.7, companies: ['Amazon', 'Facebook'], status: 'Solved' },
  { id: 'p14', title: 'Merge K Sorted Lists', slug: 'merge-k-sorted-lists', platform: 'LeetCode', difficulty: 'Hard', topic: 'Heap', subtopic: 'Divide & Conquer', officialUrl: 'https://leetcode.com/problems/merge-k-sorted-lists/', acceptanceRate: 51.9, companies: ['Google', 'Microsoft', 'Uber'], status: 'Unsolved' },
  { id: 'p15', title: 'Trapping Rain Water', slug: 'trapping-rain-water', platform: 'LeetCode', difficulty: 'Hard', topic: 'Arrays', subtopic: 'Two Pointers', officialUrl: 'https://leetcode.com/problems/trapping-rain-water/', acceptanceRate: 61.3, companies: ['Google', 'Amazon'], status: 'Unsolved' },
];

export const DSA_TOPICS: DSATopic[] = [
  { id: 't1', title: 'Arrays & Hashing', description: 'Vectors, HashMaps, Frequency Counting, Two Pointers', progressPercent: 90, totalProblems: 30, solvedProblems: 27, confidenceScore: 92, recommendedStatus: 'Strong' },
  { id: 't2', title: 'Strings', description: 'String Manipulation, Pattern Matching, Sliding Window', progressPercent: 85, totalProblems: 20, solvedProblems: 17, confidenceScore: 88, recommendedStatus: 'Strong' },
  { id: 't3', title: 'Two Pointers & Sliding Window', description: 'Fast/Slow Pointers, Dynamic Window, Subarray Problems', progressPercent: 75, totalProblems: 20, solvedProblems: 15, confidenceScore: 78, recommendedStatus: 'Strong' },
  { id: 't4', title: 'Recursion & Backtracking', description: 'Base Cases, Call Stack, Permutations, N-Queens, Subsets', progressPercent: 35, totalProblems: 25, solvedProblems: 9, confidenceScore: 40, recommendedStatus: 'Needs Review' },
  { id: 't5', title: 'Binary Search', description: 'Search Space Reduction, Monotonic Functions', progressPercent: 70, totalProblems: 15, solvedProblems: 11, confidenceScore: 75, recommendedStatus: 'Strong' },
  { id: 't6', title: 'Linked Lists', description: 'Single/Double Linked Lists, Fast & Slow Pointer, Cycle Detection', progressPercent: 80, totalProblems: 15, solvedProblems: 12, confidenceScore: 82, recommendedStatus: 'Strong' },
  { id: 't7', title: 'Stacks & Queues', description: 'Monotonic Stack, Expression Parsing, Sliding Window Max', progressPercent: 65, totalProblems: 15, solvedProblems: 10, confidenceScore: 70, recommendedStatus: 'Strong' },
  { id: 't8', title: 'Trees & BST', description: 'DFS, BFS, Traversals, Height, Balanced BSTs', progressPercent: 60, totalProblems: 30, solvedProblems: 18, confidenceScore: 65, recommendedStatus: 'Strong' },
  { id: 't9', title: 'Graphs', description: 'BFS, DFS, Dijkstra, Topological Sort, Disjoint Set Union (DSU)', progressPercent: 40, totalProblems: 25, solvedProblems: 10, confidenceScore: 45, recommendedStatus: 'Needs Review' },
  { id: 't10', title: 'Dynamic Programming', description: 'Memoization, Tabulation, 1D/2D DP, Knapsack, LIS, LCS', progressPercent: 20, totalProblems: 35, solvedProblems: 7, confidenceScore: 25, recommendedStatus: 'Needs Review' },
];

export const LANGUAGE_HUB: LanguageHubItem[] = [
  {
    id: 'C++',
    name: 'C++',
    tagline: 'The gold standard for Competitive Programming & Performance Systems',
    description: 'C++ provides direct hardware access, high performance, and rich STL data structures making it the preferred language for DSA interviews and CP.',
    careerUses: ['Competitive Programming', 'Game Engines', 'System Software', 'Financial High Frequency Trading'],
    strategyPhases: [
      { phase: 1, title: 'C++ Fundamentals', desc: 'Syntax, pointers, references, dynamic memory, structs, functions.' },
      { phase: 2, title: 'STL Mastery', desc: 'std::vector, std::map, std::unordered_map, std::priority_queue, algorithms.' },
      { phase: 3, title: 'DSA in C++', desc: 'Pointers, Linked Lists, Trees, Dynamic Allocation, Recursion.' },
      { phase: 4, title: 'Advanced CP Techniques', desc: 'Fast I/O, Bit manipulation, Segment Trees, Graph algorithms.' },
    ],
    keyTopics: ['Pointers & References', 'RAII & Memory Management', 'STL Containers & Iterators', 'Templates & Generic Programming'],
    commonMistakes: ['Dangling Pointers & Memory Leaks', 'Out of bounds vector indexing', 'Passing heavy objects by value instead of const reference'],
    documentationUrl: 'https://en.cppreference.com/w/',
    quizzes: [
      {
        id: 'q_cpp_1',
        question: 'Which STL container provides O(1) average time complexity for key lookups?',
        options: ['std::map', 'std::unordered_map', 'std::vector', 'std::set'],
        correctAnswer: 1,
        explanation: 'std::unordered_map is implemented using Hash Tables, offering O(1) average lookup time compared to std::map which uses Red-Black Trees O(log N).'
      },
      {
        id: 'q_cpp_2',
        question: 'What happens when you pass a large vector to a function without using reference (`&`)?',
        options: ['Compiler Error', 'Vector is passed as a pointer automatically', 'Deep copy of the entire vector is created', 'Undefined behavior'],
        correctAnswer: 2,
        explanation: 'In C++, variables are passed by value by default, so a complete deep copy of all vector elements occurs, causing extra time and memory overhead.'
      }
    ]
  },
  {
    id: 'Python',
    name: 'Python',
    tagline: 'Versatile, readable & the backbone of Artificial Intelligence & Data Science',
    description: 'Python is known for clean syntax, massive package ecosystem, and rapid prototyping capabilities across AI, ML, Web Backend, and Scripting.',
    careerUses: ['Artificial Intelligence & ML', 'Data Engineering', 'Web Backend (Django/FastAPI)', 'Automation & Scripting'],
    strategyPhases: [
      { phase: 1, title: 'Python Basics', desc: 'Lists, Dicts, Tuples, Sets, List Comprehensions, Lambda Functions.' },
      { phase: 2, title: 'OOP & Modules', desc: 'Classes, Dunder methods, Decorators, Generators, Asyncio.' },
      { phase: 3, title: 'Data Structures in Python', desc: 'collections.deque, heapq, bisect, dict internals.' },
      { phase: 4, title: 'AI & Web Ecosystem', desc: 'NumPy, Pandas, PyTorch, FastAPI, PyTest.' },
    ],
    keyTopics: ['List & Dict Comprehensions', 'Generators & Yield', 'GIL (Global Interpreter Lock)', 'Decorators & Context Managers'],
    commonMistakes: ['Mutable default arguments in functions', 'Misunderstanding shallow vs deep copy', 'Using `+` string concatenation in loops instead of `.join()`'],
    documentationUrl: 'https://docs.python.org/3/',
    quizzes: [
      {
        id: 'q_py_1',
        question: 'What is the output of `def func(a, L=[]): L.append(a); return L` when called multiple times?',
        options: ['Returns a fresh list each time', 'Accumulates elements in the same list across calls', 'Throws SyntaxError', 'Returns None'],
        correctAnswer: 1,
        explanation: 'Default arguments in Python are evaluated once at function definition time, so mutable default arguments like lists persist state across function calls.'
      }
    ]
  },
  {
    id: 'Java',
    name: 'Java',
    tagline: 'Enterprise backbone, Android development & Robust Object-Oriented Architecture',
    description: 'Java powers enterprise backends, banking applications, and legacy system architectures with strict OOP rules and the Java Virtual Machine.',
    careerUses: ['Enterprise Software', 'Backend Systems (Spring Boot)', 'Android App Development', 'Fintech Infrastructure'],
    strategyPhases: [
      { phase: 1, title: 'Java Fundamentals', desc: 'Variables, Loops, Classes, Objects, Access Modifiers, Interfaces.' },
      { phase: 2, title: 'Collections Framework', desc: 'ArrayList, HashMap, PriorityQueue, HashSet, Comparable/Comparator.' },
      { phase: 3, title: 'Multithreading & JVM', desc: 'Garbage Collection, JVM Memory Model, Threads, ExecutorService.' },
    ],
    keyTopics: ['JVM Architecture & GC', 'Java Collections Framework', 'Generics & Wildcards', 'Streams API & Functional Interfaces'],
    commonMistakes: ['Using `==` for String comparison instead of `.equals()`', 'Ignoring NullPointerExceptions', 'Creating unnecessary objects in tight loops'],
    documentationUrl: 'https://docs.oracle.com/en/java/',
    quizzes: [
      {
        id: 'q_java_1',
        question: 'Why should you use `.equals()` instead of `==` to compare two Strings in Java?',
        options: ['`==` compares object references, while `.equals()` compares string content', '`==` is slower than `.equals()`', '`==` causes compiler error on strings', 'There is no difference'],
        correctAnswer: 0,
        explanation: '`==` checks if two references point to the exact same object in memory, while `.equals()` checks string content equality.'
      }
    ]
  },
  {
    id: 'JavaScript',
    name: 'JavaScript',
    tagline: 'The universal language of the Web (Frontend & Node.js Backend)',
    description: 'JavaScript runs natively in every web browser and powers modern single page applications, Node.js servers, and cross-platform desktop/mobile apps.',
    careerUses: ['Frontend Web Development (React/Next.js)', 'Backend Development (Node.js/Express)', 'Full Stack Engineering'],
    strategyPhases: [
      { phase: 1, title: 'JS Core & ES6+', desc: 'DOM, Event Loop, Promises, Async/Await, Closures, Destructuring.' },
      { phase: 2, title: 'Browser APIs & Async JS', desc: 'Fetch API, Event Bubbling, Prototypes, LocalStorage.' },
      { phase: 3, title: 'Framework Ecosystem', desc: 'React, Next.js, State Management, Node.js API development.' },
    ],
    keyTopics: ['Event Loop & Microtask Queue', 'Closures & Scope Chain', 'Prototypes & Inheritance', 'Promises & Async/Await'],
    commonMistakes: ['Misunderstanding `this` context', 'Not handling asynchronous errors in try/catch', 'Callback hell'],
    documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
    quizzes: [
      {
        id: 'q_js_1',
        question: 'What is a Closure in JavaScript?',
        options: ['A function bundled with references to its surrounding lexical environment', 'A method to close browser windows', 'A private class method', 'An object destructor'],
        correctAnswer: 0,
        explanation: 'A closure gives a function access to its outer scope lexical environment even after the outer function has returned.'
      }
    ]
  },
  {
    id: 'TypeScript',
    name: 'TypeScript',
    tagline: 'Typed JavaScript at Scale for modern enterprise applications',
    description: 'TypeScript adds static type definitions to JavaScript, catching bugs early during compile time and enabling seamless IDE autocomplete and refactoring.',
    careerUses: ['Full Stack Web Development', 'Large Scale Frontend Apps', 'Node.js Enterprise Services'],
    strategyPhases: [
      { phase: 1, title: 'Types & Interfaces', desc: 'Primitives, Unions, Intersections, Type Aliases, Generics.' },
      { phase: 2, title: 'Advanced Types', desc: 'Mapped Types, Conditional Types, Utility Types (Partial, Pick, Omit).' },
    ],
    keyTopics: ['Generics', 'Utility Types', 'Type Narrowing & Guards', 'Strict Null Checks'],
    commonMistakes: ['Overusing `any`', 'Confusing `interface` vs `type`', 'Not using strict mode in tsconfig'],
    documentationUrl: 'https://www.typescriptlang.org/docs/',
    quizzes: [
      {
        id: 'q_ts_1',
        question: 'What is the main benefit of TypeScript over plain JavaScript?',
        options: ['Faster runtime execution', 'Static type checking at compile time to catch errors early', 'Requires less memory', 'Runs directly in browsers without compilation'],
        correctAnswer: 1,
        explanation: 'TypeScript compiles down to JavaScript; its primary advantage is catching type mismatches and syntax errors during development.'
      }
    ]
  },
  {
    id: 'Go',
    name: 'Go (Golang)',
    tagline: 'High-performance cloud-native microservices & concurrency',
    description: 'Created by Google, Go is designed for fast compilation, simple syntax, high concurrency via Goroutines, and building cloud infrastructure like Docker and Kubernetes.',
    careerUses: ['Cloud Infrastructure (Kubernetes, Docker)', 'Microservices Architecture', 'DevOps Tooling', 'High-throughput APIs'],
    strategyPhases: [
      { phase: 1, title: 'Go Basics', desc: 'Syntax, Structs, Interfaces, Packages, Error handling.' },
      { phase: 2, title: 'Concurrency', desc: 'Goroutines, Channels, Select, Mutexes, Context.' },
    ],
    keyTopics: ['Goroutines & Channels', 'Interfaces & Implicit Composition', 'Error Handling Pattern', 'Memory Management & Garbage Collector'],
    commonMistakes: ['Goroutine leaks', 'Modifying slices while iterating', 'Ignoring returned error values'],
    documentationUrl: 'https://go.dev/doc/',
    quizzes: [
      {
        id: 'q_go_1',
        question: 'How does Go handle concurrency lightweight threads?',
        options: ['OS Threads', 'Goroutines managed by the Go runtime', 'Web Workers', 'Subprocesses'],
        correctAnswer: 1,
        explanation: 'Goroutines are lightweight threads managed by Go runtime scheduler, using minimal initial stack memory (around 2KB).'
      }
    ]
  },
  {
    id: 'Rust',
    name: 'Rust',
    tagline: 'Empowering everyone to build reliable and efficient software',
    description: 'Rust guarantees memory safety without a garbage collector through its revolutionary Ownership and Borrow Checker model, powering OS components and webassembly.',
    careerUses: ['System Programming', 'WebAssembly', 'Blockchain Infrastructure', 'High Security Services'],
    strategyPhases: [
      { phase: 1, title: 'Ownership & Borrowing', desc: 'Ownership, References, Mutability, Lifetimes.' },
      { phase: 2, title: 'Rust Ecosystem', desc: 'Cargo, Traits, Enums & Option/Result, Tokio Async.' },
    ],
    keyTopics: ['Ownership Rules', 'Borrow Checker & Lifetimes', 'Traits & Generics', 'Zero-cost Abstractions'],
    commonMistakes: ['Fighting the borrow checker', 'Unnecessary clones', 'Unwrap over-usage'],
    documentationUrl: 'https://doc.rust-lang.org/book/',
    quizzes: [
      {
        id: 'q_rust_1',
        question: 'How does Rust achieve memory safety without a Garbage Collector?',
        options: ['Reference Counting on all objects', 'Compile-time Ownership and Borrow Checker system', 'Automatic C free calls injection', 'Hardware locks'],
        correctAnswer: 1,
        explanation: 'Rust enforces memory safety at compile time using strict ownership rules and the borrow checker.'
      }
    ]
  },
  {
    id: 'Kotlin',
    name: 'Kotlin',
    tagline: 'Modern, concise, and safe programming language for Android and Multiplatform',
    description: 'Official preferred language for Android app development by Google, fully interoperable with Java.',
    careerUses: ['Android Mobile Apps', 'Backend Services (Ktor, Spring)', 'Multiplatform Mobile'],
    strategyPhases: [
      { phase: 1, title: 'Kotlin Basics', desc: 'Null safety, Val vs Var, Extension Functions, Coroutines.' },
    ],
    keyTopics: ['Null Safety (`?`, `?:`)', 'Coroutines', 'Extension Functions', 'Data Classes'],
    commonMistakes: ['Overusing `!!` non-null assertion', 'Not utilizing data classes'],
    documentationUrl: 'https://kotlinlang.org/docs/home.html',
    quizzes: [
      {
        id: 'q_kt_1',
        question: 'What is the Elvis operator `?:` in Kotlin used for?',
        options: ['Elvis Presley tribute', 'Providing a default fallback value if an expression is null', 'Ternary condition', 'Elvis string format'],
        correctAnswer: 1,
        explanation: 'The Elvis operator `a ?: b` evaluates `a`, and if `a` is not null returns `a`, otherwise returns `b`.'
      }
    ]
  },
  {
    id: 'C',
    name: 'C',
    tagline: 'The foundational language powering operating systems and hardware drivers',
    description: 'The foundation of modern computing. Learning C builds fundamental understanding of memory addresses, stack/heap, and system execution.',
    careerUses: ['Embedded Systems', 'Operating System Kernels', 'Database Engines', 'Hardware Drivers'],
    strategyPhases: [
      { phase: 1, title: 'C Fundamentals', desc: 'Pointers, Memory allocation (`malloc`, `free`), Structs, Header files.' },
    ],
    keyTopics: ['Pointers & Addresses', 'Dynamic Memory Management', 'Structs & Unions', 'Preprocessors & Macros'],
    commonMistakes: ['Buffer overflows', 'Memory leaks from un-freed pointers', 'Use-after-free errors'],
    documentationUrl: 'https://en.cppreference.com/w/c',
    quizzes: [
      {
        id: 'q_c_1',
        question: 'Which C standard library function allocates memory on the heap?',
        options: ['alloc()', 'malloc()', 'heap_allocate()', 'new'],
        correctAnswer: 1,
        explanation: '`malloc(size_t size)` allocates the requested memory size on the heap and returns a void pointer to it.'
      }
    ]
  }
];

export const MOCK_ROADMAPS: Roadmap[] = [
  {
    id: 'rm_swe',
    title: 'Software Engineer Roadmap',
    careerGoal: 'Software Engineer',
    description: 'Comprehensive industry path to master Computer Science fundamentals, Data Structures & Algorithms, Object-Oriented Design, and System Architecture.',
    overallProgressPercent: 54,
    nodes: [
      {
        id: 'n_swe_1',
        title: 'Programming Fundamentals',
        description: 'Variables, Control Flow, Functions, Memory Layout, Arrays & Strings.',
        category: 'Fundamentals',
        status: 'Mastered',
        resources: [{ name: 'C++ Crash Course', url: 'https://en.cppreference.com', type: 'Doc' }]
      },
      {
        id: 'n_swe_2',
        title: 'Data Structures & Algorithms',
        description: 'Arrays, Trees, Graphs, Sorting, Binary Search, Dynamic Programming.',
        category: 'DSA',
        status: 'Learning',
        resources: [{ name: 'LeetCode Problem Hub', url: 'https://leetcode.com', type: 'Article' }]
      },
      {
        id: 'n_swe_3',
        title: 'Object-Oriented Programming (OOP)',
        description: 'Encapsulation, Inheritance, Polymorphism, Abstraction, SOLID Principles.',
        category: 'Core CS',
        status: 'Strong',
        resources: [{ name: 'Refactoring Guru - Design Patterns', url: 'https://refactoring.guru', type: 'Doc' }]
      },
      {
        id: 'n_swe_4',
        title: 'Database Management Systems (DBMS)',
        description: 'Relational Model, SQL, Indexing, Transactions, ACID Properties, Normalization.',
        category: 'Core CS',
        status: 'Started',
        resources: [{ name: 'Use The Index, Luke!', url: 'https://use-the-index-luke.com', type: 'Doc' }]
      },
      {
        id: 'n_swe_5',
        title: 'Operating Systems',
        description: 'Processes, Threads, Concurrency, Deadlocks, Virtual Memory, System Calls.',
        category: 'Core CS',
        status: 'Locked',
        resources: [{ name: 'OSTEP Book', url: 'https://pages.cs.wisc.edu/~remzi/OSTEP/', type: 'Doc' }]
      },
      {
        id: 'n_swe_6',
        title: 'Computer Networks',
        description: 'OSI Model, TCP/IP, HTTP/HTTPS, DNS, Sockets, Load Balancing.',
        category: 'Core CS',
        status: 'Locked',
        resources: [{ name: 'Computer Networking - Top Down Approach', url: 'https://kurose.com', type: 'Doc' }]
      },
      {
        id: 'n_swe_7',
        title: 'System Design Basics',
        description: 'Scalability, Caching, Load Balancers, Sharding, Message Queues, Microservices.',
        category: 'Advanced',
        status: 'Locked',
        resources: [{ name: 'System Design Primer', url: 'https://github.com/donnemartin/system-design-primer', type: 'Article' }]
      }
    ]
  },
  {
    id: 'rm_fullstack',
    title: 'Full Stack Web Developer Roadmap',
    careerGoal: 'Full Stack Developer',
    description: 'From HTML/CSS basics to building scalable modern React/Next.js applications and Node.js microservices with PostgreSQL & Redis.',
    overallProgressPercent: 68,
    nodes: [
      { id: 'n_fs_1', title: 'HTML, CSS & Tailwind CSS', description: 'Semantic HTML5, Flexbox, Grid, Responsive Design.', category: 'Fundamentals', status: 'Mastered', resources: [] },
      { id: 'n_fs_2', title: 'JavaScript ES6+ & TypeScript', description: 'Async/Await, Closures, Types, Generics.', category: 'Fundamentals', status: 'Mastered', resources: [] },
      { id: 'n_fs_3', title: 'React & Next.js App Router', description: 'Hooks, Server Components, State Management, SSR.', category: 'Development', status: 'Strong', resources: [] },
      { id: 'n_fs_4', title: 'Node.js, Express & REST APIs', description: 'Middleware, Routing, Auth (JWT/OAuth), Validation.', category: 'Development', status: 'Strong', resources: [] },
      { id: 'n_fs_5', title: 'PostgreSQL, Prisma & Redis', description: 'Database design, ORM queries, Caching layer.', category: 'Development', status: 'Learning', resources: [] },
      { id: 'n_fs_6', title: 'DevOps & Docker Deployment', description: 'CI/CD Pipelines, Dockerizing apps, Vercel/AWS.', category: 'Advanced', status: 'Started', resources: [] },
    ]
  },
  {
    id: 'rm_ai',
    title: 'AI & Machine Learning Engineer Roadmap',
    careerGoal: 'AI Engineer',
    description: 'Master Linear Algebra, Calculus, Python, PyTorch, Deep Learning, Transformer Architectures & LLM Fine-Tuning.',
    overallProgressPercent: 30,
    nodes: [
      { id: 'n_ai_1', title: 'Python & Mathematics for ML', description: 'Linear Algebra, Probability, Calculus, NumPy, Pandas.', category: 'Fundamentals', status: 'Mastered', resources: [] },
      { id: 'n_ai_2', title: 'Supervised & Unsupervised ML', description: 'Scikit-Learn, Regression, Decision Trees, SVM, Clustering.', category: 'Core CS', status: 'Strong', resources: [] },
      { id: 'n_ai_3', title: 'Deep Learning with PyTorch', description: 'Neural Networks, Backpropagation, CNNs, RNNs.', category: 'Development', status: 'Started', resources: [] },
      { id: 'n_ai_4', title: 'LLMs & Transformer Models', description: 'Attention Mechanisms, HuggingFace, RAG, Fine-tuning.', category: 'Advanced', status: 'Locked', resources: [] },
    ]
  }
];

export const DAILY_QUESTS: DailyQuest[] = [
  { id: 'dq1', title: 'Problem Solver', description: 'Solve at least 1 coding problem on any connected platform', target: 1, current: 1, unit: 'problem', xpReward: 100, completed: true },
  { id: 'dq2', title: 'Focused Learner', description: 'Log at least 30 minutes of active study time today', target: 30, current: 45, unit: 'mins', xpReward: 75, completed: true },
  { id: 'dq3', title: 'Roadmap Voyager', description: 'Complete or revise 1 topic in your career roadmap', target: 1, current: 1, unit: 'topic', xpReward: 50, completed: true },
  { id: 'dq4', title: 'Quiz Whiz', description: 'Take a programming language quiz in the Knowledge Hub', target: 1, current: 0, unit: 'quiz', xpReward: 50, completed: false },
];

export const WEEKLY_QUESTS: WeeklyQuest[] = [
  { id: 'wq1', title: 'Weekly Grinder', description: 'Solve 10 coding problems across platforms', target: 10, current: 8, unit: 'problems', xpReward: 300, completed: false },
  { id: 'wq2', title: 'Marathon Student', description: 'Accumulate 10 hours of study time this week', target: 600, current: 450, unit: 'mins', xpReward: 250, completed: false },
  { id: 'wq3', title: 'GitHub Builder', description: 'Push commits or code updates to a GitHub repository', target: 5, current: 3, unit: 'commits', xpReward: 200, completed: false },
];

export const MOCK_FRIENDS: Friend[] = [
  { id: 'fr1', name: 'Sophia Patel', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150', college: 'MIT', streak: 28, xp: 3420, level: 16, levelTitle: 'Algorithm Architect', problemsSolved: 310, isFriend: true },
  { id: 'fr2', name: 'Marcus Vance', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150', college: 'Stanford University', streak: 12, xp: 2150, level: 11, levelTitle: 'Code Explorer', problemsSolved: 195, isFriend: true },
  { id: 'fr3', name: 'Devon Wright', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150', college: 'UC Berkeley', streak: 45, xp: 5890, level: 24, levelTitle: 'Problem Slayer', problemsSolved: 480, isFriend: true },
  { id: 'fr4', name: 'Aaliyah Khan', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150', college: 'Carnegie Mellon', streak: 7, xp: 1850, level: 9, levelTitle: 'Learner', problemsSolved: 130, isFriend: false },
];

export const MOCK_PROJECTS: Project[] = [
  {
    id: 'proj_1',
    title: 'StudentOS Dashboard App',
    description: 'All-in-one developer productivity platform with gamified learning, roadmaps, and coding platform sync.',
    techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Prisma'],
    githubUrl: 'https://github.com/alexchen-dev/studentos',
    progressPercent: 75,
    tasks: [
      { id: 'pt1', title: 'Design Landing & Onboarding UI', status: 'Completed' },
      { id: 'pt2', title: 'Implement Universal Streak & Gamification Engine', status: 'Completed' },
      { id: 'pt3', title: 'Problem Explorer with platform filtering', status: 'Completed' },
      { id: 'pt4', title: 'AI Mentor Assistant integration', status: 'In Progress' },
      { id: 'pt5', title: 'Deploy on Vercel', status: 'Not Started' },
    ],
    notes: 'Remember to optimize Tailwind bundle size and check dark mode styling.'
  },
  {
    id: 'proj_2',
    title: 'CodeSync - Collaborative Realtime Code Editor',
    description: 'Real-time pair programming IDE powered by WebSockets, Monaco Editor, and Docker sandboxes.',
    techStack: ['Node.js', 'Socket.io', 'Monaco Editor', 'Docker', 'Redis'],
    githubUrl: 'https://github.com/alexchen-dev/codesync',
    progressPercent: 40,
    tasks: [
      { id: 'pt2_1', title: 'WebSocket operational transformation setup', status: 'Completed' },
      { id: 'pt2_2', title: 'Code execution container runner', status: 'In Progress' },
      { id: 'pt2_3', title: 'User permissions and room sharing', status: 'Not Started' },
    ],
  }
];

export const MOCK_NOTES: PersonalNote[] = [
  {
    id: 'note_1',
    title: 'Dynamic Programming Memoization vs Tabulation',
    content: 'Memoization is Top-Down (Recursion + Hash/Array cache). Tabulation is Bottom-Up (Iterative array filling). Always check base cases first!',
    tags: ['DSA', 'Dynamic Programming', 'Revision'],
    attachedToType: 'Topic',
    attachedToId: 't10',
    updatedAt: '2026-09-06'
  },
  {
    id: 'note_2',
    title: 'Two Sum - Hash Map Trick O(N)',
    content: 'Store target - current_val in map as you iterate. Check if complement exists before inserting!',
    tags: ['LeetCode', 'Arrays', 'Interview Prep'],
    attachedToType: 'Problem',
    attachedToId: 'p1',
    updatedAt: '2026-09-08'
  }
];

export const MOCK_BOOKMARKS: Bookmark[] = [
  { id: 'bm1', title: 'NeetCode 150 Roadmap', url: 'https://neetcode.io/roadmap', category: 'Important', type: 'Article' },
  { id: 'bm2', title: 'C++ Vector Optimization Tricks', url: 'https://en.cppreference.com/w/cpp/container/vector', category: 'Study Later', type: 'Documentation' },
  { id: 'bm3', title: 'System Design Primer by Donne Martin', url: 'https://github.com/donnemartin/system-design-primer', category: 'Interview', type: 'Article' },
];

export const MOCK_CAREER_REPORT: CareerReadinessReport = {
  scorePercent: 68,
  targetRole: 'Software Engineer',
  strengths: ['Arrays & Hashing (92%)', 'Object-Oriented Programming', 'React / Next.js', 'Consistent Streak (15 days)'],
  weakAreas: ['Dynamic Programming (25%)', 'Recursion & Backtracking (40%)', 'Operating Systems Concepts', 'System Design'],
  recommendedNextStep: 'Complete Recursion and Memoization modules before attempting 2D Dynamic Programming problems.',
  topicBreakdown: [
    { topic: 'Arrays & Strings', score: 90 },
    { topic: 'Data Structures (Trees/Lists)', score: 75 },
    { topic: 'Algorithms & DP', score: 32 },
    { topic: 'Core CS (OOP/DBMS)', score: 65 },
    { topic: 'System Design', score: 20 },
  ]
};

export const MOCK_ADMIN_STATS: AdminStats = {
  totalUsers: 14250,
  newUsersToday: 184,
  dailyActiveUsers: 3840,
  weeklyActiveUsers: 9210,
  monthlyActiveUsers: 12400,
  avgSessionTimeMinutes: 42,
  topLanguages: [
    { language: 'C++', count: 6820 },
    { language: 'Python', count: 5120 },
    { language: 'Java', count: 3450 },
    { language: 'JavaScript', count: 2980 },
    { language: 'Go', count: 840 },
  ],
  topRoadmaps: [
    { roadmap: 'Software Engineer', count: 7420 },
    { roadmap: 'Full Stack Developer', count: 3890 },
    { roadmap: 'AI / Machine Learning', count: 2150 },
    { roadmap: 'Backend Developer', count: 1850 },
  ],
  topSolvedTopics: [
    { topic: 'Arrays & Hashing', count: 48200 },
    { topic: 'Strings', count: 32100 },
    { topic: 'Trees & BST', count: 19800 },
    { topic: 'Dynamic Programming', count: 12400 },
  ],
  retentionRatePercent: 84.5
};
