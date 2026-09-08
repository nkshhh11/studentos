'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Code2,
  BookOpen,
  Map,
  Swords,
  FolderGit2,
  BarChart3,
  Bot,
  Trophy,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';
import { useStudentOS } from '../../context/StudentOSContext';

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { isAdminView } = useStudentOS();

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, badge: null },
    { name: 'Problem Explorer', href: '/problems', icon: Code2, badge: '50+' },
    { name: 'Learn & Hub', href: '/learn', icon: BookOpen, badge: null },
    { name: 'Roadmaps & Trees', href: '/roadmaps', icon: Map, badge: 'NEW' },
    { name: 'Quests & Badges', href: '/gamification', icon: Swords, badge: 'XP' },
    { name: 'Projects & Tasks', href: '/projects', icon: FolderGit2, badge: null },
    { name: 'Analytics & Planner', href: '/analytics', icon: BarChart3, badge: null },
    { name: 'AI Mentor', href: '/ai-mentor', icon: Bot, badge: 'AI' },
    { name: 'Leaderboard', href: '/community', icon: Trophy, badge: null },
  ];

  if (isAdminView) {
    navItems.push({ name: 'Admin Dashboard', href: '/admin', icon: ShieldAlert, badge: 'PRO' });
  }

  return (
    <aside className="w-64 bg-zinc-950/60 border-r border-zinc-800/80 flex flex-col shrink-0 min-h-[calc(100vh-4rem)] p-4 hidden md:flex">
      <div className="space-y-1 flex-1">
        <div className="px-3 py-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
          Core OS Modules
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                isActive
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-lg shadow-emerald-500/5'
                  : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/80 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-4 h-4 transition-colors ${
                    isActive ? 'text-emerald-400' : 'text-zinc-400 group-hover:text-zinc-200'
                  }`}
                />
                <span>{item.name}</span>
              </div>
              {item.badge && (
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    item.badge === 'AI'
                      ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                      : item.badge === 'PRO'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : 'bg-zinc-800 text-zinc-400'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>

      {/* Career Target Status Card */}
      <div className="mt-auto pt-4 border-t border-zinc-900">
        <div className="p-3 bg-gradient-to-b from-zinc-900 to-zinc-950 rounded-2xl border border-zinc-800/80">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold text-white">Daily Target Goal</span>
          </div>
          <div className="text-[11px] text-zinc-400 mb-2">
            Target: <span className="text-zinc-200 font-semibold">Software Engineer</span>
          </div>
          <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
            <div className="bg-emerald-400 h-full w-[68%]" />
          </div>
          <div className="flex justify-between items-center text-[10px] text-zinc-500 mt-1.5">
            <span>Readiness: 68%</span>
            <Link href="/ai-mentor" className="text-emerald-400 hover:underline">
              Analyze
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
};
