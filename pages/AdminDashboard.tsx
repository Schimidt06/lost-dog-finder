
import React from 'react';
import { DogListing, DogStatus } from '../types';

interface AdminDashboardProps {
  listings: DogListing[];
  onUpdateStatus: (id: string, status: DogStatus) => void;
  onDelete: (id: string) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ listings, onUpdateStatus, onDelete }) => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-gray-800">Painel de Controle</h1>
          <p className="text-gray-500">Gestão administrativa de anúncios e denúncias</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-xl border border-gray-200 text-sm font-bold text-gray-600">
            Total: {listings.length} anúncios
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Cachorro</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Localização</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Responsável</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {listings.map(dog => (
              <tr key={dog.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img src={dog.images[0]} className="w-12 h-12 rounded-xl object-cover" />
                    <div>
                      <p className="font-bold text-gray-800">{dog.name || 'Desconhecido'}</p>
                      <p className="text-xs text-gray-400">{dog.breed}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                        dog.status === DogStatus.LOST ? 'bg-amber-100 text-amber-700' :
                        dog.status === DogStatus.FOUND ? 'bg-emerald-100 text-emerald-700' :
                        'bg-slate-100 text-slate-500'
                    }`}>
                        {dog.status}
                    </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                    {dog.location.city} - {dog.location.state}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                    {dog.contact.name}
                </td>
                <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                        {dog.status !== DogStatus.RESOLVED && (
                            <button 
                                onClick={() => onUpdateStatus(dog.id, DogStatus.RESOLVED)}
                                className="p-2 text-emerald-500 hover:bg-emerald-50 rounded-lg transition-all"
                                title="Marcar como resolvido"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                            </button>
                        )}
                        <button 
                            onClick={() => onDelete(dog.id)}
                            className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-all"
                            title="Excluir anúncio"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                        </button>
                    </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
