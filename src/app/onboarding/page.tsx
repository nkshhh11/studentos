'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStudentOS } from '../../context/StudentOSContext';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Code,
  Target,
  Clock,
  User,
  GraduationCap,
  Laptop,
  Check,
  Zap,
} from 'lucide-react';
import { CareerGoal, SkillLevel, AvailableStudyTime, ProgrammingLanguage, PlatformName } from '../../types/studentos';

export default function OnboardingPage() {
  const router = useRouter();
  const { user, completeOnboarding } = useStudentOS();
  const [step, setStep] = useState(1);

  // Form State
  const [authMethod, setAuthMethod] = useState<'google' | 'github' | 'email'>('github');
  const [name, setName] = useState(user.name || 'Alex Chen');
  const [email, setEmail] = useState(user.email || 'alex.chen@university.edu');
  const [college, setCollege] = useState(user.college || 'Stanford University');
  const [branch, setBranch] = useState(user.branch || 'Computer Science & Engineering');
  const [year, setYear] = useState(user.year || '3rd Year');
  const [graduationYear, setGraduationYear] = useState(user.graduationYear || '2027');
  const [skillLevel, setSkillLevel] = useState<SkillLevel>(user.skillLevel || 'Intermediate');
  const [careerGoal, setCareerGoal] = useState<CareerGoal>(user.careerGoal || 'Software Engineer');
  const [selectedLangs, setSelectedLangs] = useState<ProgrammingLanguage[]>(
    user.selectedLanguages || ['C++', 'Python', 'JavaScript']
  );
  const [usernames, setUsernames] = useState<{ [key in PlatformName]?: string }>({
    LeetCode: 'alex_code',
    Codeforces: 'alex_cf',
    CodeChef: 'alex_chef',
    GitHub: 'alexchen-dev',
  });
  const [studyTime, setStudyTime] = useState<AvailableStudyTime>(user.availableStudyTime || '3 hours/day');
  const [isGenerating, setIsGenerating] = useState(false);
  const [genSteps, setGenSteps] = useState([
    { label: 'Connecting External Coding Accounts', done: false },
    { label: 'Analyzing Career Skill Gaps & Weak Topics', done: false },
    { label: 'Generating Dynamic DSA & Development Roadmap', done: false },
    { label: 'Setting Daily & Weekly Personalized Quests', done: false },
  ]);

  const careerOptions: CareerGoal[] = [
    'Software Engineer',
    'Frontend Developer',
    'Backend Developer',
    'Full Stack Developer',
    'AI Engineer',
    'Machine Learning Engineer',
    'Data Scientist',
    'Android Developer',
    'DevOps Engineer',
    'Cybersecurity Engineer',
  ];

  const languageOptions: ProgrammingLanguage[] = [
    'C++',
    'Python',
    'Java',
    'JavaScript',
    'TypeScript',
    'C',
    'Go',
    'Rust',
    'Kotlin',
  ];

  const toggleLanguage = (lang: ProgrammingLanguage) => {
    setSelectedLangs((prev) =>
      prev.includes(lang) ? prev.filter((l) => l !== lang) : [...prev, lang]
    );
  };

  const handleFinish = () => {
    setIsGenerating(true);

    // Step by step animation simulation
    genSteps.forEach((_, idx) => {
      setTimeout(() => {
        setGenSteps((prev) =>
          prev.map((s, i) => (i === idx ? { ...s, done: true } : s))
        );
      }, (idx + 1) * 700);
    });

    setTimeout(() => {
      completeOnboarding({
        name,
        email,
        college,
        branch,
        year,
        graduationYear,
        skillLevel,
        careerGoal,
        selectedLanguages: selectedLangs,
        availableStudyTime: studyTime,
      });
      router.push('/dashboard');
    }, 3200);
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-4 sm:p-6 selection:bg-emerald-500/30">
      {/* Brand Header */}
      <div className="flex items-center gap-2 mb-6">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-500 flex items-center justify-center text-black font-black text-xl shadow-lg shadow-emerald-500/20">
          S
        </div>
        <span className="text-xl font-bold bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
          StudentOS Onboarding
        </span>
      </div>

      {/* Main Form Card */}
      <div className="w-full max-w-2xl bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden backdrop-blur-xl">
        {/* Progress Bar Header */}
        {!isGenerating && (
          <div className="mb-8">
            <div className="flex items-center justify-between text-xs text-zinc-400 font-semibold mb-2">
              <span>STEP {step} OF 7</span>
              <span>{Math.round((step / 7) * 100)}% COMPLETE</span>
            </div>
            <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full transition-all duration-300 ease-out"
                style={{ width: `${(step / 7) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Step 1: Account Creation */}
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right duration-300">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">Welcome to StudentOS! 👋</h2>
              <p className="text-sm text-zinc-400">
                Choose how you want to sign in to unify your coding journey.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setAuthMethod('github')}
                className={`p-4 rounded-2xl border flex flex-col items-center gap-2 transition-all ${
                  authMethod === 'github'
                    ? 'bg-emerald-500/10 border-emerald-500/50 text-white shadow-lg shadow-emerald-500/5'
                    : 'bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                }`}
              >
                <Code className="w-6 h-6 text-emerald-400" />
                <span className="text-xs font-semibold">GitHub Auth</span>
              </button>

              <button
                type="button"
                onClick={() => setAuthMethod('google')}
                className={`p-4 rounded-2xl border flex flex-col items-center gap-2 transition-all ${
                  authMethod === 'google'
                    ? 'bg-emerald-500/10 border-emerald-500/50 text-white shadow-lg shadow-emerald-500/5'
                    : 'bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                }`}
              >
                <Sparkles className="w-6 h-6 text-blue-400" />
                <span className="text-xs font-semibold">Google Account</span>
              </button>

              <button
                type="button"
                onClick={() => setAuthMethod('email')}
                className={`p-4 rounded-2xl border flex flex-col items-center gap-2 transition-all ${
                  authMethod === 'email'
                    ? 'bg-emerald-500/10 border-emerald-500/50 text-white shadow-lg shadow-emerald-500/5'
                    : 'bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                }`}
              >
                <User className="w-6 h-6 text-amber-400" />
                <span className="text-xs font-semibold">Email & Password</span>
              </button>
            </div>

            <div className="space-y-3 pt-2">
              <div>
                <label className="text-xs font-medium text-zinc-300 block mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500/50"
                  placeholder="e.g. Alex Chen"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-zinc-300 block mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500/50"
                  placeholder="e.g. alex@university.edu"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Basic Information */}
        {step === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right duration-300">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">Basic Education Profile 🎓</h2>
              <p className="text-sm text-zinc-400">Tell us where you study and your current experience level.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-zinc-300 block mb-1">University / College</label>
                <input
                  type="text"
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500/50"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-zinc-300 block mb-1">Branch / Degree</label>
                <input
                  type="text"
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500/50"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-zinc-300 block mb-1">Current Academic Year</label>
                <select
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500/50"
                >
                  <option>1st Year</option>
                  <option>2nd Year</option>
                  <option>3rd Year</option>
                  <option>4th Year / Final</option>
                  <option>Postgraduate / Recent Grad</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-medium text-zinc-300 block mb-1">Target Graduation Year</label>
                <input
                  type="text"
                  value={graduationYear}
                  onChange={(e) => setGraduationYear(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500/50"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-zinc-300 block mb-2">Current Skill Level</label>
              <div className="grid grid-cols-3 gap-3">
                {(['Beginner', 'Intermediate', 'Advanced'] as SkillLevel[]).map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setSkillLevel(lvl)}
                    className={`py-3 px-2 rounded-xl text-xs font-semibold border transition-all ${
                      skillLevel === lvl
                        ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400'
                        : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Career Goal */}
        {step === 3 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right duration-300">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">Select Your Primary Career Goal 🎯</h2>
              <p className="text-sm text-zinc-400">StudentOS will tailor your roadmap and daily quests for this role.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-72 overflow-y-auto pr-1">
              {careerOptions.map((goal) => (
                <button
                  key={goal}
                  type="button"
                  onClick={() => setCareerGoal(goal)}
                  className={`p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all ${
                    careerGoal === goal
                      ? 'bg-emerald-500/10 border-emerald-500 text-white shadow-lg shadow-emerald-500/5'
                      : 'bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <span className="text-xs font-semibold">{goal}</span>
                  {careerGoal === goal && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Programming Languages */}
        {step === 4 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right duration-300">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">Select Programming Languages 💻</h2>
              <p className="text-sm text-zinc-400">Select languages you want to practice and master.</p>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-3 gap-3">
              {languageOptions.map((lang) => {
                const selected = selectedLangs.includes(lang);
                return (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => toggleLanguage(lang)}
                    className={`py-3 px-3 rounded-2xl border flex items-center justify-between transition-all ${
                      selected
                        ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400 font-bold'
                        : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    <span className="text-xs">{lang}</span>
                    {selected && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 5: Connect Profiles */}
        {step === 5 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right duration-300">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">Connect External Profiles 🔗</h2>
              <p className="text-sm text-zinc-400">
                Add your usernames for official supported platforms. StudentOS syncs metadata respecting official platform rules.
              </p>
            </div>

            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {(['LeetCode', 'Codeforces', 'CodeChef', 'GitHub', 'GeeksforGeeks', 'HackerRank'] as PlatformName[]).map(
                (platform) => (
                  <div key={platform} className="flex items-center gap-3 p-3 bg-zinc-950 rounded-2xl border border-zinc-800">
                    <span className="text-xs font-bold text-zinc-300 w-28 shrink-0">{platform}</span>
                    <input
                      type="text"
                      placeholder={`Enter ${platform} username...`}
                      value={usernames[platform] || ''}
                      onChange={(e) => setUsernames({ ...usernames, [platform]: e.target.value })}
                      className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500/50"
                    />
                  </div>
                )
              )}
            </div>
          </div>
        )}

        {/* Step 6: Available Study Time */}
        {step === 6 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right duration-300">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">Daily Available Study Time ⏱️</h2>
              <p className="text-sm text-zinc-400">How much time can you consistently dedicate per day?</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(['1 hour/day', '2 hours/day', '3 hours/day', '4+ hours/day'] as AvailableStudyTime[]).map((time) => (
                <button
                  key={time}
                  type="button"
                  onClick={() => setStudyTime(time)}
                  className={`p-4 rounded-2xl border text-left flex items-center justify-between transition-all ${
                    studyTime === time
                      ? 'bg-emerald-500/10 border-emerald-500 text-white shadow-lg shadow-emerald-500/5'
                      : 'bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-emerald-400" />
                    <div>
                      <div className="text-sm font-semibold text-white">{time}</div>
                      <div className="text-[11px] text-zinc-400">Adjusts quest density & study plan</div>
                    </div>
                  </div>
                  {studyTime === time && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 7: Generating Dashboard Animation */}
        {step === 7 && (
          <div className="py-8 space-y-6 text-center animate-in fade-in duration-300">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-emerald-500 to-cyan-500 mx-auto flex items-center justify-center text-black shadow-xl shadow-emerald-500/20 animate-bounce">
              <Zap className="w-8 h-8 fill-black" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">Building Your StudentOS Dashboard</h2>
              <p className="text-sm text-zinc-400">
                Configuring personalized roadmap for <span className="text-emerald-400 font-bold">{careerGoal}</span>...
              </p>
            </div>

            <div className="max-w-md mx-auto space-y-3 text-left">
              {genSteps.map((s, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-xl border text-xs flex items-center justify-between transition-all ${
                    s.done
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                      : 'bg-zinc-950 border-zinc-800 text-zinc-500'
                  }`}
                >
                  <span>{s.label}</span>
                  {s.done ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <div className="w-3.5 h-3.5 border-2 border-zinc-600 border-t-transparent rounded-full animate-spin shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        {!isGenerating && (
          <div className="flex items-center justify-between pt-6 border-t border-zinc-800/80 mt-6">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((s) => s - 1)}
                className="flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-white px-4 py-2 rounded-xl hover:bg-zinc-800 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
            ) : (
              <div />
            )}

            {step < 6 ? (
              <button
                type="button"
                onClick={() => setStep((s) => s + 1)}
                className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black font-bold text-xs px-6 py-2.5 rounded-xl shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
              >
                Next Step <ArrowRight className="w-4 h-4" />
              </button>
            ) : step === 6 ? (
              <button
                type="button"
                onClick={() => {
                  setStep(7);
                  handleFinish();
                }}
                className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 text-black font-bold text-xs px-6 py-2.5 rounded-xl shadow-lg shadow-emerald-500/20 transition-all cursor-pointer animate-pulse"
              >
                Generate Dashboard <Sparkles className="w-4 h-4 fill-black" />
              </button>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
