import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTickets } from '../context/TicketContext';

export default function TicketForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tickets, addTicket, updateTicket } = useTickets();

  const [formData, setFormData] = useState({
    playerTag: '',
    game: 'Arena of Valor',
    category: 'Bug / Falha Técnica',
    priority: 'Média',
    status: 'Aberto',
    slaTargetHours: 24,
    subject: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (id) {
      const existing = tickets.find((t) => t.id === id);
      if (existing) setFormData(existing);
    }
  }, [id, tickets]);

  const validate = () => {
    const errs = {};
    if (!formData.playerTag.trim()) {
      errs.playerTag = 'A identificação do jogador (Player ID / Nickname) é obrigatória.';
    } else if (formData.playerTag.length < 3) {
      errs.playerTag = 'O ID deve conter pelo menos 3 caracteres.';
    }

    if (!formData.subject.trim()) {
      errs.subject = 'A descrição do problema é obrigatória.';
    } else if (formData.subject.length < 10) {
      errs.subject = 'Detalhe melhor o ocorrido (mínimo de 10 caracteres).';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (id) {
      updateTicket(id, formData);
    } else {
      addTicket(formData);
    }
    navigate('/tickets');
  };

  return (
    <div className="max-w-2xl mx-auto bg-slate-900/70 backdrop-blur-xl rounded-2xl border border-slate-800/80 shadow-2xl p-6 sm:p-8">
      <div className="border-b border-slate-800 pb-4 mb-6">
        <h2 className="text-xl font-bold text-white tracking-wide">
          {id ? `Editar Chamado (${id})` : 'Novo Incidente Operacional'}
        </h2>
        <p className="text-xs text-slate-400 mt-1">Preencha os dados do jogador e a criticidade do chamado.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Player Tag / ID do Jogador *
            </label>
            <input
              type="text"
              placeholder="Ex: Valkyrie#9021"
              className={`w-full px-3.5 py-2.5 bg-slate-950 border rounded-xl text-sm text-slate-100 outline-none transition ${
                errors.playerTag ? 'border-red-500 bg-red-950/20' : 'border-slate-700 focus:border-indigo-500'
              }`}
              value={formData.playerTag}
              onChange={(e) => setFormData({ ...formData, playerTag: e.target.value })}
            />
            {errors.playerTag && <p className="text-xs text-red-400 mt-1">{errors.playerTag}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">Jogo *</label>
            <select
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-slate-200 outline-none focus:border-indigo-500"
              value={formData.game}
              onChange={(e) => setFormData({ ...formData, game: e.target.value })}
            >
              <option value="Arena of Valor">Arena of Valor</option>
              <option value="Evony: TKR">Evony: TKR</option>
              <option value="Priston Tale">Priston Tale</option>
              <option value="Serviços Gerais">Plataforma / Global</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">Categoria</label>
            <select
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-slate-200 outline-none focus:border-indigo-500"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              <option value="Bug / Falha Técnica">Bug / Falha Técnica</option>
              <option value="Estorno / Cobrança">Estorno / Cobrança</option>
              <option value="Recuperação de Conta">Recuperação de Conta</option>
              <option value="Denúncia / Banimento">Denúncia / Banimento</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">Prioridade</label>
            <select
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-slate-200 outline-none focus:border-indigo-500"
              value={formData.priority}
              onChange={(e) => {
                const priority = e.target.value;
                const slaMap = { Crítica: 4, Alta: 8, Média: 24, Baixa: 48 };
                setFormData({ ...formData, priority, slaTargetHours: slaMap[priority] });
              }}
            >
              <option value="Baixa">Baixa (48h)</option>
              <option value="Média">Média (24h)</option>
              <option value="Alta">Alta (8h)</option>
              <option value="Crítica">Crítica (4h)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">Status</label>
            <select
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-slate-200 outline-none focus:border-indigo-500"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            >
              <option value="Aberto">Aberto</option>
              <option value="Em Análise">Em Análise</option>
              <option value="Escalado">Escalado</option>
              <option value="Resolvido">Resolvido</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
            Descrição do Problema *
          </label>
          <textarea
            rows="4"
            placeholder="Relate os passos para reproduzir o problema ou os dados da solicitação..."
            className={`w-full p-3.5 bg-slate-950 border rounded-xl text-sm text-slate-100 outline-none transition ${
              errors.subject ? 'border-red-500 bg-red-950/20' : 'border-slate-700 focus:border-indigo-500'
            }`}
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          />
          {errors.subject && <p className="text-xs text-red-400 mt-1">{errors.subject}</p>}
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
          <button
            type="button"
            onClick={() => navigate('/tickets')}
            className="px-4 py-2.5 border border-slate-700 rounded-xl text-sm text-slate-300 hover:bg-slate-800 transition"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl text-sm font-semibold shadow-[0_0_15px_rgba(99,102,241,0.35)] transition"
          >
            {id ? 'Salvar Alterações' : 'Registrar Chamado'}
          </button>
        </div>
      </form>
    </div>
  );
}