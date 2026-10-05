import React, { useState } from 'react';
import { 
  Users, 
  ChevronDown, 
  Copy, 
  Check, 
  Sparkles, 
  Lightbulb, 
  Search, 
  Layers, 
  ArrowRight, 
  ArrowLeft,
  RotateCw,
  Award,
  BookOpen
} from 'lucide-react';
import { HR_INTERVIEW_DATA, HRQuestion } from '../data/portalData';

export const HRInterviewDeck: React.FC = () => {
  const [viewMode, setViewMode] = useState<'accordion' | 'flashcards'>('accordion');
  const [searchQuery, setSearchQuery] = useState('');
  const [openIds, setOpenIds] = useState<Record<number, boolean>>({ 1: true });
  const [copiedId, setCopiedId] = useState<number | null>(null);

  // Flashcard mode state
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const filteredQuestions = HR_INTERVIEW_DATA.filter(q => 
    q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.interviewerIntent.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleQuestion = (id: number) => {
    setOpenIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCopy = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const activeFlashcard = HR_INTERVIEW_DATA[currentCardIndex] || HR_INTERVIEW_DATA[0];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Hero Header */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 shadow-xl shadow-slate-950/10">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/30 border border-indigo-400/30 text-indigo-200 text-xs font-semibold mb-3">
            <Users className="w-3.5 h-3.5 text-indigo-300" />
            Behavioral & HR Round Preparation
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Top 20 HR Interview Questions & Model Answers
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
            The HR round evaluates your cultural alignment, work ethic, communication clarity, and long-term vision. Master the 20 most frequently asked questions with proven templates and interviewer insights.
          </p>
        </div>
      </div>

      {/* Mode Switcher and Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
        <div className="inline-flex p-1 rounded-xl bg-slate-100 border border-slate-200">
          <button
            onClick={() => setViewMode('accordion')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition ${
              viewMode === 'accordion'
                ? 'bg-white text-indigo-700 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Questions List (20)
          </button>
          <button
            onClick={() => setViewMode('flashcards')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
              viewMode === 'flashcards'
                ? 'bg-white text-indigo-700 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-indigo-600" />
            <span>Interactive Flashcard Drill</span>
          </button>
        </div>

        {viewMode === 'accordion' && (
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search HR questions or keywords..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>
        )}
      </div>

      {/* MODE 1: ACCORDION VIEW */}
      {viewMode === 'accordion' && (
        <div className="space-y-3">
          {filteredQuestions.map((item) => {
            const isOpen = !!openIds[item.id];

            return (
              <div
                key={item.id}
                className={`bg-white rounded-2xl border transition-all ${
                  isOpen 
                    ? 'border-indigo-300 shadow-md shadow-indigo-50/60' 
                    : 'border-slate-200/80 hover:border-slate-300'
                }`}
              >
                {/* Trigger */}
                <div
                  onClick={() => toggleQuestion(item.id)}
                  className="p-4 sm:p-5 flex items-center justify-between gap-3 cursor-pointer select-none"
                >
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {item.id}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 leading-snug">
                      {item.question}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopy(item.answer, item.id);
                      }}
                      className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-500 text-xs transition"
                      title="Copy Answer"
                    >
                      {copiedId === item.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>

                    <div className={`p-1 rounded-lg text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-indigo-600' : ''}`}>
                      <ChevronDown className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Response Drawer */}
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 border-t border-slate-100 space-y-4">
                    {/* Model Answer */}
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 leading-relaxed whitespace-pre-line font-medium">
                      <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                        Recommended Model Response
                      </span>
                      {item.answer}
                    </div>

                    {/* Interviewer Insight & Tips */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      <div className="p-3 bg-indigo-50/60 rounded-xl border border-indigo-100 text-indigo-900">
                        <span className="font-bold flex items-center gap-1.5 text-indigo-800 mb-1">
                          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                          What Interviewer Is Testing:
                        </span>
                        <p className="text-indigo-800/80 leading-relaxed">
                          {item.interviewerIntent}
                        </p>
                      </div>

                      <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-100 text-amber-900">
                        <span className="font-bold flex items-center gap-1.5 text-amber-800 mb-1">
                          <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                          Delivery Pro-Tips:
                        </span>
                        <ul className="list-disc list-inside space-y-0.5 text-amber-800/80">
                          {item.tips.map((tip, idx) => (
                            <li key={idx}>{tip}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* MODE 2: FLASHCARD DRILL */}
      {viewMode === 'flashcards' && (
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
              Card {currentCardIndex + 1} of {HR_INTERVIEW_DATA.length}
            </span>
            <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
              <div 
                className="bg-indigo-600 h-full transition-all duration-300"
                style={{ width: `${((currentCardIndex + 1) / HR_INTERVIEW_DATA.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Flashcard container */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className={`min-h-[320px] p-8 rounded-3xl border cursor-pointer select-none transition-all duration-300 flex flex-col justify-between shadow-lg ${
              isFlipped
                ? 'bg-gradient-to-br from-indigo-900 to-slate-900 text-white border-indigo-800'
                : 'bg-white border-slate-200 hover:border-indigo-400 text-slate-900 shadow-slate-200/50'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                  isFlipped ? 'bg-indigo-800 text-indigo-200' : 'bg-indigo-50 text-indigo-700'
                }`}>
                  {isFlipped ? 'Model Answer' : 'Question Prompt'}
                </span>
                <span className={`text-xs flex items-center gap-1 ${isFlipped ? 'text-indigo-300' : 'text-slate-400'}`}>
                  <RotateCw className="w-3.5 h-3.5" />
                  Click card to flip
                </span>
              </div>

              {!isFlipped ? (
                <div className="py-8">
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                    {activeFlashcard.question}
                  </h3>
                  <p className="text-xs text-slate-500 mt-4 leading-relaxed">
                    Take a moment to formulate your answer aloud before flipping to inspect the ideal answer and tips.
                  </p>
                </div>
              ) : (
                <div className="py-4 space-y-4 animate-in fade-in duration-200">
                  <p className="text-sm text-slate-100 leading-relaxed whitespace-pre-line font-normal">
                    {activeFlashcard.answer}
                  </p>
                  <div className="pt-3 border-t border-indigo-800/80 text-xs text-indigo-300">
                    <p className="font-semibold text-white mb-1">Key tips:</p>
                    <ul className="list-disc list-inside space-y-0.5">
                      {activeFlashcard.tips.map((t, idx) => (
                        <li key={idx}>{t}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            <div className={`pt-4 border-t text-xs flex items-center justify-between ${
              isFlipped ? 'border-indigo-800/60 text-indigo-300' : 'border-slate-100 text-slate-400'
            }`}>
              <span>Question #{activeFlashcard.id}</span>
              <span>Tap to {isFlipped ? 'see question' : 'reveal answer'}</span>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={() => {
                setIsFlipped(false);
                setCurrentCardIndex(prev => (prev > 0 ? prev - 1 : HR_INTERVIEW_DATA.length - 1));
              }}
              className="px-4 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold transition flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous Card</span>
            </button>

            <button
              onClick={() => setIsFlipped(!isFlipped)}
              className="px-4 py-2.5 bg-indigo-50 text-indigo-700 rounded-xl text-xs font-bold hover:bg-indigo-100 transition flex items-center gap-1.5"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>Flip Card</span>
            </button>

            <button
              onClick={() => {
                setIsFlipped(false);
                setCurrentCardIndex(prev => (prev < HR_INTERVIEW_DATA.length - 1 ? prev + 1 : 0));
              }}
              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-xs"
            >
              <span>Next Card</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
