'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useStudentOS } from '../../context/StudentOSContext';
import {
  BarChart3,
  Calendar,
  Clock,
  FileText,
  Plus,
  Trash2,
} from 'lucide-react';

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area,
} from 'recharts';

function AnalyticsContent() {
  const {
    user,
    notes,
    bookmarks,
    addNote,
    deleteNote,
    addBookmark,
    deleteBookmark,
    requireAuth,
  } = useStudentOS();

  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');

  const [activeTab, setActiveTab] = useState<'reports' | 'planner' | 'notes' | 'bookmarks'>('reports');

  useEffect(() => {
    if (tabParam === 'notes' || tabParam === 'planner' || tabParam === 'bookmarks' || tabParam === 'reports') {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  // Notes Form State
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [newNoteTag, setNewNoteTag] = useState('DSA');

  // Bookmarks Form State
  const [newBmTitle, setNewBmTitle] = useState('');
  const [newBmUrl, setNewBmUrl] = useState('');
  const [newBmCategory, setNewBmCategory] = useState<'Study Later' | 'Important' | 'Revision' | 'Interview'>('Study Later');

  const weeklyStudyData = [
    { day: 'Mon', hours: 2.2, problems: 3 },
    { day: 'Tue', hours: 3.0, problems: 4 },
    { day: 'Wed', hours: 1.5, problems: 2 },
    { day: 'Thu', hours: 2.5, problems: 3 },
    { day: 'Fri', hours: 3.5, problems: 5 },
    { day: 'Sat', hours: 4.0, problems: 6 },
    { day: 'Sun', hours: 2.0, problems: 2 },
  ];

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    requireAuth(() => {
      if (newNoteTitle.trim() && newNoteContent.trim()) {
        addNote({
          title: newNoteTitle.trim(),
          content: newNoteContent.trim(),
          tags: [newNoteTag],
        });
        setNewNoteTitle('');
        setNewNoteContent('');
      }
    }, 'Sign in to save and organize your personal study notes.');
  };

  const handleDeleteNote = (id: string) => {
    requireAuth(() => {
      deleteNote(id);
    }, 'Sign in to manage your saved notes.');
  };

  const handleAddBookmark = (e: React.FormEvent) => {
    e.preventDefault();
    requireAuth(() => {
      if (newBmTitle.trim() && newBmUrl.trim()) {
        addBookmark({
          title: newBmTitle.trim(),
          url: newBmUrl.trim(),
          category: newBmCategory,
          type: 'Article',
        });
        setNewBmTitle('');
        setNewBmUrl('');
      }
    }, 'Sign in to save personal study bookmarks.');
  };

  const handleDeleteBookmark = (id: string) => {
    requireAuth(() => {
      deleteBookmark(id);
    }, 'Sign in to manage your saved bookmarks.');
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Header */}
      <div className="pb-4 border-b border-zinc-800">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-emerald-400" /> Analytics, Planner & Knowledge Vault
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          Weekly performance reports, adaptive smart study planner, notes & bookmarks vault.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-2 border-b border-zinc-800 pb-3 flex-wrap">
        <button
          onClick={() => setActiveTab('reports')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
            activeTab === 'reports'
              ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
              : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
          }`}
        >
          📊 Weekly & Monthly Reports
        </button>
        <button
          onClick={() => setActiveTab('planner')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
            activeTab === 'planner'
              ? 'bg-blue-500/20 border-blue-500/40 text-blue-300'
              : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
          }`}
        >
          🗓️ Smart Study Planner & Calendar ({user?.availableStudyTime || '3-4 hrs/day'})
        </button>
        <button
          onClick={() => setActiveTab('notes')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
            activeTab === 'notes'
              ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
              : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
          }`}
        >
          📝 Personal Notes ({notes.length})
        </button>
        <button
          onClick={() => setActiveTab('bookmarks')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
            activeTab === 'bookmarks'
              ? 'bg-purple-500/20 border-purple-500/40 text-purple-300'
              : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
          }`}
        >
          🔖 Bookmarks ({bookmarks.length})
        </button>
      </div>

      {/* Tab 1: Weekly & Monthly Performance Reports */}
      {activeTab === 'reports' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-6 rounded-3xl bg-zinc-900/90 border border-zinc-800/80 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-400" /> Weekly Study Time (Hours)
                </h3>
                <span className="text-xs text-emerald-400 font-mono">Total: 18.7 Hours</span>
              </div>

              <div className="h-64 w-full pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyStudyData}>
                    <XAxis dataKey="day" stroke="#71717a" fontSize={11} />
                    <YAxis stroke="#71717a" fontSize={11} />
                    <Tooltip contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '12px', fontSize: '12px' }} />
                    <Bar dataKey="hours" fill="#10b981" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-zinc-900/90 border border-zinc-800/80 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-blue-400" /> Daily Problems Solved
                </h3>
                <span className="text-xs text-blue-400 font-mono">25 Problems This Week</span>
              </div>

              <div className="h-64 w-full pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={weeklyStudyData}>
                    <XAxis dataKey="day" stroke="#71717a" fontSize={11} />
                    <YAxis stroke="#71717a" fontSize={11} />
                    <Tooltip contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '12px', fontSize: '12px' }} />
                    <Area type="monotone" dataKey="problems" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Smart Study Planner / Calendar */}
      {activeTab === 'planner' && (
        <div className="p-6 rounded-3xl bg-zinc-900/90 border border-zinc-800/80 space-y-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/20">
              Allocated Time: {user?.availableStudyTime || '3-4 hrs/day'}
            </span>
            <h2 className="text-xl font-extrabold text-white mt-2 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-400" /> Adaptive Weekly Calendar & Study Schedule
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              Automatically balances DSA problem solving, core computer science concepts & project work.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
            {[
              { day: 'Monday', tasks: ['1h DSA Arrays & Hashing', '1h React/Next.js Project', '1h DBMS Indexing'] },
              { day: 'Tuesday', tasks: ['2h DSA Trees & Traversals', '1h C++ Memory Pointers'] },
              { day: 'Wednesday', tasks: ['1h LeetCode Mediums', '1h System Design Basics', '1h Revision'] },
              { day: 'Thursday', tasks: ['2h Dynamic Programming 1D', '1h Project Tasks'] },
              { day: 'Friday', tasks: ['1h DSA Graphs BFS/DFS', '1h OS Concurrency', '1h AI Mentor Quiz'] },
              { day: 'Saturday (Focus Day)', tasks: ['2h Codeforces Contest / Practice', '2h Full Stack Dev'] },
            ].map((p) => (
              <div key={p.day} className="p-4 bg-zinc-950 rounded-2xl border border-zinc-800 space-y-2">
                <h4 className="text-xs font-bold text-blue-300">{p.day}</h4>
                <div className="space-y-1.5 text-xs text-zinc-300">
                  {p.tasks.map((t, idx) => (
                    <div key={idx} className="p-2 bg-zinc-900 rounded-xl border border-zinc-800/60">
                      • {t}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Personal Notes */}
      {activeTab === 'notes' && (
        <div className="space-y-6">
          <form onSubmit={handleAddNote} className="p-6 rounded-3xl bg-zinc-900/90 border border-zinc-800/80 space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Plus className="w-4 h-4 text-amber-400" /> Create Personal Note
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                type="text"
                placeholder="Note Title (e.g., Recursion Call Stack rule)..."
                value={newNoteTitle}
                onChange={(e) => setNewNoteTitle(e.target.value)}
                className="sm:col-span-2 bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              />
              <select
                value={newNoteTag}
                onChange={(e) => setNewNoteTag(e.target.value)}
                className="bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-zinc-200 focus:outline-none"
              >
                <option value="DSA">DSA</option>
                <option value="Dynamic Programming">Dynamic Programming</option>
                <option value="LeetCode">LeetCode</option>
                <option value="General">General</option>
              </select>
            </div>
            <textarea
              placeholder="Write your personal notes or code takeaway..."
              value={newNoteContent}
              onChange={(e) => setNewNoteContent(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-500 h-20"
            />
            <button
              type="submit"
              className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs rounded-xl cursor-pointer"
            >
              Save Note
            </button>
          </form>

          {notes.length === 0 ? (
            <div className="p-8 text-center bg-zinc-900/60 rounded-3xl border border-zinc-800 space-y-2">
              <FileText className="w-8 h-8 text-amber-400 mx-auto opacity-80" />
              <h4 className="text-sm font-bold text-white">No notes yet</h4>
              <p className="text-xs text-zinc-400">Save key algorithms, solution patterns, or personal study reminders above.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {notes.map((n) => (
                <div key={n.id} className="p-4 bg-zinc-900/90 rounded-2xl border border-zinc-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-white">{n.title}</h4>
                    <button onClick={() => handleDeleteNote(n.id)} className="text-zinc-500 hover:text-rose-400 cursor-pointer">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed">{n.content}</p>
                  <div className="flex flex-wrap gap-1 pt-2">
                    {n.tags.map((t) => (
                      <span key={t} className="text-[10px] bg-amber-500/10 text-amber-300 px-2 py-0.5 rounded-md border border-amber-500/20">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 4: Bookmarks */}
      {activeTab === 'bookmarks' && (
        <div className="space-y-6">
          <form onSubmit={handleAddBookmark} className="p-6 rounded-3xl bg-zinc-900/90 border border-zinc-800/80 space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Plus className="w-4 h-4 text-purple-400" /> Add Bookmark
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                type="text"
                placeholder="Title (e.g. NeetCode 150)..."
                value={newBmTitle}
                onChange={(e) => setNewBmTitle(e.target.value)}
                className="bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
              />
              <input
                type="url"
                placeholder="URL (https://...)..."
                value={newBmUrl}
                onChange={(e) => setNewBmUrl(e.target.value)}
                className="bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
              />
              <select
                value={newBmCategory}
                onChange={(e) => setNewBmCategory(e.target.value as any)}
                className="bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-200 focus:outline-none"
              >
                <option value="Study Later">Study Later</option>
                <option value="Important">Important</option>
                <option value="Revision">Revision</option>
                <option value="Interview">Interview</option>
              </select>
            </div>
            <button
              type="submit"
              className="px-5 py-2 bg-purple-500 hover:bg-purple-400 text-black font-bold text-xs rounded-xl cursor-pointer"
            >
              Add Bookmark
            </button>
          </form>

          {bookmarks.length === 0 ? (
            <div className="p-8 text-center bg-zinc-900/60 rounded-3xl border border-zinc-800 space-y-2">
              <Calendar className="w-8 h-8 text-purple-400 mx-auto opacity-80" />
              <h4 className="text-sm font-bold text-white">No bookmarks yet</h4>
              <p className="text-xs text-zinc-400">Save helpful articles, documentation, or video tutorials for quick access.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {bookmarks.map((bm) => (
                <div key={bm.id} className="p-3 bg-zinc-900/90 rounded-xl border border-zinc-800 flex items-center justify-between text-xs">
                  <div>
                    <a href={bm.url} target="_blank" rel="noreferrer" className="font-bold text-white hover:text-purple-300">
                      {bm.title}
                    </a>
                    <div className="text-[10px] text-zinc-400">{bm.url}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="bg-purple-500/10 text-purple-300 px-2 py-0.5 rounded-full text-[10px]">
                      {bm.category}
                    </span>
                    <button onClick={() => handleDeleteBookmark(bm.id)} className="text-zinc-500 hover:text-rose-400 cursor-pointer">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function AnalyticsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-xs text-zinc-400">Loading vault...</div>}>
      <AnalyticsContent />
    </Suspense>
  );
}
