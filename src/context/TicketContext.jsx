import React, { createContext, useContext, useState, useEffect } from 'react';

const TicketContext = createContext();

const MOCK_TICKETS = [
  {
    id: 'TK-1001',
    playerTag: 'Valkyrie#9021',
    game: 'Arena of Valor',
    category: 'Bug / Falha Técnica',
    priority: 'Crítica',
    status: 'Em Análise',
    slaTargetHours: 4,
    subject: 'Personagem bloqueado no ecrã de carregamento após a atualização',
    createdAt: '2026-09-29T14:30:00Z',
  },
  {
    id: 'TK-1002',
    playerTag: 'DragonSlayer_BR',
    game: 'Evony: TKR',
    category: 'Estorno / Cobrança',
    priority: 'Alta',
    status: 'Aberto',
    slaTargetHours: 8,
    subject: 'Pacote de gemas cobrado em duplicado na loja',
    createdAt: '2026-09-30T09:15:00Z',
  },
  {
    id: 'TK-1003',
    playerTag: 'KnightPriston',
    game: 'Priston Tale',
    category: 'Recuperação de Conta',
    priority: 'Média',
    status: 'Resolvido',
    slaTargetHours: 24,
    subject: 'Perda de acesso ao e-mail de verificação de dois fatores',
    createdAt: '2026-09-28T18:00:00Z',
  },
];

export function TicketProvider({ children }) {
  const [tickets, setTickets] = useState(() => {
    const saved = localStorage.getItem('nexusdesk_tickets');
    return saved ? JSON.parse(saved) : MOCK_TICKETS;
  });

  useEffect(() => {
    localStorage.setItem('nexusdesk_tickets', JSON.stringify(tickets));
  }, [tickets]);

  // Criar (Inclusão)
  const addTicket = (data) => {
    const newTicket = {
      ...data,
      id: `TK-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
    };
    setTickets((prev) => [newTicket, ...prev]);
  };

  // Atualizar (Edição)
  const updateTicket = (id, updatedData) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updatedData } : t))
    );
  };

  // Eliminar (Exclusão)
  const deleteTicket = (id) => {
    setTickets((prev) => prev.filter((t) => t.id !== id));
  };

  // Ação rápida: Concluir chamado
  const resolveTicket = (id) => {
    updateTicket(id, { status: 'Resolvido' });
  };

  return (
    <TicketContext.Provider value={{ tickets, addTicket, updateTicket, deleteTicket, resolveTicket }}>
      {children}
    </TicketContext.Provider>
  );
}

export const useTickets = () => useContext(TicketContext);