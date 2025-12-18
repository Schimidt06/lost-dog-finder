
import React, { useEffect, useRef } from 'react';
import { DogListing, DogStatus } from '../types';

interface DogMapProps {
  listings: DogListing[];
  onSelectDog: (dog: DogListing) => void;
}

const DogMap: React.FC<DogMapProps> = ({ listings, onSelectDog }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !mapRef.current || leafletRef.current) return;

    // Load Leaflet dynamically to avoid SSR issues if any
    const L = (window as any).L;
    if (!L) return;

    const map = L.map(mapRef.current).setView([-23.5505, -46.6333], 12);
    leafletRef.current = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    listings.forEach(dog => {
      const isLost = dog.status === DogStatus.LOST;
      const marker = L.marker([dog.location.lat, dog.location.lng], {
          icon: L.divIcon({
              className: 'custom-div-icon',
              html: `<div class="w-8 h-8 rounded-full border-4 border-white shadow-lg flex items-center justify-center text-white ${isLost ? 'bg-amber-500' : 'bg-emerald-500'}">
                ${isLost ? '?' : '!'}
              </div>`,
              iconSize: [32, 32],
              iconAnchor: [16, 32]
          })
      }).addTo(map);

      marker.bindPopup(`
        <div class="p-2 min-w-[150px]">
          <img src="${dog.images[0]}" class="w-full h-24 object-cover rounded-lg mb-2" />
          <p class="font-bold text-gray-800 m-0">${dog.name || 'Desconhecido'}</p>
          <p class="text-xs text-gray-500 m-0">${dog.status} em ${dog.location.neighborhood}</p>
          <button class="w-full mt-2 bg-orange-500 text-white text-[10px] py-1 rounded-md font-bold" onclick="window.dispatchEvent(new CustomEvent('map-dog-click', { detail: '${dog.id}' }))">VER DETALHES</button>
        </div>
      `);
    });

    const handleMapClick = (e: any) => {
        const dogId = e.detail;
        const dog = listings.find(d => d.id === dogId);
        if (dog) onSelectDog(dog);
    };

    window.addEventListener('map-dog-click', handleMapClick);
    return () => {
        window.removeEventListener('map-dog-click', handleMapClick);
        map.remove();
        leafletRef.current = null;
    };
  }, [listings, onSelectDog]);

  return (
    <div className="w-full h-full min-h-[400px] relative">
      <div ref={mapRef} className="z-0" />
      <div className="absolute bottom-4 left-4 z-[1000] bg-white/90 backdrop-blur p-3 rounded-xl shadow-lg border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
              <div className="w-4 h-4 rounded-full bg-amber-500 border-2 border-white"></div>
              <span className="text-xs font-bold text-gray-700">Perdido</span>
          </div>
          <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-emerald-500 border-2 border-white"></div>
              <span className="text-xs font-bold text-gray-700">Encontrado</span>
          </div>
      </div>
    </div>
  );
};

export default DogMap;
