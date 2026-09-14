'use client';

import React, { useState } from 'react';
import { useStudentOS } from '../../context/StudentOSContext';
import {
  Bot,
  Send,
  Sparkles,
  Target,
  FileText,
  Building2,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  User,
} from 'lucide-react';

export default function AIMentorPage() {
  const { user, aiMessages, sendAIMessage, careerReport, requireAuth } = useStudentOS();
  const [inputText, setInputText] = useState('');
  const [activeTab, setActiveTab] = useState<'mentor' | 'career' | 'resume' | 'company'>('mentor');

  // Resume Analyzer state
  const [resumeText, setResumeText] = useState('');
  const [isAnalyzingResume, setIsAnalyzingResume] = useState(false);
  const [resumeFeedback, setResumeFeedback] = useState<string | null>(null);

  // Selected Target Company Track
  const [selectedCompany, setSelectedCompany] = useState('Amazon');

  const companyKits = {
    Amazon: {
      role: 'SDE-1 Interview Track',
      dsaFocus: ['Arrays & Hashing', 'Trees & Graphs (BFS/DFS)', 'Sliding Window', 'Dynamic Programming'],
      coreCS: ['Object-Oriented Design (OOD)', 'Database Indexing', 'Concurrency & Threading'],
      behavioral: ['Amazon 16 Leadership Principles', 'STAR Format Storytelling'],
    },
    Google: {
      role: 'Software Engineer L3 Track',
      dsaFocus: ['Advanced Graph Algorithms (Dijkstra, DSU)', 'Binary Search space reduction', 'Hard Dynamic Programming', 'Tries'],
      coreCS: ['Operating System Memory Management', 'System Design Basics'],
      behavioral: ['Googliness', 'Handling ambiguity'],
    },
    Microsoft: {
      role: 'Software Engineer 1 Track',
      dsaFocus: ['Linked Lists', 'Binary Search Trees', 'Strings & Parsing', 'Recursion'],
      coreCS: ['Object Oriented Programming', 'DBMS & SQL Queries'],
      behavioral: ['Growth Mindset', 'Collaboration stories'],
    },
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    requireAuth(() => {
      if (inputText.trim()) {
        sendAIMessage(inputText.trim());
        setInputText('');
      }
    }, 'Sign in to chat with your personal AI SDE Mentor.');
  };

  const handleQuickSuggestion = (text: string) => {
    requireAuth(() => {
      sendAIMessage(text);
    }, 'Sign in to chat with your personal AI SDE Mentor.');
  };

  const handleAnalyzeResume = () => {
    requireAuth(() => {
      if (!resumeText.trim()) return;
      setIsAnalyzingResume(true);
      setTimeout(() => {
        setIsAnalyzingResume(false);
        setResumeFeedback(
          "ATS Score: 78/100 📄\n\nStrengths:\n✓ Strong project section with technologies (Next.js, TypeScript, C++)\n✓ Clear education metrics\n\nSuggestions for Improvement:\n• Add quantifiable impact metrics (e.g. 'Optimized API response time by 35%')\n• Include key ATS keywords for SDE: 'Data Structures', 'REST APIs', 'Unit Testing', 'CI/CD'."
        );
      }, 1800);
    }, 'Sign in to run ATS AI Analysis on your resume.');
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Header */}
      <div className="pb-4 border-b border-zinc-800">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Bot className="w-6 h-6 text-purple-400" /> AI Mentor & Career Intelligence Center
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          Context-aware study guidance, career readiness analysis, ATS resume evaluation & company prep tracks.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-zinc-800 pb-3">
        <button
          onClick={() => setActiveTab('mentor')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
            activeTab === 'mentor'
              ? 'bg-purple-500/20 border-purple-500/40 text-purple-300'
              : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
          }`}
        >
          🤖 AI Study Mentor
        </button>
        <button
          onClick={() => setActiveTab('career')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
            activeTab === 'career'
              ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
              : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
          }`}
        >
          🎯 Career Readiness ({careerReport.scorePercent}%)
        </button>
        <button
          onClick={() => setActiveTab('resume')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
            activeTab === 'resume'
              ? 'bg-blue-500/20 border-blue-500/40 text-blue-300'
              : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
          }`}
        >
          📄 Resume ATS Analyzer
        </button>
        <button
          onClick={() => setActiveTab('company')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
            activeTab === 'company'
              ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
              : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
          }`}
        >
          🏢 Target Company Prep Mode
        </button>
      </div>

      {/* Tab 1: AI Study Mentor Chat */}
      {activeTab === 'mentor' && (
        <div className="bg-zinc-900/90 rounded-3xl border border-zinc-800/80 flex flex-col h-[580px] overflow-hidden">
          {/* Chat Messages Area */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4">
            {aiMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-8 h-8 rounded-xl bg-purple-500/20 border border-purple-500/30 text-purple-300 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div className={`max-w-xl space-y-2 ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                  <div
                    className={`p-4 rounded-2xl text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-purple-600 text-white rounded-br-none'
                        : 'bg-zinc-950 border border-zinc-800 text-zinc-200 rounded-bl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <div className="text-[10px] text-zinc-500 px-1">{msg.timestamp}</div>

                  {/* Suggestions pills if available */}
                  {msg.suggestions && msg.suggestions.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {msg.suggestions.map((s, i) => (
                        <button
                          key={i}
                          onClick={() => handleQuickSuggestion(s)}
                          className="text-[11px] bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 px-2.5 py-1 rounded-xl border border-purple-500/20 transition-colors cursor-pointer"
                        >
                          💡 {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {msg.sender === 'user' && (
                  <div className="w-8 h-8 rounded-xl bg-zinc-800 flex items-center justify-center text-zinc-300 shrink-0">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Input Box */}
          <form onSubmit={handleSend} className="p-4 bg-zinc-950 border-t border-zinc-800/80 flex gap-3">
            <input
              type="text"
              placeholder="Ask AI Mentor anything about DSA, DP, C++, or study plans..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shadow-md"
            >
              <span>Send</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}

      {/* Tab 2: Career Readiness Report */}
      {activeTab === 'career' && (
        <div className="space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/90 border border-zinc-800/80 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                Target Role: {careerReport.targetRole}
              </span>
              <h2 className="text-2xl font-extrabold text-white mt-2">Overall Career Readiness Score</h2>
              <p className="text-xs text-zinc-400 mt-1 max-w-xl">
                Calculated based on your solved problems, roadmap progress, streak consistency, and topic confidence scores.
              </p>
            </div>

            <div className="text-center p-6 bg-zinc-950 rounded-3xl border border-zinc-800 shrink-0">
              <div className="text-4xl font-black text-emerald-400">{careerReport.scorePercent}%</div>
              <div className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1">Placement Ready</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Strengths */}
            <div className="p-6 rounded-3xl bg-emerald-500/5 border border-emerald-500/20 space-y-3">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> Demonstrated Strengths
              </h3>
              <ul className="space-y-2 text-xs text-zinc-300">
                {careerReport.strengths.map((str, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Weak Areas */}
            <div className="p-6 rounded-3xl bg-rose-500/5 border border-rose-500/20 space-y-3">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" /> Focus Weak Areas
              </h3>
              <ul className="space-y-2 text-xs text-zinc-300">
                {careerReport.weakAreas.map((weak, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="text-rose-400 font-bold">•</span>
                    <span>{weak}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Resume ATS Analyzer */}
      {activeTab === 'resume' && (
        <div className="p-6 rounded-3xl bg-zinc-900/90 border border-zinc-800/80 space-y-4">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-400" /> Resume ATS & Skill Keyword Analyzer
            </h2>
            <p className="text-xs text-zinc-400 mt-1">
              Paste your resume text below to analyze keyword matching, formatting structure & SDE ATS compatibility.
            </p>
          </div>

          <textarea
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            placeholder="Paste your resume text here (Education, Projects, Skills, Experience)..."
            className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-4 text-xs text-white focus:outline-none focus:border-blue-500 h-44 font-mono"
          />

          <button
            onClick={handleAnalyzeResume}
            disabled={isAnalyzingResume || !resumeText.trim()}
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-indigo-500/20 transition-all cursor-pointer"
          >
            {isAnalyzingResume ? 'Evaluating Resume...' : 'Analyze Resume ATS Score'}
          </button>

          {resumeFeedback && (
            <div className="p-4 bg-zinc-950 rounded-2xl border border-zinc-800 text-xs text-zinc-200 whitespace-pre-line leading-relaxed">
              {resumeFeedback}
            </div>
          )}
        </div>
      )}

      {/* Tab 4: Target Company Prep Mode */}
      {activeTab === 'company' && (
        <div className="space-y-6">
          <div className="flex gap-2">
            {Object.keys(companyKits).map((comp) => (
              <button
                key={comp}
                onClick={() => setSelectedCompany(comp)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                  selectedCompany === comp
                    ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                🏢 {comp} Prep Track
              </button>
            ))}
          </div>

          {companyKits[selectedCompany as keyof typeof companyKits] && (
            <div className="p-6 rounded-3xl bg-zinc-900/90 border border-zinc-800/80 space-y-6">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                  Target Company: {selectedCompany}
                </span>
                <h2 className="text-xl font-extrabold text-white mt-2">
                  {companyKits[selectedCompany as keyof typeof companyKits].role}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="p-4 bg-zinc-950 rounded-2xl border border-zinc-800 space-y-2">
                  <h3 className="font-bold text-white">DSA Priority Focus</h3>
                  <ul className="space-y-1 text-zinc-400">
                    {companyKits[selectedCompany as keyof typeof companyKits].dsaFocus.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 bg-zinc-950 rounded-2xl border border-zinc-800 space-y-2">
                  <h3 className="font-bold text-white">Core CS Topics</h3>
                  <ul className="space-y-1 text-zinc-400">
                    {companyKits[selectedCompany as keyof typeof companyKits].coreCS.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 bg-zinc-950 rounded-2xl border border-zinc-800 space-y-2">
                  <h3 className="font-bold text-white">Behavioral & Cultural Fit</h3>
                  <ul className="space-y-1 text-zinc-400">
                    {companyKits[selectedCompany as keyof typeof companyKits].behavioral.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
