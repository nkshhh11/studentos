'use client';

import React, { useState } from 'react';
import {
  Flame,
  Zap,
  Award,
  Search,
  Bell,
  Shield,
  User,
  LogOut,
  ChevronDown,
  AlertTriangle,
  Sun,
  Moon,
} from 'lucide-react';
import { useStudentOS } from '../../context/StudentOSContext';
import { GlobalSearchModal } from '../common/GlobalSearchModal';
import Link from 'next/link';

export const Navbar: React.FC = () => {
  const { user, streak, gamification, isAdminView, toggleAdminView, theme, toggleTheme } = useStudentOS();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const notifications = [
    { id: 1, text: '🔥 Streak Alert: Keep your 15-day streak alive today!', type: 'streak', time: '10m ago' },
    { id: 2, text: '🏆 Badge Unlocked: First Blood (+50 XP)', type: 'badge', time: '1h ago' },
    { id: 3, text: '📚 Revision Reminder: Dynamic Programming concepts', type: 'revision', time: '3h ago' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 h-16 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/80 px-4 sm:px-6 flex items-center justify-between transition-colors">
        {/* Left: Brand & Search Trigger */}
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-500 flex items-center justify-center text-black font-extrabold text-lg shadow-lg shadow-emerald-500/20">
              S
            </div>
            <div className="hidden sm:block">
              <span className="text-lg font-bold bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent tracking-tight">
                StudentOS
              </span>
              <span className="text-[10px] block text-emerald-400 font-mono -mt-1 tracking-widest uppercase">
                PRO ENGINE v2.0
              </span>
            </div>
          </Link>

          {/* Universal Search Bar */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="hidden md:flex items-center gap-2 bg-zinc-900/90 hover:bg-zinc-800/90 text-zinc-400 text-xs px-3.5 py-2 rounded-xl border border-zinc-800 transition-all w-64 lg:w-80 group cursor-pointer"
          >
            <Search className="w-4 h-4 text-zinc-500 group-hover:text-emerald-400 transition-colors" />
            <span className="flex-1 text-left truncate">Search problems, topics, notes...</span>
            <kbd className="hidden lg:inline-block px-1.5 py-0.5 bg-zinc-800 text-[10px] rounded text-zinc-400 border border-zinc-700">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Right: Gamification Badges, Theme Toggle & User Menu */}
        <div className="flex items-center gap-3">
          {/* Universal Streak Badge */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-400 text-xs font-semibold shadow-sm">
            <Flame className="w-4 h-4 fill-amber-400 text-amber-500 animate-pulse" />
            <span>{streak.currentStreak} Days</span>
            {streak.streakFreezes > 0 && (
              <span className="text-[10px] bg-amber-500/20 px-1.5 py-0.5 rounded-full text-amber-300 ml-0.5" title="Streak Freezes Available">
                ❄️ {streak.streakFreezes}
              </span>
            )}
          </div>

          {/* Level & XP Pill */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-xs text-emerald-400 font-medium">
            <Zap className="w-4 h-4 fill-emerald-400 text-emerald-400" />
            <span className="font-bold">Lvl {gamification.level}</span>
            <span className="text-zinc-500">|</span>
            <span className="text-zinc-300 font-mono">{gamification.xp} XP</span>
          </div>

          {/* Theme Toggle Button (Light/Dark) */}
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-amber-400 hover:text-amber-300 transition-all cursor-pointer shadow-sm"
            title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-500" />}
          </button>

          {/* Admin Switcher Toggle Button */}
          <button
            onClick={toggleAdminView}
            className={`hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${
              isAdminView
                ? 'bg-purple-500/20 border-purple-500/40 text-purple-300 shadow-lg shadow-purple-500/10'
                : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>{isAdminView ? 'Admin Mode ON' : 'Switch to Admin'}</span>
          </button>

          {/* Mobile Search Button */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="md:hidden p-2 text-zinc-400 hover:text-white bg-zinc-900 rounded-xl border border-zinc-800"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              className="relative p-2 text-zinc-400 hover:text-white bg-zinc-900 hover:bg-zinc-800 rounded-xl border border-zinc-800 transition-colors"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-500 rounded-full" />
            </button>

            {isNotifOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="flex items-center justify-between pb-3 border-b border-zinc-800 mb-3">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Notifications</h4>
                  <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full font-medium">
                    3 New
                  </span>
                </div>
                <div className="space-y-2.5">
                  {notifications.map((n) => (
                    <div key={n.id} className="p-2.5 bg-zinc-950/60 rounded-xl border border-zinc-800/60 text-xs flex gap-2.5">
                      {n.type === 'streak' && <Flame className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />}
                      {n.type === 'badge' && <Award className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />}
                      {n.type === 'revision' && <AlertTriangle className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />}
                      <div>
                        <div className="text-zinc-200 leading-snug">{n.text}</div>
                        <div className="text-[10px] text-zinc-500 mt-1">{n.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Menu */}
          <div className="relative">
            <button
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              className="flex items-center gap-2 p-1.5 bg-zinc-900 hover:bg-zinc-800 rounded-xl border border-zinc-800 transition-colors"
            >
              <img src={user.avatar} alt={user.name} className="w-7 h-7 rounded-lg object-cover" />
              <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
            </button>

            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="p-2.5 border-b border-zinc-800 mb-1">
                  <div className="text-sm font-semibold text-white">{user.name}</div>
                  <div className="text-xs text-zinc-400 truncate">{user.college}</div>
                  <div className="mt-1.5 flex items-center gap-1.5">
                    <span className="text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-md border border-emerald-500/20">
                      {user.careerGoal}
                    </span>
                  </div>
                </div>

                <Link
                  href="/onboarding"
                  onClick={() => setIsProfileMenuOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
                >
                  <User className="w-4 h-4 text-zinc-400" /> Profile & Settings
                </Link>

                <button
                  onClick={() => {
                    toggleAdminView();
                    setIsProfileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors text-left"
                >
                  <Shield className="w-4 h-4 text-purple-400" /> Toggle Admin Dashboard
                </button>

                <div className="border-t border-zinc-800 mt-1 pt-1">
                  <Link
                    href="/onboarding"
                    onClick={() => setIsProfileMenuOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-rose-400 hover:bg-rose-500/10 transition-colors"
                  >
                    <LogOut className="w-4 h-4" /> Re-run Onboarding
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Global Search Modal */}
      <GlobalSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};
