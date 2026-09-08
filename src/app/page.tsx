'use client';

import React from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  Flame,
  Zap,
  Code2,
  Map,
  Swords,
  Bot,
  BarChart3,
  CheckCircle2,
  Shield,
  Laptop,
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-emerald-500/30 font-sans relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-emerald-500/15 via-teal-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <header className="sticky top-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/60 px-6 py-4 flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-500 flex items-center justify-center text-black font-black text-xl shadow-lg shadow-emerald-500/20">
            S
          </div>
          <div>
            <span className="text-xl font-bold bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent tracking-tight">
              StudentOS
            </span>
            <span className="text-[10px] block text-emerald-400 font-mono -mt-1 tracking-widest uppercase">
              ALL-IN-ONE DEVELOPER OS
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/onboarding"
            className="text-xs font-semibold text-zinc-300 hover:text-white transition-colors hidden sm:block"
          >
            Start Onboarding
          </Link>
          <Link
            href="/dashboard"
            className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black font-bold text-xs px-5 py-2.5 rounded-xl shadow-lg shadow-emerald-500/20 transition-all"
          >
            Launch App <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-6 max-w-5xl mx-auto text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
          <Sparkles className="w-4 h-4" /> The Ultimate Developer & Student Operating System
        </div>

        <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight text-white">
          Learn. Code. Track. <br />
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
            Compete. Grow.
          </span>
        </h1>

        <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          Stop scattering your progress across LeetCode, Codeforces, GitHub, YouTube, and Notion.
          StudentOS unifies coding activity, roadmaps, gamification, and AI mentorship into{' '}
          <strong className="text-white">ONE LOGIN & ONE DASHBOARD</strong>.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/dashboard"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 text-black font-extrabold text-sm px-8 py-4 rounded-2xl shadow-xl shadow-emerald-500/25 transition-all cursor-pointer"
          >
            Open StudentOS Dashboard <ArrowRight className="w-5 h-5" />
          </Link>

          <Link
            href="/onboarding"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 font-bold text-sm px-8 py-4 rounded-2xl border border-zinc-800 transition-all cursor-pointer"
          >
            Configure Personal Goal
          </Link>
        </div>

        {/* Hero Features Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-12 text-left">
          <div className="p-4 bg-zinc-900/60 rounded-2xl border border-zinc-800/80">
            <Flame className="w-5 h-5 text-amber-400 mb-2" />
            <div className="text-xs font-bold text-white">Universal Streak</div>
            <div className="text-[11px] text-zinc-400">Sync coding & study habit</div>
          </div>

          <div className="p-4 bg-zinc-900/60 rounded-2xl border border-zinc-800/80">
            <Code2 className="w-5 h-5 text-emerald-400 mb-2" />
            <div className="text-xs font-bold text-white">Problem Discovery</div>
            <div className="text-[11px] text-zinc-400">LeetCode, CF & CodeChef</div>
          </div>

          <div className="p-4 bg-zinc-900/60 rounded-2xl border border-zinc-800/80">
            <Map className="w-5 h-5 text-purple-400 mb-2" />
            <div className="text-xs font-bold text-white">Career Skill Trees</div>
            <div className="text-[11px] text-zinc-400">SWE, AI & Web Dev paths</div>
          </div>

          <div className="p-4 bg-zinc-900/60 rounded-2xl border border-zinc-800/80">
            <Bot className="w-5 h-5 text-blue-400 mb-2" />
            <div className="text-xs font-bold text-white">AI Study Mentor</div>
            <div className="text-[11px] text-zinc-400">Context-aware guidance</div>
          </div>
        </div>
      </section>

      {/* Core Value Proposition Section */}
      <section className="py-20 bg-zinc-900/50 border-t border-b border-zinc-800/80 px-6">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Built for Engineering Students & Aspiring Developers
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              Simple interface outside, powerful engineering platform inside.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800/80 space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                <Code2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Universal Coding Hub</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Browse and solve problems across LeetCode, Codeforces, and CodeChef. Automatically track your progress, status, and notes.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800/80 space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-400">
                <Swords className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Gamified RPG Progression</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Earn XP for every problem solved, level up from Beginner to Code Legend, claim daily quests, and unlock 40+ achievements.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800/80 space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-400">
                <Bot className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">AI Mentor & Career Analytics</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Get instant diagnostic insights on weak topics (e.g. DP, Recursion), calculate placement readiness %, and run ATS resume scans.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 text-center text-xs text-zinc-500 border-t border-zinc-900">
        <p>© 2026 StudentOS — Learn. Code. Track. Compete. Grow. All rights reserved.</p>
      </footer>
    </div>
  );
}
