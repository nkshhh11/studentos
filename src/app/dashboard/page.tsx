'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useStudentOS } from '../../context/StudentOSContext';
import {
  Flame,
  Zap,
  Code2,
  Clock,
  Target,
  AlertTriangle,
  ArrowUpRight,
  CheckCircle2,
  Play,
  Bot,
  Sparkles,
  Award,
  Plus,
  Link2,
} from 'lucide-react';

export default function DashboardPage() {
  const {
    user,
    streak,
    gamification,
    dailyQuests,
    dsaTopics,
    problems,
    roadmaps,
    useStreakFreeze,
    claimQuest,
    logStudyTime,
    isAuthenticated,
    requireAuth,
  } = useStudentOS();

  const [logTimeMinutes, setLogTimeMinutes] = useState(30);
  const [showLogModal, setShowLogModal] = useState(false);

  // Determine if user has solved enough problems for weak area diagnostic
  const totalSolvedCount = gamification.totalProblemsSolved || problems.filter((p) => p.status === 'Solved').length;
  const hasDiagnosticData = totalSolvedCount > 0;
  const weakTopic = hasDiagnosticData
    ? [...dsaTopics].sort((a, b) => a.confidenceScore - b.confidenceScore)[0]
    : null;

  // Active goal tracking
  const activeRoadmap = roadmaps.find((r) => r.overallProgressPercent > 0);
  const hasActiveGoal = Boolean(activeRoadmap || user?.careerGoal);
  const activeGoalTitle = activeRoadmap
    ? activeRoadmap.title
    : user?.careerGoal
    ? `Master ${user.careerGoal} Core Concepts`
    : 'No active goal yet';
  const activeGoalProgress = activeRoadmap ? activeRoadmap.overallProgressPercent : 0;

  // Connected profiles
  const connectedAccounts = (user?.connectedAccounts || []).filter((acc) => acc.connected);

  // Compute dynamic quest state
  const computedQuests = dailyQuests.map((q) => {
    let current = q.current;
    if (q.id === 'dq1') current = gamification.problemsSolvedToday;
    if (q.id === 'dq2') current = gamification.studyTimeTodayMinutes;
    if (q.id === 'dq3') {
      current = roadmaps.flatMap((r) => r.nodes).filter((n) => n.status === 'Mastered' || n.status === 'Strong').length;
    }
    const completed = current >= q.target;
    return { ...q, current, completed };
  });

  const handleLogTimeClick = () => {
    requireAuth(() => {
      setShowLogModal(true);
    }, 'Sign in to log your study sessions and track your daily effort.');
  };

  const handleLogTime = () => {
    logStudyTime(Number(logTimeMinutes));
    setShowLogModal(false);
  };

  const handleSolveDailyClick = (e: React.MouseEvent) => {
    if (!isAuthenticated) {
      e.preventDefault();
      requireAuth(() => {}, 'Sign in to solve daily DSA problems and earn XP.');
    }
  };

  const handleClaimQuest = (questId: string) => {
    requireAuth(() => {
      claimQuest(questId);
    }, 'Sign in to claim your quest rewards and gain level XP.');
  };

  const handleStreakFreeze = () => {
    requireAuth(() => {
      useStreakFreeze();
    }, 'Sign in to protect your streak with streak freezes.');
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-zinc-900 via-zinc-900 to-indigo-950/40 border border-zinc-800/90 p-5 sm:p-7 flex flex-col md:flex-row md:items-center justify-between gap-5 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded-full border border-indigo-500/20">
              <Sparkles className="w-3 h-3" /> Student Command Center
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-zinc-100 tracking-tight">
            {user ? `Welcome back, ${user.name}` : 'Welcome to StudentOS'}
          </h1>
          <p className="text-xs text-zinc-400 max-w-xl leading-relaxed">
            {user ? (
              <>Target Goal: <strong className="text-zinc-200 font-semibold">{user.careerGoal || 'Software Engineer'}</strong> • {user.college || 'Engineering Student'}</>
            ) : (
              'Organize your student life, track tasks, DSA practice, skill tree roadmaps, and career prep.'
            )}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/problems"
            onClick={handleSolveDailyClick}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl transition-all shadow-lg shadow-indigo-600/20 active:scale-95"
          >
            <Play className="w-4 h-4 fill-current" /> Solve Daily Problem
          </Link>
          <button
            onClick={handleLogTimeClick}
            className="flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 font-semibold text-xs px-4 py-2.5 rounded-xl border border-zinc-800 transition-all cursor-pointer shadow-xs active:scale-95"
          >
            <Clock className="w-4 h-4 text-zinc-400" /> Log Time
          </button>
        </div>
      </div>

      {/* Core Metrics Grid (6 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Universal Streak */}
        <div className="p-5 rounded-2xl bg-zinc-900/90 border border-zinc-800/80 shadow-md hover:border-zinc-700 transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Universal Streak</span>
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
              <Flame className="w-4 h-4 text-amber-500 fill-amber-500/20" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-zinc-100">{streak.currentStreak}</span>
            <span className="text-xs text-zinc-400 font-semibold">Active Days</span>
          </div>
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-zinc-800/60 text-xs text-zinc-400">
            <span>Best: <strong className="text-zinc-200 font-medium">{streak.bestStreak}d</strong></span>
            {streak.streakFreezes > 0 ? (
              <button
                onClick={handleStreakFreeze}
                className="text-[11px] bg-zinc-800 text-amber-300 px-2 py-0.5 rounded-lg border border-zinc-700 hover:bg-zinc-700 cursor-pointer font-medium"
              >
                Use Freeze (❄️ {streak.streakFreezes})
              </button>
            ) : (
              <span className="text-[11px] text-zinc-500">0 Freezes</span>
            )}
          </div>
        </div>

        {/* Coding Solved */}
        <div className="p-5 rounded-2xl bg-zinc-900/90 border border-zinc-800/80 shadow-md hover:border-zinc-700 transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Coding Solved</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
              <Code2 className="w-4 h-4 text-emerald-500" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-zinc-100">{gamification.problemsSolvedToday}</span>
            <span className="text-xs text-zinc-400 font-semibold">Today</span>
            <span className="text-xs text-emerald-400 ml-auto font-semibold">+{gamification.problemsSolvedThisWeek} this week</span>
          </div>
          <div className="mt-3 pt-3 border-t border-zinc-800/60 text-xs text-zinc-400 flex justify-between">
            <span>Total Solved Across Library:</span>
            <span className="text-zinc-200 font-bold">{gamification.totalProblemsSolved}</span>
          </div>
        </div>

        {/* Study Time */}
        <div className="p-5 rounded-2xl bg-zinc-900/90 border border-zinc-800/80 shadow-md hover:border-zinc-700 transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Study Time</span>
            <div className="w-8 h-8 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
              <Clock className="w-4 h-4 text-blue-400" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-zinc-100">
              {`${Math.floor(gamification.studyTimeTodayMinutes / 60)}h ${gamification.studyTimeTodayMinutes % 60}m`}
            </span>
            <span className="text-xs text-zinc-400 font-semibold">Today</span>
          </div>
          <div className="mt-3 pt-3 border-t border-zinc-800/60 text-xs text-zinc-400 flex justify-between">
            <span>Weekly Allocation Total:</span>
            <span className="text-zinc-200 font-bold">
              {`${Math.floor(gamification.studyTimeWeekMinutes / 60)}h ${gamification.studyTimeWeekMinutes % 60}m`}
            </span>
          </div>
        </div>

        {/* Active Goal */}
        <div className="p-5 rounded-2xl bg-zinc-900/90 border border-zinc-800/80 shadow-md hover:border-zinc-700 transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Active Goal</span>
            <div className="w-8 h-8 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
              <Target className="w-4 h-4 text-purple-400" />
            </div>
          </div>
          <div className="text-sm font-bold text-zinc-100 truncate">
            {hasActiveGoal ? activeGoalTitle : 'No active goal yet'}
          </div>
          <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden mt-3 mb-1">
            <div className="bg-gradient-to-r from-purple-500 to-indigo-500 h-full" style={{ width: `${activeGoalProgress}%` }} />
          </div>
          <div className="flex justify-between items-center text-xs text-zinc-400 mt-2">
            <span>Progress: <strong className="text-zinc-200 font-semibold">{activeGoalProgress}%</strong></span>
            <Link href="/roadmaps" className="inline-flex items-center gap-1 text-indigo-400 hover:text-indigo-300 font-bold underline">
              {hasActiveGoal ? 'Continue Roadmap' : 'Create First Goal'}
            </Link>
          </div>
        </div>

        {/* Weak Area Diagnostic */}
        <div className="p-5 rounded-2xl bg-zinc-900/90 border border-zinc-800/80 shadow-md hover:border-zinc-700 transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Weak Area Diagnostic</span>
            <div className="w-8 h-8 rounded-xl bg-rose-500/10 flex items-center justify-center border border-rose-500/20">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
            </div>
          </div>
          {hasDiagnosticData && weakTopic ? (
            <>
              <div className="text-sm font-bold text-zinc-100 truncate">{weakTopic.title}</div>
              <div className="text-xs text-zinc-400 mt-1">Confidence Score: <span className="text-rose-400 font-bold">{weakTopic.confidenceScore}%</span></div>
              <div className="mt-3 pt-2 border-t border-zinc-800/60">
                <Link href="/problems" className="inline-flex items-center gap-1 text-xs text-rose-400 hover:text-rose-300 font-bold">
                  Practice Recommended Problems <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className="text-xs font-medium text-zinc-400 mt-1 leading-relaxed">
                Not enough data yet. Solve problems to get your weak area analysis.
              </div>
              <div className="mt-4 pt-2 border-t border-zinc-800/60">
                <Link href="/problems" className="inline-flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 font-bold">
                  Start Solving Problems <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </>
          )}
        </div>

        {/* Level & Rank */}
        <div className="p-5 rounded-2xl bg-zinc-900/90 border border-zinc-800/80 shadow-md hover:border-zinc-700 transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Gamification Rank</span>
            <div className="w-8 h-8 rounded-xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
              <Award className="w-4 h-4 text-cyan-400" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-zinc-100">Lvl {gamification.level}</span>
            <span className="text-xs text-zinc-400 font-semibold">{gamification.levelTitle}</span>
          </div>
          <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden mt-3 mb-1">
            <div
              className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full"
              style={{ width: `${Math.min(100, (gamification.xp / gamification.nextLevelXp) * 100)}%` }}
            />
          </div>
          <div className="flex justify-between text-[11px] text-zinc-400 mt-1 font-mono">
            <span>{gamification.xp} XP</span>
            <span>Next Rank: {gamification.nextLevelXp} XP</span>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Daily Quests */}
        <div className="lg:col-span-2 space-y-5">
          <div className="p-6 rounded-3xl bg-zinc-900/90 border border-zinc-800/80 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-zinc-100 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-indigo-400" /> Daily Quests & Micro-Tasks
              </h3>
              <Link href="/gamification" className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold">
                View All Rewards
              </Link>
            </div>

            <div className="space-y-2.5">
              {computedQuests.map((quest) => (
                <div
                  key={quest.id}
                  className={`p-3.5 rounded-2xl border flex items-center justify-between transition-all ${
                    quest.completed ? 'bg-emerald-500/5 border-emerald-500/30' : 'bg-zinc-950 border-zinc-800/80'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${
                        quest.completed ? 'bg-emerald-600 text-white' : 'bg-zinc-800 text-zinc-500'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-zinc-200">{quest.title}</div>
                      <div className="text-[11px] text-zinc-400">
                        {quest.description} ({quest.current} / {quest.target} {quest.unit})
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <span className="text-xs text-amber-400 font-mono font-bold">+{quest.xpReward} XP</span>
                    {quest.completed && quest.xpReward > 0 ? (
                      <button
                        onClick={() => handleClaimQuest(quest.id)}
                        className="text-xs bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold px-3 py-1 rounded-xl cursor-pointer shadow-sm transition-all active:scale-95"
                      >
                        Claim XP
                      </button>
                    ) : (
                      <span className="text-[10px] text-zinc-500 font-medium px-2 py-0.5 rounded-lg bg-zinc-900 border border-zinc-800">
                        {quest.completed ? 'Claimed' : 'In Progress'}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Mentor Banner */}
          <div className="p-5 rounded-3xl bg-gradient-to-r from-purple-950/40 via-zinc-900 to-zinc-900 border border-purple-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-300 shrink-0">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-zinc-100">AI SDE Mentor Assistant</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Ask AI Mentor for custom DSA problem hints, code reviews & career roadmap advice.
                </p>
              </div>
            </div>
            <Link
              href="/ai-mentor"
              className="shrink-0 bg-purple-600 hover:bg-purple-500 text-white text-xs font-extrabold px-4 py-2.5 rounded-xl transition-all shadow-md active:scale-95 text-center"
            >
              Ask AI Mentor
            </Link>
          </div>
        </div>

        {/* Connected Platforms */}
        <div className="space-y-5">
          <div className="p-6 rounded-3xl bg-zinc-900/90 border border-zinc-800/80 shadow-md space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-zinc-100">Connected Profiles</h3>
              <Link href="/onboarding" className="text-xs text-indigo-400 hover:text-indigo-300 font-bold">
                Manage
              </Link>
            </div>

            {connectedAccounts.length === 0 ? (
              <div className="p-5 bg-zinc-950 rounded-2xl border border-zinc-800/80 text-center space-y-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mx-auto">
                  <Link2 className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-bold text-zinc-200">No connected profiles yet</div>
                  <p className="text-[11px] text-zinc-400 leading-relaxed">
                    Connect your LeetCode, Codeforces, or GitHub profiles to auto-sync your problem ratings and coding progress.
                  </p>
                </div>
                <Link
                  href="/onboarding"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs rounded-xl shadow-sm transition-all"
                >
                  <Plus className="w-3.5 h-3.5" /> Connect Profiles
                </Link>
              </div>
            ) : (
              <div className="space-y-2.5">
                {connectedAccounts.map((acc) => (
                  <div
                    key={acc.platform}
                    className="p-3 bg-zinc-950 rounded-2xl border border-zinc-800/80 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-zinc-800 flex items-center justify-center text-xs font-bold text-zinc-200 border border-zinc-700">
                        {acc.platform[0]}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-zinc-200">{acc.platform}</div>
                        <div className="text-[10px] text-zinc-400">@{acc.username}</div>
                      </div>
                    </div>

                    <div className="text-right text-xs">
                      {acc.rating && <div className="text-zinc-200 font-bold">{acc.rating} Rating</div>}
                      {acc.problemsSolved !== undefined && <div className="text-[10px] text-zinc-400 font-mono">{acc.problemsSolved} Solved</div>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Log Time Modal */}
      {showLogModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 w-full max-w-sm rounded-3xl p-6 space-y-4 shadow-2xl animate-in fade-in duration-200">
            <h3 className="text-base font-bold text-zinc-100 flex items-center gap-2">
              <Clock className="w-5 h-5 text-emerald-400" /> Log Study Duration
            </h3>
            <div>
              <label className="text-xs text-zinc-400 block mb-1 font-medium">Duration (Minutes)</label>
              <input
                type="number"
                value={logTimeMinutes}
                onChange={(e) => setLogTimeMinutes(Number(e.target.value))}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-zinc-100 focus:outline-none focus:border-emerald-500"
                min={5}
                max={480}
              />
            </div>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setShowLogModal(false)}
                className="flex-1 py-2.5 rounded-xl border border-zinc-800 text-xs font-semibold text-zinc-400 hover:text-zinc-200"
              >
                Cancel
              </button>
              <button
                onClick={handleLogTime}
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs cursor-pointer shadow-md"
              >
                Save Log (+XP)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
