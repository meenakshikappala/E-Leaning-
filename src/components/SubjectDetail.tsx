import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  PlayCircle, 
  ExternalLink, 
  BookOpen, 
  CheckCircle2, 
  Copy, 
  Check, 
  Terminal, 
  HelpCircle, 
  Lightbulb, 
  Play, 
  RotateCcw, 
  Code2, 
  FileText,
  Clock,
  Sparkles,
  ChevronDown,
  Layers,
  CheckCircle
} from 'lucide-react';
import { SubjectModule } from '../data/portalData';

interface SubjectDetailProps {
  subject: SubjectModule;
  onBack: () => void;
  masteredMap: Record<string, boolean>;
  onToggleMastered: (questionId: string) => void;
  onOpenVideo?: (videoUrl: string, title: string) => void;
}

export const SubjectDetail: React.FC<SubjectDetailProps> = ({
  subject,
  onBack,
  masteredMap,
  onToggleMastered,
  onOpenVideo
}) => {
  const [activeTab, setActiveTab] = useState<'videos' | 'notes' | 'interview' | 'coding'>('videos');
  
  // Accordion open states
  const [openAccordion, setOpenAccordion] = useState<Record<string, boolean>>({
    [subject.interview[0]?.id || '']: true
  });

  // Coding sandbox state
  const [selectedChallengeIndex, setSelectedChallengeIndex] = useState(0);
  const [codeLanguage, setCodeLanguage] = useState<'javascript' | 'python'>('javascript');
  const [codeContent, setCodeContent] = useState('');
  const [consoleOutput, setConsoleOutput] = useState('');
  const [isConsoleError, setIsConsoleError] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const activeChallenge = subject.coding[selectedChallengeIndex] || subject.coding[0];

  // Sync starter code when challenge or language changes
  useEffect(() => {
    if (activeChallenge) {
      if (codeLanguage === 'javascript') {
        setCodeContent(activeChallenge.starterCodeJS);
      } else {
        setCodeContent(activeChallenge.starterCodePy);
      }
      setConsoleOutput('Click "Run Code" to execute code and view output...');
      setIsConsoleError(false);
      setShowHint(false);
    }
  }, [selectedChallengeIndex, codeLanguage, subject.id]);

  const toggleAccordion = (id: string) => {
    setOpenAccordion(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Pyodide loader
  const runPythonInBrowser = async (pyCode: string): Promise<string> => {
    // Check if pyodide is already on window
    const win = window as any;
    if (!win._pyodideInstance) {
      if (!win.loadPyodide) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js';
        document.head.appendChild(script);
        await new Promise((resolve, reject) => {
          script.onload = resolve;
          script.onerror = () => reject(new Error('Failed to load Pyodide Python runtime'));
        });
      }
      win._pyodideInstance = await win.loadPyodide({
        indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.23.4/full/'
      });
    }

    const pyodide = win._pyodideInstance;
    const runnerScript = `
import sys, io
_buf = io.StringIO()
_orig = sys.stdout
sys.stdout = _buf
try:
${pyCode.split('\n').map(line => '    ' + line).join('\n')}
finally:
    sys.stdout = _orig
_buf.getvalue()
`;
    return await pyodide.runPythonAsync(runnerScript);
  };

  // Sandbox Runner
  const handleRunCode = async () => {
    setIsRunning(true);
    setIsConsoleError(false);
    setConsoleOutput('Executing code...');

    try {
      if (codeLanguage === 'javascript') {
        const logs: string[] = [];
        const originalLog = console.log;
        const originalError = console.error;
        const originalWarn = console.warn;

        console.log = (...args: any[]) => {
          logs.push(args.map(a => (typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a))).join(' '));
          originalLog.apply(console, args);
        };
        console.error = (...args: any[]) => {
          logs.push('[Error] ' + args.join(' '));
          originalError.apply(console, args);
        };
        console.warn = (...args: any[]) => {
          logs.push('[Warn] ' + args.join(' '));
          originalWarn.apply(console, args);
        };

        // Run in new Function scope
        try {
          const runFn = new Function(codeContent);
          runFn();
        } finally {
          console.log = originalLog;
          console.error = originalError;
          console.warn = originalWarn;
        }

        if (logs.length > 0) {
          setConsoleOutput(logs.join('\n'));
        } else {
          setConsoleOutput('Program executed successfully without console output.');
        }
      } else {
        // Python execution via Pyodide
        setConsoleOutput('Initializing Python environment (Pyodide)...');
        const output = await runPythonInBrowser(codeContent);
        setConsoleOutput(output || 'Python program executed with no stdout.');
      }
    } catch (err: any) {
      setIsConsoleError(true);
      setConsoleOutput(`Execution Error:\n${err.message || String(err)}`);
    } finally {
      setIsRunning(false);
    }
  };

  const handleResetCode = () => {
    if (activeChallenge) {
      setCodeContent(codeLanguage === 'javascript' ? activeChallenge.starterCodeJS : activeChallenge.starterCodePy);
      setConsoleOutput('Template code reset.');
      setIsConsoleError(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Breadcrumb & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors border border-slate-200"
            title="Back to Subjects Hub"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                Subject Workspace
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs text-slate-500 font-medium">{subject.badge}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
              {subject.title}
            </h1>
          </div>
        </div>

        {/* External Notes Link */}
        <a
          href={subject.notesUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition shadow-xs self-start sm:self-auto"
        >
          <BookOpen className="w-4 h-4 text-emerald-400" />
          <span>GeeksforGeeks Docs</span>
          <ExternalLink className="w-3.5 h-3.5 opacity-70" />
        </a>
      </div>

      {/* Main Workspace Layout (Sidebar Navigation + Dynamic Panel) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Sub-Sidebar */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200/80 p-3 shadow-2xs space-y-1">
            <button
              onClick={() => setActiveTab('videos')}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition ${
                activeTab === 'videos'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <PlayCircle className="w-4 h-4" />
                <span>YouTube Links</span>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                activeTab === 'videos' ? 'bg-indigo-700 text-white' : 'bg-slate-100 text-slate-500'
              }`}>
                {subject.videos.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('notes')}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition ${
                activeTab === 'notes'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <FileText className="w-4 h-4" />
                <span>Notes & Cheatsheet</span>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                activeTab === 'notes' ? 'bg-indigo-700 text-white' : 'bg-slate-100 text-slate-500'
              }`}>
                Docs
              </span>
            </button>

            <button
              onClick={() => setActiveTab('interview')}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition ${
                activeTab === 'interview'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <HelpCircle className="w-4 h-4" />
                <span>Interview Q&A</span>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                activeTab === 'interview' ? 'bg-indigo-700 text-white' : 'bg-slate-100 text-slate-500'
              }`}>
                {subject.interview.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('coding')}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition ${
                activeTab === 'coding'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <Terminal className="w-4 h-4" />
                <span>Coding Session</span>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                activeTab === 'coding' ? 'bg-indigo-700 text-white' : 'bg-slate-100 text-slate-500'
              }`}>
                {subject.coding.length}
              </span>
            </button>
          </div>

          {/* Quick Syllabus Box */}
          <div className="bg-slate-50 rounded-2xl border border-slate-200/80 p-4">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-indigo-600" />
              Syllabus Outline
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-600">
              {subject.topics.map((t, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Main Content Pane */}
        <div className="lg:col-span-9">
          {/* TAB 1: YOUTUBE VIDEOS */}
          {activeTab === 'videos' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <PlayCircle className="w-5 h-5 text-rose-600" />
                    Curated YouTube Video Lectures
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    High quality, verified tutorials from top educators (Mosh, Bro Code, Gate Smashers, FreeCodeCamp).
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {subject.videos.map((vid) => (
                  <div
                    key={vid.id}
                    className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-2xs hover:shadow-md transition flex flex-col justify-between group"
                  >
                    {/* Visual Card Banner */}
                    <div className="relative h-36 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-800 p-4 flex flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-500/80 text-white uppercase tracking-wider">
                          YouTube Material
                        </span>
                        {vid.duration && (
                          <span className="text-[11px] text-slate-300 font-mono flex items-center gap-1 bg-black/40 px-2 py-0.5 rounded">
                            <Clock className="w-3 h-3 text-slate-400" />
                            {vid.duration}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-center my-auto">
                        <div className="w-12 h-12 rounded-full bg-rose-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <Play className="w-5 h-5 fill-white ml-0.5" />
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-slate-300">
                        <span>{vid.channel || 'Engineering Educator'}</span>
                        {vid.difficulty && (
                          <span className="text-indigo-300 font-medium">{vid.difficulty}</span>
                        )}
                      </div>
                    </div>

                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <h4 className="text-sm font-bold text-slate-900 line-clamp-2 mb-3">
                        {vid.name}
                      </h4>

                      <a
                        href={vid.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2.5 px-3 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition"
                      >
                        <Play className="w-3.5 h-3.5 fill-rose-600" />
                        <span>Watch on YouTube</span>
                        <ExternalLink className="w-3 h-3 opacity-60" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: NOTES & CHEATSHEET */}
          {activeTab === 'notes' && (
            <div className="space-y-5 animate-in fade-in duration-200">
              {/* GeeksforGeeks Direct Callout Box */}
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold text-emerald-800 uppercase tracking-wide">
                    Study Notes Material
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mt-1">
                    GeeksforGeeks Complete Comprehensive Tutorial
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 max-w-xl">
                    Access in-depth documentation, article archives, syntax examples, and academic revision sheets.
                  </p>
                </div>
                <a
                  href={subject.notesUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold transition flex items-center gap-2 shadow-xs shrink-0"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Open GeeksforGeeks Notes</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* In-Portal Overview Notes */}
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs space-y-6">
                <div className="border-b border-slate-100 pb-4">
                  <h3 className="text-base font-bold text-slate-900">
                    Quick Review Notes & Core Syntaxes
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Key concepts to revise right before your technical interview.
                  </p>
                </div>

                <div className="space-y-6">
                  {subject.overviewNotes.map((note, index) => (
                    <div key={index} className="space-y-2">
                      <h4 className="text-sm font-bold text-slate-800">
                        {note.heading}
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line">
                        {note.content}
                      </p>
                      {note.codeSnippet && (
                        <div className="relative rounded-xl overflow-hidden bg-slate-900 border border-slate-800 p-4 font-mono text-xs text-emerald-300">
                          <button
                            onClick={() => handleCopy(note.codeSnippet || '', `note-${index}`)}
                            className="absolute right-3 top-3 p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition"
                            title="Copy code"
                          >
                            {copiedId === `note-${index}` ? (
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                          <pre className="overflow-x-auto">{note.codeSnippet}</pre>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: INTERVIEW QUESTIONS ACCORDION */}
          {activeTab === 'interview' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Technical Interview Questions & Verified Answers
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Click each question to view the model answer. Mark items as mastered as you prepare.
                  </p>
                </div>
                <div className="text-xs text-slate-500 font-medium">
                  {subject.interview.filter(q => masteredMap[q.id]).length} / {subject.interview.length} Mastered
                </div>
              </div>

              <div className="space-y-3">
                {subject.interview.map((item, index) => {
                  const isOpen = !!openAccordion[item.id];
                  const isMastered = !!masteredMap[item.id];

                  return (
                    <div
                      key={item.id}
                      className={`bg-white rounded-2xl border transition-all ${
                        isOpen 
                          ? 'border-indigo-300 shadow-md shadow-indigo-50/60' 
                          : 'border-slate-200/80 hover:border-slate-300'
                      }`}
                    >
                      {/* Accordion Trigger Header */}
                      <div
                        onClick={() => toggleAccordion(item.id)}
                        className="p-4 sm:p-5 flex items-center justify-between gap-3 cursor-pointer select-none"
                      >
                        <div className="flex items-start gap-3">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-100 text-slate-600 text-xs font-bold flex items-center justify-center mt-0.5">
                            {index + 1}
                          </span>
                          <div>
                            <h4 className="text-sm font-semibold text-slate-900">
                              {item.q}
                            </h4>
                            {item.category && (
                              <span className="text-[10px] text-slate-400 font-medium">
                                Topic: {item.category}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onToggleMastered(item.id);
                            }}
                            className={`p-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1 transition ${
                              isMastered
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                                : 'text-slate-400 border-slate-200 hover:text-slate-600 hover:bg-slate-50'
                            }`}
                            title={isMastered ? 'Marked as Mastered' : 'Mark as Mastered'}
                          >
                            <CheckCircle2 className={`w-4 h-4 ${isMastered ? 'text-emerald-600 fill-emerald-100' : ''}`} />
                            <span className="hidden sm:inline text-[11px]">
                              {isMastered ? 'Mastered' : 'Mark'}
                            </span>
                          </button>

                          <div className={`p-1 rounded-lg text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-indigo-600' : ''}`}>
                            <ChevronDown className="w-5 h-5" />
                          </div>
                        </div>
                      </div>

                      {/* Accordion Answer Content */}
                      {isOpen && (
                        <div className="px-5 pb-5 pt-1 border-t border-slate-100 text-xs text-slate-700 leading-relaxed">
                          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 whitespace-pre-line font-normal text-slate-800">
                            {item.a}
                          </div>

                          <div className="mt-3 flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleCopy(item.a, item.id)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-600 rounded-lg border border-slate-200 text-xs font-medium transition"
                            >
                              {copiedId === item.id ? (
                                <>
                                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                                  <span className="text-emerald-600">Copied to Clipboard</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3.5 h-3.5" />
                                  <span>Copy Answer</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: LIVE CODE SANDBOX WORKSPACE */}
          {activeTab === 'coding' && (
            <div className="space-y-5 animate-in fade-in duration-200">
              {/* Controls bar */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Choose Coding Challenge Practice
                    </label>
                    <select
                      value={selectedChallengeIndex}
                      onChange={(e) => setSelectedChallengeIndex(Number(e.target.value))}
                      className="w-full sm:max-w-md px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                    >
                      {subject.coding.map((ch, idx) => (
                        <option key={ch.id} value={idx}>
                          {idx + 1}. {ch.title} ({ch.difficulty})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Language Engine
                    </label>
                    <div className="inline-flex p-1 rounded-xl bg-slate-100 border border-slate-200">
                      <button
                        onClick={() => setCodeLanguage('javascript')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                          codeLanguage === 'javascript'
                            ? 'bg-white text-indigo-700 shadow-2xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        JavaScript (Node)
                      </button>
                      <button
                        onClick={() => setCodeLanguage('python')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                          codeLanguage === 'python'
                            ? 'bg-white text-indigo-700 shadow-2xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        Python (Pyodide)
                      </button>
                    </div>
                  </div>
                </div>

                {/* Problem Description & Hint */}
                {activeChallenge && (
                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-slate-900">
                        {activeChallenge.title}
                      </h4>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        activeChallenge.difficulty === 'Easy' 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {activeChallenge.difficulty}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {activeChallenge.description}
                    </p>

                    <div className="pt-2">
                      <button
                        onClick={() => setShowHint(!showHint)}
                        className="text-xs font-semibold text-amber-700 hover:text-amber-800 flex items-center gap-1.5"
                      >
                        <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                        <span>{showHint ? 'Hide Hint' : 'View Approach Hint'}</span>
                      </button>

                      {showHint && (
                        <div className="mt-2 p-3 bg-amber-50/80 border border-amber-200 rounded-lg text-xs text-amber-900 whitespace-pre-line">
                          {activeChallenge.hint}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Editor & Console Split */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                {/* Code Editor */}
                <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-md flex flex-col">
                  <div className="px-4 py-2.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                      <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                      <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                      <span className="text-xs font-mono text-slate-400 ml-2">
                        playground.{codeLanguage === 'javascript' ? 'js' : 'py'}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleResetCode}
                        className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition flex items-center gap-1"
                        title="Reset to starter template"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Reset</span>
                      </button>
                      <button
                        onClick={handleRunCode}
                        disabled={isRunning}
                        className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-xs disabled:opacity-50"
                      >
                        <Play className="w-3 h-3 fill-white" />
                        <span>{isRunning ? 'Running...' : 'Run Code'}</span>
                      </button>
                    </div>
                  </div>

                  <textarea
                    value={codeContent}
                    onChange={(e) => setCodeContent(e.target.value)}
                    spellCheck={false}
                    className="w-full h-80 p-4 bg-transparent font-mono text-xs text-slate-100 resize-none focus:outline-none leading-relaxed selection:bg-indigo-600/40"
                    placeholder="Write your code here..."
                  />
                </div>

                {/* Console Output */}
                <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-md flex flex-col">
                  <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
                    <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                      Terminal Output Console
                    </span>
                    <button
                      onClick={() => setConsoleOutput('')}
                      className="text-[11px] text-slate-400 hover:text-slate-200 transition"
                    >
                      Clear
                    </button>
                  </div>

                  <div className="p-4 h-80 overflow-y-auto font-mono text-xs leading-relaxed">
                    {consoleOutput ? (
                      <pre className={`whitespace-pre-wrap ${isConsoleError ? 'text-rose-400' : 'text-emerald-400'}`}>
                        {consoleOutput}
                      </pre>
                    ) : (
                      <span className="text-slate-600 italic">No output yet. Click 'Run Code'.</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
