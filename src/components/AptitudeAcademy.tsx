import React, { useState } from 'react';
import { 
  BrainCircuit, 
  PlayCircle, 
  PenTool, 
  Calculator, 
  ExternalLink, 
  Play, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Sparkles, 
  Award, 
  BookMarked,
  Clock,
  Compass,
  Zap
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { APTITUDE_DATA, QuizQuestion } from '../data/portalData';

interface AptitudeAcademyProps {
  onScoreUpdate: (scorePercent: number) => void;
}

export const AptitudeAcademy: React.FC<AptitudeAcademyProps> = ({ onScoreUpdate }) => {
  const [subTab, setSubTab] = useState<'videos' | 'quiz' | 'formulas'>('videos');

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleSelectOption = (questionId: number, optionIndex: number) => {
    if (submitted) return; // Prevent changing after submission
    setSelectedAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleSubmitQuiz = () => {
    let correctCount = 0;
    APTITUDE_DATA.quizQuestions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });

    const percent = Math.round((correctCount / APTITUDE_DATA.quizQuestions.length) * 100);
    setScore(correctCount);
    setSubmitted(true);
    onScoreUpdate(percent);

    if (percent >= 70) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setSubmitted(false);
    setScore(0);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Hero Header */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white p-6 sm:p-8 shadow-xl shadow-indigo-950/10">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/30 border border-purple-400/30 text-purple-200 text-xs font-semibold mb-3">
            <BrainCircuit className="w-3.5 h-3.5 text-purple-300" />
            Quantitative & Logical Reasoning Academy
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Aptitude & Analytical Mastery
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-purple-100/90 leading-relaxed">
            Campus placement drives and competitive exams require speed and conceptual accuracy. Learn shortcuts from CareerRide and test your problem-solving stamina with real evaluation quizzes.
          </p>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setSubTab('videos')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
            subTab === 'videos'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <PlayCircle className="w-4 h-4" />
          <span>YouTube Video Lectures</span>
        </button>

        <button
          onClick={() => setSubTab('quiz')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
            subTab === 'quiz'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <PenTool className="w-4 h-4" />
          <span>Practice Evaluation Session</span>
          <span className="text-[10px] bg-indigo-500/30 text-indigo-100 px-2 py-0.5 rounded-full font-mono">
            {APTITUDE_DATA.quizQuestions.length} Qs
          </span>
        </button>

        <button
          onClick={() => setSubTab('formulas')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
            subTab === 'formulas'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Calculator className="w-4 h-4" />
          <span>Formulas & Shortcuts Cheatsheet</span>
        </button>
      </div>

      {/* TAB 1: VIDEOS */}
      {subTab === 'videos' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          {/* Logical Reasoning Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Compass className="w-4 h-4 text-indigo-600" />
                  Logical Reasoning Sessions
                </h3>
                <p className="text-xs text-slate-500">
                  Step-by-step reasoning series for Number Series, Syllogisms, Blood Relations, and Arrangements.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {APTITUDE_DATA.logical.map((vid, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs hover:shadow-md transition flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-800">
                        Logical
                      </span>
                      <span className="text-[11px] text-slate-400 font-medium">
                        {vid.channel}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 mb-2">
                      {vid.title}
                    </h4>
                    <p className="text-xs text-slate-500 mb-3 leading-relaxed">
                      {vid.keyConcept}
                    </p>

                    {vid.formula && (
                      <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/60 font-mono text-[11px] text-indigo-900 mb-4">
                        💡 {vid.formula}
                      </div>
                    )}
                  </div>

                  <a
                    href={vid.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 px-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition"
                  >
                    <Play className="w-3.5 h-3.5 fill-indigo-600" />
                    <span>Watch CareerRide Lesson</span>
                    <ExternalLink className="w-3 h-3 opacity-60" />
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Quantitative Aptitude Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-emerald-600" />
                  Quantitative Aptitude Sessions
                </h3>
                <p className="text-xs text-slate-500">
                  Fast arithmetic and algebraic calculations for Percentages, Profit & Loss, Work, and Ratios.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {APTITUDE_DATA.quantitative.map((vid, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs hover:shadow-md transition flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                        Quantitative
                      </span>
                      <span className="text-[11px] text-slate-400 font-medium">
                        {vid.channel}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 mb-2">
                      {vid.title}
                    </h4>
                    <p className="text-xs text-slate-500 mb-3 leading-relaxed">
                      {vid.keyConcept}
                    </p>

                    {vid.formula && (
                      <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/60 font-mono text-[11px] text-emerald-900 mb-4">
                        ⚡ {vid.formula}
                      </div>
                    )}
                  </div>

                  <a
                    href={vid.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 px-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition"
                  >
                    <Play className="w-3.5 h-3.5 fill-emerald-600" />
                    <span>Watch CareerRide Lesson</span>
                    <ExternalLink className="w-3 h-3 opacity-60" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PRACTICE QUIZ EVALUATION */}
      {subTab === 'quiz' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <PenTool className="w-4 h-4 text-indigo-600" />
                Aptitude Practice Questions
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Answer all {APTITUDE_DATA.quizQuestions.length} questions and click 'Check Score Answers' to evaluate your score and view full step-by-step solutions.
              </p>
            </div>

            <div className="flex items-center gap-3">
              {submitted ? (
                <button
                  onClick={handleResetQuiz}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake Quiz</span>
                </button>
              ) : (
                <button
                  onClick={handleSubmitQuiz}
                  className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl text-xs font-bold transition shadow-md shadow-emerald-200 flex items-center gap-2"
                >
                  <Award className="w-4 h-4" />
                  <span>Check Score Answers</span>
                </button>
              )}
            </div>
          </div>

          {/* Results Score Banner */}
          {submitted && (
            <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-700 via-indigo-800 to-purple-800 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 animate-in zoom-in-95 duration-200">
              <div>
                <span className="text-xs font-bold text-indigo-200 uppercase tracking-wider">
                  Quiz Evaluation Completed Successfully
                </span>
                <h3 className="text-2xl font-black mt-1">
                  Score Achieved: {score} / {APTITUDE_DATA.quizQuestions.length} ({Math.round((score / APTITUDE_DATA.quizQuestions.length) * 100)}%)
                </h3>
                <p className="text-xs text-indigo-100 mt-1">
                  {score >= 9 
                    ? 'Outstanding! Excellent analytical speed and problem-solving readiness.' 
                    : score >= 6 
                    ? 'Good job! Review the explanations below to master the trickier topics.' 
                    : 'Keep practicing! Review the formulas and shortcuts in the video sessions.'}
                </p>
              </div>

              <button
                onClick={handleResetQuiz}
                className="px-5 py-2.5 bg-white text-indigo-900 rounded-xl text-xs font-bold transition shadow-md hover:bg-indigo-50 shrink-0"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Questions List */}
          <div className="space-y-4">
            {APTITUDE_DATA.quizQuestions.map((q, idx) => {
              const selectedOpt = selectedAnswers[q.id];
              const isAnswered = selectedOpt !== undefined;
              const isCorrect = submitted && selectedOpt === q.correctAnswer;
              const isWrong = submitted && selectedOpt !== undefined && selectedOpt !== q.correctAnswer;

              return (
                <div
                  key={q.id}
                  className={`bg-white rounded-2xl border p-5 sm:p-6 transition ${
                    submitted
                      ? isCorrect
                        ? 'border-emerald-300 bg-emerald-50/20'
                        : isWrong
                        ? 'border-rose-300 bg-rose-50/20'
                        : 'border-slate-200'
                      : 'border-slate-200/80 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 leading-snug">
                        {q.question}
                      </h4>
                    </div>

                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 shrink-0">
                      {q.topic}
                    </span>
                  </div>

                  {/* Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = selectedOpt === optIdx;
                      const isCorrectChoice = submitted && optIdx === q.correctAnswer;
                      const isWrongChoice = submitted && isSelected && !isCorrectChoice;

                      let optClass = 'border-slate-200 hover:bg-slate-50 text-slate-700';

                      if (submitted) {
                        if (isCorrectChoice) {
                          optClass = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-semibold ring-1 ring-emerald-500';
                        } else if (isWrongChoice) {
                          optClass = 'border-rose-500 bg-rose-50 text-rose-900 ring-1 ring-rose-500';
                        } else {
                          optClass = 'border-slate-200 opacity-60 text-slate-500';
                        }
                      } else if (isSelected) {
                        optClass = 'border-indigo-600 bg-indigo-50/70 text-indigo-900 font-semibold ring-1 ring-indigo-600';
                      }

                      return (
                        <label
                          key={optIdx}
                          onClick={() => handleSelectOption(q.id, optIdx)}
                          className={`flex items-center gap-3 p-3 rounded-xl border text-xs cursor-pointer transition select-none ${optClass}`}
                        >
                          <input
                            type="radio"
                            name={`quiz-q-${q.id}`}
                            checked={isSelected}
                            onChange={() => handleSelectOption(q.id, optIdx)}
                            disabled={submitted}
                            className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                          />
                          <span className="flex-1">{opt}</span>
                          {submitted && isCorrectChoice && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          )}
                          {submitted && isWrongChoice && (
                            <XCircle className="w-4 h-4 text-rose-600" />
                          )}
                        </label>
                      );
                    })}
                  </div>

                  {/* Explanation card upon submit */}
                  {submitted && (
                    <div className="mt-4 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed">
                      <p className="font-semibold text-slate-900 mb-1 flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5 text-amber-500" />
                        Explanation:
                      </p>
                      <p className="text-slate-600">{q.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: FORMULAS CHEATSHEET */}
      {subTab === 'formulas' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide text-indigo-700 flex items-center gap-2">
              <Calculator className="w-4 h-4" />
              Quantitative Formulas Cheatsheet
            </h3>
            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <p className="font-bold text-slate-800">Percentages & Growth</p>
                <p className="text-slate-600 mt-1 font-mono">Percentage = (Value / Total) * 100</p>
                <p className="text-slate-600 font-mono">% Change = (New - Old) / Old * 100</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <p className="font-bold text-slate-800">Profit, Loss & Discount</p>
                <p className="text-slate-600 mt-1 font-mono">Profit = SP - CP</p>
                <p className="text-slate-600 font-mono">Profit% = (Profit / CP) * 100</p>
                <p className="text-slate-600 font-mono">SP = CP * (100 + Gain%) / 100</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <p className="font-bold text-slate-800">Speed, Distance & Relative Motion</p>
                <p className="text-slate-600 mt-1 font-mono">Speed = Distance / Time</p>
                <p className="text-slate-600 font-mono">km/h to m/s: multiply by (5 / 18)</p>
                <p className="text-slate-600 font-mono">Average Speed = 2xy / (x + y)</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide text-purple-700 flex items-center gap-2">
              <Compass className="w-4 h-4" />
              Logical & Reasoning Rules
            </h3>
            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <p className="font-bold text-slate-800">Pythagoras Direction Theorem</p>
                <p className="text-slate-600 mt-1 font-mono">Shortest Distance = √(East-West² + North-South²)</p>
                <p className="text-slate-500 text-[11px] mt-0.5">Useful when person moves in right angles.</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <p className="font-bold text-slate-800">Circular Seating Arrangement</p>
                <p className="text-slate-600 mt-1 font-mono">Facing Center: Left = Clockwise, Right = Anti-Clockwise</p>
                <p className="text-slate-600 font-mono">Permutations in circle = (n - 1)!</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <p className="font-bold text-slate-800">Blood Relations Tree Symbols</p>
                <p className="text-slate-600 mt-1 font-mono">[+] = Male, [-] = Female, [=] = Married Couple</p>
                <p className="text-slate-600 font-mono">[|] = Parent-Child Generation Drop</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
