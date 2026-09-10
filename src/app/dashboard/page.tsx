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
} from 'lucide-react';

export default function DashboardPage() {
  const {
    user,
    streak,
    gamification,
    dailyQuests,
    dsaTopics,
    useStreakFreeze,
    claimQuest,
    logStudyTime,
  } = useStudentOS();

  const [logTimeMinutes, setLogTimeMinutes] = useState(30);
  const [showLogModal, setShowLogModal] = useState(false);

  const weakTopic = [...dsaTopics].sort((a, b) => a.confidenceScore - b.confidenceScore)[0];

  const handleLogTime = () => {
    logStudyTime(Number(logTimeMinutes));
    setShowLogModal(false);
  };

  return (
    <div className="space-y-5 pb-10">
      {/* Header Banner */}
      <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-medium text-zinc-400 mb-1">
            Welcome back, {user.name}
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-zinc-100 tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Target Goal: <span className="text-zinc-200 font-medium">{user.careerGoal}</span> • {user.college}
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <Link
            href="/problems"
            className="flex items-center gap-1.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-950 font-semibold text-xs px-3.5 py-2 rounded-lg transition-all"
          >
            <Play className="w-3.5 h-3.5 fill-current" /> Solve Daily Problem
          </Link>
          <button
            onClick={() => setShowLogModal(true)}
            className="flex items-center gap-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-medium text-xs px-3.5 py-2 rounded-lg border border-zinc-800 transition-all cursor-pointer"
          >
            <Clock className="w-3.5 h-3.5 text-zinc-400" /> Log Time
          </button>
        </div>
      </div>

      {/* Core Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {/* Streak */}
        <div className="p-4 rounded-xl bg-zinc-900/90 border border-zinc-800/80">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-zinc-400">Universal Streak</span>
            <Flame className="w-4 h-4 text-amber-500" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-bold text-zinc-100">{streak.currentStreak}</span>
            <span className="text-xs text-zinc-400">Days</span>
          </div>
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-zinc-800/60 text-xs text-zinc-400">
            <span>Best: <strong className="text-zinc-200 font-medium">{streak.bestStreak}d</strong></span>
            {streak.streakFreezes > 0 ? (
              <button
                onClick={useStreakFreeze}
                className="text-[11px] bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded border border-zinc-700 hover:bg-zinc-700"
              >
                Use Freeze (❄️ {streak.streakFreezes})
              </button>
            ) : (
              <span className="text-[11px] text-zinc-500">0 Freezes</span>
            )}
          </div>
        </div>

        {/* Coding Activity */}
        <div className="p-4 rounded-xl bg-zinc-900/90 border border-zinc-800/80">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-zinc-400">Coding Solved</span>
            <Code2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-bold text-zinc-100">{gamification.problemsSolvedToday}</span>
            <span className="text-xs text-zinc-400">Today</span>
            <span className="text-xs text-emerald-400 ml-auto font-medium">+{gamification.problemsSolvedThisWeek} this week</span>
          </div>
          <div className="mt-2 pt-2 border-t border-zinc-800/60 text-xs text-zinc-400 flex justify-between">
            <span>Total Solved:</span>
            <span className="text-zinc-200 font-medium">{gamification.totalProblemsSolved}</span>
          </div>
        </div>

        {/* Study Time */}
        <div className="p-4 rounded-xl bg-zinc-900/90 border border-zinc-800/80">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-zinc-400">Study Time</span>
            <Clock className="w-4 h-4 text-blue-400" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-bold text-zinc-100">
              {Math.floor(gamification.studyTimeTodayMinutes / 60)}h {gamification.studyTimeTodayMinutes % 60}m
            </span>
            <span className="text-xs text-zinc-400">Today</span>
          </div>
          <div className="mt-2 pt-2 border-t border-zinc-800/60 text-xs text-zinc-400 flex justify-between">
            <span>Week Total:</span>
            <span className="text-zinc-200 font-medium">
              {Math.floor(gamification.studyTimeWeekMinutes / 60)}h {gamification.studyTimeWeekMinutes % 60}m
            </span>
          </div>
        </div>

        {/* Current Goal */}
        <div className="p-4 rounded-xl bg-zinc-900/90 border border-zinc-800/80">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-zinc-400">Active Goal</span>
            <Target className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-sm font-semibold text-zinc-100 truncate">Complete Trees & BST</div>
          <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden mt-2 mb-1">
            <div className="bg-purple-500 h-full w-[70%]" />
          </div>
          <div className="flex justify-between text-xs text-zinc-400 mt-1.5">
            <span>Progress: <strong className="text-zinc-200 font-medium">70%</strong></span>
            <Link href="/roadmaps" className="text-zinc-300 hover:text-white underline">Continue</Link>
          </div>
        </div>

        {/* Weak Topic Alert */}
        <div className="p-4 rounded-xl bg-zinc-900/90 border border-zinc-800/80">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-zinc-400">Weak Area</span>
            <AlertTriangle className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-sm font-semibold text-zinc-100 truncate">{weakTopic?.title || 'Dynamic Programming'}</div>
          <div className="text-xs text-zinc-400 mt-0.5">Confidence: <span className="text-rose-400 font-medium">{weakTopic?.confidenceScore}%</span></div>
          <div className="mt-2 pt-1.5 border-t border-zinc-800/60">
            <Link href="/problems" className="inline-flex items-center gap-1 text-xs text-rose-400 hover:text-rose-300 font-medium">
              Practice Now <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Level & XP */}
        <div className="p-4 rounded-xl bg-zinc-900/90 border border-zinc-800/80">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-zinc-400">Gamification Rank</span>
            <Zap className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-bold text-zinc-100">Lvl {gamification.level}</span>
            <span className="text-xs text-zinc-400">{gamification.levelTitle}</span>
          </div>
          <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden mt-2 mb-1">
            <div
              className="bg-cyan-500 h-full"
              style={{ width: `${Math.min(100, (gamification.xp / gamification.nextLevelXp) * 100)}%` }}
            />
          </div>
          <div className="flex justify-between text-[11px] text-zinc-400 mt-1">
            <span>{gamification.xp} XP</span>
            <span>Next: {gamification.nextLevelXp} XP</span>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Daily Quests */}
        <div className="lg:col-span-2 space-y-5">
          <div className="p-5 rounded-2xl bg-zinc-900/90 border border-zinc-800/80">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-zinc-100">Daily Quests</h3>
              <Link href="/gamification" className="text-xs text-zinc-400 hover:text-zinc-200">
                View All
              </Link>
            </div>

            <div className="space-y-2">
              {dailyQuests.map((quest) => (
                <div
                  key={quest.id}
                  className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
                    quest.completed ? 'bg-zinc-950/40 border-zinc-800/60' : 'bg-zinc-950 border-zinc-800/80'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-5 h-5 rounded flex items-center justify-center shrink-0 ${
                        quest.completed ? 'bg-emerald-500 text-black' : 'bg-zinc-800 text-zinc-500'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="text-xs font-medium text-zinc-200">{quest.title}</div>
                      <div className="text-[11px] text-zinc-400">{quest.description}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-amber-400 font-mono">+{quest.xpReward} XP</span>
                    {quest.completed && quest.xpReward > 0 && (
                      <button
                        onClick={() => claimQuest(quest.id)}
                        className="text-xs bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-2.5 py-0.5 rounded cursor-pointer"
                      >
                        Claim
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Insight Box */}
          <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-300 shrink-0">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-zinc-100">AI Mentor Insight</h4>
                <p className="text-xs text-zinc-400">
                  "Recursion confidence is 40%. Revise base cases before starting Backtracking."
                </p>
              </div>
            </div>
            <Link
              href="/ai-mentor"
              className="shrink-0 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 text-xs font-medium px-3 py-1.5 rounded-lg border border-zinc-700"
            >
              Ask AI
            </Link>
          </div>
        </div>

        {/* Connected Platforms */}
        <div className="space-y-5">
          <div className="p-5 rounded-2xl bg-zinc-900/90 border border-zinc-800/80">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-zinc-100">Connected Platforms</h3>
              <Link href="/onboarding" className="text-xs text-zinc-400 hover:text-zinc-200">
                Manage
              </Link>
            </div>

            <div className="space-y-2">
              {user.connectedAccounts.map((acc) => (
                <div
                  key={acc.platform}
                  className="p-2.5 bg-zinc-950 rounded-xl border border-zinc-800/80 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded bg-zinc-800 flex items-center justify-center text-xs font-semibold text-zinc-200">
                      {acc.platform[0]}
                    </div>
                    <div>
                      <div className="text-xs font-medium text-zinc-200">{acc.platform}</div>
                      <div className="text-[10px] text-zinc-400">
                        {acc.connected ? `@${acc.username}` : 'Disconnected'}
                      </div>
                    </div>
                  </div>

                  {acc.connected ? (
                    <div className="text-right text-xs">
                      {acc.rating && <div className="text-zinc-200 font-medium">{acc.rating} Rating</div>}
                      {acc.problemsSolved !== undefined && <div className="text-[10px] text-zinc-400">{acc.problemsSolved} Solved</div>}
                    </div>
                  ) : (
                    <span className="text-[10px] text-zinc-500">Offline</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showLogModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 w-full max-w-sm rounded-2xl p-5 space-y-4">
            <h3 className="text-base font-semibold text-zinc-100 flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-500" /> Log Study Duration
            </h3>
            <div>
              <label className="text-xs text-zinc-400 block mb-1">Duration (Minutes)</label>
              <input
                type="number"
                value={logTimeMinutes}
                onChange={(e) => setLogTimeMinutes(Number(e.target.value))}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-100 focus:outline-none"
                min={5}
                max={480}
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowLogModal(false)}
                className="flex-1 py-2 rounded-lg border border-zinc-800 text-xs text-zinc-400 hover:text-zinc-200"
              >
                Cancel
              </button>
              <button
                onClick={handleLogTime}
                className="flex-1 py-2 rounded-lg bg-zinc-100 text-zinc-950 font-semibold text-xs hover:bg-zinc-200"
              >
                Save Log
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
