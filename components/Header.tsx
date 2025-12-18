
import React from 'react';

interface HeaderProps {
  onNavigate: (view: 'home' | 'listings' | 'admin' | 'safety') => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <button 
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 group"
        >
          <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white shadow-lg group-hover:bg-orange-600 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 5.172a2 2 0 0 0-2.828 0L3.828 8.515a2 2 0 0 0 0 2.828L10 17.515A2 2 0 0 0 12.828 17.515L19 11.343a2 2 0 0 0 0-2.828L15.657 5.172a2 2 0 0 0-2.828 0L10 8l-2.828-2.828z"/></svg>
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-800">Patas Amigas</span>
        </button>

        <nav className="hidden md:flex items-center gap-6">
          <button onClick={() => onNavigate('home')} className="text-gray-600 hover:text-orange-500 font-medium">Início</button>
          <button onClick={() => onNavigate('listings')} className="text-gray-600 hover:text-orange-500 font-medium">Buscar Cães</button>
          <button onClick={() => onNavigate('safety')} className="text-gray-600 hover:text-orange-500 font-medium">Guia de Segurança</button>
          <button onClick={() => onNavigate('admin')} className="text-gray-400 hover:text-gray-600 text-sm">Painel</button>
        </nav>

        <div className="md:hidden">
            <button onClick={() => onNavigate('listings')} className="p-2 text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
