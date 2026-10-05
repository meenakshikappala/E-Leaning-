import React, { useState } from 'react';
import { 
  GraduationCap, 
  BookOpen, 
  BrainCircuit, 
  Users, 
  Terminal, 
  Search, 
  LogOut, 
  UserCircle2, 
  Sparkles,
  Layers,
  Award,
  LayoutDashboard,
  Flame,
  CalendarCheck,
  Check,
  Menu,
  X
} from 'lucide-react';
import { StreakData, getLocalDateString } from '../utils/streakManager';

interface HeaderProps {
  activeTab: 'dashboard' | 'subjects' | 'aptitude' | 'hr' | 'flashcards' | 'sandbox';
  setActiveTab: (tab: 'dashboard' | 'subjects' | 'aptitude' | 'hr' | 'flashcards' | 'sandbox') => void;
  user: { name: string; email: string; college?: string } | null;
  onLogout: () => void;
  onOpenSearch: () => void;
  masteredCount: number;
  quizScore: number;
  streak: StreakData;
  onLogStudySession?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  user,
  onLogout,
  onOpenSearch,
  masteredCount,
  quizScore,
  streak,
  onLogStudySession
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showStreakPopover, setShowStreakPopover] = useState(false);

  interface NavItem {
    id: 'dashboard' | 'subjects' | 'aptitude' | 'hr' | 'flashcards' | 'sandbox';
    label: string;
    shortLabel: string;
    icon: React.ElementType;
    badge?: string;
  }

  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', shortLabel: 'Dashboard', icon: LayoutDashboard, badge: 'Charts' },
    { id: 'subjects', label: 'Core Subjects', shortLabel: 'Subjects', icon: BookOpen, badge: '10' },
    { id: 'aptitude', label: 'Aptitude & Reasoning', shortLabel: 'Aptitude', icon: BrainCircuit, badge: 'Practice' },
    { id: 'hr', label: 'HR Interview Prep', shortLabel: 'HR Prep', icon: Users, badge: 'Top 20' },
    { id: 'flashcards', label: 'Flashcard Drill', shortLabel: 'Flashcards', icon: Layers, badge: 'Cards' },
    { id: 'sandbox', label: 'Live Sandbox', shortLabel: 'Sandbox', icon: Terminal, badge: 'Run' },
  ];

  // Helper to get past 7 days for the streak week tracker
  const getPastSevenDays = () => {
    const days = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(today.getDate() - i);
      const dateStr = getLocalDateString(d);
      const dayName = d.toLocaleDateString('en-US', { weekday: 'narrow' }); // M, T, W...
      const isToday = i === 0;
      const isActive = streak.activeDates.includes(dateStr);
      days.push({ dayName, dateStr, isToday, isActive });
    }
    return days;
  };

  const pastSevenDays = getPastSevenDays();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2">
          {/* Logo Area - High Contrast, Always Visible, Non-Shrinking */}
          <div 
            onClick={() => setActiveTab('subjects')}
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group shrink-0 select-none"
            title="Smart Learning Portal"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-700 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-200 group-hover:scale-105 transition-transform shrink-0">
              <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-base sm:text-lg font-black text-slate-900 tracking-tight leading-none">
                  Smart Learning
                </span>
                <span className="text-[10px] sm:text-xs font-bold px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-700 leading-none">
                  Portal
                </span>
              </div>
              <span className="text-[10px] sm:text-[11px] text-slate-500 font-medium hidden sm:block mt-0.5 leading-none">
                Engineering & Placement
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 overflow-x-auto scrollbar-none">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1.5 px-2.5 lg:px-3 py-1.5 lg:py-2 rounded-lg text-xs lg:text-sm font-medium transition-all shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-700 font-bold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 lg:w-4 lg:h-4 ${isActive ? 'text-indigo-600' : 'text-slate-500'}`} />
                  <span className="hidden xl:inline">{item.label}</span>
                  <span className="inline xl:hidden">{item.shortLabel}</span>
                  {item.badge && (
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold hidden lg:inline ${
                      isActive 
                        ? 'bg-indigo-200/80 text-indigo-900' 
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Daily Streak Chip */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowStreakPopover(!showStreakPopover);
                  setShowProfileMenu(false);
                }}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-800 border border-amber-300/70 transition group font-bold text-xs shadow-2xs cursor-pointer select-none"
                title={`${streak.currentStreak} day study streak! Click to view details.`}
              >
                <Flame className="w-4 h-4 fill-amber-500 text-amber-500 animate-pulse group-hover:scale-110 transition-transform" />
                <span className="font-extrabold text-amber-900">{streak.currentStreak}</span>
                <span className="hidden sm:inline text-amber-800 font-semibold">
                  {streak.currentStreak === 1 ? 'Day' : 'Days'}
                </span>
              </button>

              {/* Streak Details Popover */}
              {showStreakPopover && (
                <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white rounded-2xl shadow-xl border border-slate-200 p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="flex items-start justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center shadow-md shadow-amber-200">
                        <Flame className="w-5 h-5 fill-white" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">
                          {streak.currentStreak} Day Study Streak!
                        </h4>
                        <p className="text-[11px] text-amber-700 font-medium">
                          You're on fire! Keep it going!
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowStreakPopover(false)}
                      className="text-slate-400 hover:text-slate-600 p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Past 7 Days Visual Tracker */}
                  <div className="py-3">
                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                      Weekly Activity Tracker
                    </p>
                    <div className="grid grid-cols-7 gap-1.5 text-center">
                      {pastSevenDays.map((d, idx) => (
                        <div key={idx} className="flex flex-col items-center gap-1">
                          <span className="text-[10px] font-semibold text-slate-400">
                            {d.dayName}
                          </span>
                          <div
                            className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold transition ${
                              d.isActive
                                ? 'bg-amber-500 text-white shadow-xs'
                                : 'bg-slate-100 text-slate-400 border border-slate-200'
                            } ${d.isToday ? 'ring-2 ring-indigo-500 ring-offset-1' : ''}`}
                            title={d.dateStr}
                          >
                            {d.isActive ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : '•'}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Stats summary */}
                  <div className="mt-1 pt-2 border-t border-slate-100 grid grid-cols-2 gap-2 text-center text-xs">
                    <div className="p-2 bg-slate-50 rounded-xl">
                      <span className="text-[10px] text-slate-400 block font-medium">Current Streak</span>
                      <span className="text-sm font-black text-slate-800">{streak.currentStreak} Days</span>
                    </div>
                    <div className="p-2 bg-slate-50 rounded-xl">
                      <span className="text-[10px] text-slate-400 block font-medium">Longest Streak</span>
                      <span className="text-sm font-black text-amber-600">{streak.longestStreak} Days</span>
                    </div>
                  </div>

                  {/* Practice action */}
                  <div className="mt-3">
                    <button
                      onClick={() => {
                        setShowStreakPopover(false);
                        setActiveTab('aptitude');
                      }}
                      className="w-full py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5 shadow-xs"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-100" />
                      <span>Practice Today to Keep Flame</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3 py-1.5 text-xs text-slate-500 bg-slate-100 hover:bg-slate-200/80 rounded-lg border border-slate-200 transition-colors cursor-pointer"
              title="Search Portal (Ctrl + K)"
            >
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden sm:inline">Search...</span>
              <kbd className="hidden lg:inline text-[10px] bg-white px-1 py-0.5 rounded border border-slate-300 text-slate-400">⌘K</kbd>
            </button>

            {/* Profile Dropdown */}
            {user && (
              <div className="relative">
                <button
                  onClick={() => {
                    setShowProfileMenu(!showProfileMenu);
                    setShowStreakPopover(false);
                  }}
                  className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center font-bold text-xs uppercase shadow-xs">
                    {user.name.charAt(0)}
                  </div>
                  <div className="hidden xl:block text-left">
                    <p className="text-xs font-semibold text-slate-800 leading-tight">{user.name}</p>
                    <p className="text-[10px] text-slate-500">Learner</p>
                  </div>
                </button>

                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-100 py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-4 pb-3 border-b border-slate-100">
                      <p className="text-xs text-slate-400 font-medium">Signed in as</p>
                      <p className="text-sm font-semibold text-slate-900 truncate">{user.name}</p>
                      <p className="text-xs text-slate-500 truncate">{user.email}</p>
                    </div>

                    <div className="px-4 py-2 border-b border-slate-100 bg-slate-50/50">
                      <div className="flex items-center justify-between text-xs text-slate-600 py-1">
                        <span className="flex items-center gap-1.5">
                          <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                          Study Streak:
                        </span>
                        <span className="font-bold text-amber-600">{streak.currentStreak} Days</span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-slate-600 py-1">
                        <span className="flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                          Questions Mastered:
                        </span>
                        <span className="font-bold text-indigo-600">{masteredCount}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-slate-600 py-1">
                        <span className="flex items-center gap-1.5">
                          <Award className="w-3.5 h-3.5 text-emerald-500" />
                          Quiz Best:
                        </span>
                        <span className="font-bold text-emerald-600">{quizScore}%</span>
                      </div>
                    </div>

                    <div className="pt-2 px-2">
                      <button
                        onClick={() => {
                          setShowProfileMenu(false);
                          onLogout();
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Mobile menu hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-4 space-y-2">
          {/* Mobile Streak Banner */}
          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 fill-amber-500 text-amber-500" />
              <div>
                <p className="text-xs font-bold text-slate-900">
                  {streak.currentStreak} Day Study Streak
                </p>
                <p className="text-[10px] text-amber-800">
                  Longest: {streak.longestStreak} days
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                setActiveTab('aptitude');
                setMobileMenuOpen(false);
              }}
              className="px-2.5 py-1 bg-amber-600 text-white rounded-lg text-[11px] font-bold"
            >
              Practice
            </button>
          </div>

          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-700 font-semibold'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-semibold">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};

