'use client';

import React, { useState } from 'react';
import { useStudentOS } from '../../context/StudentOSContext';
import {
  BookOpen,
  CheckCircle2,
  HelpCircle,
  ExternalLink,
  AlertCircle,
  Sparkles,
  Zap,
  Award,
  ChevronRight,
} from 'lucide-react';
import { LANGUAGE_HUB } from '../../data/mockData';
import { LanguageHubItem, ProgrammingLanguage, QuizQuestion } from '../../types/studentos';

export default function LearnPage() {
  const { dsaTopics, updateTopicProgress, requireAuth } = useStudentOS();
  const [selectedLangId, setSelectedLangId] = useState<ProgrammingLanguage>('C++');

  // Quiz Modal State
  const [activeQuizLang, setActiveQuizLang] = useState<LanguageHubItem | null>(null);
  const [currentQuizIdx, setCurrentQuizIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  const currentLang = LANGUAGE_HUB.find((l) => l.id === selectedLangId) || LANGUAGE_HUB[0];

  const handleStartQuiz = (lang: LanguageHubItem) => {
    requireAuth(() => {
      setActiveQuizLang(lang);
      setCurrentQuizIdx(0);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
      setQuizScore(0);
      setIsQuizCompleted(false);
    }, 'Sign in to attempt language quizzes and test your skills.');
  };

  const handleSelectOption = (idx: number) => {
    if (!isAnswerSubmitted) {
      setSelectedOption(idx);
    }
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || !activeQuizLang) return;
    setIsAnswerSubmitted(true);
    const q = activeQuizLang.quizzes[currentQuizIdx];
    if (selectedOption === q.correctAnswer) {
      setQuizScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (!activeQuizLang) return;
    if (currentQuizIdx + 1 < activeQuizLang.quizzes.length) {
      setCurrentQuizIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setIsQuizCompleted(true);
    }
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Header */}
      <div className="pb-4 border-b border-zinc-800">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-blue-400" /> Programming Language Knowledge Hub
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          Master programming language strategies, core concepts, official docs & interactive quizzes.
        </p>
      </div>

      {/* Language Tabs Bar */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {LANGUAGE_HUB.map((lang) => {
          const isSelected = lang.id === selectedLangId;
          return (
            <button
              key={lang.id}
              onClick={() => setSelectedLangId(lang.id)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all border cursor-pointer ${
                isSelected
                  ? 'bg-blue-500/10 border-blue-500/40 text-blue-400 shadow-lg shadow-blue-500/5'
                  : 'bg-zinc-900/90 border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              {lang.name}
            </button>
          );
        })}
      </div>

      {/* Selected Language Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Language Overview & Strategy (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Main Card */}
          <div className="p-6 rounded-3xl bg-zinc-900/90 border border-zinc-800/80 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-full border border-blue-500/20">
                  {currentLang.name} Hub
                </span>
                <h2 className="text-xl font-extrabold text-white mt-2">{currentLang.tagline}</h2>
                <p className="text-xs text-zinc-300 leading-relaxed mt-1">{currentLang.description}</p>
              </div>

              <a
                href={currentLang.documentationUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 font-semibold bg-blue-500/10 px-3 py-1.5 rounded-xl border border-blue-500/20 shrink-0"
              >
                Official Docs <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Career Opportunities Tags */}
            <div className="pt-2">
              <span className="text-[11px] text-zinc-400 font-medium block mb-2">Primary Industry Applications:</span>
              <div className="flex flex-wrap gap-2">
                {currentLang.careerUses.map((use) => (
                  <span
                    key={use}
                    className="text-xs bg-zinc-950 text-zinc-300 px-3 py-1 rounded-xl border border-zinc-800"
                  >
                    🚀 {use}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Strategy Roadmap Phases */}
          <div className="p-6 rounded-3xl bg-zinc-900/90 border border-zinc-800/80 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" /> Recommended {currentLang.name} Learning Strategy
            </h3>

            <div className="space-y-3">
              {currentLang.strategyPhases.map((phase) => (
                <div
                  key={phase.phase}
                  className="p-4 bg-zinc-950/60 rounded-2xl border border-zinc-800/80 flex items-start gap-4"
                >
                  <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 font-bold text-xs flex items-center justify-center shrink-0">
                    P{phase.phase}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">{phase.title}</h4>
                    <p className="text-xs text-zinc-400 mt-0.5">{phase.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Common Mistakes */}
          <div className="p-6 rounded-3xl bg-rose-500/5 border border-rose-500/20 space-y-3">
            <h3 className="text-sm font-bold text-rose-400 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" /> Common {currentLang.name} Pitfalls to Avoid
            </h3>
            <ul className="space-y-2 text-xs text-zinc-300">
              {currentLang.commonMistakes.map((mistake, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span>{mistake}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: Quizzes & Core CS Overview */}
        <div className="space-y-6">
          {/* Interactive Quiz Launcher */}
          <div className="p-6 rounded-3xl bg-gradient-to-b from-blue-950/30 to-zinc-900 border border-blue-500/20 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-500/20 flex items-center justify-center text-blue-400">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Interactive {currentLang.name} Quiz</h3>
                <p className="text-xs text-zinc-400">Test your mastery & gain +50 XP</p>
              </div>
            </div>

            <p className="text-xs text-zinc-300">
              Challenge yourself with real interview questions on memory management, time complexity & language quirks.
            </p>

            <button
              onClick={() => handleStartQuiz(currentLang)}
              className="w-full py-3 rounded-2xl bg-blue-500 hover:bg-blue-400 text-black font-bold text-xs transition-colors shadow-lg shadow-blue-500/20 cursor-pointer"
            >
              Start {currentLang.name} Quiz Now
            </button>
          </div>

          {/* Key Topics Checklist */}
          <div className="p-6 rounded-3xl bg-zinc-900/90 border border-zinc-800/80 space-y-3">
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Must-Know Concepts</h3>
            <div className="space-y-2">
              {currentLang.keyTopics.map((kt) => (
                <div key={kt} className="p-2.5 bg-zinc-950 rounded-xl border border-zinc-800/60 text-xs text-zinc-200 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{kt}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quiz Modal */}
      {activeQuizLang && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 w-full max-w-lg rounded-3xl p-6 space-y-5 shadow-2xl">
            {!isQuizCompleted ? (
              <>
                {/* Header */}
                <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                  <span className="text-xs font-bold text-blue-400">
                    {activeQuizLang.name} Quiz • Question {currentQuizIdx + 1} of {activeQuizLang.quizzes.length}
                  </span>
                  <button
                    onClick={() => setActiveQuizLang(null)}
                    className="text-xs text-zinc-400 hover:text-white"
                  >
                    Close
                  </button>
                </div>

                {/* Question */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-white leading-relaxed">
                    {activeQuizLang.quizzes[currentQuizIdx].question}
                  </h3>

                  <div className="space-y-2 pt-2">
                    {activeQuizLang.quizzes[currentQuizIdx].options.map((opt, oIdx) => {
                      let btnStyle = 'bg-zinc-950 border-zinc-800 text-zinc-300 hover:border-zinc-700';
                      if (selectedOption === oIdx) {
                        btnStyle = 'bg-blue-500/20 border-blue-500 text-blue-300 font-semibold';
                      }
                      if (isAnswerSubmitted) {
                        if (oIdx === activeQuizLang.quizzes[currentQuizIdx].correctAnswer) {
                          btnStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold';
                        } else if (selectedOption === oIdx) {
                          btnStyle = 'bg-rose-500/20 border-rose-500 text-rose-300';
                        }
                      }

                      return (
                        <button
                          key={oIdx}
                          onClick={() => handleSelectOption(oIdx)}
                          disabled={isAnswerSubmitted}
                          className={`w-full text-left p-3 rounded-xl border text-xs transition-all ${btnStyle}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Explanation */}
                {isAnswerSubmitted && (
                  <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 text-xs space-y-1">
                    <span className="font-bold text-zinc-200">Explanation:</span>
                    <p className="text-zinc-400">{activeQuizLang.quizzes[currentQuizIdx].explanation}</p>
                  </div>
                )}

                {/* Footer Controls */}
                <div className="flex justify-end pt-2 border-t border-zinc-800">
                  {!isAnswerSubmitted ? (
                    <button
                      onClick={handleSubmitAnswer}
                      disabled={selectedOption === null}
                      className="px-5 py-2 bg-blue-500 hover:bg-blue-400 disabled:opacity-50 text-black font-bold text-xs rounded-xl transition-colors cursor-pointer"
                    >
                      Submit Answer
                    </button>
                  ) : (
                    <button
                      onClick={handleNextQuestion}
                      className="px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs rounded-xl transition-colors cursor-pointer flex items-center gap-1"
                    >
                      Next Question <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </>
            ) : (
              /* Quiz Completion Screen */
              <div className="py-6 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                  <Award className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white">Quiz Completed! 🎉</h3>
                <p className="text-xs text-zinc-400">
                  You scored <span className="text-emerald-400 font-bold">{quizScore}</span> out of{' '}
                  <span className="text-white font-bold">{activeQuizLang.quizzes.length}</span>!
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => setActiveQuizLang(null)}
                    className="px-6 py-2.5 bg-emerald-500 text-black font-bold text-xs rounded-xl hover:bg-emerald-400"
                  >
                    Back to Knowledge Hub
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
