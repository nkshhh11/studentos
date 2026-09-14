'use client';

import React, { useState } from 'react';
import { useStudentOS } from '../../context/StudentOSContext';
import {
  Map,
  CheckCircle2,
  Lock,
  Flame,
  Sparkles,
  Award,
  ExternalLink,
  ChevronRight,
  BookOpen,
} from 'lucide-react';
import { RoadmapNode } from '../../types/studentos';

export default function RoadmapsPage() {
  const { roadmaps, updateNodeStatus, requireAuth } = useStudentOS();
  const [selectedRoadmapId, setSelectedRoadmapId] = useState<string>('rm_swe');

  // Skill Node Modal state
  const [selectedNode, setSelectedNode] = useState<{ node: RoadmapNode; roadmapId: string } | null>(null);

  const activeRoadmap = roadmaps.find((r) => r.id === selectedRoadmapId) || roadmaps[0];

  const handleStatusChange = (status: RoadmapNode['status']) => {
    requireAuth(() => {
      if (selectedNode) {
        updateNodeStatus(selectedNode.roadmapId, selectedNode.node.id, status);
        setSelectedNode({
          ...selectedNode,
          node: { ...selectedNode.node, status },
        });
      }
    }, 'Sign in to update your skill tree progress and earn XP.');
  };

  const getStatusBadge = (status: RoadmapNode['status']) => {
    switch (status) {
      case 'Mastered':
        return <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full text-[10px] font-bold">🏆 Mastered</span>;
      case 'Strong':
        return <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full text-[10px] font-bold">🔥 Strong</span>;
      case 'Learning':
        return <span className="bg-blue-500/20 text-blue-300 border border-blue-500/30 px-2 py-0.5 rounded-full text-[10px] font-bold">🌿 Learning</span>;
      case 'Started':
        return <span className="bg-purple-500/20 text-purple-300 border border-purple-500/30 px-2 py-0.5 rounded-full text-[10px] font-bold">🌱 Started</span>;
      default:
        return <span className="bg-zinc-800 text-zinc-500 px-2 py-0.5 rounded-full text-[10px]">🔒 Locked</span>;
    }
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Header */}
      <div className="pb-4 border-b border-zinc-800">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Map className="w-6 h-6 text-purple-400" /> Career Roadmaps & Interactive Skill Tree
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          Structured career progression paths with RPG-style skill tree nodes. Click any skill node to update status & earn XP.
        </p>
      </div>

      {/* Roadmap Selector Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {roadmaps.map((rm) => {
          const isSelected = rm.id === selectedRoadmapId;
          return (
            <button
              key={rm.id}
              onClick={() => setSelectedRoadmapId(rm.id)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all border cursor-pointer ${
                isSelected
                  ? 'bg-purple-500/10 border-purple-500/40 text-purple-300 shadow-lg shadow-purple-500/5'
                  : 'bg-zinc-900/90 border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              {rm.title} ({rm.overallProgressPercent}%)
            </button>
          );
        })}
      </div>

      {/* Selected Roadmap Header Card */}
      <div className="p-6 rounded-3xl bg-zinc-900/90 border border-zinc-800/80 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded-full border border-purple-500/20">
              Career Target: {activeRoadmap.careerGoal}
            </span>
            <h2 className="text-xl font-extrabold text-white mt-2">{activeRoadmap.title}</h2>
            <p className="text-xs text-zinc-400 mt-1 max-w-2xl">{activeRoadmap.description}</p>
          </div>

          <div className="text-right shrink-0 bg-zinc-950 p-4 rounded-2xl border border-zinc-800">
            <div className="text-2xl font-black text-purple-400">{activeRoadmap.overallProgressPercent}%</div>
            <div className="text-[10px] text-zinc-500 uppercase tracking-widest">Roadmap Mastery</div>
          </div>
        </div>

        <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-purple-500 to-emerald-400 h-full transition-all duration-500"
            style={{ width: `${activeRoadmap.overallProgressPercent}%` }}
          />
        </div>
      </div>

      {/* RPG Interactive Skill Tree Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-400" /> Interactive Skill Tree Nodes
          </h3>
          <span className="text-xs text-zinc-400">Click node to inspect & update status</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeRoadmap.nodes.map((node, idx) => (
            <div
              key={node.id}
              onClick={() => setSelectedNode({ node, roadmapId: activeRoadmap.id })}
              className={`p-5 rounded-3xl border transition-all cursor-pointer group relative overflow-hidden ${
                node.status === 'Mastered'
                  ? 'bg-amber-500/5 border-amber-500/30 hover:border-amber-500/60'
                  : node.status === 'Strong'
                  ? 'bg-emerald-500/5 border-emerald-500/30 hover:border-emerald-500/60'
                  : node.status === 'Learning' || node.status === 'Started'
                  ? 'bg-blue-500/5 border-blue-500/30 hover:border-blue-500/60'
                  : 'bg-zinc-900/60 border-zinc-800 opacity-60 hover:opacity-100'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                  Node {idx + 1} • {node.category}
                </span>
                {getStatusBadge(node.status)}
              </div>

              <h4 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">
                {node.title}
              </h4>
              <p className="text-xs text-zinc-400 mt-1 line-clamp-2">{node.description}</p>

              <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-500">
                <span>{node.resources.length} Verified Resources</span>
                <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-white transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Node Inspection Modal */}
      {selectedNode && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 w-full max-w-md rounded-3xl p-6 space-y-5 shadow-2xl">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/20">
                  {selectedNode.node.category}
                </span>
                <h3 className="text-lg font-bold text-white mt-1">{selectedNode.node.title}</h3>
              </div>
              <button onClick={() => setSelectedNode(null)} className="text-xs text-zinc-400 hover:text-white">
                Close
              </button>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed">{selectedNode.node.description}</p>

            {/* Change Status Buttons */}
            <div>
              <label className="text-xs font-semibold text-zinc-300 block mb-2">Update Skill Mastery Status:</label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {(['Started', 'Learning', 'Strong', 'Mastered'] as RoadmapNode['status'][]).map((st) => (
                  <button
                    key={st}
                    onClick={() => handleStatusChange(st)}
                    className={`py-2 px-3 rounded-xl font-bold border transition-all ${
                      selectedNode.node.status === st
                        ? 'bg-purple-600 text-white font-extrabold border-purple-500 shadow-md'
                        : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    {st === 'Mastered' ? '🏆 Mastered' : st === 'Strong' ? '🔥 Strong' : st === 'Learning' ? '🌿 Learning' : '🌱 Started'}
                  </button>
                ))}
              </div>
            </div>

            {/* Resources List */}
            {selectedNode.node.resources.length > 0 && (
              <div className="pt-2">
                <span className="text-xs font-semibold text-zinc-400 block mb-2">Recommended Study Resources:</span>
                <div className="space-y-1.5">
                  {selectedNode.node.resources.map((res, i) => (
                    <a
                      key={i}
                      href={res.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between p-2.5 bg-zinc-950 rounded-xl border border-zinc-800 text-xs text-zinc-200 hover:border-purple-500/40"
                    >
                      <span className="font-medium">{res.name}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-zinc-500" />
                    </a>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-2">
              <button
                onClick={() => setSelectedNode(null)}
                className="w-full py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs rounded-xl"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
