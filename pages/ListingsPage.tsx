
import React, { useState, useMemo } from 'react';
import { DogListing, DogStatus, SearchFilters } from '../types';
import DogCard from '../components/DogCard';
import DogMap from '../components/DogMap';

interface ListingsPageProps {
  listings: DogListing[];
  filters: SearchFilters;
  setFilters: (filters: SearchFilters) => void;
  onViewDog: (dog: DogListing) => void;
}

const ListingsPage: React.FC<ListingsPageProps> = ({ listings, filters, setFilters, onViewDog }) => {
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

  const filteredListings = useMemo(() => {
    return listings.filter(dog => {
      const matchesQuery = !filters.query || 
        dog.name?.toLowerCase().includes(filters.query.toLowerCase()) ||
        dog.breed.toLowerCase().includes(filters.query.toLowerCase()) ||
        dog.color.toLowerCase().includes(filters.query.toLowerCase()) ||
        dog.description.toLowerCase().includes(filters.query.toLowerCase());
      
      const matchesStatus = !filters.status || dog.status === filters.status;
      
      // Location logic: if either city or neighborhood is provided in the filters, check if the dog's location matches either.
      // Note: On the home page we set both city and neighborhood to the same value from the location input.
      const locationInput = filters.city || filters.neighborhood;
      const matchesLocation = !locationInput || 
        dog.location.city.toLowerCase().includes(locationInput.toLowerCase()) ||
        dog.location.neighborhood.toLowerCase().includes(locationInput.toLowerCase());
      
      return matchesQuery && matchesStatus && matchesLocation && dog.status !== DogStatus.RESOLVED;
    });
  }, [listings, filters]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <h1 className="text-3xl font-black text-gray-800">Buscar Cães</h1>
        <div className="bg-white p-1 rounded-xl shadow-sm border border-gray-200 flex">
          <button 
            onClick={() => setViewMode('list')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${viewMode === 'list' ? 'bg-orange-500 text-white' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Lista
          </button>
          <button 
            onClick={() => setViewMode('map')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${viewMode === 'map' ? 'bg-orange-500 text-white' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Mapa
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <aside className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
            <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
                Filtros
            </h2>
            
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Status</label>
              <select 
                className="w-full p-3 rounded-xl bg-gray-50 border border-gray-100 outline-none font-medium"
                value={filters.status}
                onChange={e => setFilters({...filters, status: e.target.value})}
              >
                <option value="">Todos</option>
                <option value={DogStatus.LOST}>Perdidos</option>
                <option value={DogStatus.FOUND}>Encontrados</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Localização</label>
              <input 
                type="text" 
                placeholder="Cidade ou bairro"
                className="w-full p-3 rounded-xl bg-gray-50 border border-gray-100 outline-none font-medium"
                value={filters.city} // We treat city/neighborhood as a combined location filter in the UI
                onChange={e => setFilters({...filters, city: e.target.value, neighborhood: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Busca livre</label>
              <input 
                type="text" 
                placeholder="Nome, raça ou detalhe..."
                className="w-full p-3 rounded-xl bg-gray-50 border border-gray-100 outline-none font-medium"
                value={filters.query}
                onChange={e => setFilters({...filters, query: e.target.value})}
              />
            </div>

            <button 
                onClick={() => setFilters({ city: '', neighborhood: '', breed: '', size: '', color: '', status: '', query: '' })}
                className="w-full py-3 text-sm font-semibold text-gray-400 hover:text-orange-500 transition-colors"
            >
                Limpar filtros
            </button>
          </div>

          <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100">
              <h3 className="font-bold text-orange-800 text-sm mb-2">Precisa de ajuda?</h3>
              <p className="text-xs text-orange-700 leading-relaxed">
                  Não encontrou o que procurava? Entre em contato conosco para suporte adicional no registro do seu pet.
              </p>
          </div>
        </aside>

        {/* Results Area */}
        <div className="lg:col-span-3">
          {viewMode === 'list' ? (
            filteredListings.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredListings.map(dog => (
                        <DogCard key={dog.id} dog={dog} onClick={onViewDog} />
                    ))}
                </div>
            ) : (
                <div className="bg-white rounded-3xl p-20 text-center shadow-sm border border-gray-100">
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">Nenhum resultado</h3>
                    <p className="text-gray-500 mt-2">Tente ajustar seus filtros ou busca.</p>
                </div>
            )
          ) : (
            <div className="h-[600px] rounded-3xl overflow-hidden shadow-sm border border-gray-100 bg-white p-2">
                <DogMap listings={filteredListings} onSelectDog={onViewDog} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListingsPage;
