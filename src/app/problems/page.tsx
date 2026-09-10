'use client';

import React, { useState } from 'react';
import { useStudentOS } from '../../context/StudentOSContext';
import {
  Code2,
  Search,
  ExternalLink,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import { Problem } from '../../types/studentos';

export default function ProblemsPage() {
  const { problems, solveProblem, startProblem } = useStudentOS();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [selectedTopic, setSelectedTopic] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');

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
    <div className="space-y-5 pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-800/80">
        <div>
          <h1 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
            <Code2 className="w-5 h-5 text-zinc-400" /> Problem Explorer
          </h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            Browse and solve coding problems from LeetCode, Codeforces & CodeChef.
          </p>
        </div>

        <div className="text-xs bg-zinc-900 px-3 py-1 rounded-lg border border-zinc-800 text-zinc-400">
          Solved: <span className="text-zinc-100 font-medium">{problems.filter((p) => p.status === 'Solved').length} / {problems.length}</span>
        </div>
      </div>

      {/* Toolbar */}
      <div className="p-3.5 bg-zinc-900/80 rounded-xl border border-zinc-800/80 space-y-3">
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search problems or topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-zinc-100 focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          <div>
            <label className="text-[10px] text-zinc-400 block mb-0.5">Platform</label>
            <select
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-2 py-1 text-zinc-200 focus:outline-none"
            >
              {platforms.map((pl) => (
                <option key={pl} value={pl}>
                  {pl}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[10px] text-zinc-400 block mb-0.5">Difficulty</label>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-2 py-1 text-zinc-200 focus:outline-none"
            >
              {difficulties.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[10px] text-zinc-400 block mb-0.5">Topic</label>
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-2 py-1 text-zinc-200 focus:outline-none"
            >
              {topics.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[10px] text-zinc-400 block mb-0.5">Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-2 py-1 text-zinc-200 focus:outline-none"
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

      {/* Problems Table */}
      <div className="bg-zinc-900/90 rounded-xl border border-zinc-800/80 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-zinc-300">
            <thead className="bg-zinc-950 text-zinc-400 font-medium text-[10px] border-b border-zinc-800">
              <tr>
                <th className="py-2.5 px-3.5">Status</th>
                <th className="py-2.5 px-3.5">Problem Title</th>
                <th className="py-2.5 px-3.5">Topic</th>
                <th className="py-2.5 px-3.5">Platform</th>
                <th className="py-2.5 px-3.5">Difficulty</th>
                <th className="py-2.5 px-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {filteredProblems.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-6 text-center text-zinc-500 italic">
                    No problems match your search.
                  </td>
                </tr>
              ) : (
                filteredProblems.map((prob) => (
                  <tr key={prob.id} className="hover:bg-zinc-800/40 transition-colors">
                    <td className="py-2.5 px-3.5">
                      {prob.status === 'Solved' ? (
                        <span className="inline-flex items-center gap-1 text-emerald-400 text-[11px] font-medium">
                          <CheckCircle2 className="w-3 h-3" /> Solved
                        </span>
                      ) : prob.status === 'Attempted' ? (
                        <span className="inline-flex items-center gap-1 text-amber-400 text-[11px] font-medium">
                          <Clock className="w-3 h-3" /> Attempted
                        </span>
                      ) : (
                        <span className="text-zinc-500 text-[11px]">Unsolved</span>
                      )}
                    </td>

                    <td className="py-2.5 px-3.5 font-medium text-zinc-100">
                      {prob.title}
                    </td>

                    <td className="py-2.5 px-3.5 text-zinc-400">{prob.topic}</td>

                    <td className="py-2.5 px-3.5 text-zinc-300">{prob.platform}</td>

                    <td className="py-2.5 px-3.5">
                      <span
                        className={`text-[11px] font-medium ${
                          prob.difficulty === 'Easy'
                            ? 'text-emerald-400'
                            : prob.difficulty === 'Medium'
                            ? 'text-amber-400'
                            : 'text-rose-400'
                        }`}
                      >
                        {prob.difficulty}
                      </span>
                    </td>

                    <td className="py-2.5 px-3.5 text-right">
                      <button
                        onClick={() => handleOpenProblem(prob)}
                        className="inline-flex items-center gap-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 text-xs px-2.5 py-1 rounded transition-all cursor-pointer"
                      >
                        <span>Solve</span>
                        <ExternalLink className="w-3 h-3 text-zinc-400" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Active Solve Modal */}
      {activeSolveProblem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 w-full max-w-md rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-zinc-100">
                Session Active: {activeSolveProblem.title}
              </h3>
              <span className="text-xs text-zinc-400">
                +{activeSolveProblem.difficulty === 'Easy' ? 15 : activeSolveProblem.difficulty === 'Medium' ? 30 : 60} XP
              </span>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed">
              Solve the problem on official {activeSolveProblem.platform}. Click below to mark it solved when finished.
            </p>

            <div>
              <label className="text-xs text-zinc-300 block mb-1">Takeaways / Notes (Optional)</label>
              <textarea
                value={personalNotes}
                onChange={(e) => setPersonalNotes(e.target.value)}
                placeholder="Key takeaways..."
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-xs text-zinc-100 focus:outline-none h-16"
              />
            </div>

            <div className="flex gap-2 pt-1">
              <button
                onClick={() => setActiveSolveProblem(null)}
                className="flex-1 py-2 rounded-lg border border-zinc-800 text-xs text-zinc-400 hover:text-zinc-200"
              >
                Close
              </button>
              <button
                onClick={handleMarkSolved}
                className="flex-1 py-2 rounded-lg bg-zinc-100 text-zinc-950 font-semibold text-xs hover:bg-zinc-200"
              >
                Mark Solved
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
