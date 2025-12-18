
import React, { useState, useMemo } from 'react';
import { DogListing, DogStatus, Sighting } from '../types';
import DogCard from '../components/DogCard';

interface DogDetailPageProps {
  dog: DogListing;
  allListings: DogListing[];
  onBack: () => void;
  onAddSighting: (dogId: string, sighting: Sighting) => void;
  onReport: (listingId: string, reason: string) => void;
  onViewDog: (dog: DogListing) => void;
}

const DogDetailPage: React.FC<DogDetailPageProps> = ({ dog, allListings, onBack, onAddSighting, onReport, onViewDog }) => {
  const [showPoster, setShowPoster] = useState(false);
  const [showSightingForm, setShowSightingForm] = useState(false);
  const [sightingData, setSightingData] = useState({ date: '', time: '', location: '', description: '' });
  
  const isLost = dog.status === DogStatus.LOST;

  // Find similar dogs with opposite status
  const matches = useMemo(() => {
    return allListings.filter(item => 
      item.id !== dog.id &&
      item.status !== dog.status &&
      item.status !== DogStatus.RESOLVED &&
      (item.location.city === dog.location.city || item.breed === dog.breed || item.size === dog.size)
    ).slice(0, 3);
  }, [allListings, dog]);

  const handleSightingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const sighting: Sighting = {
      id: Math.random().toString(36).substr(2, 9),
      ...sightingData,
      createdAt: Date.now()
    };
    onAddSighting(dog.id, sighting);
    setShowSightingForm(false);
    setSightingData({ date: '', time: '', location: '', description: '' });
  };

  const handleShare = () => {
    const text = `${isLost ? 'PROCURA-SE' : 'ENCONTRADO'}: ${dog.name || 'Cachorro'} em ${dog.location.neighborhood}. Ajude a compartilhar!`;
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({ title: 'Patas Amigas', text, url });
    } else {
      navigator.clipboard.writeText(`${text} ${url}`);
      alert("Link copiado para a área de transferência!");
    }
  };

  if (showPoster) {
    return (
      <div className="fixed inset-0 bg-white z-[200] overflow-y-auto p-0 md:p-8">
        <div className="max-w-[800px] mx-auto border-[10px] border-red-600 p-8 flex flex-col items-center text-center space-y-6 print:m-0 print:border-[20px]">
          <h1 className="text-7xl font-black text-red-600 uppercase tracking-tighter">PROCURA-SE</h1>
          <div className="w-full aspect-square max-h-[400px] overflow-hidden rounded-lg border-4 border-gray-100">
            <img src={dog.images[0]} className="w-full h-full object-cover" alt="Dog" />
          </div>
          <div className="space-y-2">
            <h2 className="text-6xl font-black text-gray-900 uppercase">{dog.name || 'Cachorro Perdido'}</h2>
            <p className="text-3xl font-bold text-gray-700">Visto em: {dog.location.neighborhood}, {dog.location.city}</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-2xl w-full border-2 border-gray-200">
            <p className="text-2xl text-gray-800 leading-tight">
              <strong>Raça:</strong> {dog.breed} | <strong>Cor:</strong> {dog.color} | <strong>Porte:</strong> {dog.size}
            </p>
            <p className="text-xl text-gray-600 mt-4 italic">"{dog.description}"</p>
          </div>
          <div className="w-full bg-red-600 text-white p-6 rounded-2xl">
            <p className="text-2xl font-bold uppercase mb-2">Falar com {dog.contact.name}</p>
            <p className="text-6xl font-black">{dog.contact.phone}</p>
          </div>
          <p className="text-gray-400 font-medium">patasamigas.com/ajuda</p>
          <div className="fixed bottom-8 right-8 flex gap-4 print:hidden">
            <button onClick={() => setShowPoster(false)} className="bg-gray-800 text-white px-6 py-3 rounded-xl font-bold hover:bg-gray-700">Sair</button>
            <button onClick={() => window.print()} className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-emerald-700">Imprimir</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto pb-24">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <button onClick={onBack} className="flex items-center gap-2 text-gray-500 hover:text-orange-500 font-semibold transition-colors group">
          <svg className="group-hover:-translate-x-1 transition-transform" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          Voltar para a busca
        </button>
        
        <div className="flex flex-wrap gap-3">
          <button onClick={handleShare} className="flex items-center gap-2 bg-slate-100 text-slate-700 px-4 py-2 rounded-xl font-bold text-sm hover:bg-slate-200">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/></svg>
            Compartilhar
          </button>
          {isLost && (
            <button onClick={() => setShowPoster(true)} className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-xl font-bold text-sm hover:bg-red-100 border border-red-100">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 18H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h15a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><rect width="12" height="14" x="6" y="10" rx="2"/><path d="M12 2v3"/><path d="M17 14h-1"/><path d="M17 18h-1"/></svg>
              Gerar Cartaz
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Gallery & Core Info */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-4 rounded-[2.5rem] shadow-sm border border-gray-100">
            <div className="aspect-[16/9] rounded-[2rem] overflow-hidden mb-6">
              <img src={dog.images[0]} alt={dog.name} className="w-full h-full object-cover" />
            </div>
            
            <div className="px-4 pb-4">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className={`inline-block px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-3 ${
                    isLost ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                  }`}>
                    {dog.status}
                  </div>
                  <h1 className="text-4xl font-black text-gray-800">{dog.name || 'Cachorro Desconhecido'}</h1>
                  <p className="text-gray-500 font-medium mt-1">Visto por último em {dog.location.neighborhood}, {dog.location.city}</p>
                </div>
                <button 
                  onClick={() => onReport(dog.id, "Anúncio suspeito ou falso")}
                  className="p-3 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all" title="Denunciar">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" x2="4" y1="22" y2="15"/></svg>
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                {[
                  { label: 'Raça', val: dog.breed },
                  { label: 'Porte', val: dog.size },
                  { label: 'Cor', val: dog.color },
                  { label: 'Dócil?', val: dog.isDocile ? 'Sim' : 'Não' }
                ].map((item, i) => (
                  <div key={i} className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">{item.label}</span>
                    <p className="font-bold text-slate-700">{item.val}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2 text-lg">
                      <svg className="text-orange-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                      Sobre este cão
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-lg whitespace-pre-wrap">{dog.description}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sightings Timeline */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-black text-gray-800">Linha do Tempo de Avistamentos</h3>
              <button 
                onClick={() => setShowSightingForm(!showSightingForm)}
                className="bg-orange-500 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-orange-600 shadow-lg shadow-orange-100"
              >
                Vi este cachorro!
              </button>
            </div>

            {showSightingForm && (
              <form onSubmit={handleSightingSubmit} className="mb-10 p-6 bg-orange-50 rounded-3xl border border-orange-100 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input type="date" required className="p-3 rounded-xl border-none ring-1 ring-orange-200" value={sightingData.date} onChange={e => setSightingData({...sightingData, date: e.target.value})} />
                  <input type="time" required className="p-3 rounded-xl border-none ring-1 ring-orange-200" value={sightingData.time} onChange={e => setSightingData({...sightingData, time: e.target.value})} />
                </div>
                <input type="text" placeholder="Local exato ou referência" required className="w-full p-3 rounded-xl border-none ring-1 ring-orange-200" value={sightingData.location} onChange={e => setSightingData({...sightingData, location: e.target.value})} />
                <textarea placeholder="O que ele estava fazendo? (correndo, dormindo...)" className="w-full p-3 rounded-xl border-none ring-1 ring-orange-200 min-h-[80px]" value={sightingData.description} onChange={e => setSightingData({...sightingData, description: e.target.value})} />
                <div className="flex gap-2">
                  <button type="submit" className="bg-orange-600 text-white px-6 py-2 rounded-xl font-bold text-sm">Salvar Avistamento</button>
                  <button type="button" onClick={() => setShowSightingForm(false)} className="px-6 py-2 rounded-xl font-bold text-sm text-gray-500">Cancelar</button>
                </div>
              </form>
            )}

            <div className="space-y-6 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100">
              {dog.sightings.length > 0 ? dog.sightings.map(s => (
                <div key={s.id} className="pl-10 relative">
                  <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-white border-4 border-orange-500 shadow-sm"></div>
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-bold text-slate-800">{s.location}</p>
                      <span className="text-[10px] font-bold text-slate-400 uppercase">{new Date(s.date).toLocaleDateString()} • {s.time}</span>
                    </div>
                    <p className="text-sm text-slate-600 italic">"{s.description}"</p>
                  </div>
                </div>
              )) : (
                <div className="text-center py-10">
                  <p className="text-gray-400 font-medium">Nenhum avistamento relatado ainda.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar: Contact & Matches */}
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 sticky top-24">
            <h3 className="font-black text-gray-800 mb-6 text-xl">Falar com o Responsável</h3>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 font-black text-xl">
                {dog.contact.name.charAt(0)}
              </div>
              <div>
                <p className="font-black text-gray-800 text-lg">{dog.contact.name}</p>
                <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">Publicado há 2 dias</p>
              </div>
            </div>

            <a 
              href={dog.contact.showPhonePublicly ? `https://wa.me/55${dog.contact.phone.replace(/\D/g,'')}` : '#'}
              className="w-full flex items-center justify-center gap-3 py-5 bg-emerald-600 text-white rounded-2xl font-black text-lg hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-100 mb-4"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              {dog.contact.showPhonePublicly ? 'WhatsApp de Contato' : 'Mensagem Privada'}
            </a>

            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 text-xs text-amber-800 font-medium leading-relaxed">
              <strong>DICA DE SEGURANÇA:</strong> Nunca realize encontros sozinho ou em locais isolados. Não faça depósitos antecipados.
            </div>

            {matches.length > 0 && (
              <div className="mt-10 border-t border-slate-50 pt-10">
                <h4 className="font-black text-slate-800 mb-6 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                  Possíveis Matches
                </h4>
                <div className="space-y-4">
                  {matches.map(m => (
                    <div key={m.id} onClick={() => onViewDog(m)} className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-2xl cursor-pointer transition-colors border border-transparent hover:border-slate-100">
                      <img src={m.images[0]} className="w-16 h-16 rounded-xl object-cover" alt="" />
                      <div>
                        <p className="font-bold text-sm text-slate-800 line-clamp-1">{m.name || 'Cachorro'}</p>
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-tighter">{m.status} em {m.location.neighborhood}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DogDetailPage;
