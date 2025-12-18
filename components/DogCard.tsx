
import React from 'react';
import { DogListing, DogStatus } from '../types';

interface DogCardProps {
  dog: DogListing;
  onClick: (dog: DogListing) => void;
}

const DogCard: React.FC<DogCardProps> = ({ dog, onClick }) => {
  const isLost = dog.status === DogStatus.LOST;

  return (
    <div 
      onClick={() => onClick(dog)}
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-gray-100 cursor-pointer group flex flex-col h-full"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={dog.images[0]} 
          alt={dog.name || 'Cachorro'} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm ${
          isLost ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
        }`}>
          {dog.status}
        </div>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-bold text-lg text-gray-800 truncate">
            {dog.name || 'Desconhecido'}
          </h3>
          <span className="text-xs text-gray-400">{new Date(dog.date).toLocaleDateString('pt-BR')}</span>
        </div>
        
        <p className="text-gray-500 text-sm mb-3 line-clamp-2">
          {dog.breed} • {dog.color} • {dog.location.neighborhood}
        </p>

        <div className="mt-auto flex items-center gap-2 text-orange-500 text-xs font-semibold uppercase tracking-wider">
          Ver detalhes
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </div>
      </div>
    </div>
  );
};

export default DogCard;
