import React from 'react';

export default function StatusBadge({ status }) {
  const styles = {
    Aberto: 'bg-amber-500/10 text-amber-400 border-amber-500/30 shadow-[0_0_10px_rgba(245,158,11,0.15)]',
    'Em Análise': 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30 shadow-[0_0_10px_rgba(6,182,212,0.15)]',
    Escalado: 'bg-purple-500/10 text-purple-400 border-purple-500/30 shadow-[0_0_10px_rgba(168,85,247,0.15)]',
    Resolvido: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.15)]',
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border backdrop-blur-sm ${styles[status] || 'bg-slate-800 text-slate-300'}`}>
      {status}
    </span>
  );
}