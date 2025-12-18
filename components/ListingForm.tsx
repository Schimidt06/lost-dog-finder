
import React, { useState } from 'react';
import { DogListing, DogStatus, DogSize, DogGender } from '../types';
import { STATES } from '../constants';

interface ListingFormProps {
  type: DogStatus;
  onClose: () => void;
  onSubmit: (listing: DogListing) => void;
}

const ListingForm: React.FC<ListingFormProps> = ({ type, onClose, onSubmit }) => {
  const [step, setStep] = useState(1);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newListing: DogListing = {
      id: Math.random().toString(36).substr(2, 9),
      status: type,
      name: formData.name || undefined,
      images: [`https://picsum.photos/seed/${Math.random()}/800/600`], // Simulate image upload
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
        lat: -23.5505 + (Math.random() - 0.5) * 0.1, // Simulated random coords near center
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

              <div className="bg-orange-50 border border-orange-100 p-4 rounded-xl flex items-center gap-3">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-orange-500 shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                  </div>
                  <div className="text-xs text-orange-700">
                      <strong>Dica:</strong> Uma foto bem nítida aumenta em 70% as chances de reencontro. 
                      <p>(Simulação: Foto automática gerada ao salvar)</p>
                  </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Data</label>
                  <input 
                    type="date" required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none"
                    value={formData.date}
                    onChange={e => setFormData({...formData, date: e.target.value})}
                  />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Horário aprox.</label>
                    <input 
                        type="time"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none"
                        value={formData.time}
                        onChange={e => setFormData({...formData, time: e.target.value})}
                    />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Estado</label>
                    <select 
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none"
                        value={formData.state}
                        onChange={e => setFormData({...formData, state: e.target.value})}
                    >
                        {STATES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Cidade</label>
                  <input 
                    type="text" required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none"
                    value={formData.city}
                    onChange={e => setFormData({...formData, city: e.target.value})}
                  />
                </div>
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

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Ponto de Referência</label>
                <input 
                  type="text"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none"
                  placeholder="Ex: Próximo à padaria X"
                  value={formData.reference}
                  onChange={e => setFormData({...formData, reference: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Descrição Adicional</label>
                <textarea 
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none min-h-[100px]"
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

                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                    <input 
                        type="checkbox" id="showPhone"
                        className="w-5 h-5 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                        checked={formData.showPhone}
                        onChange={e => setFormData({...formData, showPhone: e.target.checked})}
                    />
                    <label htmlFor="showPhone" className="text-sm text-gray-600">Exibir telefone publicamente para contato rápido</label>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl text-xs text-blue-700 leading-relaxed">
                  Ao clicar em publicar, você concorda com nossos termos de uso e política de privacidade. Nunca realize encontros em locais isolados e confirme sempre as informações do animal.
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
                className="flex-grow bg-orange-500 text-white py-3 rounded-xl font-bold hover:bg-orange-600 transition-all shadow-lg shadow-orange-200"
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
