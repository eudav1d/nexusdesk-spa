import React from 'react';
import { useTickets } from '../context/TicketContext';

export default function Dashboard() {
  const { tickets } = useTickets();

  const total = tickets.length;
  const abertos = tickets.filter((t) => t.status === 'Aberto').length;
  const emAnalise = tickets.filter((t) => t.status === 'Em Análise').length;
  const resolvidos = tickets.filter((t) => t.status === 'Resolvido').length;
  const criticos = tickets.filter((t) => t.priority === 'Crítica' && t.status !== 'Resolvido').length;

  const taxaResolucao = total > 0 ? Math.round((resolvidos / total) * 100) : 0;
  const jogos = ['Arena of Valor', 'Evony: TKR', 'Priston Tale'];

  return (
    <div className="space-y-8">
      {/* Banner Hero Gamer */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-950/80 via-slate-900 to-purple-950/80 border border-slate-800 p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-3">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            Centro de Operações de Jogadores Ativo
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Painel Geral de Atendimento & SLA
          </h2>
          <p className="mt-2 text-sm text-slate-400 leading-relaxed">
            Monitoramento em tempo real de incidentes em partidas, compras de gemas e restauração de credenciais. Acompanhe a aderência aos tempos de resposta por jogo.
          </p>
        </div>

        {/* Efeito decorativo de fundo no banner */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-indigo-600/10 to-transparent pointer-events-none"></div>
      </div>

      {/* Cards de Métricas (KPIs) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-slate-900/60 backdrop-blur-xl p-5 rounded-2xl border border-slate-800/80 shadow-xl hover:border-indigo-500/40 transition duration-300">
          <div className="flex justify-between items-center text-xs font-semibold text-slate-400 uppercase tracking-wider">
            <span>Total de Incidentes</span>
            <span className="text-indigo-400 text-base">📊</span>
          </div>
          <p className="text-4xl font-black text-white mt-3">{total}</p>
          <span className="text-[11px] text-slate-500 mt-1 block">Registrados na base local</span>
        </div>

        <div className="bg-slate-900/60 backdrop-blur-xl p-5 rounded-2xl border border-slate-800/80 shadow-xl hover:border-amber-500/40 transition duration-300">
          <div className="flex justify-between items-center text-xs font-semibold text-slate-400 uppercase tracking-wider">
            <span>Fila Aberta</span>
            <span className="text-amber-400 text-base">⏳</span>
          </div>
          <p className="text-4xl font-black text-amber-400 mt-3">{abertos}</p>
          <span className="text-[11px] text-slate-500 mt-1 block">Aguardando triagem técnica</span>
        </div>

        <div className="bg-slate-900/60 backdrop-blur-xl p-5 rounded-2xl border border-slate-800/80 shadow-xl hover:border-red-500/40 transition duration-300">
          <div className="flex justify-between items-center text-xs font-semibold text-slate-400 uppercase tracking-wider">
            <span>SLA Crítico (4h)</span>
            <span className="text-red-400 text-base">🔥</span>
          </div>
          <p className="text-4xl font-black text-red-500 mt-3">{criticos}</p>
          <span className="text-[11px] text-red-400/80 mt-1 block">Requer ação imediata</span>
        </div>

        <div className="bg-slate-900/60 backdrop-blur-xl p-5 rounded-2xl border border-slate-800/80 shadow-xl hover:border-emerald-500/40 transition duration-300">
          <div className="flex justify-between items-center text-xs font-semibold text-slate-400 uppercase tracking-wider">
            <span>Taxa de Resolução</span>
            <span className="text-emerald-400 text-base">🎯</span>
          </div>
          <p className="text-4xl font-black text-emerald-400 mt-3">{taxaResolucao}%</p>
          <span className="text-[11px] text-slate-500 mt-1 block">{resolvidos} finalizados com sucesso</span>
        </div>
      </div>

      {/* Painel Inferior: Volume por Jogo e SLAs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900/60 backdrop-blur-xl p-6 rounded-2xl border border-slate-800/80 shadow-xl">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-5 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
            Volume de Chamados por Jogo
          </h3>
          <div className="space-y-4">
            {jogos.map((jogo) => {
              const count = tickets.filter((t) => t.game === jogo).length;
              const pct = total > 0 ? (count / total) * 100 : 0;
              return (
                <div key={jogo}>
                  <div className="flex justify-between text-xs font-medium text-slate-300 mb-1.5">
                    <span className="font-semibold">{jogo}</span>
                    <span className="text-slate-400">{count} tickets ({Math.round(pct)}%)</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-indigo-500 to-cyan-400 h-2.5 rounded-full transition-all duration-700" 
                      style={{ width: `${pct}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-slate-900/60 backdrop-blur-xl p-6 rounded-2xl border border-slate-800/80 shadow-xl">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-5 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
            Metas de Resolução (SLA Operacional)
          </h3>
          <ul className="text-xs space-y-3.5 text-slate-400">
            <li className="flex justify-between items-center border-b border-slate-800/80 pb-2.5">
              <span className="font-semibold text-red-400">Prioridade Crítica</span>
              <span className="text-slate-300 bg-red-950/40 px-2 py-0.5 rounded border border-red-800/40">Até 4h úteis</span>
            </li>
            <li className="flex justify-between items-center border-b border-slate-800/80 pb-2.5">
              <span className="font-semibold text-orange-400">Prioridade Alta</span>
              <span className="text-slate-300 bg-orange-950/40 px-2 py-0.5 rounded border border-orange-800/40">Até 8h úteis</span>
            </li>
            <li className="flex justify-between items-center border-b border-slate-800/80 pb-2.5">
              <span className="font-semibold text-blue-400">Prioridade Média</span>
              <span className="text-slate-300 bg-blue-950/40 px-2 py-0.5 rounded border border-blue-800/40">Até 24h úteis</span>
            </li>
            <li className="flex justify-between items-center">
              <span className="font-semibold text-slate-400">Prioridade Baixa</span>
              <span className="text-slate-300 bg-slate-800/40 px-2 py-0.5 rounded border border-slate-700/40">Até 48h úteis</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}