
import React from 'react';
import { DogListing, DogStatus } from '../types';

interface DogDetailPageProps {
  dog: DogListing;
  onBack: () => void;
}

const DogDetailPage: React.FC<DogDetailPageProps> = ({ dog, onBack }) => {
  const isLost = dog.status === DogStatus.LOST;

  return (
    <div className="max-w-5xl mx-auto pb-12">
      <button 
        onClick={onBack}
        className="mb-6 flex items-center gap-2 text-gray-500 hover:text-orange-500 font-semibold transition-colors group"
      >
        <svg className="group-hover:-translate-x-1 transition-transform" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        Voltar para a busca
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Photos */}
        <div className="space-y-4">
          <div className="aspect-[4/3] rounded-[2rem] overflow-hidden shadow-xl">
            <img src={dog.images[0]} alt={dog.name} className="w-full h-full object-cover" />
          </div>
          <div className="grid grid-cols-3 gap-4">
              {dog.images.slice(1).map((img, i) => (
                  <div key={i} className="aspect-square rounded-2xl overflow-hidden border-2 border-transparent hover:border-orange-500 transition-colors cursor-pointer">
                      <img src={img} alt={`${dog.name} ${i+2}`} className="w-full h-full object-cover" />
                  </div>
              ))}
          </div>
        </div>

        {/* Right Column: Info */}
        <div className="flex flex-col">
          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 flex-grow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-3 ${
                  isLost ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                }`}>
                  {dog.status}
                </div>
                <h1 className="text-3xl font-black text-gray-800">{dog.name || 'Cachorro Desconhecido'}</h1>
              </div>
              <button className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all" title="Denunciar anúncio">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" x2="4" y1="22" y2="15"/></svg>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-8 py-6 border-y border-gray-50">
              <div className="space-y-1">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Raça</span>
                <p className="font-semibold text-gray-700">{dog.breed}</p>
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Porte</span>
                <p className="font-semibold text-gray-700">{dog.size}</p>
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Cor</span>
                <p className="font-semibold text-gray-700">{dog.color}</p>
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Sexo</span>
                <p className="font-semibold text-gray-700">{dog.gender}</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                    <svg className="text-orange-500" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                    Onde e Quando?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                    Visto pela última vez em <strong>{dog.location.neighborhood}, {dog.location.city} - {dog.location.state}</strong> no dia {new Date(dog.date).toLocaleDateString('pt-BR')}.
                    {dog.location.reference && <span className="block mt-1 text-sm text-gray-400 italic">Ref: {dog.location.reference}</span>}
                </p>
              </div>

              <div>
                <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                    <svg className="text-orange-500" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                    Descrição
                </h3>
                <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                    {dog.description}
                </p>
              </div>
            </div>

            <div className="mt-10 p-6 bg-slate-50 rounded-2xl space-y-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-slate-400 shadow-sm border border-slate-100">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    </div>
                    <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Responsável</p>
                        <p className="font-bold text-gray-800">{dog.contact.name}</p>
                    </div>
                </div>

                <a 
                    href={dog.contact.showPhonePublicly ? `https://wa.me/55${dog.contact.phone.replace(/\D/g,'')}` : '#'}
                    className={`w-full flex items-center justify-center gap-3 py-4 rounded-xl font-bold transition-all shadow-lg ${
                        dog.contact.showPhonePublicly 
                        ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-100' 
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    {dog.contact.showPhonePublicly ? 'Entrar em contato via WhatsApp' : 'Contato apenas por formulário'}
                </a>

                <div className="bg-amber-50 border border-amber-100 p-4 rounded-xl text-xs text-amber-800 leading-relaxed">
                    <strong>Atenção:</strong> Confirme as informações antes de qualquer encontro. Nunca envie dinheiro ou dados bancários para transporte ou resgate.
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DogDetailPage;
