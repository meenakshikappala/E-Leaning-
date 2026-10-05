import React, { useState, useEffect, useRef } from 'react';
import { 
  Terminal, 
  Play, 
  RotateCcw, 
  Copy, 
  Check, 
  Code2, 
  Sparkles, 
  Layers, 
  Download,
  Eye,
  FileCode,
  Laptop
} from 'lucide-react';

interface TemplateSnippet {
  id: string;
  name: string;
  lang: 'javascript' | 'python' | 'html';
  code: string;
  desc: string;
}

const TEMPLATES: TemplateSnippet[] = [
  {
    id: 'py-prime',
    name: 'Prime Number Checker',
    lang: 'python',
    desc: 'O(√N) factor testing algorithm',
    code: `def check_prime(n):
    if n <= 1:
        return False
    for i in range(2, int(n**0.5) + 1):
        if n % i == 0:
            return False
    return True

test_numbers = [2, 17, 24, 31, 99, 101]
for num in test_numbers:
    print(f"Is {num} prime? -> {check_prime(num)}")
`
  },
  {
    id: 'js-fibo',
    name: 'Fibonacci Series (Iterative)',
    lang: 'javascript',
    desc: 'O(N) time linear generation',
    code: `function fibonacci(n) {
  if (n <= 0) return [];
  if (n === 1) return [0];
  const seq = [0, 1];
  for (let i = 2; i < n; i++) {
    seq.push(seq[i - 1] + seq[i - 2]);
  }
  return seq;
}

console.log("First 10 Fibonacci terms:");
console.log(fibonacci(10).join(" -> "));
`
  },
  {
    id: 'py-pal',
    name: 'Palindrome Verification',
    lang: 'python',
    desc: 'Two-pointer bidirectional check',
    code: `def is_palindrome(text):
    clean = str(text).lower().replace(" ", "")
    return clean == clean[::-1]

words = ["radar", "racecar", "smartlearning", "12321", "hello"]
for w in words:
    print(f"'{w}': Palindrome? -> {is_palindrome(w)}")
`
  },
  {
    id: 'js-bs',
    name: 'Binary Search Algorithm',
    lang: 'javascript',
    desc: 'O(log N) divide-and-conquer on sorted arrays',
    code: `function binarySearch(arr, target) {
  let low = 0, high = arr.length - 1;
  while (low <= high) {
    let mid = Math.floor((low + high) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  return -1;
}

const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31];
console.log("Array:", primes.join(", "));
console.log("Index of 17:", binarySearch(primes, 17));
console.log("Index of 20 (not found):", binarySearch(primes, 20));
`
  },
  {
    id: 'html-preview',
    name: 'Semantic HTML5 Interactive Card',
    lang: 'html',
    desc: 'Renders instantly in live preview iframe',
    code: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: system-ui, sans-serif; padding: 20px; background: #f8fafc; }
    .card { background: white; border-radius: 12px; padding: 24px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); max-width: 320px; margin: auto; }
    h2 { color: #4338ca; margin: 0 0 8px 0; font-size: 18px; }
    p { color: #64748b; font-size: 14px; line-height: 1.5; }
    .badge { display: inline-block; background: #e0e7ff; color: #3730a3; padding: 4px 10px; border-radius: 9999px; font-size: 12px; font-weight: 600; margin-bottom: 12px; }
    button { background: #4f46e5; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-weight: 600; width: 100%; }
    button:hover { background: #4338ca; }
  </style>
</head>
<body>
  <div class="card">
    <span class="badge">Interview Ready</span>
    <h2>Smart Learning Portal</h2>
    <p>Master Python, Java, C, DBMS, HTML, DSA, and Aptitude with live coding environments.</p>
    <button onclick="alert('Ready to ace technical interviews!')">Test Click</button>
  </div>
</body>
</html>`
  }
];

export const LivePlayground: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateSnippet>(TEMPLATES[0]);
  const [code, setCode] = useState(TEMPLATES[0].code);
  const [language, setLanguage] = useState<'javascript' | 'python' | 'html'>(TEMPLATES[0].lang);
  const [consoleOutput, setConsoleOutput] = useState('');
  const [isError, setIsError] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleSelectTemplate = (t: TemplateSnippet) => {
    setSelectedTemplate(t);
    setCode(t.code);
    setLanguage(t.lang);
    setConsoleOutput('Template loaded. Click "Run Code" to execute.');
    setIsError(false);
  };

  const handleLanguageChange = (lang: 'javascript' | 'python' | 'html') => {
    setLanguage(lang);
    const match = TEMPLATES.find(t => t.lang === lang);
    if (match) {
      handleSelectTemplate(match);
    }
  };

  const runCode = async () => {
    setIsRunning(true);
    setIsError(false);

    if (language === 'html') {
      if (iframeRef.current) {
        iframeRef.current.srcdoc = code;
      }
      setConsoleOutput('HTML rendered in Live Preview frame.');
      setIsRunning(false);
      return;
    }

    if (language === 'javascript') {
      const logs: string[] = [];
      const origLog = console.log;
      const origErr = console.error;

      console.log = (...args: any[]) => {
        logs.push(args.map(a => (typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a))).join(' '));
        origLog.apply(console, args);
      };
      console.error = (...args: any[]) => {
        logs.push('[Error] ' + args.join(' '));
        origErr.apply(console, args);
      };

      try {
        const fn = new Function(code);
        fn();
        setConsoleOutput(logs.join('\n') || 'Program executed with no log output.');
      } catch (e: any) {
        setIsError(true);
        setConsoleOutput(`Runtime Error: ${e.message}`);
      } finally {
        console.log = origLog;
        console.error = origErr;
        setIsRunning(false);
      }
      return;
    }

    if (language === 'python') {
      setConsoleOutput('Loading Python runtime (Pyodide in WebAssembly)...');
      try {
        const win = window as any;
        if (!win._pyodideInstance) {
          if (!win.loadPyodide) {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js';
            document.head.appendChild(script);
            await new Promise((res, rej) => {
              script.onload = res;
              script.onerror = rej;
            });
          }
          win._pyodideInstance = await win.loadPyodide({
            indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.23.4/full/'
          });
        }

        const pyodide = win._pyodideInstance;
        const wrapper = `
import sys, io
_out = io.StringIO()
_orig = sys.stdout
sys.stdout = _out
try:
${code.split('\n').map(l => '    ' + l).join('\n')}
finally:
    sys.stdout = _orig
_out.getvalue()
`;
        const res = await pyodide.runPythonAsync(wrapper);
        setConsoleOutput(res || 'Program finished successfully with no output.');
      } catch (err: any) {
        setIsError(true);
        setConsoleOutput(`Python Error: ${err.message || String(err)}`);
      } finally {
        setIsRunning(false);
      }
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
              Interactive Dev Sandbox
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-slate-500 font-medium">In-Browser Compilation</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-1 flex items-center gap-2">
            <Terminal className="w-6 h-6 text-indigo-600" />
            Live Code Playground & Compiler
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Test and run code snippets in Python, JavaScript, or preview HTML/CSS live right in your browser.
          </p>
        </div>

        {/* Language selector */}
        <div className="inline-flex p-1 rounded-xl bg-slate-100 border border-slate-200 shrink-0">
          <button
            onClick={() => handleLanguageChange('javascript')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              language === 'javascript' ? 'bg-white text-indigo-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            JavaScript
          </button>
          <button
            onClick={() => handleLanguageChange('python')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              language === 'python' ? 'bg-white text-indigo-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Python (Pyodide)
          </button>
          <button
            onClick={() => handleLanguageChange('html')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              language === 'html' ? 'bg-white text-indigo-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            HTML / Web
          </button>
        </div>
      </div>

      {/* Preset Snippets Carousel */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-2 flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Presets:
        </span>
        {TEMPLATES.map((t) => (
          <button
            key={t.id}
            onClick={() => handleSelectTemplate(t)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition border ${
              selectedTemplate.id === t.id
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            {t.name}
          </button>
        ))}
      </div>

      {/* Editor & Output Split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Editor Box */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-lg flex flex-col">
          <div className="px-4 py-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500" />
              <span className="w-3 h-3 rounded-full bg-amber-500" />
              <span className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="text-xs font-mono text-slate-400 ml-2">
                main.{language === 'python' ? 'py' : language === 'javascript' ? 'js' : 'html'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyCode}
                className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition flex items-center gap-1"
                title="Copy code"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>

              <button
                onClick={() => setCode(selectedTemplate.code)}
                className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition flex items-center gap-1"
                title="Reset template"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>

              <button
                onClick={runCode}
                disabled={isRunning}
                className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-md shadow-emerald-900/20 disabled:opacity-50"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>{isRunning ? 'Running...' : 'Run Code'}</span>
              </button>
            </div>
          </div>

          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck={false}
            className="w-full h-96 p-4 bg-transparent font-mono text-xs text-slate-100 resize-none focus:outline-none leading-relaxed selection:bg-indigo-600/40"
          />
        </div>

        {/* Output Console / Preview */}
        {language === 'html' ? (
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-lg flex flex-col">
            <div className="px-4 py-3 bg-slate-100 border-b border-slate-200 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-indigo-600" />
                Live HTML Preview Frame
              </span>
              <button
                onClick={runCode}
                className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold"
              >
                Refresh View
              </button>
            </div>
            <iframe
              ref={iframeRef}
              srcDoc={code}
              title="HTML Preview"
              className="w-full h-96 border-none bg-white"
              sandbox="allow-scripts"
            />
          </div>
        ) : (
          <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-lg flex flex-col">
            <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                Console Standard Output (stdout)
              </span>
              <button
                onClick={() => setConsoleOutput('')}
                className="text-[11px] text-slate-400 hover:text-slate-200 transition"
              >
                Clear Console
              </button>
            </div>

            <div className="p-4 h-96 overflow-y-auto font-mono text-xs leading-relaxed">
              {consoleOutput ? (
                <pre className={`whitespace-pre-wrap ${isError ? 'text-rose-400' : 'text-emerald-400'}`}>
                  {consoleOutput}
                </pre>
              ) : (
                <span className="text-slate-600 italic">Output logs will display here after execution.</span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
