'use client';

import React, { useState, useEffect } from 'react';
import { Search, X, Code, BookOpen, Map, FileText, ChevronRight } from 'lucide-react';
import { useStudentOS } from '../../context/StudentOSContext';
import Link from 'next/link';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ isOpen, onClose }) => {
  const { problems, dsaTopics, roadmaps, notes } = useStudentOS();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery('');
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredProblems = query.trim()
    ? problems.filter((p) => p.title.toLowerCase().includes(query.toLowerCase()) || p.topic.toLowerCase().includes(query.toLowerCase()))
    : problems.slice(0, 3);

  const filteredTopics = query.trim()
    ? dsaTopics.filter((t) => t.title.toLowerCase().includes(query.toLowerCase()))
    : dsaTopics.slice(0, 3);

  const filteredRoadmaps = query.trim()
    ? roadmaps.filter((r) => r.title.toLowerCase().includes(query.toLowerCase()))
    : roadmaps;

  const filteredNotes = query.trim()
    ? notes.filter((n) => n.title.toLowerCase().includes(query.toLowerCase()) || n.content.toLowerCase().includes(query.toLowerCase()))
    : notes.slice(0, 2);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-zinc-900 border border-zinc-800 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex items-center px-4 py-3 border-b border-zinc-800">
          <Search className="w-5 h-5 text-zinc-400 mr-3" />
          <input
            type="text"
            placeholder="Search problems, topics, roadmaps, notes (e.g. Binary Search)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-white placeholder-zinc-500 focus:outline-none text-base"
            autoFocus
          />
          <button onClick={onClose} className="p-1 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-6">
          {/* Problems */}
          <div>
            <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2 flex items-center gap-2">
              <Code className="w-4 h-4 text-emerald-400" /> Problems ({filteredProblems.length})
            </div>
            <div className="space-y-1">
              {filteredProblems.length === 0 ? (
                <div className="text-sm text-zinc-500 italic py-1">No matching problems</div>
              ) : (
                filteredProblems.map((prob) => (
                  <Link
                    key={prob.id}
                    href="/problems"
                    onClick={onClose}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-zinc-800/80 transition-colors group"
                  >
                    <div>
                      <div className="text-sm font-medium text-zinc-200 group-hover:text-emerald-400 transition-colors">
                        {prob.title}
                      </div>
                      <div className="text-xs text-zinc-400 flex items-center gap-2 mt-0.5">
                        <span className="bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-300">{prob.platform}</span>
                        <span>• {prob.topic}</span>
                      </div>
                    </div>
                    <span
                      className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        prob.difficulty === 'Easy'
                          ? 'bg-emerald-500/10 text-emerald-400'
                          : prob.difficulty === 'Medium'
                          ? 'bg-amber-500/10 text-amber-400'
                          : 'bg-rose-500/10 text-rose-400'
                      }`}
                    >
                      {prob.difficulty}
                    </span>
                  </Link>
                ))
              )}
            </div>
          </div>

          {/* Topics & Learning */}
          <div>
            <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-400" /> DSA & Knowledge Hub ({filteredTopics.length})
            </div>
            <div className="space-y-1">
              {filteredTopics.map((topic) => (
                <Link
                  key={topic.id}
                  href="/learn"
                  onClick={onClose}
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-zinc-800/80 transition-colors group"
                >
                  <div>
                    <div className="text-sm font-medium text-zinc-200 group-hover:text-blue-400 transition-colors">
                      {topic.title}
                    </div>
                    <div className="text-xs text-zinc-400">{topic.description}</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-white transition-colors" />
                </Link>
              ))}
            </div>
          </div>

          {/* Roadmaps */}
          <div>
            <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2 flex items-center gap-2">
              <Map className="w-4 h-4 text-purple-400" /> Career Roadmaps ({filteredRoadmaps.length})
            </div>
            <div className="space-y-1">
              {filteredRoadmaps.map((rm) => (
                <Link
                  key={rm.id}
                  href="/roadmaps"
                  onClick={onClose}
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-zinc-800/80 transition-colors group"
                >
                  <div className="text-sm font-medium text-zinc-200 group-hover:text-purple-400 transition-colors">
                    {rm.title}
                  </div>
                  <span className="text-xs text-zinc-400 bg-purple-500/10 text-purple-300 px-2 py-0.5 rounded-full">
                    {rm.overallProgressPercent}% Complete
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Personal Notes */}
          {filteredNotes.length > 0 && (
            <div>
              <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-400" /> Personal Notes
              </div>
              <div className="space-y-1">
                {filteredNotes.map((n) => (
                  <Link
                    key={n.id}
                    href="/analytics"
                    onClick={onClose}
                    className="block p-2.5 rounded-xl hover:bg-zinc-800/80 transition-colors"
                  >
                    <div className="text-sm font-medium text-zinc-200">{n.title}</div>
                    <div className="text-xs text-zinc-400 truncate">{n.content}</div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="px-4 py-2.5 bg-zinc-950/80 border-t border-zinc-800/80 text-xs text-zinc-500 flex items-center justify-between">
          <span>
            Press <kbd className="px-1.5 py-0.5 bg-zinc-800 rounded text-zinc-300">Esc</kbd> to close
          </span>
          <span>StudentOS Universal Search</span>
        </div>
      </div>
    </div>
  );
};
