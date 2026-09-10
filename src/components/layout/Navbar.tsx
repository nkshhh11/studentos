'use client';

import React, { useState } from 'react';
import {
  Flame,
  Zap,
  Search,
  Bell,
  Shield,
  User,
  LogOut,
  ChevronDown,
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
    { id: 1, text: 'Keep your 15-day streak active today', time: '10m ago' },
    { id: 2, text: 'Unlocked First Blood achievement (+50 XP)', time: '1h ago' },
    { id: 3, text: 'Revision reminder: Dynamic Programming', time: '3h ago' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 h-14 bg-zinc-950/90 backdrop-blur border-b border-zinc-800/80 px-4 sm:px-6 flex items-center justify-between transition-colors">
        {/* Left: Brand & Search */}
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-zinc-100 text-zinc-950 dark:bg-zinc-800 dark:text-zinc-100 font-bold text-sm flex items-center justify-center">
              S
            </div>
            <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight">
              StudentOS
            </span>
          </Link>

          <button
            onClick={() => setIsSearchOpen(true)}
            className="hidden md:flex items-center gap-2 bg-zinc-900/50 hover:bg-zinc-800/60 text-zinc-400 text-xs px-3 py-1.5 rounded-lg border border-zinc-800 transition-all w-60 lg:w-72 cursor-pointer"
          >
            <Search className="w-3.5 h-3.5 text-zinc-500" />
            <span className="flex-1 text-left truncate">Search...</span>
            <kbd className="hidden lg:inline-block px-1 py-0.2 bg-zinc-800 text-[10px] rounded text-zinc-400 border border-zinc-700">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2.5">
          {/* Streak Badge */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-zinc-900 border border-zinc-800 rounded-full text-zinc-300 text-xs font-medium">
            <Flame className="w-3.5 h-3.5 text-amber-500" />
            <span>{streak.currentStreak}d</span>
          </div>

          {/* Level Pill */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-zinc-900 border border-zinc-800 rounded-full text-xs text-zinc-300 font-medium">
            <Zap className="w-3.5 h-3.5 text-emerald-500" />
            <span>Lvl {gamification.level}</span>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-zinc-200 transition-all cursor-pointer"
            title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-zinc-600" />}
          </button>

          {/* Admin Switcher */}
          <button
            onClick={toggleAdminView}
            className={`hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-all border ${
              isAdminView
                ? 'bg-zinc-800 border-zinc-700 text-zinc-100'
                : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>{isAdminView ? 'Admin' : 'Admin View'}</span>
          </button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              className="relative p-1.5 text-zinc-400 hover:text-zinc-100 bg-zinc-900 hover:bg-zinc-800 rounded-lg border border-zinc-800 transition-colors"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-emerald-500 rounded-full" />
            </button>

            {isNotifOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-zinc-900 border border-zinc-800 rounded-xl shadow-xl p-3 z-50 animate-in fade-in duration-150">
                <div className="flex items-center justify-between pb-2 border-b border-zinc-800 mb-2">
                  <h4 className="text-xs font-semibold text-zinc-200">Notifications</h4>
                  <span className="text-[10px] text-zinc-400">3 New</span>
                </div>
                <div className="space-y-2">
                  {notifications.map((n) => (
                    <div key={n.id} className="p-2 bg-zinc-950 rounded-lg border border-zinc-800/80 text-xs">
                      <div className="text-zinc-300">{n.text}</div>
                      <div className="text-[10px] text-zinc-500 mt-0.5">{n.time}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              className="flex items-center gap-1.5 p-1 bg-zinc-900 hover:bg-zinc-800 rounded-lg border border-zinc-800 transition-colors"
            >
              <img src={user.avatar} alt={user.name} className="w-6 h-6 rounded object-cover" />
              <ChevronDown className="w-3 h-3 text-zinc-400" />
            </button>

            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-zinc-900 border border-zinc-800 rounded-xl shadow-xl p-1.5 z-50 animate-in fade-in duration-150">
                <div className="p-2 border-b border-zinc-800 mb-1">
                  <div className="text-xs font-semibold text-zinc-100">{user.name}</div>
                  <div className="text-[10px] text-zinc-400 truncate">{user.careerGoal}</div>
                </div>

                <Link
                  href="/onboarding"
                  onClick={() => setIsProfileMenuOpen(false)}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
                >
                  <User className="w-3.5 h-3.5 text-zinc-400" /> Profile & Settings
                </Link>

                <button
                  onClick={() => {
                    toggleAdminView();
                    setIsProfileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors text-left"
                >
                  <Shield className="w-3.5 h-3.5 text-zinc-400" /> Toggle Admin View
                </button>

                <div className="border-t border-zinc-800 mt-1 pt-1">
                  <Link
                    href="/onboarding"
                    onClick={() => setIsProfileMenuOpen(false)}
                    className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs text-rose-400 hover:bg-rose-500/10 transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5" /> Re-run Onboarding
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <GlobalSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};
