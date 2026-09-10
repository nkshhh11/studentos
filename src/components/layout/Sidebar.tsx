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
} from 'lucide-react';
import { useStudentOS } from '../../context/StudentOSContext';

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { isAdminView } = useStudentOS();

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, badge: null },
    { name: 'Problem Explorer', href: '/problems', icon: Code2, badge: '50+' },
    { name: 'Learn & Hub', href: '/learn', icon: BookOpen, badge: null },
    { name: 'Roadmaps & Trees', href: '/roadmaps', icon: Map, badge: null },
    { name: 'Quests & Badges', href: '/gamification', icon: Swords, badge: 'XP' },
    { name: 'Projects & Tasks', href: '/projects', icon: FolderGit2, badge: null },
    { name: 'Analytics & Planner', href: '/analytics', icon: BarChart3, badge: null },
    { name: 'AI Mentor', href: '/ai-mentor', icon: Bot, badge: 'AI' },
    { name: 'Leaderboard', href: '/community', icon: Trophy, badge: null },
  ];

  if (isAdminView) {
    navItems.push({ name: 'Admin Dashboard', href: '/admin', icon: ShieldAlert, badge: 'Admin' });
  }

  return (
    <aside className="w-56 bg-zinc-950/80 border-r border-zinc-800/80 flex flex-col shrink-0 min-h-[calc(100vh-3.5rem)] p-3 hidden md:flex">
      <div className="space-y-0.5 flex-1">
        <div className="px-2.5 py-1.5 text-[10px] font-medium text-zinc-500 uppercase tracking-wider">
          Navigation
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium transition-all group ${
                isActive
                  ? 'bg-zinc-800 text-zinc-100 shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon
                  className={`w-4 h-4 transition-colors ${
                    isActive ? 'text-zinc-100' : 'text-zinc-400 group-hover:text-zinc-300'
                  }`}
                />
                <span>{item.name}</span>
              </div>
              {item.badge && (
                <span className="text-[10px] font-medium px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-400 border border-zinc-700/50">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>

      {/* Target Status Card */}
      <div className="mt-auto pt-3 border-t border-zinc-900">
        <div className="p-2.5 bg-zinc-900/80 rounded-xl border border-zinc-800/80 space-y-1.5">
          <div className="flex items-center justify-between text-xs font-medium text-zinc-300">
            <span>Goal: Software Engineer</span>
            <span className="text-[10px] text-emerald-400 font-mono">68%</span>
          </div>
          <div className="w-full bg-zinc-800 h-1 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full w-[68%]" />
          </div>
        </div>
      </div>
    </aside>
  );
};
