'use client';

import React, { useState } from 'react';
import { useStudentOS } from '../../context/StudentOSContext';
import {
  FolderGit2,
  Plus,
  GitBranch,
  CheckCircle2,
  Clock,
  Sparkles,
  ExternalLink,
  FileCode2,
} from 'lucide-react';

export default function ProjectsPage() {
  const { projects, addProjectTask, toggleProjectTask, requireAuth } = useStudentOS();
  const [selectedProjectId, setSelectedProjectId] = useState<string>(projects[0]?.id || '');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);

  const activeProject = projects.find((p) => p.id === selectedProjectId) || projects[0];

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    requireAuth(() => {
      if (newTaskTitle.trim() && activeProject) {
        addProjectTask(activeProject.id, newTaskTitle.trim());
        setNewTaskTitle('');
      }
    }, 'Sign in to add and manage your project tasks.');
  };

  const handleToggleTask = (projectId: string, taskId: string) => {
    requireAuth(() => {
      toggleProjectTask(projectId, taskId);
    }, 'Sign in to update your task completion status.');
  };

  const handleAnalyzePortfolio = () => {
    requireAuth(() => {
      setIsAnalyzing(true);
      setTimeout(() => {
        setIsAnalyzing(false);
        setAnalysisResult(
          "GitHub Portfolio Analysis Score: 85/100 🎉\n• Great technical diversity (Next.js, TypeScript, Docker, Redis)\n• Recommendation: Add a live demo GIF to README.md and include setup instructions for environment variables."
        );
      }, 1500);
    }, 'Sign in to run AI analysis on your GitHub portfolio.');
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <FolderGit2 className="w-6 h-6 text-teal-400" /> Student Projects & Task Manager
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Track tasks for personal engineering projects, link GitHub repositories, and run AI portfolio analysis.
          </p>
        </div>

        <button
          onClick={handleAnalyzePortfolio}
          disabled={isAnalyzing}
          className="flex items-center gap-2 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl shadow-lg shadow-teal-500/20 cursor-pointer disabled:opacity-50"
        >
          <Sparkles className="w-4 h-4 fill-white text-white" />
          {isAnalyzing ? 'Analyzing GitHub Repo...' : 'Run GitHub Portfolio AI Audit'}
        </button>
      </div>

      {/* AI Portfolio Audit Banner */}
      {analysisResult && (
        <div className="p-4 bg-teal-500/10 border border-teal-500/30 rounded-2xl text-xs text-teal-300 flex items-start justify-between gap-3">
          <div className="whitespace-pre-line leading-relaxed">{analysisResult}</div>
          <button onClick={() => setAnalysisResult(null)} className="text-zinc-400 hover:text-white cursor-pointer">
            ✕
          </button>
        </div>
      )}

      {/* Main Grid: Projects Selector & Project Details */}
      {projects.length === 0 ? (
        <div className="p-12 text-center bg-zinc-900/60 rounded-3xl border border-zinc-800 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-zinc-800 text-teal-400 flex items-center justify-center mx-auto">
            <FolderGit2 className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white">No tasks or projects yet</h3>
          <p className="text-xs text-zinc-400 max-w-md mx-auto">
            Start organizing your student life by creating your first engineering project or personal task list.
          </p>
          <button
            onClick={() => requireAuth(() => {}, 'Sign in to create your first personal project.')}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-teal-600 hover:bg-teal-500 text-white font-extrabold text-xs rounded-xl cursor-pointer shadow-lg"
          >
            <Plus className="w-4 h-4" /> Create Your First Project
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Projects List (1 col) */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Your Projects</h3>
            {projects.map((proj) => {
              const isSelected = proj.id === (activeProject?.id || selectedProjectId);
              return (
                <div
                  key={proj.id}
                  onClick={() => setSelectedProjectId(proj.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-teal-500/10 border-teal-500/40 text-white shadow-lg shadow-teal-500/5'
                      : 'bg-zinc-900/90 border-zinc-800 text-zinc-400 hover:bg-zinc-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white">{proj.title}</h4>
                    <span className="text-xs font-mono font-bold text-teal-400">{proj.progressPercent}%</span>
                  </div>
                  <p className="text-xs text-zinc-400 mt-1 line-clamp-1">{proj.description}</p>
                  <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden mt-3">
                    <div className="bg-teal-400 h-full" style={{ width: `${proj.progressPercent}%` }} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Active Project Details & Task Management (2 cols) */}
          {activeProject && (
            <div className="lg:col-span-2 space-y-6">
              <div className="p-6 rounded-3xl bg-zinc-900/90 border border-zinc-800/80 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-extrabold text-white">{activeProject.title}</h2>
                    <p className="text-xs text-zinc-400 mt-1">{activeProject.description}</p>
                  </div>

                  {activeProject.githubUrl && (
                    <a
                      href={activeProject.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 bg-zinc-950 hover:bg-zinc-800 text-xs font-semibold text-zinc-200 px-3 py-2 rounded-xl border border-zinc-800 transition-colors shrink-0"
                    >
                      <GitBranch className="w-4 h-4" /> GitHub Repository <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {activeProject.techStack.map((tech) => (
                    <span key={tech} className="text-xs bg-zinc-950 text-teal-300 px-2.5 py-1 rounded-xl border border-zinc-800 font-mono">
                      #{tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Task Management Kanban / Checklist */}
              <div className="p-6 rounded-3xl bg-zinc-900/90 border border-zinc-800/80 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-400" /> Tasks & Milestones
                  </h3>
                  <span className="text-xs text-zinc-400 font-mono">
                    {activeProject.tasks.filter((t) => t.status === 'Completed').length} / {activeProject.tasks.length} Completed
                  </span>
                </div>

                {/* Add Task Form */}
                <form onSubmit={handleAddTask} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add a new project task..."
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white font-extrabold text-xs rounded-xl flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" /> Add Task
                  </button>
                </form>

                {/* Tasks List */}
                <div className="space-y-2">
                  {activeProject.tasks.length === 0 ? (
                    <div className="p-4 text-center text-xs text-zinc-500 border border-dashed border-zinc-800 rounded-xl">
                      No tasks yet in this project. Add one above!
                    </div>
                  ) : (
                    activeProject.tasks.map((task) => {
                      const isDone = task.status === 'Completed';
                      return (
                        <div
                          key={task.id}
                          onClick={() => handleToggleTask(activeProject.id, task.id)}
                          className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                            isDone
                              ? 'bg-teal-500/10 border-teal-500/30 text-zinc-400 line-through'
                              : 'bg-zinc-950 border-zinc-800 text-zinc-200 hover:border-zinc-700'
                          }`}
                        >
                          <div className="flex items-center gap-3 text-xs font-medium">
                            <div
                              className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 ${
                                isDone ? 'bg-teal-500 text-black' : 'bg-zinc-800 text-zinc-500'
                              }`}
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                            </div>
                            <span>{task.title}</span>
                          </div>

                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              isDone ? 'bg-teal-500/20 text-teal-300' : 'bg-zinc-800 text-zinc-400'
                            }`}
                          >
                            {task.status}
                          </span>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
