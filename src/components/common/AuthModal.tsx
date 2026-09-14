'use client';

import React, { useState } from 'react';
import {
  X,
  Lock,
  Mail,
  Smartphone,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  AlertCircle,
  User,
  KeyRound,
  Loader2,
} from 'lucide-react';
import { useStudentOS } from '../../context/StudentOSContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  initialTab?: 'signin' | 'signup' | 'google' | 'microsoft' | 'otp' | 'demo';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  title = 'Sign In to Student OS',
  subtitle = 'Please sign in to save and manage your personal Student OS.',
  initialTab = 'signin',
}) => {
  const {
    signUpWithEmail,
    signInWithEmail,
    loginWithGoogle,
    loginWithMicrosoft,
    sendPhoneOTP,
    verifyPhoneOTP,
    loginWithOTP,
    loginDemo,
  } = useStudentOS();

  const [activeTab, setActiveTab] = useState<'signin' | 'signup' | 'google' | 'microsoft' | 'otp' | 'demo'>(initialTab);

  // Sign In State
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');

  // Sign Up State
  const [signUpName, setSignUpName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpConfirm, setSignUpConfirm] = useState('');

  // OTP State
  const [phone, setPhone] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState<any>(null);

  // Status & Error States
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  // Handle Sign In Submission
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signInEmail.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (!signInPassword) {
      setErrorMsg('Please enter your password.');
      return;
    }

    setErrorMsg(null);
    setIsLoading(true);

    try {
      await signInWithEmail(signInEmail.trim(), signInPassword);
      setIsLoading(false);
      onClose();
    } catch (err: any) {
      setIsLoading(false);
      console.error('Sign In Error:', err);
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        setErrorMsg('Invalid email or password. Please check your credentials.');
      } else {
        setErrorMsg(err.message || 'Failed to sign in. Please try again.');
      }
    }
  };

  // Handle Sign Up Submission
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signUpName.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!signUpEmail.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (signUpPassword.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }
    if (signUpPassword !== signUpConfirm) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    setErrorMsg(null);
    setIsLoading(true);

    try {
      await signUpWithEmail(signUpName.trim(), signUpEmail.trim(), signUpPassword);
      setIsLoading(false);
      onClose();
    } catch (err: any) {
      setIsLoading(false);
      console.error('Sign Up Error:', err);
      if (err.code === 'auth/email-already-in-use') {
        setErrorMsg('An account with this email address already exists. Please sign in instead.');
      } else {
        setErrorMsg(err.message || 'Failed to create account. Please try again.');
      }
    }
  };

  // Handle Google OAuth
  const handleGoogleAuth = async () => {
    setErrorMsg(null);
    setIsLoading(true);
    try {
      await loginWithGoogle();
      setIsLoading(false);
      onClose();
    } catch (err: any) {
      setIsLoading(false);
      console.error('Google Auth Error:', err);
      setErrorMsg(err.message || 'Google authentication failed.');
    }
  };

  // Handle Microsoft OAuth
  const handleMicrosoftAuth = async () => {
    setErrorMsg(null);
    setIsLoading(true);
    try {
      await loginWithMicrosoft();
      setIsLoading(false);
      onClose();
    } catch (err: any) {
      setIsLoading(false);
      console.error('Microsoft Auth Error:', err);
      setErrorMsg(err.message || 'Microsoft authentication failed.');
    }
  };

  // Handle Phone OTP Request
  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length < 8) {
      setErrorMsg('Please enter a valid phone number with country code (e.g. +1... or +91...).');
      return;
    }
    setErrorMsg(null);
    setIsLoading(true);

    try {
      const confirmation = await sendPhoneOTP(phone.trim(), 'recaptcha-container');
      if (confirmation) {
        setConfirmationResult(confirmation);
        setOtpSent(true);
      } else {
        // Fallback OTP flow
        setOtpSent(true);
      }
      setIsLoading(false);
    } catch (err: any) {
      setIsLoading(false);
      console.error('Phone OTP Error:', err);
      setErrorMsg(err.message || 'Could not send SMS code. Please check your phone format.');
    }
  };

  // Handle OTP Verification
  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpCode.trim()) {
      setErrorMsg('Please enter the OTP verification code.');
      return;
    }
    setErrorMsg(null);
    setIsLoading(true);

    try {
      if (confirmationResult) {
        await verifyPhoneOTP(confirmationResult, otpCode.trim());
      } else {
        loginWithOTP(phone, otpCode.trim());
      }
      setIsLoading(false);
      onClose();
    } catch (err: any) {
      setIsLoading(false);
      console.error('Verify OTP Error:', err);
      setErrorMsg(err.message || 'Invalid SMS verification code.');
    }
  };

  // Handle Demo Login
  const handleDemoLogin = () => {
    setErrorMsg(null);
    loginDemo();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-zinc-900 border border-zinc-800 w-full max-w-md rounded-2xl p-6 shadow-2xl relative space-y-4">
        {/* Recaptcha Container for Phone OTP */}
        <div id="recaptcha-container"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          disabled={isLoading}
          className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-100 p-1 rounded-lg hover:bg-zinc-800 transition-colors disabled:opacity-50"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
            <Lock className="w-3.5 h-3.5" /> Authentication Required
          </div>
          <h2 className="text-xl font-bold text-zinc-100 tracking-tight">{title}</h2>
          <p className="text-xs text-zinc-400 leading-relaxed">{subtitle}</p>
        </div>

        {/* Method Selection Tabs */}
        <div className="grid grid-cols-5 gap-1 p-1 bg-zinc-950 rounded-xl border border-zinc-800/80 text-[10px] font-medium text-zinc-400">
          <button
            onClick={() => { setActiveTab('signin'); setErrorMsg(null); }}
            className={`py-1.5 rounded-lg transition-all ${activeTab === 'signin' ? 'bg-zinc-800 text-zinc-100 font-semibold' : 'hover:text-zinc-200'}`}
          >
            Sign In
          </button>
          <button
            onClick={() => { setActiveTab('signup'); setErrorMsg(null); }}
            className={`py-1.5 rounded-lg transition-all ${activeTab === 'signup' ? 'bg-zinc-800 text-zinc-100 font-semibold' : 'hover:text-zinc-200'}`}
          >
            Sign Up
          </button>
          <button
            onClick={() => { setActiveTab('google'); setErrorMsg(null); }}
            className={`py-1.5 rounded-lg transition-all ${activeTab === 'google' ? 'bg-zinc-800 text-zinc-100 font-semibold' : 'hover:text-zinc-200'}`}
          >
            Google
          </button>
          <button
            onClick={() => { setActiveTab('otp'); setErrorMsg(null); }}
            className={`py-1.5 rounded-lg transition-all ${activeTab === 'otp' ? 'bg-zinc-800 text-zinc-100 font-semibold' : 'hover:text-zinc-200'}`}
          >
            OTP
          </button>
          <button
            onClick={() => { setActiveTab('demo'); setErrorMsg(null); }}
            className={`py-1.5 rounded-lg transition-all ${activeTab === 'demo' ? 'bg-zinc-800 text-amber-400 font-semibold' : 'hover:text-zinc-200'}`}
          >
            Demo
          </button>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl text-xs text-rose-400 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Tab 1: Sign In Form */}
        {activeTab === 'signin' && (
          <form onSubmit={handleSignIn} className="space-y-3">
            <div>
              <label className="text-xs text-zinc-300 block mb-1 font-medium">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-zinc-500 absolute left-3 top-2.5" />
                <input
                  type="email"
                  placeholder="you@university.edu"
                  value={signInEmail}
                  onChange={(e) => setSignInEmail(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-9 pr-3 py-2 text-xs text-zinc-100 focus:outline-none focus:border-emerald-500"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-zinc-300 block mb-1 font-medium">Password</label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-zinc-500 absolute left-3 top-2.5" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={signInPassword}
                  onChange={(e) => setSignInPassword(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-9 pr-3 py-2 text-xs text-zinc-100 focus:outline-none focus:border-emerald-500"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Your Account</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

        {/* Tab 2: Sign Up Form */}
        {activeTab === 'signup' && (
          <form onSubmit={handleSignUp} className="space-y-3">
            <div>
              <label className="text-xs text-zinc-300 block mb-1 font-medium">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-zinc-500 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Alex Chen"
                  value={signUpName}
                  onChange={(e) => setSignUpName(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-9 pr-3 py-2 text-xs text-zinc-100 focus:outline-none focus:border-emerald-500"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-zinc-300 block mb-1 font-medium">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-zinc-500 absolute left-3 top-2.5" />
                <input
                  type="email"
                  placeholder="you@university.edu"
                  value={signUpEmail}
                  onChange={(e) => setSignUpEmail(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-9 pr-3 py-2 text-xs text-zinc-100 focus:outline-none focus:border-emerald-500"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs text-zinc-300 block mb-1 font-medium">Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={signUpPassword}
                  onChange={(e) => setSignUpPassword(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-100 focus:outline-none focus:border-emerald-500"
                  required
                  minLength={6}
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="text-xs text-zinc-300 block mb-1 font-medium">Confirm Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={signUpConfirm}
                  onChange={(e) => setSignUpConfirm(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-100 focus:outline-none focus:border-emerald-500"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <span>Create Account & Get Started</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

        {/* Tab 3: Google Auth */}
        {activeTab === 'google' && (
          <div className="space-y-3">
            <p className="text-xs text-zinc-400 leading-relaxed">
              Authenticate instantly using your official Google or Gmail account.
            </p>
            <button
              onClick={handleGoogleAuth}
              disabled={isLoading}
              className="w-full py-2.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-950 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <span>Sign In with Google</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <button
              onClick={handleMicrosoftAuth}
              disabled={isLoading}
              className="w-full py-2 bg-zinc-950 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 font-semibold text-xs rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
            >
              <span>Sign In with Microsoft Account</span>
            </button>
          </div>
        )}

        {/* Tab 4: Mobile OTP Form */}
        {activeTab === 'otp' && (
          <div className="space-y-3">
            {!otpSent ? (
              <form onSubmit={handleSendOTP} className="space-y-3">
                <div>
                  <label className="text-xs text-zinc-300 block mb-1 font-medium">Mobile Phone Number</label>
                  <div className="relative">
                    <Smartphone className="w-4 h-4 text-zinc-500 absolute left-3 top-2.5" />
                    <input
                      type="tel"
                      placeholder="+1 555 123 4567 or +91 9876543210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-9 pr-3 py-2 text-xs text-zinc-100 focus:outline-none focus:border-emerald-500"
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-950 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
                >
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>Send SMS OTP Code</span>}
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOTP} className="space-y-3">
                <div className="text-xs text-emerald-400 bg-emerald-500/10 p-2.5 rounded-xl border border-emerald-500/20">
                  SMS OTP code sent to {phone}. (Use code <strong className="font-mono">1234</strong> if testing locally)
                </div>
                <div>
                  <label className="text-xs text-zinc-300 block mb-1 font-medium">Enter 6-Digit OTP Code</label>
                  <input
                    type="text"
                    placeholder="123456"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-center font-mono text-base tracking-widest text-zinc-100 focus:outline-none"
                    maxLength={6}
                    required
                    disabled={isLoading}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
                >
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><span>Verify OTP & Login</span><ShieldCheck className="w-4 h-4" /></>}
                </button>
              </form>
            )}
          </div>
        )}

        {/* Tab 5: Demo Mode */}
        {activeTab === 'demo' && (
          <div className="space-y-3 bg-zinc-950 p-4 rounded-xl border border-amber-500/20 text-xs">
            <div className="flex items-center gap-2 font-bold text-amber-400">
              <Sparkles className="w-4 h-4" /> Isolated Demo Mode Session
            </div>
            <p className="text-zinc-400 leading-relaxed">
              Creates a dedicated demo account session with a unique <code className="text-amber-300">userId</code>. Data created remains private to your user ID.
            </p>
            <button
              onClick={handleDemoLogin}
              className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer mt-2"
            >
              <span>Launch Demo Session</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Footer info */}
        <div className="text-[11px] text-zinc-500 text-center pt-2 border-t border-zinc-800/80">
          Your personal tasks, notes, and progress are stored securely under your authenticated user ID.
        </div>
      </div>
    </div>
  );
};
