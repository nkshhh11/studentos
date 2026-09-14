'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import {
  Home,
  CheckSquare,
  FileText,
  Calendar,
  Code2,
  BookOpen,
  Map,
  Swords,
  BarChart3,
  Bot,
  Trophy,
  ShieldAlert,
  Menu,
  X,
  Flame,
  Zap,
  Sun,
  Moon,
  User,
  LogOut,
  Shield,
  Search,
} from 'lucide-react';
import { useStudentOS } from '../../context/StudentOSContext';
import { GlobalSearchModal } from '../common/GlobalSearchModal';

export const MobileNav: React.FC = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeTabParam = searchParams.get('tab');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const {
    user,
    streak,
    gamification,
    isAdminView,
    toggleAdminView,
    theme,
    toggleTheme,
    isAuthenticated,
    openAuthModal,
    logout,
  } = useStudentOS();

  const navItems = [
    { name: 'Home', href: '/dashboard', icon: Home },
    { name: 'Tasks', href: '/projects', icon: CheckSquare },
    { name: 'Notes', href: '/analytics?tab=notes', icon: FileText, tabKey: 'notes' },
    { name: 'Calendar', href: '/analytics?tab=planner', icon: Calendar, tabKey: 'planner' },
    { name: 'Problem Explorer', href: '/problems', icon: Code2 },
    { name: 'Learn & Hub', href: '/learn', icon: BookOpen },
    { name: 'Roadmaps & Trees', href: '/roadmaps', icon: Map },
    { name: 'Quests & Badges', href: '/gamification', icon: Swords },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
    { name: 'AI Mentor', href: '/ai-mentor', icon: Bot },
    { name: 'Leaderboard', href: '/community', icon: Trophy },
  ];

  if (isAdminView) {
    navItems.push({ name: 'Admin Dashboard', href: '/admin', icon: ShieldAlert });
  }

  const isItemActive = (item: typeof navItems[0]) => {
    if (item.href.includes('?tab=')) {
      return pathname === '/analytics' && activeTabParam === item.tabKey;
    }
    return pathname === item.href;
  };

  const bottomBarItems = [
    { name: 'Home', href: '/dashboard', icon: Home },
    { name: 'Tasks', href: '/projects', icon: CheckSquare },
    { name: 'Notes', href: '/analytics?tab=notes', icon: FileText, tabKey: 'notes' },
    { name: 'Calendar', href: '/analytics?tab=planner', icon: Calendar, tabKey: 'planner' },
    { name: 'AI Mentor', href: '/ai-mentor', icon: Bot },
  ];

  return (
    <>
      {/* Mobile Top Header (Visible on md:hidden) */}
      <div className="md:hidden sticky top-0 z-40 h-14 bg-zinc-950/90 dark:bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/80 px-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white"
            aria-label="Open Mobile Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shadow-md">
              S
            </div>
            <span className="text-sm font-bold text-zinc-100 tracking-tight">StudentOS</span>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick Streak Pill */}
          <div className="flex items-center gap-1 px-2 py-0.5 bg-zinc-900 border border-zinc-800 rounded-full text-zinc-300 text-[11px] font-semibold">
            <Flame className="w-3 h-3 text-amber-500" />
            <span>{isAuthenticated ? streak.currentStreak : 0}d</span>
          </div>

          {/* Search Button */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-zinc-400" />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-Out Drawer Overlay */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Backdrop */}
          <div
            onClick={() => setIsDrawerOpen(false)}
            className="fixed inset-0 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200"
          />

          {/* Drawer Content */}
          <div className="relative w-72 bg-zinc-950 border-r border-zinc-800 h-full flex flex-col z-10 p-4 space-y-5 animate-in slide-in-from-left duration-200">
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-bold text-sm flex items-center justify-center shadow-lg">
                  S
                </div>
                <div>
                  <div className="text-sm font-bold text-zinc-100">StudentOS</div>
                  <div className="text-[10px] text-zinc-400">Engineering Student OS</div>
                </div>
              </div>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="p-1.5 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Profile / Auth Section in Drawer */}
            {isAuthenticated && user ? (
              <div className="p-3 rounded-2xl bg-zinc-900/90 border border-zinc-800/80 space-y-2">
                <div className="flex items-center gap-2.5">
                  <img
                    src={user.avatar || 'https://api.dicebear.com/7.x/bottts/svg?seed=student'}
                    alt={user.name}
                    className="w-8 h-8 rounded-xl object-cover border border-zinc-700"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-bold text-zinc-100 truncate">{user.name}</div>
                    <div className="text-[10px] text-zinc-400 truncate">{user.careerGoal || 'Student'}</div>
                  </div>
                </div>
                <div className="flex items-center justify-between text-[11px] pt-1 text-zinc-400 border-t border-zinc-800/60">
                  <span className="flex items-center gap-1"><Flame className="w-3 h-3 text-amber-500" /> {streak.currentStreak}d streak</span>
                  <span className="flex items-center gap-1"><Zap className="w-3 h-3 text-emerald-500" /> Lvl {gamification.level}</span>
                </div>
              </div>
            ) : (
              <div className="p-3 bg-zinc-900 rounded-2xl border border-zinc-800 space-y-2 text-center">
                <div className="text-xs font-semibold text-zinc-300">Welcome to StudentOS</div>
                <div className="flex gap-2">
                  <button
                    onClick={() => { setIsDrawerOpen(false); openAuthModal('Sign In to StudentOS'); }}
                    className="flex-1 py-1.5 rounded-xl border border-zinc-700 text-xs font-medium text-zinc-200 hover:bg-zinc-800"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => { setIsDrawerOpen(false); openAuthModal('Create Account'); }}
                    className="flex-1 py-1.5 rounded-xl bg-indigo-600 text-xs font-bold text-white hover:bg-indigo-500"
                  >
                    Get Started
                  </button>
                </div>
              </div>
            )}

            {/* Nav Items List */}
            <div className="flex-1 overflow-y-auto space-y-1 scrollbar-none pr-1">
              <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider px-2 mb-1">Navigation</div>
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isItemActive(item);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsDrawerOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      active
                        ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30'
                        : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>

            {/* Bottom Actions in Drawer */}
            <div className="pt-3 border-t border-zinc-800 space-y-1.5 text-xs">
              {isAuthenticated && (
                <>
                  <Link
                    href="/onboarding"
                    onClick={() => setIsDrawerOpen(false)}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-zinc-300 hover:text-white hover:bg-zinc-900 text-left font-medium"
                  >
                    <User className="w-4 h-4 text-zinc-400" /> Profile & Settings
                  </Link>
                  <button
                    onClick={() => { toggleAdminView(); setIsDrawerOpen(false); }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 text-left font-medium cursor-pointer"
                  >
                    <Shield className="w-4 h-4" /> Toggle Admin View
                  </button>
                  <button
                    onClick={() => { logout(); setIsDrawerOpen(false); }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-rose-400 hover:bg-rose-500/10 text-left font-semibold cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Fixed Mobile Bottom Quick-Access Bar (Visible on md:hidden) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-zinc-950/95 dark:bg-zinc-950/95 backdrop-blur-lg border-t border-zinc-800/80 px-2 py-1.5 flex items-center justify-around">
        {bottomBarItems.map((item) => {
          const Icon = item.icon;
          const active = isItemActive(item);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition-all ${
                active ? 'text-indigo-400 font-bold' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Icon className={`w-5 h-5 ${active ? 'stroke-[2.5px]' : 'stroke-2'}`} />
              <span className="text-[10px] tracking-tight">{item.name}</span>
            </Link>
          );
        })}
      </div>

      <GlobalSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};
