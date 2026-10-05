import React, { useState } from 'react';
import { SubjectCard } from './SubjectCard';
import { SUBJECTS_DATA, SubjectModule } from '../data/portalData';
import { 
  Sparkles, 
  Search, 
  BookOpen, 
  GraduationCap, 
  Layers, 
  Code2, 
  CheckCircle2, 
  Award 
} from 'lucide-react';

interface SubjectsHubProps {
  onSelectSubject: (subjectId: string) => void;
  masteredMap: Record<string, boolean>;
}

export const SubjectsHub: React.FC<SubjectsHubProps> = ({
  onSelectSubject,
  masteredMap
}) => {
  const [filter, setFilter] = useState<'all' | 'programming' | 'core' | 'web'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const subjectsList = Object.values(SUBJECTS_DATA);

  const filteredSubjects = subjectsList.filter((subject) => {
    // Search query check
    const matchesSearch = 
      subject.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subject.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subject.topics.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;

    if (filter === 'programming') {
      return ['python', 'java', 'c'].includes(subject.id);
    }
    if (filter === 'core') {
      return ['dsa', 'algorithms', 'os', 'networks', 'dbms'].includes(subject.id);
    }
    if (filter === 'web') {
      return ['html', 'se', 'dbms'].includes(subject.id);
    }
    return true;
  });

  const totalMastered = Object.values(masteredMap).filter(Boolean).length;
  const totalQuestions = subjectsList.reduce((acc, s) => acc + s.interview.length, 0);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 text-white p-6 sm:p-10 shadow-xl shadow-indigo-950/10">
        {/* Background glow effects */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/30 border border-indigo-400/30 text-indigo-200 text-xs font-semibold mb-4 backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            Comprehensive Placement & Academic Readiness
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Technical Expertise Hub
          </h1>
          <p className="mt-3 text-sm sm:text-base text-indigo-100/90 leading-relaxed">
            Master 10 fundamental computer science domains with structured video lectures, high-yield interview questions, curated study notes, and live interactive coding sessions.
          </p>

          {/* Quick Metrics Bar */}
          <div className="mt-6 pt-6 border-t border-indigo-700/50 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
            <div>
              <p className="text-2xl font-black text-white">10</p>
              <p className="text-xs text-indigo-200 font-medium">Core Subjects</p>
            </div>
            <div>
              <p className="text-2xl font-black text-white">{totalQuestions}+</p>
              <p className="text-xs text-indigo-200 font-medium">Interview Questions</p>
            </div>
            <div>
              <p className="text-2xl font-black text-white">50+</p>
              <p className="text-xs text-indigo-200 font-medium">Curated Videos</p>
            </div>
            <div>
              <p className="text-2xl font-black text-emerald-400">{totalMastered}</p>
              <p className="text-xs text-indigo-200 font-medium">Questions Mastered</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setFilter('all')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
              filter === 'all'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80'
            }`}
          >
            All Subjects (10)
          </button>
          <button
            onClick={() => setFilter('programming')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
              filter === 'programming'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80'
            }`}
          >
            Programming (Python, Java, C)
          </button>
          <button
            onClick={() => setFilter('core')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
              filter === 'core'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80'
            }`}
          >
            Core Systems & DSA
          </button>
          <button
            onClick={() => setFilter('web')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
              filter === 'web'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80'
            }`}
          >
            Web & Engineering
          </button>
        </div>

        {/* Search Input */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search subjects or topics..."
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Grid of Subjects */}
      {filteredSubjects.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-slate-700">No subjects found</h3>
          <p className="text-xs text-slate-500 mt-1">Try adjusting your search query or filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredSubjects.map((subject) => (
            <SubjectCard
              key={subject.id}
              subject={subject}
              onSelect={onSelectSubject}
              masteredCount={totalMastered}
            />
          ))}
        </div>
      )}
    </div>
  );
};
