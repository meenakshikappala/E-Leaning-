import React, { useState } from 'react';
import { GraduationCap, ArrowRight, ShieldCheck, Sparkles, BookOpen } from 'lucide-react';

interface AuthModalProps {
  onSuccess: (user: { name: string; email: string }) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ onSuccess }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    const finalName = name.trim() || email.split('@')[0];
    onSuccess({ name: finalName, email });
  };

  const handleQuickDemo = () => {
    onSuccess({ name: 'Alex Johnson', email: 'alex.student@university.edu' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-slate-50 to-purple-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md">
        {/* Logo Badge */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-700 to-purple-600 text-white shadow-xl shadow-indigo-200 mb-4 animate-bounce-subtle">
            <GraduationCap className="w-9 h-9" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Smart Learning Portal
          </h1>
          <p className="text-sm text-slate-500 mt-2">
            Ace Technical Interviews, Coding Labs & Placement Aptitude
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100 p-6 sm:p-8">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
            <div>
              <h2 className="text-lg font-bold text-slate-800">
                {isRegister ? 'Create Your Account' : 'Welcome Back'}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {isRegister ? 'Start tracking your interview readiness' : 'Sign in to access your modules'}
              </p>
            </div>
            <span className="text-[11px] font-semibold px-2 py-1 rounded bg-indigo-50 text-indigo-700 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
              Secure
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. John Doe"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@domain.com"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition"
              />
            </div>

            <button
              type="submit"
              className="w-full mt-2 py-3 px-4 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-semibold text-sm rounded-lg shadow-md shadow-indigo-200 hover:shadow-indigo-300 transition duration-150 flex items-center justify-center gap-2"
            >
              <span>{isRegister ? 'Register & Start Learning' : 'Sign In to Portal'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Login Option */}
          <div className="mt-5 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={handleQuickDemo}
              className="w-full py-2.5 px-4 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg border border-slate-200 flex items-center justify-center gap-2 transition"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Instant Access as Demo Learner</span>
            </button>
          </div>

          <p className="text-center text-xs text-slate-500 mt-5">
            {isRegister ? 'Already registered?' : "Don't have an account?"}{' '}
            <button
              type="button"
              onClick={() => setIsRegister(!isRegister)}
              className="font-semibold text-indigo-600 hover:text-indigo-800 transition underline underline-offset-2"
            >
              {isRegister ? 'Log In' : 'Register Here'}
            </button>
          </p>
        </div>

        {/* Feature Pills */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-500">
          <span className="flex items-center gap-1.5 bg-white/70 px-3 py-1 rounded-full border border-slate-200/60 shadow-2xs">
            <BookOpen className="w-3.5 h-3.5 text-indigo-600" /> 10 Core Tech Subjects
          </span>
          <span className="flex items-center gap-1.5 bg-white/70 px-3 py-1 rounded-full border border-slate-200/60 shadow-2xs">
            <GraduationCap className="w-3.5 h-3.5 text-purple-600" /> Top 20 HR Answers
          </span>
          <span className="flex items-center gap-1.5 bg-white/70 px-3 py-1 rounded-full border border-slate-200/60 shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Interactive Sandboxes
          </span>
        </div>
      </div>
    </div>
  );
};
