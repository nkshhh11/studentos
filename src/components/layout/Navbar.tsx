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
  Sparkles,
} from 'lucide-react';
import { useStudentOS } from '../../context/StudentOSContext';
import { GlobalSearchModal } from '../common/GlobalSearchModal';
import Link from 'next/link';

export const Navbar: React.FC = () => {
  const {
    user,
    streak,
    gamification,
    isAdminView,
    toggleAdminView,
    theme,
    toggleTheme,
    isAuthenticated,
    isAuthLoading,
    openAuthModal,
    logout,
  } = useStudentOS();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const notifications = [
    { id: 1, text: 'Keep your streak active today by solving a problem', time: '10m ago' },
    { id: 2, text: 'Unlocked First Blood achievement (+50 XP)', time: '1h ago' },
    { id: 3, text: 'Revision reminder: Dynamic Programming', time: '3h ago' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 h-14 bg-zinc-950/90 dark:bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/80 px-4 sm:px-6 flex items-center justify-between transition-colors hidden md:flex">
        {/* Left: Brand & Search */}
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-bold text-sm flex items-center justify-center shadow-lg shadow-indigo-500/20">
              S
            </div>
            <span className="text-sm font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
              StudentOS
            </span>
          </Link>

          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center gap-2 bg-zinc-900/60 hover:bg-zinc-800/80 text-zinc-400 text-xs px-3 py-1.5 rounded-xl border border-zinc-800 transition-all w-60 lg:w-72 cursor-pointer shadow-sm"
          >
            <Search className="w-3.5 h-3.5 text-zinc-500" />
            <span className="flex-1 text-left truncate">Search notes, tasks, problems...</span>
            <kbd className="hidden lg:inline-block px-1.5 py-0.2 bg-zinc-800 text-[10px] rounded-md text-zinc-400 border border-zinc-700 font-mono">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2.5">
          {/* Streak Badge */}
          <div className="flex items-center gap-1.5 px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full text-zinc-200 text-xs font-semibold shadow-xs">
            <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500/20" />
            <span>{isAuthenticated ? streak.currentStreak : 0}d</span>
          </div>

          {/* Level Pill */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full text-xs text-zinc-200 font-semibold shadow-xs">
            <Zap className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500/20" />
            <span>Lvl {isAuthenticated ? gamification.level : 1}</span>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-zinc-200 transition-all cursor-pointer shadow-xs"
            title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-zinc-400" />}
          </button>

          {/* Admin Switcher */}
          <button
            onClick={toggleAdminView}
            className={`hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all border cursor-pointer ${
              isAdminView
                ? 'bg-indigo-600/20 border-indigo-500/40 text-indigo-300'
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
              className="relative p-1.5 text-zinc-400 hover:text-zinc-100 bg-zinc-900 hover:bg-zinc-800 rounded-xl border border-zinc-800 transition-colors cursor-pointer"
            >
              <Bell className="w-4 h-4" />
              {isAuthenticated && <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-emerald-500 rounded-full" />}
            </button>

            {isNotifOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl p-3 z-50 animate-in fade-in duration-150">
                <div className="flex items-center justify-between pb-2 border-b border-zinc-800 mb-2">
                  <h4 className="text-xs font-bold text-zinc-100">Notifications</h4>
                  <span className="text-[10px] text-zinc-400 font-mono">{isAuthenticated ? '3 New' : '0 New'}</span>
                </div>
                <div className="space-y-2">
                  {isAuthenticated ? (
                    notifications.map((n) => (
                      <div key={n.id} className="p-2.5 bg-zinc-950 rounded-xl border border-zinc-800/80 text-xs">
                        <div className="text-zinc-200 font-medium">{n.text}</div>
                        <div className="text-[10px] text-zinc-400 mt-0.5">{n.time}</div>
                      </div>
                    ))
                  ) : (
                    <div className="p-3 text-center text-xs text-zinc-400">
                      Sign in to view your notifications
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User Menu / Auth Buttons */}
          {isAuthLoading ? (
            <div className="w-20 h-7 bg-zinc-900 animate-pulse rounded-xl" />
          ) : isAuthenticated && user ? (
            <div className="relative">
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center gap-2 p-1 bg-zinc-900 hover:bg-zinc-800 rounded-xl border border-zinc-800 transition-colors cursor-pointer"
              >
                <img src={user.avatar || 'https://api.dicebear.com/7.x/bottts/svg?seed=student'} alt={user.name} className="w-7 h-7 rounded-lg object-cover" />
                <span className="text-xs font-semibold text-zinc-200 max-w-[120px] truncate hidden xl:inline-block">{user.name}</span>
                <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
              </button>

              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl p-1.5 z-50 animate-in fade-in duration-150">
                  <div className="p-2.5 border-b border-zinc-800 mb-1">
                    <div className="text-xs font-bold text-zinc-100">{user.name}</div>
                    <div className="text-[10px] text-zinc-400 truncate">{user.email || user.careerGoal || 'Student'}</div>
                  </div>

                  <Link
                    href="/onboarding"
                    onClick={() => setIsProfileMenuOpen(false)}
                    className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-xs text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
                  >
                    <User className="w-3.5 h-3.5 text-zinc-400" /> Profile
                  </Link>

                  <Link
                    href="/onboarding"
                    onClick={() => setIsProfileMenuOpen(false)}
                    className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-xs text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-zinc-400" /> Settings
                  </Link>

                  <button
                    onClick={() => {
                      toggleAdminView();
                      setIsProfileMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-xs text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors text-left cursor-pointer"
                  >
                    <Shield className="w-3.5 h-3.5 text-zinc-400" /> Toggle Admin View
                  </button>

                  <div className="border-t border-zinc-800 mt-1 pt-1">
                    <button
                      onClick={() => {
                        logout();
                        setIsProfileMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-xs text-rose-400 hover:bg-rose-500/10 transition-colors text-left cursor-pointer font-semibold"
                    >
                      <LogOut className="w-3.5 h-3.5" /> Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => openAuthModal('Sign In to StudentOS')}
                className="px-3.5 py-1.5 rounded-xl border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-xs font-semibold text-zinc-200 transition-colors cursor-pointer"
              >
                Sign In
              </button>
              <button
                onClick={() => openAuthModal('Create your StudentOS Account')}
                className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white transition-all cursor-pointer shadow-md shadow-indigo-600/20"
              >
                Get Started
              </button>
            </div>
          )}
        </div>
      </header>

      <GlobalSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};
