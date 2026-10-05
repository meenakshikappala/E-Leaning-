import React, { useState, useEffect } from 'react';
import { 
  Search, 
  X, 
  BookOpen, 
  HelpCircle, 
  PlayCircle, 
  BrainCircuit, 
  Users, 
  ArrowRight,
  Code2
} from 'lucide-react';
import { SUBJECTS_DATA, APTITUDE_DATA, HR_INTERVIEW_DATA } from '../data/portalData';

interface SearchResult {
  id: string;
  type: 'subject' | 'interview' | 'video' | 'aptitude' | 'hr';
  title: string;
  subtitle: string;
  subjectId?: string;
  externalUrl?: string;
}

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSubject: (subjectId: string) => void;
  onNavigateTab: (tab: 'dashboard' | 'subjects' | 'aptitude' | 'hr' | 'flashcards' | 'sandbox') => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectSubject,
  onNavigateTab
}) => {
  const [query, setQuery] = useState('');

  // Keyboard shortcut listener (Escape to close)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Search indexing
  const results: SearchResult[] = [];
  const q = query.trim().toLowerCase();

  if (q.length > 0) {
    // 1. Search Subjects
    Object.values(SUBJECTS_DATA).forEach(s => {
      if (s.title.toLowerCase().includes(q) || s.summary.toLowerCase().includes(q)) {
        results.push({
          id: `subj-${s.id}`,
          type: 'subject',
          title: s.title,
          subtitle: s.summary,
          subjectId: s.id
        });
      }

      // 2. Search Subject Interview Questions
      s.interview.forEach(item => {
        if (item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q)) {
          results.push({
            id: `q-${item.id}`,
            type: 'interview',
            title: item.q,
            subtitle: `${s.shortName} Technical Interview Q&A`,
            subjectId: s.id
          });
        }
      });

      // 3. Search Videos
      s.videos.forEach(v => {
        if (v.name.toLowerCase().includes(q)) {
          results.push({
            id: `vid-${v.id}`,
            type: 'video',
            title: v.name,
            subtitle: `${s.shortName} YouTube Lesson (${v.channel || 'Tutorial'})`,
            externalUrl: v.url
          });
        }
      });
    });

    // 4. Search HR Questions
    HR_INTERVIEW_DATA.forEach(hr => {
      if (hr.question.toLowerCase().includes(q) || hr.answer.toLowerCase().includes(q)) {
        results.push({
          id: `hr-${hr.id}`,
          type: 'hr',
          title: hr.question,
          subtitle: `Top 20 HR Round Question #${hr.id}`
        });
      }
    });

    // 5. Search Aptitude
    APTITUDE_DATA.quizQuestions.forEach(quiz => {
      if (quiz.question.toLowerCase().includes(q) || quiz.topic.toLowerCase().includes(q)) {
        results.push({
          id: `apt-${quiz.id}`,
          type: 'aptitude',
          title: quiz.question,
          subtitle: `Aptitude Practice Question (${quiz.topic})`
        });
      }
    });
  }

  const handleResultClick = (res: SearchResult) => {
    onClose();
    if (res.externalUrl) {
      window.open(res.externalUrl, '_blank');
      return;
    }
    if (res.subjectId) {
      onSelectSubject(res.subjectId);
    } else if (res.type === 'hr') {
      onNavigateTab('hr');
    } else if (res.type === 'aptitude') {
      onNavigateTab('aptitude');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-24 animate-in fade-in duration-150">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[80vh]"
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-100 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search subjects, interview questions, coding labs, HR questions..."
            className="w-full text-sm font-medium focus:outline-none placeholder:text-slate-400"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-slate-400 hover:text-slate-600 px-2 py-1"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Container */}
        <div className="p-3 overflow-y-auto flex-1 divide-y divide-slate-100">
          {query.trim().length === 0 ? (
            <div className="p-8 text-center text-slate-400 space-y-2">
              <Search className="w-8 h-8 mx-auto text-slate-300" />
              <p className="text-xs font-medium">Type any keyword to search across the entire learning portal.</p>
              <div className="flex flex-wrap justify-center gap-1.5 pt-2">
                {['Python OOP', 'SQL Joins', 'Binary Search', 'Tell me about yourself', 'Prime Number', 'Percentages'].map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => setQuery(s)}
                    className="text-[11px] px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="p-8 text-center text-slate-500">
              <p className="text-sm font-semibold">No matches found for "{query}"</p>
              <p className="text-xs text-slate-400 mt-1">Try another search term or check spelling.</p>
            </div>
          ) : (
            results.slice(0, 15).map((r) => (
              <div
                key={r.id}
                onClick={() => handleResultClick(r)}
                className="p-3 hover:bg-indigo-50/60 rounded-xl cursor-pointer transition flex items-center justify-between gap-3 group"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 group-hover:bg-indigo-100 text-slate-600 group-hover:text-indigo-600 flex items-center justify-center shrink-0 mt-0.5 transition-colors">
                    {r.type === 'subject' && <BookOpen className="w-4 h-4" />}
                    {r.type === 'interview' && <HelpCircle className="w-4 h-4" />}
                    {r.type === 'video' && <PlayCircle className="w-4 h-4" />}
                    {r.type === 'hr' && <Users className="w-4 h-4" />}
                    {r.type === 'aptitude' && <BrainCircuit className="w-4 h-4" />}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 group-hover:text-indigo-900 transition-colors line-clamp-1">
                      {r.title}
                    </h4>
                    <p className="text-[11px] text-slate-400 line-clamp-1">
                      {r.subtitle}
                    </p>
                  </div>
                </div>

                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition" />
              </div>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-400 flex items-center justify-between">
          <span>{results.length} result(s) found</span>
          <span>Press ESC to close</span>
        </div>
      </div>
    </div>
  );
};
