import React from 'react';
import { 
  Terminal, 
  Coffee, 
  Cpu, 
  Database, 
  Globe, 
  Boxes, 
  Calculator, 
  HardDrive, 
  Network, 
  Settings, 
  ArrowRight, 
  PlayCircle, 
  HelpCircle, 
  Code2, 
  BookOpen
} from 'lucide-react';
import { SubjectModule } from '../data/portalData';

interface SubjectCardProps {
  subject: SubjectModule;
  onSelect: (subjectId: string) => void;
  masteredCount: number;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Terminal,
  Coffee,
  Cpu,
  Database,
  Globe,
  Boxes,
  Calculator,
  HardDrive,
  Network,
  Settings,
};

export const SubjectCard: React.FC<SubjectCardProps> = ({
  subject,
  onSelect,
  masteredCount
}) => {
  const IconComponent = ICON_MAP[subject.iconName] || Terminal;

  return (
    <div 
      onClick={() => onSelect(subject.id)}
      className="group relative bg-white rounded-2xl border border-slate-200/80 hover:border-indigo-400/80 shadow-xs hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer"
    >
      {/* Decorative top accent gradient */}
      <div className={`h-2 w-full bg-gradient-to-r ${subject.color}`} />

      <div className="p-5 sm:p-6 flex-1 flex flex-col">
        {/* Header row with Icon & Badge */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-slate-100 group-hover:bg-indigo-50 border border-slate-200/60 group-hover:border-indigo-200 flex items-center justify-center text-slate-700 group-hover:text-indigo-600 transition-colors shadow-2xs">
            <IconComponent className="w-6 h-6" />
          </div>
          <span className="text-[11px] font-semibold tracking-wide px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200/60">
            {subject.badge}
          </span>
        </div>

        {/* Title & Description */}
        <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-700 transition-colors flex items-center gap-2">
          {subject.title}
        </h3>
        <p className="text-xs text-slate-500 mt-1.5 leading-relaxed line-clamp-2">
          {subject.summary}
        </p>

        {/* Topic Pills */}
        <div className="flex flex-wrap gap-1.5 mt-4 mb-4">
          {subject.topics.slice(0, 3).map((topic, i) => (
            <span
              key={i}
              className="text-[11px] px-2 py-0.5 rounded-md bg-slate-50 text-slate-600 border border-slate-200/60 font-medium"
            >
              {topic}
            </span>
          ))}
          {subject.topics.length > 3 && (
            <span className="text-[10px] px-1.5 py-0.5 rounded text-slate-400 font-semibold self-center">
              +{subject.topics.length - 3} more
            </span>
          )}
        </div>

        {/* Stats Row */}
        <div className="mt-auto pt-4 border-t border-slate-100 grid grid-cols-3 gap-2 text-center text-slate-500 text-xs">
          <div className="flex flex-col items-center">
            <span className="flex items-center gap-1 font-semibold text-slate-800">
              <PlayCircle className="w-3.5 h-3.5 text-rose-500" />
              {subject.videos.length}
            </span>
            <span className="text-[10px] text-slate-400">Videos</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="flex items-center gap-1 font-semibold text-slate-800">
              <HelpCircle className="w-3.5 h-3.5 text-indigo-500" />
              {subject.interview.length}
            </span>
            <span className="text-[10px] text-slate-400">Q&A</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="flex items-center gap-1 font-semibold text-slate-800">
              <Code2 className="w-3.5 h-3.5 text-emerald-500" />
              {subject.coding.length}
            </span>
            <span className="text-[10px] text-slate-400">Labs</span>
          </div>
        </div>
      </div>

      {/* Footer launch button */}
      <div className="px-5 py-3 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between group-hover:bg-indigo-50/60 transition-colors">
        <span className="text-xs font-semibold text-indigo-700 flex items-center gap-1">
          Open Learning Space
        </span>
        <ArrowRight className="w-4 h-4 text-indigo-600 group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  );
};
