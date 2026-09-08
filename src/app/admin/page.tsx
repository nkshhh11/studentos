'use client';

import React from 'react';
import { useStudentOS } from '../../context/StudentOSContext';
import {
  ShieldAlert,
  Users,
  TrendingUp,
  Activity,
  Code,
  Map,
  BookOpen,
  CheckCircle2,
  Clock,
  ArrowUpRight,
} from 'lucide-react';

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

export default function AdminDashboardPage() {
  const { adminStats } = useStudentOS();

  const COLORS = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ec4899'];

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <ShieldAlert className="w-6 h-6 text-purple-400" /> Admin Analytics & Platform Command Center
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Real-time aggregate platform metrics, daily active users, retention & learning statistics.
          </p>
        </div>

        <span className="text-xs font-bold text-purple-300 bg-purple-500/20 px-3 py-1.5 rounded-xl border border-purple-500/30">
          ⚡ ADMIN ROLE AUTHORIZED
        </span>
      </div>

      {/* Top Admin Key Metrics Grid (4 Stat Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Registered Users */}
        <div className="p-5 rounded-3xl bg-zinc-900/90 border border-zinc-800/80 space-y-2">
          <div className="flex items-center justify-between text-zinc-400 text-xs font-bold uppercase">
            <span>Total Registered</span>
            <Users className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-3xl font-extrabold text-white">{adminStats.totalUsers.toLocaleString()}</div>
          <div className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> +{adminStats.newUsersToday} New Users Today
          </div>
        </div>

        {/* Active Users (DAU / WAU / MAU) */}
        <div className="p-5 rounded-3xl bg-zinc-900/90 border border-zinc-800/80 space-y-2">
          <div className="flex items-center justify-between text-zinc-400 text-xs font-bold uppercase">
            <span>Daily Active (DAU)</span>
            <Activity className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-extrabold text-white">{adminStats.dailyActiveUsers.toLocaleString()}</div>
          <div className="text-xs text-zinc-400">
            WAU: <strong className="text-zinc-200">{adminStats.weeklyActiveUsers.toLocaleString()}</strong> • MAU: <strong className="text-zinc-200">{adminStats.monthlyActiveUsers.toLocaleString()}</strong>
          </div>
        </div>

        {/* Avg Session Time */}
        <div className="p-5 rounded-3xl bg-zinc-900/90 border border-zinc-800/80 space-y-2">
          <div className="flex items-center justify-between text-zinc-400 text-xs font-bold uppercase">
            <span>Avg Session Time</span>
            <Clock className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-3xl font-extrabold text-white">{adminStats.avgSessionTimeMinutes} mins</div>
          <div className="text-xs text-blue-400 font-semibold">High Platform Engagement</div>
        </div>

        {/* Retention Rate */}
        <div className="p-5 rounded-3xl bg-zinc-900/90 border border-zinc-800/80 space-y-2">
          <div className="flex items-center justify-between text-zinc-400 text-xs font-bold uppercase">
            <span>Retention Rate</span>
            <TrendingUp className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-extrabold text-amber-400">{adminStats.retentionRatePercent}%</div>
          <div className="text-xs text-zinc-400">30-day cohort retention</div>
        </div>
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Most Popular Languages Bar Chart */}
        <div className="p-6 rounded-3xl bg-zinc-900/90 border border-zinc-800/80 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Code className="w-4 h-4 text-emerald-400" /> Most Popular Programming Languages
          </h3>

          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={adminStats.topLanguages}>
                <XAxis dataKey="language" stroke="#71717a" fontSize={11} />
                <YAxis stroke="#71717a" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '12px', fontSize: '12px' }} />
                <Bar dataKey="count" fill="#10b981" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Most Solved Topics Pie / List */}
        <div className="p-6 rounded-3xl bg-zinc-900/90 border border-zinc-800/80 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-purple-400" /> Most Solved DSA Topics across Platform
          </h3>

          <div className="space-y-3 pt-2">
            {adminStats.topSolvedTopics.map((top, idx) => (
              <div key={top.topic} className="p-3 bg-zinc-950 rounded-2xl border border-zinc-800/80 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-zinc-500">#0{idx + 1}</span>
                  <span className="font-bold text-white">{top.topic}</span>
                </div>
                <span className="font-mono font-bold text-purple-400">{top.count.toLocaleString()} Solved</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
