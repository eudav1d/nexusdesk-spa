import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTickets } from '../context/TicketContext';
import StatusBadge from '../components/StatusBadge';
import PriorityBadge from '../components/PriorityBadge';

export default function TicketList() {
  const { tickets, deleteTicket, resolveTicket } = useTickets();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGame, setFilterGame] = useState('Todos');
  const [filterStatus, setFilterStatus] = useState('Todos');
  const navigate = useNavigate();

  const filteredTickets = tickets.filter((t) => {
    const matchesSearch =
      t.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.playerTag.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.subject.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesGame = filterGame === 'Todos' || t.game === filterGame;
    const matchesStatus = filterStatus === 'Todos' || t.status === filterStatus;

    return matchesSearch && matchesGame && matchesStatus;
  });

  return (
    <div className="bg-slate-900/60 backdrop-blur-xl rounded-2xl border border-slate-800/80 shadow-2xl overflow-hidden">
      {/* Barra de Filtros */}
      <div className="p-4 sm:p-5 border-b border-slate-800/80 bg-slate-950/40 flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="Buscar por ID, Nickname ou assunto..."
            className="w-full pl-9 pr-4 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-sm text-slate-100 placeholder-slate-500 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="absolute left-3 top-3 text-slate-500 text-xs">🔍</span>
        </div>

        <div className="flex flex-wrap gap-2.5 w-full md:w-auto">
          <select
            className="px-3.5 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-sm text-slate-300 outline-none focus:border-indigo-500 transition"
            value={filterGame}
            onChange={(e) => setFilterGame(e.target.value)}
          >
            <option value="Todos">Todos os Jogos</option>
            <option value="Arena of Valor">Arena of Valor</option>
            <option value="Evony: TKR">Evony: TKR</option>
            <option value="Priston Tale">Priston Tale</option>
          </select>

          <select
            className="px-3.5 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-sm text-slate-300 outline-none focus:border-indigo-500 transition"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="Todos">Todos os Status</option>
            <option value="Aberto">Aberto</option>
            <option value="Em Análise">Em Análise</option>
            <option value="Escalado">Escalado</option>
            <option value="Resolvido">Resolvido</option>
          </select>
        </div>
      </div>

      {/* Tabela de Incidentes */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-slate-950/60 text-slate-400 font-semibold text-xs uppercase tracking-wider border-b border-slate-800">
              <th className="p-4">Ticket</th>
              <th className="p-4">Jogador</th>
              <th className="p-4">Jogo & Categoria</th>
              <th className="p-4">Assunto</th>
              <th className="p-4">Prioridade</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {filteredTickets.length > 0 ? (
              filteredTickets.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 font-mono text-xs font-bold text-indigo-400">{ticket.id}</td>
                  <td className="p-4 font-semibold text-slate-100">{ticket.playerTag}</td>
                  <td className="p-4">
                    <div className="font-medium text-slate-200">{ticket.game}</div>
                    <div className="text-xs text-slate-500">{ticket.category}</div>
                  </td>
                  <td className="p-4 max-w-xs truncate text-slate-400" title={ticket.subject}>
                    {ticket.subject}
                  </td>
                  <td className="p-4">
                    <PriorityBadge priority={ticket.priority} />
                  </td>
                  <td className="p-4">
                    <StatusBadge status={ticket.status} />
                  </td>
                  <td className="p-4 text-right space-x-3 whitespace-nowrap">
                    {ticket.status !== 'Resolvido' && (
                      <button
                        onClick={() => resolveTicket(ticket.id)}
                        className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold hover:underline transition"
                      >
                        Concluir
                      </button>
                    )}
                    <button
                      onClick={() => navigate(`/tickets/editar/${ticket.id}`)}
                      className="text-xs text-indigo-400 hover:text-indigo-300 font-medium hover:underline transition"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Remover chamado ${ticket.id}?`)) {
                          deleteTicket(ticket.id);
                        }
                      }}
                      className="text-xs text-red-400 hover:text-red-300 font-medium hover:underline transition"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="p-10 text-center text-slate-500">
                  Nenhum chamado de suporte encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}