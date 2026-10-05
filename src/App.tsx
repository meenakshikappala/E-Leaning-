import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { AuthModal } from './components/AuthModal';
import { DashboardView } from './components/DashboardView';
import { SubjectsHub } from './components/SubjectsHub';
import { SubjectDetail } from './components/SubjectDetail';
import { AptitudeAcademy } from './components/AptitudeAcademy';
import { HRInterviewDeck } from './components/HRInterviewDeck';
import { LivePlayground } from './components/LivePlayground';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { SUBJECTS_DATA } from './data/portalData';
import { getInitialStreak, updateStreakOnActivity, StreakData } from './utils/streakManager';
import { GraduationCap, Heart, Github } from 'lucide-react';

export default function App() {
  // Authentication State
  const [user, setUser] = useState<{ name: string; email: string } | null>(() => {
    try {
      const saved = localStorage.getItem('smart_learning_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Daily Streak State (persisted in localStorage)
  const [streak, setStreak] = useState<StreakData>(getInitialStreak);

  // Navigation State
  const [activeTab, setActiveTab] = useState<'dashboard' | 'subjects' | 'aptitude' | 'hr' | 'flashcards' | 'sandbox'>('dashboard');
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);

  // Mastered questions tracker
  const [masteredMap, setMasteredMap] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('smart_learning_mastered');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Quiz Score tracker
  const [quizScore, setQuizScore] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('smart_learning_quiz_score');
      return saved ? Number(saved) : 0;
    } catch {
      return 0;
    }
  });

  // Global Search modal
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Save changes to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('smart_learning_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('smart_learning_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('smart_learning_mastered', JSON.stringify(masteredMap));
  }, [masteredMap]);

  useEffect(() => {
    localStorage.setItem('smart_learning_quiz_score', String(quizScore));
  }, [quizScore]);

  // Global Keyboard Shortcut: Cmd/Ctrl + K for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Check and update streak on load
  useEffect(() => {
    setStreak(prev => updateStreakOnActivity(prev));
  }, []);

  const handleLogin = (newUser: { name: string; email: string }) => {
    setUser(newUser);
    setStreak(prev => updateStreakOnActivity(prev));
  };

  const handleLogout = () => {
    setUser(null);
  };

  const toggleMastered = (qId: string) => {
    setMasteredMap(prev => ({
      ...prev,
      [qId]: !prev[qId]
    }));
    setStreak(prev => updateStreakOnActivity(prev));
  };

  const handleSelectSubject = (id: string) => {
    setSelectedSubjectId(id);
    setActiveTab('subjects');
  };

  const handleBackToSubjects = () => {
    setSelectedSubjectId(null);
  };

  const handleScoreUpdate = (percent: number) => {
    setQuizScore(prev => Math.max(prev, percent));
    setStreak(prev => updateStreakOnActivity(prev));
  };

  // If user is not signed in, show Auth Screen
  if (!user) {
    return <AuthModal onSuccess={handleLogin} />;
  }

  const selectedSubject = selectedSubjectId ? SUBJECTS_DATA[selectedSubjectId] : null;
  const masteredCount = Object.values(masteredMap).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-slate-50/70 text-slate-900 flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (tab !== 'subjects') {
            setSelectedSubjectId(null);
          }
        }}
        user={user}
        onLogout={handleLogout}
        onOpenSearch={() => setIsSearchOpen(true)}
        masteredCount={masteredCount}
        quizScore={quizScore}
        streak={streak}
      />

      {/* Main View Container */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex-1">
        {/* Performance & Analytics Dashboard */}
        {activeTab === 'dashboard' && (
          <DashboardView
            masteredMap={masteredMap}
            quizScore={quizScore}
            onNavigateSubject={handleSelectSubject}
            onNavigateAptitude={() => setActiveTab('aptitude')}
            streak={streak}
          />
        )}

        {/* Core Subjects View */}
        {activeTab === 'subjects' && (
          selectedSubject ? (
            <SubjectDetail
              subject={selectedSubject}
              onBack={handleBackToSubjects}
              masteredMap={masteredMap}
              onToggleMastered={toggleMastered}
            />
          ) : (
            <SubjectsHub
              onSelectSubject={handleSelectSubject}
              masteredMap={masteredMap}
            />
          )
        )}

        {/* Aptitude & Reasoning Academy */}
        {activeTab === 'aptitude' && (
          <AptitudeAcademy onScoreUpdate={handleScoreUpdate} />
        )}

        {/* Top 20 HR Interview Prep */}
        {activeTab === 'hr' && (
          <HRInterviewDeck />
        )}

        {/* Interactive Flashcards */}
        {activeTab === 'flashcards' && (
          <HRInterviewDeck />
        )}

        {/* Live Code Sandbox */}
        {activeTab === 'sandbox' && (
          <LivePlayground />
        )}
      </main>

      {/* Global Search Dialog */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectSubject={handleSelectSubject}
        onNavigateTab={(tab) => {
          setActiveTab(tab);
          setSelectedSubjectId(null);
        }}
      />

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white/80 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">
              <GraduationCap className="w-3.5 h-3.5" />
            </div>
            <span className="font-semibold text-slate-700">Smart Learning Portal</span>
            <span>— Placement & Computer Science Preparation Infrastructure</span>
          </div>

          <div className="flex items-center gap-6">
            <span>Core Subjects</span>
            <span>Aptitude Practice</span>
            <span>HR Interview Round</span>
            <span>In-Browser Compiler</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
