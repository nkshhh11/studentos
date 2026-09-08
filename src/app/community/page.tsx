'use client';

import React, { useState } from 'react';
import { useStudentOS } from '../../context/StudentOSContext';
import { Trophy, Users, Flame, Zap, Shield, Search, Lock, UserPlus } from 'lucide-react';

export default function CommunityPage() {
  const { user, streak, gamification, friends } = useStudentOS();
  const [activeLeaderboard, setActiveLeaderboard] = useState<'weekly' | 'monthly' | 'friends'>('weekly');
  const [privacySetting, setPrivacySetting] = useState<'public' | 'friends' | 'private'>('public');

  // Build current user ranking entry
  const userLeaderboardEntry = {
    id: user.id,
    name: `${user.name} (You)`,
    avatar: user.avatar,
    college: user.college,
    streak: streak.currentStreak,
    xp: gamification.xp,
    level: gamification.level,
    levelTitle: gamification.levelTitle,
    problemsSolved: gamification.totalProblemsSolved,
    isUser: true,
  };

  const combinedList = [userLeaderboardEntry, ...friends].sort((a, b) => b.xp - a.xp);

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Trophy className="w-6 h-6 text-amber-400" /> StudentOS Community & Leaderboard
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Compete with peers, track friend streaks, and climb global & university rankings.
          </p>
        </div>

        {/* Privacy Setting Toggle */}
        <div className="flex items-center gap-2 bg-zinc-900 px-3 py-1.5 rounded-xl border border-zinc-800 text-xs">
          <Shield className="w-4 h-4 text-emerald-400" />
          <span className="text-zinc-400">Ranking Visibility:</span>
          <select
            value={privacySetting}
            onChange={(e) => setPrivacySetting(e.target.value as any)}
            className="bg-zinc-950 text-white rounded-lg px-2 py-1 text-xs focus:outline-none"
          >
            <option value="public">Public</option>
            <option value="friends">Friends Only</option>
            <option value="private">Private (Hidden)</option>
          </select>
        </div>
      </div>

      {/* Leaderboard Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveLeaderboard('weekly')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
            activeLeaderboard === 'weekly'
              ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
              : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
          }`}
        >
          🏆 Weekly Leaderboard
        </button>
        <button
          onClick={() => setActiveLeaderboard('monthly')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
            activeLeaderboard === 'monthly'
              ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
              : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
          }`}
        >
          📅 Monthly Rankings
        </button>
        <button
          onClick={() => setActiveLeaderboard('friends')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
            activeLeaderboard === 'friends'
              ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
              : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
          }`}
        >
          👥 Friends Only
        </button>
      </div>

      {/* Leaderboard Table Card */}
      <div className="bg-zinc-900/90 rounded-3xl border border-zinc-800/80 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-zinc-300">
            <thead className="bg-zinc-950 text-zinc-400 uppercase tracking-wider font-semibold text-[10px] border-b border-zinc-800">
              <tr>
                <th className="py-3.5 px-4">Rank</th>
                <th className="py-3.5 px-4">Student</th>
                <th className="py-3.5 px-4">University</th>
                <th className="py-3.5 px-4">Streak</th>
                <th className="py-3.5 px-4">Level</th>
                <th className="py-3.5 px-4">Problems</th>
                <th className="py-3.5 px-4 text-right">Total XP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {combinedList.map((entry, idx) => (
                <tr
                  key={entry.id}
                  className={`hover:bg-zinc-800/40 transition-colors ${
                    (entry as any).isUser ? 'bg-emerald-500/5 font-bold border-l-4 border-l-emerald-500' : ''
                  }`}
                >
                  {/* Rank */}
                  <td className="py-3.5 px-4 font-extrabold text-sm">
                    {idx === 0 ? '🥇 #1' : idx === 1 ? '🥈 #2' : idx === 2 ? '🥉 #3' : `#${idx + 1}`}
                  </td>

                  {/* Student */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <img src={entry.avatar} alt={entry.name} className="w-8 h-8 rounded-full object-cover" />
                      <div>
                        <div className="text-xs font-bold text-white flex items-center gap-1.5">
                          {entry.name}
                        </div>
                        <div className="text-[10px] text-zinc-400">{entry.levelTitle}</div>
                      </div>
                    </div>
                  </td>

                  {/* College */}
                  <td className="py-3.5 px-4 text-zinc-400">{entry.college}</td>

                  {/* Streak */}
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1 text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20 text-[11px]">
                      <Flame className="w-3 h-3 fill-amber-400" /> {entry.streak}d
                    </span>
                  </td>

                  {/* Level */}
                  <td className="py-3.5 px-4 font-mono font-bold text-cyan-400">Lvl {entry.level}</td>

                  {/* Solved */}
                  <td className="py-3.5 px-4 text-zinc-300 font-mono">{entry.problemsSolved}</td>

                  {/* Total XP */}
                  <td className="py-3.5 px-4 text-right font-mono font-extrabold text-amber-300">
                    {entry.xp} XP
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
