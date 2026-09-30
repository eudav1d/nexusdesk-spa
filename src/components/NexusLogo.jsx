import React from 'react';

export default function NexusLogo({ className = "w-9 h-9" }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Brilho neon de fundo */}
      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-400 rounded-xl blur-sm opacity-70 group-hover:opacity-100 transition duration-300"></div>

      {/* Ícone Vetorial Gamer */}
      <svg
        className="relative z-10 w-full h-full drop-shadow-md"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="40" height="40" rx="10" fill="#0F172A" />
        <path
          d="M20 6L31 12V22C31 28.5 26.3 34.5 20 36C13.7 34.5 9 28.5 9 22V12L20 6Z"
          stroke="url(#nexus_grad)"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M16 20L19 23L25 17"
          stroke="#38BDF8"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="20" cy="14" r="1.5" fill="#A855F7" />
        <defs>
          <linearGradient id="nexus_grad" x1="9" y1="6" x2="31" y2="36" gradientUnits="userSpaceOnUse">
            <stop stopColor="#6366F1" />
            <stop offset="0.5" stopColor="#A855F7" />
            <stop offset="1" stopColor="#06B6D4" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}