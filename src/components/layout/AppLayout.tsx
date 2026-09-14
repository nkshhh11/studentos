'use client';

import React, { Suspense } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Lock, ArrowRight, Loader2 } from 'lucide-react';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { MobileNav } from './MobileNav';
import { AuthModal } from '../common/AuthModal';
import { useStudentOS } from '../../context/StudentOSContext';

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const {
    isAuthenticated,
    isAuthLoading,
    isAuthModalOpen,
    closeAuthModal,
    authModalTitle,
    authModalSubtitle,
    openAuthModal,
  } = useStudentOS();

  const isStandalone = pathname === '/' || pathname === '/onboarding';

  if (isStandalone) {
    return (
      <main className="min-h-screen bg-zinc-950 text-white font-sans">
        {children}
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={closeAuthModal}
          title={authModalTitle}
          subtitle={authModalSubtitle}
        />
      </main>
    );
  }

  // Auth checking loading state
  if (isAuthLoading) {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
          <span className="text-xs text-zinc-400 font-medium">Authenticating StudentOS Session...</span>
        </div>
      </div>
    );
  }

  // Protected Route Guard: If not authenticated, do not show protected dashboard contents
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans flex flex-col">
        <Suspense fallback={<div className="h-14 bg-zinc-950 border-b border-zinc-800" />}>
          <MobileNav />
        </Suspense>
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="max-w-md w-full p-8 rounded-3xl bg-zinc-900/90 border border-zinc-800 text-center space-y-5 shadow-2xl">
            <div className="w-14 h-14 rounded-2xl bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto">
              <Lock className="w-7 h-7" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-extrabold text-zinc-100">Authentication Required</h2>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Access to StudentOS command center, tasks, notes, problem explorer, and career analytics requires an active user session.
              </p>
            </div>

            <div className="pt-2 space-y-2.5">
              <button
                onClick={() => openAuthModal('Sign In to Access StudentOS', 'Please sign in or create an account to view your private dashboard.')}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-indigo-600/20"
              >
                <span>Sign In to Your Account</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <Link
                href="/"
                className="block w-full py-2.5 bg-zinc-950 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 font-semibold text-xs rounded-xl transition-all"
              >
                Return to Home Page
              </Link>
            </div>
          </div>
        </div>
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={closeAuthModal}
          title={authModalTitle}
          subtitle={authModalSubtitle}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 dark:bg-zinc-950 text-zinc-100 font-sans flex flex-col selection:bg-indigo-500/30 selection:text-indigo-300">
      <Suspense fallback={<div className="h-14 bg-zinc-950 border-b border-zinc-800" />}>
        <MobileNav />
      </Suspense>
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Suspense fallback={<aside className="w-60 bg-zinc-950/80 border-r border-zinc-800/80 hidden md:flex" />}>
          <Sidebar />
        </Suspense>
        <main className="flex-1 overflow-y-auto p-3 sm:p-5 lg:p-7 max-w-7xl mx-auto w-full pb-20 md:pb-8">
          {children}
        </main>
      </div>
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={closeAuthModal}
        title={authModalTitle}
        subtitle={authModalSubtitle}
      />
    </div>
  );
};
