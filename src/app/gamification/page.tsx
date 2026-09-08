'use client';

import React from 'react';
import { useStudentOS } from '../../context/StudentOSContext';
import {
  Swords,
  Award,
  Zap,
  Flame,
  CheckCircle2,
  Lock,
  Sparkles,
  Shield,
  Trophy,
} from 'lucide-react';

export default function GamificationPage() {
  const { gamification, streak, dailyQuests, weeklyQuests, claimQuest, useStreakFreeze } = useStudentOS();

  const levelMilestones = [
    { level: 1, title: '🌱 Beginner' },
    { level: 5, title: '💻 Learner' },
    { level: 10, title: '⚔️ Problem Solver' },
    { level: 20, title: '🔥 Developer' },
    { level: 30, title: '🚀 Software Engineer' },
    { level: 50, title: '👑 Code Legend' },
  ];

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Header */}
      <div className="pb-4 border-b border-zinc-800">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Swords className="w-6 h-6 text-amber-400" /> Gamification & Quests Hub
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          Earn XP by solving problems, maintaining streaks, and completing daily/weekly quests to unlock legendary badges.
        </p>
      </div>

      {/* Level Banner Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-950/40 via-zinc-900 to-zinc-900 border border-amber-500/30 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-amber-500 to-yellow-400 text-black font-black text-2xl flex items-center justify-center shadow-xl shadow-amber-500/20">
              L{gamification.level}
            </div>
            <div>
              <div className="text-xs font-bold text-amber-400 uppercase tracking-widest">Current Rank</div>
              <h2 className="text-2xl font-extrabold text-white">{gamification.levelTitle}</h2>
              <p className="text-xs text-zinc-400 mt-0.5">
                Total XP: <span className="text-amber-300 font-mono font-bold">{gamification.xp} XP</span>
              </p>
            </div>
          </div>

          <div className="w-full md:w-72 space-y-2">
            <div className="flex justify-between text-xs text-zinc-300 font-semibold">
              <span>Level {gamification.level}</span>
              <span>Level {gamification.level + 1}</span>
            </div>
            <div className="w-full bg-zinc-800 h-3 rounded-full overflow-hidden border border-zinc-700">
              <div
                className="bg-gradient-to-r from-amber-500 via-yellow-400 to-emerald-400 h-full transition-all duration-500"
                style={{ width: `${Math.min(100, (gamification.xp / gamification.nextLevelXp) * 100)}%` }}
              />
            </div>
            <div className="text-[10px] text-zinc-500 text-right">
              {gamification.nextLevelXp - gamification.xp} XP to level up
            </div>
          </div>
        </div>

        {/* Level Progression Milestones track */}
        <div className="mt-6 pt-6 border-t border-zinc-800/80 grid grid-cols-3 sm:grid-cols-6 gap-2">
          {levelMilestones.map((m) => {
            const isReached = gamification.level >= m.level;
            return (
              <div
                key={m.level}
                className={`p-2.5 rounded-2xl border text-center transition-all ${
                  isReached
                    ? 'bg-amber-500/10 border-amber-500/30 text-white'
                    : 'bg-zinc-950 border-zinc-800/60 text-zinc-500 opacity-60'
                }`}
              >
                <div className="text-[10px] font-mono text-amber-400 font-bold">Lvl {m.level}</div>
                <div className="text-[11px] font-semibold mt-0.5 truncate">{m.title}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quests Section: Daily & Weekly Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Quests */}
        <div className="p-6 rounded-3xl bg-zinc-900/90 border border-zinc-800/80 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              ⚡ Daily Quests <span className="text-xs font-normal text-zinc-400">(Reset Daily)</span>
            </h3>
            <span className="text-xs text-amber-400 font-bold">Earn XP</span>
          </div>

          <div className="space-y-3">
            {dailyQuests.map((q) => (
              <div
                key={q.id}
                className={`p-4 rounded-2xl border flex items-center justify-between transition-all ${
                  q.completed ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-zinc-950 border-zinc-800'
                }`}
              >
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-2">
                    {q.title}
                    {q.completed && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                  </div>
                  <div className="text-[11px] text-zinc-400">{q.description}</div>
                  <div className="w-36 bg-zinc-800 h-1.5 rounded-full overflow-hidden mt-2">
                    <div
                      className="bg-emerald-400 h-full"
                      style={{ width: `${Math.min(100, (q.current / q.target) * 100)}%` }}
                    />
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-bold text-amber-400 font-mono block">+{q.xpReward} XP</span>
                  {q.completed && q.xpReward > 0 && (
                    <button
                      onClick={() => claimQuest(q.id)}
                      className="mt-1 text-[11px] font-bold bg-emerald-500 hover:bg-emerald-400 text-black px-2.5 py-0.5 rounded-md transition-colors cursor-pointer"
                    >
                      Claim
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Quests */}
        <div className="p-6 rounded-3xl bg-zinc-900/90 border border-zinc-800/80 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              🏆 Weekly Quests <span className="text-xs font-normal text-zinc-400">(Reset Sunday)</span>
            </h3>
            <span className="text-xs text-amber-400 font-bold">Big XP Bonuses</span>
          </div>

          <div className="space-y-3">
            {weeklyQuests.map((q) => (
              <div
                key={q.id}
                className={`p-4 rounded-2xl border flex items-center justify-between transition-all ${
                  q.completed ? 'bg-amber-500/10 border-amber-500/30' : 'bg-zinc-950 border-zinc-800'
                }`}
              >
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-2">
                    {q.title}
                    {q.completed && <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />}
                  </div>
                  <div className="text-[11px] text-zinc-400">{q.description}</div>
                  <div className="w-36 bg-zinc-800 h-1.5 rounded-full overflow-hidden mt-2">
                    <div
                      className="bg-amber-400 h-full"
                      style={{ width: `${Math.min(100, (q.current / q.target) * 100)}%` }}
                    />
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-bold text-amber-400 font-mono block">+{q.xpReward} XP</span>
                  {q.completed && q.xpReward > 0 && (
                    <button
                      onClick={() => claimQuest(q.id, true)}
                      className="mt-1 text-[11px] font-bold bg-amber-500 hover:bg-amber-400 text-black px-2.5 py-0.5 rounded-md transition-colors cursor-pointer"
                    >
                      Claim
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Badges Showcase Grid */}
      <div className="p-6 rounded-3xl bg-zinc-900/90 border border-zinc-800/80 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              🏅 Badges & Achievements
            </h3>
            <p className="text-xs text-zinc-400">
              Unlocked {gamification.badges.filter((b) => b.unlocked).length} of {gamification.badges.length} Badges
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {gamification.badges.map((badge) => (
            <div
              key={badge.id}
              className={`p-4 rounded-2xl border text-center transition-all ${
                badge.unlocked
                  ? 'bg-zinc-950/80 border-emerald-500/30 text-white shadow-lg shadow-emerald-500/5'
                  : 'bg-zinc-950/40 border-zinc-800 text-zinc-600 opacity-50'
              }`}
            >
              <div className="text-3xl mb-2">{badge.icon}</div>
              <div className="text-xs font-bold text-white truncate">{badge.title}</div>
              <div className="text-[10px] text-zinc-400 mt-1 line-clamp-2">{badge.description}</div>
              {badge.unlocked && badge.unlockedAt && (
                <div className="text-[9px] text-emerald-400 font-mono mt-2">Unlocked {badge.unlockedAt}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
