
import React, { useState } from 'react';
import { DogListing, SearchFilters, DogStatus } from '../types';
import DogCard from '../components/DogCard';

interface HomeProps {
  onSearch: (filters: SearchFilters) => void;
  onRegisterLost: () => void;
  onRegisterFound: () => void;
  recentDogs: DogListing[];
  onViewDog: (dog: DogListing) => void;
}

const Home: React.FC<HomeProps> = ({ onSearch, onRegisterLost, onRegisterFound, recentDogs, onViewDog }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
        city: locationQuery,
        neighborhood: locationQuery, // We'll pass it to both and the logic will handle the OR match
        breed: '',
        size: '',
        color: '',
        status: '',
        query: searchQuery
    });
  };

  return (
    <div className="space-y-16 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-[2.5rem] bg-orange-600 py-16 md:py-24 px-6 md:px-12 text-center text-white shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-400/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
        
        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <h1 className="text-4xl md:text-6xl font-black leading-tight">
            Ajude a encontrar cães perdidos na sua cidade
          </h1>
          <p className="text-orange-100 text-lg md:text-xl font-medium max-w-xl mx-auto">
            A maior rede de solidariedade animal. Conectamos quem perdeu com quem encontrou.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <button 
              onClick={onRegisterLost}
              className="bg-white text-orange-600 px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-2"
            >
              🐶 Perdi meu cachorro
            </button>
            <button 
              onClick={onRegisterFound}
              className="bg-orange-800/30 backdrop-blur text-white border-2 border-orange-400/30 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-orange-800/50 transition-all flex items-center justify-center gap-2 animate-subtle-bounce"
            >
              🐕 Encontrei um cachorro
            </button>
          </div>
        </div>
      </section>

      {/* Enhanced Search Bar */}
      <section className="max-w-5xl mx-auto -mt-24 relative z-20 px-4">
          <form onSubmit={handleSearchSubmit} className="bg-white p-2 rounded-2xl shadow-xl flex flex-col md:flex-row items-center border border-gray-100 divide-y md:divide-y-0 md:divide-x divide-gray-100">
              <div className="w-full md:flex-grow flex items-center px-4 py-2 md:py-0">
                <svg className="text-gray-400 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                <div className="flex flex-col w-full px-4">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">O que procura?</label>
                  <input 
                      type="text" 
                      placeholder="Nome, raça, cor..."
                      className="w-full py-1 text-gray-800 outline-none placeholder:text-gray-300 font-medium"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <div className="w-full md:w-1/3 flex items-center px-4 py-2 md:py-0">
                <svg className="text-gray-400 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                <div className="flex flex-col w-full px-4">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Onde?</label>
                  <input 
                      type="text" 
                      placeholder="Cidade ou bairro"
                      className="w-full py-1 text-gray-800 outline-none placeholder:text-gray-300 font-medium"
                      value={locationQuery}
                      onChange={(e) => setLocationQuery(e.target.value)}
                  />
                </div>
              </div>

              <div className="w-full md:w-auto p-2">
                <button 
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-xl font-bold transition-all shadow-md active:scale-95"
                >
                  Buscar
                </button>
              </div>
          </form>
      </section>

      {/* Recent Dogs */}
      <section>
        <div className="flex items-end justify-between mb-8">
            <div>
                <h2 className="text-2xl font-black text-gray-800">Alertas Recentes</h2>
                <p className="text-gray-500 font-medium">Os últimos cadastros realizados na plataforma</p>
            </div>
            <button 
              onClick={() => onSearch({ city: '', neighborhood: '', breed: '', size: '', color: '', status: '', query: '' })}
              className="text-orange-600 font-bold hover:underline flex items-center gap-1"
            >
                Ver todos
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>
        </div>

        {recentDogs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentDogs.map(dog => (
              <DogCard key={dog.id} dog={dog} onClick={onViewDog} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border-2 border-dashed border-gray-200">
              <p className="text-gray-400 font-medium">Ainda não há alertas na sua região.</p>
          </div>
        )}
      </section>

      {/* Why Project? */}
      <section className="bg-slate-100 rounded-[2.5rem] p-8 md:p-12 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-4">
              <h2 className="text-3xl font-black text-slate-800">Nossa Missão</h2>
              <p className="text-slate-600 leading-relaxed">
                  Sabemos que o desaparecimento de um pet é um momento de angústia. O <strong>Patas Amigas</strong> nasceu para centralizar informações e facilitar o reencontro de famílias. Nossa plataforma é gratuita e mantida pela comunidade.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-200">
                      <div className="text-2xl font-bold text-orange-500">100%</div>
                      <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Gratuito</div>
                  </div>
                  <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-200">
                      <div className="text-2xl font-bold text-emerald-500">24h</div>
                      <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Suporte</div>
                  </div>
              </div>
          </div>
          <div className="flex-1">
              <img 
                src="https://picsum.photos/seed/happy-dog/600/400" 
                alt="Happy Dog" 
                className="rounded-3xl shadow-xl w-full h-64 object-cover"
              />
          </div>
      </section>
    </div>
  );
};

export default Home;
