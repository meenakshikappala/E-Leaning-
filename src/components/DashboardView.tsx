import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Cell
} from 'recharts';
import { 
  Trophy, 
  TrendingUp, 
  Target, 
  Flame, 
  BrainCircuit, 
  BookOpen, 
  ArrowUpRight, 
  Calendar, 
  CheckCircle2, 
  Sparkles,
  BarChart3,
  Radar as RadarIcon,
  Play,
  RotateCcw,
  PlusCircle,
  Award
} from 'lucide-react';
import { SUBJECTS_DATA } from '../data/portalData';
import { StreakData } from '../utils/streakManager';

interface DashboardViewProps {
  masteredMap: Record<string, boolean>;
  quizScore: number;
  onNavigateSubject: (subjectId: string) => void;
  onNavigateAptitude: () => void;
  streak: StreakData;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  masteredMap,
  quizScore,
  onNavigateSubject,
  onNavigateAptitude,
  streak
}) => {
  const [timeframe, setTimeframe] = useState<'7d' | '14d' | '30d'>('7d');
  const [chartType, setChartType] = useState<'bar' | 'radar'>('bar');

  // Custom mock quiz scores per subject stored in state with sensible defaults
  const [subjectScores, setSubjectScores] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem('smart_learning_subject_scores');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return {
      python: 88,
      java: 82,
      c: 75,
      dbms: 90,
      html: 95,
      dsa: 72,
      algorithms: 78,
      os: 80,
      networks: 74,
      se: 85,
      logical: 86,
      quant: quizScore > 0 ? quizScore : 80
    };
  });

  const totalMasteredCount = useMemo(() => {
    return Object.values(masteredMap).filter(Boolean).length;
  }, [masteredMap]);

  // Generate timeline data for Mastered Topics Over Time based on timeframe and current mastered count
  const timelineData = useMemo(() => {
    const days = timeframe === '7d' ? 7 : timeframe === '14d' ? 14 : 30;
    const baseCount = Math.max(3, totalMasteredCount);
    const result = [];
    
    // Generate dates working backwards
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      
      // Calculate growth curve leading up to current totalMasteredCount
      const progressRatio = (days - i) / days;
      const smoothFactor = Math.pow(progressRatio, 1.2);
      const cumulative = Math.max(1, Math.round(smoothFactor * baseCount));
      const dailyNew = i === days - 1 ? Math.max(1, Math.round(baseCount / days)) : Math.max(0, Math.round((baseCount / days) * (0.8 + (i % 3) * 0.2)));

      result.push({
        date: dateStr,
        cumulativeMastered: cumulative,
        dailyAdded: dailyNew,
      });
    }

    // Ensure the last element matches totalMasteredCount if higher
    if (result.length > 0 && totalMasteredCount > 0) {
      result[result.length - 1].cumulativeMastered = Math.max(result[result.length - 1].cumulativeMastered, totalMasteredCount);
    }

    return result;
  }, [timeframe, totalMasteredCount]);

  // Data for Average Quiz Scores Per Subject
  const subjectScoresData = useMemo(() => {
    return [
      { subject: 'Python', score: subjectScores['python'] ?? 88, id: 'python', category: 'Language' },
      { subject: 'Java', score: subjectScores['java'] ?? 82, id: 'java', category: 'Language' },
      { subject: 'C Lang', score: subjectScores['c'] ?? 75, id: 'c', category: 'Language' },
      { subject: 'DBMS', score: subjectScores['dbms'] ?? 90, id: 'dbms', category: 'Data' },
      { subject: 'HTML/Web', score: subjectScores['html'] ?? 95, id: 'html', category: 'Web' },
      { subject: 'DSA', score: subjectScores['dsa'] ?? 72, id: 'dsa', category: 'Core CS' },
      { subject: 'Algorithms', score: subjectScores['algorithms'] ?? 78, id: 'algorithms', category: 'Core CS' },
      { subject: 'Operating Sys', score: subjectScores['os'] ?? 80, id: 'os', category: 'Systems' },
      { subject: 'Networks', score: subjectScores['networks'] ?? 74, id: 'networks', category: 'Systems' },
      { subject: 'Software Eng', score: subjectScores['se'] ?? 85, id: 'se', category: 'Eng' },
      { subject: 'Reasoning', score: subjectScores['logical'] ?? 86, id: 'aptitude', category: 'Aptitude' },
      { subject: 'Quant Math', score: quizScore > 0 ? quizScore : (subjectScores['quant'] ?? 80), id: 'aptitude', category: 'Aptitude' },
    ];
  }, [subjectScores, quizScore]);

  // Calculate overall metrics
  const avgOverallScore = useMemo(() => {
    const scores = subjectScoresData.map(s => s.score);
    const sum = scores.reduce((a, b) => a + b, 0);
    return Math.round(sum / scores.length);
  }, [subjectScoresData]);

  // Overall readiness index (weighted formula of mastered topics + avg score)
  const readinessIndex = useMemo(() => {
    const topicWeight = Math.min(100, Math.round((totalMasteredCount / 40) * 100)) * 0.4;
    const scoreWeight = avgOverallScore * 0.6;
    return Math.min(100, Math.round(topicWeight + scoreWeight));
  }, [totalMasteredCount, avgOverallScore]);

  // Subject breakdown with mastered count from actual masteredMap
  const subjectBreakdown = useMemo(() => {
    return Object.values(SUBJECTS_DATA).map(subject => {
      const totalQs = subject.interview.length;
      const masteredInSubj = subject.interview.filter(q => masteredMap[q.id]).length;
      const score = subjectScores[subject.id] ?? 80;
      
      let status: 'Proficient' | 'Progressing' | 'Needs Focus' = 'Progressing';
      if (score >= 85 && masteredInSubj >= 2) status = 'Proficient';
      else if (score < 75 || masteredInSubj === 0) status = 'Needs Focus';

      return {
        id: subject.id,
        title: subject.title,
        shortName: subject.shortName,
        badge: subject.badge,
        mastered: masteredInSubj,
        total: totalQs,
        percentage: Math.round((masteredInSubj / totalQs) * 100),
        score,
        status
      };
    });
  }, [masteredMap, subjectScores]);

  // Color helper for bars based on score value
  const getBarColor = (score: number) => {
    if (score >= 85) return '#10b981'; // emerald
    if (score >= 75) return '#6366f1'; // indigo
    return '#f59e0b'; // amber
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Hero Header */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 shadow-xl shadow-slate-950/10">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/30 border border-indigo-400/30 text-indigo-200 text-xs font-semibold mb-3">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            Performance & Mastery Intelligence
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Learner Progress & Analytics Dashboard
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
            Monitor your technical interview preparation stamina, topics mastered trajectory over time, and subject-wise assessment scores visualized through interactive Recharts analytics.
          </p>
        </div>
      </div>

      {/* Top 4 Key Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Topics Mastered
            </span>
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900">{totalMasteredCount}</span>
            <span className="text-xs text-slate-400 font-medium">/ 60+ core Q&As</span>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Active growth this week</span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Placement Readiness
            </span>
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Target className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-purple-600">{readinessIndex}%</span>
            <span className="text-xs text-slate-400 font-medium">
              {readinessIndex >= 80 ? 'Interview Ready' : 'On Track'}
            </span>
          </div>
          <div className="mt-3 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-purple-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${readinessIndex}%` }}
            />
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Avg Assessment Score
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-emerald-600">{avgOverallScore}%</span>
            <span className="text-xs text-slate-400 font-medium">across 12 modules</span>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-500">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Highest: HTML/Web (95%)</span>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Learning Streak
            </span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Flame className="w-5 h-5 fill-amber-500" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-amber-600">{streak.currentStreak} Days</span>
            <span className="text-xs text-slate-400 font-medium">Best: {streak.longestStreak}d</span>
          </div>
          <div className="mt-3 text-xs text-slate-500 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-indigo-500" />
            <span>Active today • Keep the momentum</span>
          </div>
        </div>
      </div>

      {/* CHART 1: Mastered Topics Over Time (Recharts AreaChart) */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-7 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
              <h3 className="text-base font-bold text-slate-900">
                Mastered Topics Over Time
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Cumulative progression of questions and technical topics marked as mastered.
            </p>
          </div>

          {/* Timeframe Switcher */}
          <div className="inline-flex p-1 rounded-xl bg-slate-100 border border-slate-200 self-start sm:self-auto">
            <button
              onClick={() => setTimeframe('7d')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                timeframe === '7d'
                  ? 'bg-white text-indigo-700 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Last 7 Days
            </button>
            <button
              onClick={() => setTimeframe('14d')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                timeframe === '14d'
                  ? 'bg-white text-indigo-700 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Last 14 Days
            </button>
            <button
              onClick={() => setTimeframe('30d')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                timeframe === '30d'
                  ? 'bg-white text-indigo-700 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Past Month
            </button>
          </div>
        </div>

        {/* Recharts Area Chart Container */}
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={timelineData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="masteredGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="dailyGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 11, fill: '#64748b' }} 
                stroke="#cbd5e1"
                tickLine={false}
              />
              <YAxis 
                tick={{ fontSize: 11, fill: '#64748b' }} 
                stroke="#cbd5e1"
                tickLine={false}
                allowDecimals={false}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderRadius: '12px',
                  border: '1px solid #1e293b',
                  color: '#fff',
                  fontSize: '12px',
                  boxShadow: '0 10px 15px -3px rgba(0,0,0,0.3)'
                }}
                itemStyle={{ color: '#e2e8f0', padding: '2px 0' }}
                labelStyle={{ fontWeight: 'bold', color: '#93c5fd', marginBottom: '4px' }}
              />
              <Legend 
                verticalAlign="top" 
                align="right" 
                iconType="circle"
                wrapperStyle={{ paddingBottom: '10px', fontSize: '12px' }}
              />
              <Area 
                type="monotone" 
                dataKey="cumulativeMastered" 
                name="Cumulative Mastered"
                stroke="#4f46e5" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#masteredGradient)" 
              />
              <Area 
                type="monotone" 
                dataKey="dailyAdded" 
                name="New Topics Added"
                stroke="#10b981" 
                strokeWidth={2}
                strokeDasharray="4 4"
                fillOpacity={1} 
                fill="url(#dailyGradient)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* CHART 2: Average Quiz Scores Per Subject (BarChart & RadarChart toggle) */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-7 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
              <h3 className="text-base font-bold text-slate-900">
                Average Quiz & Assessment Scores Per Subject
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Evaluated competency benchmarked out of 100% across all technical and analytical disciplines.
            </p>
          </div>

          {/* Toggle Bar vs Radar */}
          <div className="inline-flex p-1 rounded-xl bg-slate-100 border border-slate-200 self-start sm:self-auto">
            <button
              onClick={() => setChartType('bar')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                chartType === 'bar'
                  ? 'bg-white text-indigo-700 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Bar Chart</span>
            </button>
            <button
              onClick={() => setChartType('radar')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                chartType === 'radar'
                  ? 'bg-white text-indigo-700 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <RadarIcon className="w-3.5 h-3.5" />
              <span>Skill Radar</span>
            </button>
          </div>
        </div>

        {/* Dynamic Chart Display */}
        {chartType === 'bar' ? (
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={subjectScoresData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis 
                  dataKey="subject" 
                  tick={{ fontSize: 10, fill: '#475569' }} 
                  interval={0}
                  angle={-25}
                  textAnchor="end"
                  stroke="#cbd5e1"
                />
                <YAxis 
                  domain={[0, 100]} 
                  tick={{ fontSize: 11, fill: '#64748b' }} 
                  stroke="#cbd5e1"
                  tickLine={false}
                />
                <Tooltip 
                  cursor={{ fill: 'rgba(79, 70, 229, 0.05)' }}
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderRadius: '12px',
                    border: '1px solid #1e293b',
                    color: '#fff',
                    fontSize: '12px',
                    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.3)'
                  }}
                  formatter={(val: any) => [`${val}%`, 'Average Score']}
                  labelStyle={{ fontWeight: 'bold', color: '#93c5fd', marginBottom: '2px' }}
                />
                <Bar 
                  dataKey="score" 
                  name="Average Score (%)"
                  radius={[6, 6, 0, 0]}
                >
                  {subjectScoresData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getBarColor(entry.score)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-80 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={subjectScoresData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: '#334155', fontWeight: 600 }} />
                <PolarRadiusAxis domain={[0, 100]} tick={{ fontSize: 9, fill: '#94a3b8' }} />
                <Radar 
                  name="Score (%)" 
                  dataKey="score" 
                  stroke="#4f46e5" 
                  fill="#6366f1" 
                  fillOpacity={0.4} 
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                  formatter={(val: any) => [`${val}%`, 'Proficiency']}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Legend pills */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500" />
            <span>High Proficiency (85%+)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-indigo-500" />
            <span>Good Progress (75% - 84%)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-amber-500" />
            <span>Focus Area (&lt; 75%)</span>
          </div>
        </div>
      </div>

      {/* Subject-Wise Mastery Progress Matrix */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-7 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Detailed Subject Mastery Matrix
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Live status across all 10 technical fields. Click 'Practice' to resume direct studying.
            </p>
          </div>
          <button
            onClick={onNavigateAptitude}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 self-start sm:self-auto"
          >
            <span>Take Aptitude Evaluation Quiz</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {subjectBreakdown.map((subj) => (
            <div
              key={subj.id}
              className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-indigo-200 hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="font-bold text-sm text-slate-900">{subj.title}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    subj.status === 'Proficient'
                      ? 'bg-emerald-100 text-emerald-800'
                      : subj.status === 'Progressing'
                      ? 'bg-indigo-100 text-indigo-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {subj.status}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
                  <span>Questions Mastered: {subj.mastered} / {subj.total}</span>
                  <span className="font-semibold text-slate-700">Quiz Score: {subj.score}%</span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-indigo-600 h-full rounded-full transition-all duration-300"
                    style={{ width: `${Math.max(5, (subj.mastered / subj.total) * 100)}%` }}
                  />
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 font-medium">{subj.badge}</span>
                <button
                  onClick={() => onNavigateSubject(subj.id)}
                  className="px-3 py-1 bg-white hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 text-indigo-700 text-xs font-semibold rounded-lg flex items-center gap-1 transition"
                >
                  <Play className="w-3 h-3 fill-indigo-600" />
                  <span>Practice Subject</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
