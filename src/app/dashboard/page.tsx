'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useStudentOS } from '../../context/StudentOSContext';
import {
  Flame,
  Zap,
  Award,
  Code2,
  Clock,
  Target,
  AlertTriangle,
  ArrowUpRight,
  CheckCircle2,
  Plus,
  Play,
  Bot,
  ExternalLink,
  BookOpen,
  Sparkles,
} from 'lucide-react';

export default function DashboardPage() {
  const {
    user,
    streak,
    gamification,
    dailyQuests,
    problems,
    dsaTopics,
    useStreakFreeze,
    claimQuest,
    logStudyTime,
  } = useStudentOS();

  const [logTimeMinutes, setLogTimeMinutes] = useState(30);
  const [showLogModal, setShowLogModal] = useState(false);

  // Weak area derived from topics with lowest confidence score
  const weakTopic = [...dsaTopics].sort((a, b) => a.confidenceScore - b.confidenceScore)[0];

  const handleLogTime = () => {
    logStudyTime(Number(logTimeMinutes));
    setShowLogModal(false);
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-zinc-900 via-zinc-900 to-emerald-950/40 border border-zinc-800/80 p-6 sm:p-8">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-1">
              <Sparkles className="w-4 h-4" /> Welcome back, {user.name}
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              One Login. One Dashboard. Your Complete Journey.
            </h1>
            <p className="text-sm text-zinc-400 mt-1 max-w-xl">
              Target Goal: <span className="text-white font-semibold">{user.careerGoal}</span> • {user.college} ({user.year})
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/problems"
              className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg shadow-emerald-500/20 transition-all"
            >
              <Play className="w-4 h-4 fill-black" /> Solve Daily Problem
            </Link>
            <button
              onClick={() => setShowLogModal(true)}
              className="flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 font-semibold text-xs px-4 py-2.5 rounded-xl border border-zinc-800 transition-all cursor-pointer"
            >
              <Clock className="w-4 h-4 text-emerald-400" /> Log Study Time
            </button>
          </div>
        </div>
      </div>

      {/* Top Metrics Cards (6 Core Metrics) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* 1. 🔥 Universal Streak Card */}
        <div className="p-5 rounded-3xl bg-zinc-900/90 border border-zinc-800/80 hover:border-amber-500/30 transition-all relative overflow-hidden group">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">🔥 Universal Streak</span>
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400">
              <Flame className="w-4 h-4 fill-amber-400" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white">{streak.currentStreak}</span>
            <span className="text-xs text-zinc-400">Days Active</span>
          </div>
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-zinc-800/80 text-xs text-zinc-400">
            <span>Best: <strong className="text-zinc-200">{streak.bestStreak} Days</strong></span>
            {streak.streakFreezes > 0 ? (
              <button
                onClick={useStreakFreeze}
                className="text-[11px] bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 px-2 py-0.5 rounded-full border border-amber-500/20 transition-colors"
                title="Protect streak on missed day"
              >
                Use Freeze (❄️ {streak.streakFreezes})
              </button>
            ) : (
              <span className="text-[11px] text-zinc-500">0 Freezes Left</span>
            )}
          </div>
        </div>

        {/* 2. 💻 Coding Activity */}
        <div className="p-5 rounded-3xl bg-zinc-900/90 border border-zinc-800/80 hover:border-emerald-500/30 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">💻 Coding Activity</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <Code2 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white">{gamification.problemsSolvedToday}</span>
            <span className="text-xs text-zinc-400">Today</span>
            <span className="text-xs text-emerald-400 font-semibold ml-auto">+{gamification.problemsSolvedThisWeek} This Week</span>
          </div>
          <div className="mt-3 pt-3 border-t border-zinc-800/80 text-xs text-zinc-400 flex justify-between">
            <span>Total Solved across platforms:</span>
            <strong className="text-zinc-200">{gamification.totalProblemsSolved}</strong>
          </div>
        </div>

        {/* 3. ⏱️ Study Time */}
        <div className="p-5 rounded-3xl bg-zinc-900/90 border border-zinc-800/80 hover:border-blue-500/30 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">⏱️ Study Time</span>
            <div className="w-8 h-8 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white">
              {Math.floor(gamification.studyTimeTodayMinutes / 60)}h {gamification.studyTimeTodayMinutes % 60}m
            </span>
            <span className="text-xs text-zinc-400">Today</span>
          </div>
          <div className="mt-3 pt-3 border-t border-zinc-800/80 text-xs text-zinc-400 flex justify-between">
            <span>This Week Total:</span>
            <strong className="text-zinc-200">
              {Math.floor(gamification.studyTimeWeekMinutes / 60)}h {gamification.studyTimeWeekMinutes % 60}m
            </strong>
          </div>
        </div>

        {/* 4. 🎯 Current Goal */}
        <div className="p-5 rounded-3xl bg-zinc-900/90 border border-zinc-800/80 hover:border-purple-500/30 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">🎯 Active Goal</span>
            <div className="w-8 h-8 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
              <Target className="w-4 h-4" />
            </div>
          </div>
          <div className="text-base font-bold text-white truncate">Complete Trees & BST</div>
          <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden mt-2 mb-1">
            <div className="bg-purple-500 h-full w-[70%]" />
          </div>
          <div className="flex justify-between text-xs text-zinc-400 mt-2">
            <span>Progress: <strong className="text-purple-300">70%</strong></span>
            <Link href="/roadmaps" className="text-purple-400 hover:underline">Continue</Link>
          </div>
        </div>

        {/* 5. ⚠️ Weak Area Alert */}
        <div className="p-5 rounded-3xl bg-rose-500/5 border border-rose-500/20 hover:border-rose-500/40 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">⚠️ Weak Topic Alert</span>
            <div className="w-8 h-8 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-400">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-base font-bold text-white truncate">{weakTopic?.title || 'Dynamic Programming'}</div>
          <div className="text-xs text-zinc-400 mt-1">Confidence Score: <strong className="text-rose-400">{weakTopic?.confidenceScore}%</strong></div>
          <div className="mt-3 pt-2">
            <Link
              href="/problems"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-400 hover:text-rose-300"
            >
              Practice {weakTopic?.title} Problems <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* 6. 🏆 Current Level & XP */}
        <div className="p-5 rounded-3xl bg-zinc-900/90 border border-zinc-800/80 hover:border-cyan-500/30 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">🏆 Gamification Level</span>
            <div className="w-8 h-8 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
              <Zap className="w-4 h-4 fill-cyan-400" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-white">Lvl {gamification.level}</span>
            <span className="text-xs text-cyan-400 font-semibold">{gamification.levelTitle}</span>
          </div>
          <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden mt-2 mb-1">
            <div
              className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-full"
              style={{ width: `${Math.min(100, (gamification.xp / gamification.nextLevelXp) * 100)}%` }}
            />
          </div>
          <div className="flex justify-between text-[11px] text-zinc-400 mt-1">
            <span>{gamification.xp} XP</span>
            <span>Next: {gamification.nextLevelXp} XP</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Quests & Connected Platforms */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Daily Quests (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 rounded-3xl bg-zinc-900/90 border border-zinc-800/80">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  ⚔️ Daily Quests <span className="text-xs font-normal text-zinc-400">(Resets in 10h)</span>
                </h3>
                <p className="text-xs text-zinc-400">Complete quests to earn bonus XP & level up fast.</p>
              </div>
              <Link href="/gamification" className="text-xs text-emerald-400 hover:underline font-semibold">
                View All Quests
              </Link>
            </div>

            <div className="space-y-3">
              {dailyQuests.map((quest) => (
                <div
                  key={quest.id}
                  className={`p-4 rounded-2xl border flex items-center justify-between transition-all ${
                    quest.completed
                      ? 'bg-emerald-500/5 border-emerald-500/20 text-zinc-300'
                      : 'bg-zinc-950/60 border-zinc-800 text-zinc-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${
                        quest.completed ? 'bg-emerald-500 text-black' : 'bg-zinc-800 text-zinc-500'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">{quest.title}</div>
                      <div className="text-[11px] text-zinc-400">{quest.description}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                      +{quest.xpReward} XP
                    </span>
                    {quest.completed && quest.xpReward > 0 ? (
                      <button
                        onClick={() => claimQuest(quest.id)}
                        className="text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-black px-3 py-1 rounded-lg transition-colors cursor-pointer"
                      >
                        Claim
                      </button>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick AI Mentor Suggestion Box */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-purple-950/30 via-zinc-900 to-zinc-900 border border-purple-500/20 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-300 shrink-0">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">AI Study Mentor Insight</h4>
                <p className="text-xs text-zinc-400 mt-0.5">
                  "Your Recursion confidence is at 40%. Revise base cases before starting Backtracking!"
                </p>
              </div>
            </div>
            <Link
              href="/ai-mentor"
              className="shrink-0 bg-purple-500 hover:bg-purple-400 text-black font-bold text-xs px-4 py-2.5 rounded-xl transition-colors"
            >
              Ask AI Mentor
            </Link>
          </div>
        </div>

        {/* Right Column: Connected Coding Platform System */}
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-zinc-900/90 border border-zinc-800/80">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-white">Connected Platforms</h3>
              <Link href="/onboarding" className="text-xs text-zinc-400 hover:text-white">
                Manage
              </Link>
            </div>

            <div className="space-y-3">
              {user.connectedAccounts.map((acc) => (
                <div
                  key={acc.platform}
                  className="p-3 bg-zinc-950/60 rounded-2xl border border-zinc-800/80 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-zinc-800 flex items-center justify-center text-xs font-bold text-white">
                      {acc.platform[0]}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-1.5">
                        {acc.platform}
                        {acc.connected && (
                          <span className="w-2 h-2 rounded-full bg-emerald-400" title="Connected" />
                        )}
                      </div>
                      <div className="text-[10px] text-zinc-400">
                        {acc.connected ? `@${acc.username}` : 'Not connected'}
                      </div>
                    </div>
                  </div>

                  {acc.connected ? (
                    <div className="text-right">
                      {acc.rating && (
                        <div className="text-xs font-bold text-amber-400">{acc.rating} Rating</div>
                      )}
                      {acc.problemsSolved !== undefined && (
                        <div className="text-[10px] text-zinc-400">{acc.problemsSolved} Solved</div>
                      )}
                    </div>
                  ) : (
                    <span className="text-[10px] text-zinc-500 bg-zinc-900 px-2 py-0.5 rounded-full">
                      Offline
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Log Study Time Modal */}
      {showLogModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 w-full max-w-sm rounded-3xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-emerald-400" /> Log Study Session
            </h3>
            <p className="text-xs text-zinc-400">
              Enter how many minutes you studied today to update your weekly performance report and earn XP.
            </p>
            <div>
              <label className="text-xs text-zinc-300 font-medium block mb-1">Study Duration (Minutes)</label>
              <input
                type="number"
                value={logTimeMinutes}
                onChange={(e) => setLogTimeMinutes(Number(e.target.value))}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                min={5}
                max={480}
              />
            </div>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setShowLogModal(false)}
                className="flex-1 py-2.5 rounded-xl border border-zinc-800 text-xs text-zinc-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleLogTime}
                className="flex-1 py-2.5 rounded-xl bg-emerald-500 text-black font-bold text-xs hover:bg-emerald-400"
              >
                Save & Earn XP
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
