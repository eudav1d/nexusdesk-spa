import React from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { TicketProvider } from './context/TicketContext';
import NexusLogo from './components/NexusLogo';
import Dashboard from './pages/Dashboard';
import TicketList from './pages/TicketList';
import TicketForm from './pages/TicketForm';

export default function App() {
  const getNavClass = ({ isActive }) =>
    `px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 border ${
      isActive
        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-indigo-400/40 shadow-[0_0_15px_rgba(99,102,241,0.35)]'
        : 'text-slate-400 hover:text-white border-transparent hover:bg-slate-800/60 hover:border-slate-700/60'
    }`;

  return (
    <TicketProvider>
      <BrowserRouter>
        <div className="relative min-h-screen bg-[#090D16] text-slate-100 font-sans selection:bg-indigo-500 selection:text-white overflow-hidden">
          
          {/* Efeitos de Luz e Imagem de Fundo (Ambient Orbs & Grid) */}
          <div className="fixed inset-0 pointer-events-none z-0">
            {/* Feixe Roxo Superior Esquerdo */}
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-[128px]"></div>
            {/* Feixe Ciano Central */}
            <div className="absolute top-1/3 -right-20 w-80 h-80 bg-cyan-500/15 rounded-full blur-[140px]"></div>
            {/* Feixe Rosa/Púrpura Inferior */}
            <div className="absolute -bottom-20 left-1/3 w-96 h-96 bg-purple-600/15 rounded-full blur-[140px]"></div>
            {/* Grid Sutil estilo Cyberpunk */}
            <div 
              className="absolute inset-0 opacity-[0.03]" 
              style={{
                backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
                backgroundSize: '40px 40px'
              }}
            ></div>
          </div>

          {/* Header Superior em Glassmorphism */}
          <header className="relative z-40 bg-slate-900/70 backdrop-blur-xl border-b border-slate-800/80 sticky top-0">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
              
              {/* Logo e Identidade */}
              <div className="flex items-center space-x-3.5 group cursor-pointer">
                <NexusLogo className="w-10 h-10 transition transform group-hover:scale-105" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-black tracking-wider bg-gradient-to-r from-white via-indigo-200 to-cyan-400 bg-clip-text text-transparent">
                      NEXUSDESK
                    </span>
                    <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      LIVE OPS
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 tracking-wide font-mono">Gaming Support & Incident Suite</p>
                </div>
              </div>

              {/* Menu de Navegação SPA */}
              <nav className="flex space-x-1 sm:space-x-2 bg-slate-950/40 p-1.5 rounded-2xl border border-slate-800/60 backdrop-blur-md">
                <NavLink to="/" className={getNavClass} end>
                  Dashboard
                </NavLink>
                <NavLink to="/tickets" className={getNavClass} end>
                  Fila de Chamados
                </NavLink>
                <NavLink to="/tickets/novo" className={getNavClass}>
                  + Novo Chamado
                </NavLink>
              </nav>
            </div>
          </header>

          {/* Conteúdo Dinâmico das Páginas */}
          <main className="relative z-10 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/tickets" element={<TicketList />} />
              <Route path="/tickets/novo" element={<TicketForm />} />
              <Route path="/tickets/editar/:id" element={<TicketForm />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </TicketProvider>
  );
}