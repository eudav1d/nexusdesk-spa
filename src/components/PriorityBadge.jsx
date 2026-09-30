import React from 'react';

export default function PriorityBadge({ priority }) {
  const styles = {
    Baixa: 'text-slate-400 bg-slate-800/80 border-slate-700',
    Média: 'text-blue-400 bg-blue-950/60 border-blue-800/50',
    Alta: 'text-orange-400 bg-orange-950/60 border-orange-700/50 font-semibold',
    Crítica: 'text-red-400 bg-red-950/80 border-red-500/60 font-bold animate-pulse shadow-[0_0_12px_rgba(239,68,68,0.3)]',
  };

  return (
    <span className={`px-2 py-0.5 rounded text-xs border ${styles[priority] || 'text-slate-400'}`}>
      {priority}
    </span>
  );
}