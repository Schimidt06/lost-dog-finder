
import React, { useState } from 'react';
import { DogListing, DogStatus, DogSize, DogGender } from '../types';
import { STATES } from '../constants';
import { GoogleGenAI } from "@google/genai";

interface ListingFormProps {
  type: DogStatus;
  onClose: () => void;
  onSubmit: (listing: DogListing) => void;
}

const ListingForm: React.FC<ListingFormProps> = ({ type, onClose, onSubmit }) => {
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    breed: 'SRD',
    color: '',
    size: DogSize.MEDIUM,
    gender: DogGender.UNKNOWN,
    age: '',
    date: new Date().toISOString().split('T')[0],
    time: '',
    state: 'SP',
    city: '',
    neighborhood: '',
    reference: '',
    description: '',
    behavior: '',
    collar: '',
    isDocile: true,
    contactName: '',
    contactPhone: '',
    showPhone: true
  });

  const generateAIDescription = async () => {
    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Gere uma descrição curta e emocionante (máximo 300 caracteres) para um anúncio de cachorro ${type === DogStatus.LOST ? 'PERDIDO' : 'ENCONTRADO'}. 
      Nome: ${formData.name || 'Desconhecido'}, Raça: ${formData.breed}, Cor: ${formData.color}, Local: ${formData.neighborhood}, ${formData.city}. 
      Mencione que ele é ${formData.isDocile ? 'dócil' : 'arisco'} e tem porte ${formData.size}. Seja direto e peça ajuda.`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });
      
      if (response.text) {
        setFormData(prev => ({ ...prev, description: response.text }));
      }
    } catch (error) {
      console.error("Erro ao gerar descrição:", error);
      alert("Não foi possível gerar a descrição com IA no momento.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Fix: Added sightings: [] to satisfy DogListing interface
    const newListing: DogListing = {
      id: Math.random().toString(36).substr(2, 9),
      status: type,
      name: formData.name || undefined,
      images: [`https://picsum.photos/seed/${Math.random()}/800/600`], 
      breed: formData.breed,
      color: formData.color,
      size: formData.size,
      gender: formData.gender,
      age: formData.age || undefined,
      date: formData.date,
      time: formData.time || undefined,
      location: {
        state: formData.state,
        city: formData.city,
        neighborhood: formData.neighborhood,
        reference: formData.reference || undefined,
        lat: -23.5505 + (Math.random() - 0.5) * 0.1,
        lng: -46.6333 + (Math.random() - 0.5) * 0.1
      },
      description: formData.description,
      behavior: formData.behavior || undefined,
      collar: formData.collar || undefined,
      isDocile: formData.isDocile,
      contact: {
        name: formData.contactName,
        phone: formData.contactPhone,
        showPhonePublicly: formData.showPhone
      },
      sightings: [],
      createdAt: Date.now()
    };

    onSubmit(newListing);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
        </button>

        <form onSubmit={handleSubmit} className="p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800">
              {type === DogStatus.LOST ? '🐶 Perdi meu cachorro' : '🐕 Encontrei um cachorro'}
            </h2>
            <p className="text-gray-500">Passo {step} de 3 — {step === 1 ? 'Sobre o cão' : step === 2 ? 'Local e Data' : 'Seu Contato'}</p>
          </div>

          {step === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Nome do cachorro {type === DogStatus.FOUND && '(Opcional)'}</label>
                  <input 
                    type="text" required={type === DogStatus.LOST}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all outline-none"
                    placeholder="Como ele se chama?"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Raça</label>
                  <input 
                    type="text" required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none"
                    placeholder="Ex: Poodle, SRD..."
                    value={formData.breed}
                    onChange={e => setFormData({...formData, breed: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Cor Predominante</label>
                  <input 
                    type="text" required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none"
                    placeholder="Ex: Caramelo, Branco..."
                    value={formData.color}
                    onChange={e => setFormData({...formData, color: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Porte</label>
                  <select 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none"
                    value={formData.size}
                    onChange={e => setFormData({...formData, size: e.target.value as DogSize})}
                  >
                    {Object.values(DogSize).map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Sexo</label>
                  <select 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none"
                    value={formData.gender}
                    onChange={e => setFormData({...formData, gender: e.target.value as DogGender})}
                  >
                    {Object.values(DogGender).map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Idade</label>
                  <input 
                    type="text"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none"
                    placeholder="Ex: 2 anos"
                    value={formData.age}
                    onChange={e => setFormData({...formData, age: e.target.value})}
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-orange-50 border border-orange-100 rounded-xl">
                  <input 
                      type="checkbox" id="isDocile"
                      className="w-5 h-5 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                      checked={formData.isDocile}
                      onChange={e => setFormData({...formData, isDocile: e.target.checked})}
                  />
                  <label htmlFor="isDocile" className="text-sm text-orange-800 font-medium">Ele é dócil?</label>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Cidade</label>
                  <input 
                    type="text" required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none"
                    value={formData.city}
                    onChange={e => setFormData({...formData, city: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Bairro</label>
                  <input 
                    type="text" required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none"
                    value={formData.neighborhood}
                    onChange={e => setFormData({...formData, neighborhood: e.target.value})}
                  />
                </div>
              </div>

              <div className="relative">
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-sm font-semibold text-gray-700">Descrição Adicional</label>
                  <button 
                    type="button"
                    onClick={generateAIDescription}
                    disabled={isGenerating || !formData.city || !formData.color}
                    className="text-[10px] font-bold bg-purple-600 text-white px-2 py-1 rounded-md hover:bg-purple-700 disabled:bg-gray-300 flex items-center gap-1 transition-all"
                  >
                    {isGenerating ? 'Gerando...' : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
                        Gerar com IA
                      </>
                    )}
                  </button>
                </div>
                <textarea 
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none min-h-[120px] text-sm"
                  placeholder="Detalhes que ajudam a identificar..."
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Seu Nome</label>
                  <input 
                    type="text" required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none"
                    value={formData.contactName}
                    onChange={e => setFormData({...formData, contactName: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Telefone (WhatsApp)</label>
                  <input 
                    type="tel" required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none"
                    placeholder="(00) 00000-0000"
                    value={formData.contactPhone}
                    onChange={e => setFormData({...formData, contactPhone: e.target.value})}
                  />
                </div>
              </div>
            </div>
          )}

          <div className="mt-10 flex gap-4">
            {step > 1 && (
              <button 
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-6 py-3 rounded-xl border border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition-colors"
              >
                Voltar
              </button>
            )}
            
            {step < 3 ? (
              <button 
                type="button"
                onClick={() => setStep(step + 1)}
                className="flex-grow bg-orange-500 text-white py-3 rounded-xl font-bold text-lg shadow-lg shadow-orange-200"
              >
                Próximo Passo
              </button>
            ) : (
              <button 
                type="submit"
                className="flex-grow bg-orange-600 text-white py-3 rounded-xl font-bold hover:bg-orange-700 transition-all shadow-lg shadow-orange-300 flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                Publicar Alerta
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ListingForm;