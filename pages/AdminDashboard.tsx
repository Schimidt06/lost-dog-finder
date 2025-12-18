
import React, { useState } from 'react';
import { DogListing, DogStatus, Report } from '../types';

interface AdminDashboardProps {
  listings: DogListing[];
  reports: Report[];
  onUpdateStatus: (id: string, status: DogStatus) => void;
  onDelete: (id: string) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ listings, reports, onUpdateStatus, onDelete }) => {
  const [tab, setTab] = useState<'listings' | 'reports'>('listings');

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-gray-800">Painel de Controle</h1>
          <p className="text-gray-500 font-medium">Gestão administrativa da comunidade</p>
        </div>
        <div className="flex bg-white p-1 rounded-2xl border border-gray-100 shadow-sm">
          <button onClick={() => setTab('listings')} className={`px-6 py-2 rounded-xl text-sm font-black transition-all ${tab === 'listings' ? 'bg-orange-500 text-white' : 'text-gray-400'}`}>Anúncios</button>
          <button onClick={() => setTab('reports')} className={`px-6 py-2 rounded-xl text-sm font-black transition-all ${tab === 'reports' ? 'bg-red-500 text-white' : 'text-gray-400'}`}>Denúncias ({reports.length})</button>
        </div>
      </div>

      {tab === 'listings' ? (
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-gray-100">
              <tr>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Cachorro</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Local</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {listings.map(dog => (
                <tr key={dog.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <img src={dog.images[0]} className="w-14 h-14 rounded-2xl object-cover shadow-sm" alt="" />
                      <div>
                        <p className="font-black text-gray-800">{dog.name || 'Desconhecido'}</p>
                        <p className="text-xs text-gray-400 font-bold">{dog.breed}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                          dog.status === DogStatus.LOST ? 'bg-amber-100 text-amber-700' :
                          dog.status === DogStatus.FOUND ? 'bg-emerald-100 text-emerald-700' :
                          'bg-slate-100 text-slate-500'
                      }`}>
                          {dog.status}
                      </span>
                  </td>
                  <td className="px-8 py-5 text-sm text-gray-600 font-medium">{dog.location.city}</td>
                  <td className="px-8 py-5 text-right">
                      <div className="flex items-center justify-end gap-3">
                          {dog.status !== DogStatus.RESOLVED && (
                              <button onClick={() => onUpdateStatus(dog.id, DogStatus.RESOLVED)} className="p-3 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-100" title="Resolvido">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                              </button>
                          )}
                          <button onClick={() => onDelete(dog.id)} className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-100" title="Excluir">
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                          </button>
                      </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="space-y-4">
          {reports.length > 0 ? reports.map(report => {
            const dog = listings.find(l => l.id === report.listingId);
            return (
              <div key={report.id} className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="p-4 bg-red-50 text-red-500 rounded-2xl">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12" y1="16" y2="16.01"/></svg>
                  </div>
                  <div>
                    <p className="font-black text-gray-800">{report.reason}</p>
                    <p className="text-sm text-gray-500 font-medium">Post: <span className="font-bold">{dog?.name || 'Desconhecido'}</span> • {new Date(report.createdAt).toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => onDelete(report.listingId)} className="bg-red-600 text-white px-6 py-2 rounded-xl font-bold text-sm">Remover Post</button>
                </div>
              </div>
            );
          }) : (
            <div className="bg-white p-20 text-center rounded-[2.5rem] border-2 border-dashed border-gray-100">
              <p className="text-gray-400 font-black">Nenhuma denúncia no momento.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
