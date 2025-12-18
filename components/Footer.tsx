
import React from 'react';

interface FooterProps {
  onNavigate: (view: 'home' | 'listings' | 'admin') => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1 space-y-4">
            <div className="flex items-center gap-2 text-white">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 5.172a2 2 0 0 0-2.828 0L3.828 8.515a2 2 0 0 0 0 2.828L10 17.515A2 2 0 0 0 12.828 17.515L19 11.343a2 2 0 0 0 0-2.828L15.657 5.172a2 2 0 0 0-2.828 0L10 8l-2.828-2.828z"/></svg>
                </div>
                <span className="text-xl font-bold">Patas Amigas</span>
            </div>
            <p className="text-sm leading-relaxed">
              Conectando corações e ajudando cães a voltarem para casa desde 2024. Nossa plataforma é 100% gratuita.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Navegação</h4>
            <ul className="space-y-4 text-sm">
              <li><button onClick={() => onNavigate('home')} className="hover:text-orange-500 transition-colors">Página Inicial</button></li>
              <li><button onClick={() => onNavigate('listings')} className="hover:text-orange-500 transition-colors">Buscar Cães</button></li>
              <li><button onClick={() => onNavigate('listings')} className="hover:text-orange-500 transition-colors">Mapa de Alertas</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Suporte</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-orange-500 transition-colors">Como funciona</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Segurança e Dicas</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Denunciar golpe</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Contato</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                contato@patasamigas.com
              </li>
              <li>
                  <button className="bg-slate-800 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-slate-700 transition-all">
                      Fale Conosco
                  </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>© 2024 Patas Amigas. Todos os direitos reservados.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
            <a href="#" className="hover:text-white transition-colors">Privacidade</a>
            <a href="#" className="hover:text-white transition-colors">Aviso Legal</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
