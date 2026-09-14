'use client';

import React from 'react';
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
} from 'lucide-react';
import { useStudentOS } from '../../context/StudentOSContext';

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeTabParam = searchParams.get('tab');
  const { isAdminView, user, isAuthenticated } = useStudentOS();

  const primaryItems = [
    { name: 'Home', href: '/dashboard', icon: Home },
    { name: 'Tasks', href: '/projects', icon: CheckSquare },
    { name: 'Notes', href: '/analytics?tab=notes', icon: FileText, tabKey: 'notes' },
    { name: 'Calendar', href: '/analytics?tab=planner', icon: Calendar, tabKey: 'planner' },
  ];

  const moduleItems = [
    { name: 'Problem Explorer', href: '/problems', icon: Code2, badge: '50+' },
    { name: 'Learn & Hub', href: '/learn', icon: BookOpen, badge: null },
    { name: 'Roadmaps & Trees', href: '/roadmaps', icon: Map, badge: null },
    { name: 'Quests & Badges', href: '/gamification', icon: Swords, badge: 'XP' },
    { name: 'Analytics & Reports', href: '/analytics', icon: BarChart3, badge: null },
    { name: 'AI Mentor', href: '/ai-mentor', icon: Bot, badge: 'AI' },
    { name: 'Leaderboard', href: '/community', icon: Trophy, badge: null },
  ];

  if (isAdminView) {
    moduleItems.push({ name: 'Admin Dashboard', href: '/admin', icon: ShieldAlert, badge: 'Admin' });
  }

  const isPrimaryActive = (item: typeof primaryItems[0]) => {
    if (item.href.includes('?tab=')) {
      return pathname === '/analytics' && activeTabParam === item.tabKey;
    }
    return pathname === item.href;
  };

  const isModuleActive = (item: typeof moduleItems[0]) => {
    if (item.href === '/analytics') {
      return pathname === '/analytics' && !activeTabParam;
    }
    return pathname === item.href;
  };

  return (
    <aside className="w-60 bg-zinc-950/80 border-r border-zinc-800/80 flex flex-col shrink-0 min-h-[calc(100vh-3.5rem)] p-3.5 hidden md:flex">
      <div className="space-y-5 flex-1">
        {/* Core Quick Access (Home, Tasks, Notes, Calendar) */}
        <div>
          <div className="px-2.5 py-1 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
            Quick Access
          </div>
          <div className="space-y-1 mt-1.5">
            {primaryItems.map((item) => {
              const Icon = item.icon;
              const active = isPrimaryActive(item);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all group ${
                    active
                      ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 shadow-xs'
                      : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/60'
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      active ? 'text-indigo-400' : 'text-zinc-400 group-hover:text-zinc-300'
                    }`}
                  />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* OS Modules */}
        <div>
          <div className="px-2.5 py-1 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
            Modules
          </div>
          <div className="space-y-1 mt-1.5">
            {moduleItems.map((item) => {
              const Icon = item.icon;
              const active = isModuleActive(item);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all group ${
                    active
                      ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 shadow-xs'
                      : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon
                      className={`w-4 h-4 transition-colors ${
                        active ? 'text-indigo-400' : 'text-zinc-400 group-hover:text-zinc-300'
                      }`}
                    />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-md bg-zinc-900 text-zinc-400 border border-zinc-800">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Target Status Card */}
      <div className="mt-auto pt-3 border-t border-zinc-900">
        <div className="p-3 bg-zinc-900/80 rounded-2xl border border-zinc-800/80 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-zinc-200">
            <span className="truncate">{isAuthenticated && user?.careerGoal ? `Goal: ${user.careerGoal}` : 'Goal: Software Engineer'}</span>
            <span className="text-[10px] text-emerald-400 font-mono font-bold shrink-0 ml-1">68%</span>
          </div>
          <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-500 to-emerald-500 h-full w-[68%]" />
          </div>
        </div>
      </div>
    </aside>
  );
};
