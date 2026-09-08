'use client';

import React, { useState } from 'react';
import { useStudentOS } from '../../context/StudentOSContext';
import {
  Code2,
  Search,
  ExternalLink,
  CheckCircle2,
  Clock,
  Filter,
  Sparkles,
  BookOpen,
  Plus,
  Zap,
} from 'lucide-react';
import { Difficulty, PlatformName, Problem } from '../../types/studentos';

export default function ProblemsPage() {
  const { problems, solveProblem, startProblem } = useStudentOS();

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [selectedTopic, setSelectedTopic] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');

  // Solved Modal state
  const [activeSolveProblem, setActiveSolveProblem] = useState<Problem | null>(null);
  const [personalNotes, setPersonalNotes] = useState('');

  const platforms = ['All', 'LeetCode', 'Codeforces', 'CodeChef', 'GeeksforGeeks', 'HackerRank'];
  const difficulties = ['All', 'Easy', 'Medium', 'Hard'];
  const topics = [
    'All',
    'Arrays',
    'Strings',
    'Hashing',
    'Trees',
    'Dynamic Programming',
    'Math',
    'Heap',
  ];
  const statuses = ['All', 'Solved', 'Attempted', 'Unsolved'];

  const filteredProblems = problems.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.topic.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPlatform = selectedPlatform === 'All' || p.platform === selectedPlatform;
    const matchesDifficulty = selectedDifficulty === 'All' || p.difficulty === selectedDifficulty;
    const matchesTopic = selectedTopic === 'All' || p.topic === selectedTopic;
    const matchesStatus = selectedStatus === 'All' || p.status === selectedStatus;

    return matchesSearch && matchesPlatform && matchesDifficulty && matchesTopic && matchesStatus;
  });

  const handleOpenProblem = (prob: Problem) => {
    startProblem(prob.id);
    window.open(prob.officialUrl, '_blank', 'noopener,noreferrer');
    setActiveSolveProblem(prob);
    setPersonalNotes(prob.personalNotes || '');
  };

  const handleMarkSolved = () => {
    if (activeSolveProblem) {
      solveProblem(activeSolveProblem.id, personalNotes);
      setActiveSolveProblem(null);
      setPersonalNotes('');
    }
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Code2 className="w-6 h-6 text-emerald-400" /> Universal Problem Explorer
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Discover coding problems from LeetCode, Codeforces & CodeChef. Solved problems grant XP & update your Universal Streak.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs bg-zinc-900 px-3 py-1.5 rounded-xl border border-zinc-800 text-zinc-400">
          <span className="text-emerald-400 font-bold">
            {problems.filter((p) => p.status === 'Solved').length} / {problems.length}
          </span>
          <span>Problems Solved</span>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="p-4 bg-zinc-900/90 rounded-2xl border border-zinc-800/80 space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search problems by name or topic (e.g., Two Sum, DP, Trees)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        {/* Dropdown Filters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div>
            <label className="text-[11px] text-zinc-400 block mb-1">Platform</label>
            <select
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-zinc-200 focus:outline-none"
            >
              {platforms.map((pl) => (
                <option key={pl} value={pl}>
                  {pl}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[11px] text-zinc-400 block mb-1">Difficulty</label>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-zinc-200 focus:outline-none"
            >
              {difficulties.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[11px] text-zinc-400 block mb-1">Topic</label>
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-zinc-200 focus:outline-none"
            >
              {topics.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[11px] text-zinc-400 block mb-1">Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-zinc-200 focus:outline-none"
            >
              {statuses.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Problems Table / List */}
      <div className="bg-zinc-900/90 rounded-3xl border border-zinc-800/80 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-zinc-300">
            <thead className="bg-zinc-950 text-zinc-400 uppercase tracking-wider font-semibold text-[10px] border-b border-zinc-800">
              <tr>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Problem Title</th>
                <th className="py-3.5 px-4">Topic</th>
                <th className="py-3.5 px-4">Platform</th>
                <th className="py-3.5 px-4">Difficulty</th>
                <th className="py-3.5 px-4">Companies</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {filteredProblems.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-zinc-500 italic">
                    No problems match your selected filters.
                  </td>
                </tr>
              ) : (
                filteredProblems.map((prob) => (
                  <tr key={prob.id} className="hover:bg-zinc-800/40 transition-colors group">
                    {/* Status */}
                    <td className="py-3.5 px-4">
                      {prob.status === 'Solved' ? (
                        <span className="inline-flex items-center gap-1 bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full text-[10px] font-bold border border-emerald-500/20">
                          <CheckCircle2 className="w-3 h-3" /> Solved
                        </span>
                      ) : prob.status === 'Attempted' ? (
                        <span className="inline-flex items-center gap-1 bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded-full text-[10px] font-bold border border-amber-500/20">
                          <Clock className="w-3 h-3" /> Attempted
                        </span>
                      ) : (
                        <span className="text-zinc-500 text-[10px]">Unsolved</span>
                      )}
                    </td>

                    {/* Title */}
                    <td className="py-3.5 px-4 font-semibold text-white group-hover:text-emerald-400 transition-colors">
                      {prob.title}
                    </td>

                    {/* Topic */}
                    <td className="py-3.5 px-4 text-zinc-400">{prob.topic}</td>

                    {/* Platform */}
                    <td className="py-3.5 px-4">
                      <span className="bg-zinc-800 px-2 py-0.5 rounded-md text-zinc-300 text-[11px] font-mono">
                        {prob.platform}
                      </span>
                    </td>

                    {/* Difficulty */}
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          prob.difficulty === 'Easy'
                            ? 'bg-emerald-500/10 text-emerald-400'
                            : prob.difficulty === 'Medium'
                            ? 'bg-amber-500/10 text-amber-400'
                            : 'bg-rose-500/10 text-rose-400'
                        }`}
                      >
                        {prob.difficulty}
                      </span>
                    </td>

                    {/* Companies */}
                    <td className="py-3.5 px-4">
                      <div className="flex flex-wrap gap-1">
                        {prob.companies?.slice(0, 2).map((comp) => (
                          <span key={comp} className="bg-zinc-950 text-zinc-400 text-[9px] px-1.5 py-0.5 rounded">
                            {comp}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* Action */}
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => handleOpenProblem(prob)}
                        className="inline-flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs px-3 py-1.5 rounded-xl transition-all cursor-pointer shadow-sm shadow-emerald-500/10"
                      >
                        <span>Solve</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Solve / Sync Confirmation Modal */}
      {activeSolveProblem && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 w-full max-w-md rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" /> Tracking Active Session
              </h3>
              <span className="text-xs text-emerald-400 font-mono">
                +{activeSolveProblem.difficulty === 'Easy' ? 15 : activeSolveProblem.difficulty === 'Medium' ? 30 : 60} XP
              </span>
            </div>

            <div className="p-3 bg-zinc-950 rounded-2xl border border-zinc-800 text-xs">
              <div className="font-bold text-white mb-0.5">{activeSolveProblem.title}</div>
              <div className="text-zinc-400">Platform: {activeSolveProblem.platform} • {activeSolveProblem.topic}</div>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed">
              We opened the official {activeSolveProblem.platform} page in your browser. Once you've solved it on the platform, click below to log your progress & claim your XP reward.
            </p>

            <div>
              <label className="text-xs text-zinc-300 font-medium block mb-1">Add Personal Notes / Key Takeaways</label>
              <textarea
                value={personalNotes}
                onChange={(e) => setPersonalNotes(e.target.value)}
                placeholder="e.g. O(N) HashMap approach, remember edge case for empty arrays..."
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500 h-20"
              />
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setActiveSolveProblem(null)}
                className="flex-1 py-2.5 rounded-xl border border-zinc-800 text-xs text-zinc-400 hover:text-white"
              >
                Cancel / Later
              </button>
              <button
                onClick={handleMarkSolved}
                className="flex-1 py-2.5 rounded-xl bg-emerald-500 text-black font-bold text-xs hover:bg-emerald-400 shadow-lg shadow-emerald-500/20"
              >
                Mark Solved & Claim XP
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
