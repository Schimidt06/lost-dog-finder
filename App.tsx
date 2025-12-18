
import React, { useState, useEffect } from 'react';
import { DogListing, DogStatus, SearchFilters } from './types';
import { MOCK_DOGS } from './constants';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ListingsPage from './pages/ListingsPage';
import DogDetailPage from './pages/DogDetailPage';
import ListingForm from './components/ListingForm';
import AdminDashboard from './pages/AdminDashboard';

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'listings' | 'detail' | 'admin'>('home');
  const [listings, setListings] = useState<DogListing[]>([]);
  const [selectedDog, setSelectedDog] = useState<DogListing | null>(null);
  const [formType, setFormType] = useState<DogStatus | null>(null);
  const [filters, setFilters] = useState<SearchFilters>({
    city: '',
    neighborhood: '',
    breed: '',
    size: '',
    color: '',
    status: '',
    query: ''
  });

  useEffect(() => {
    // Load local storage or mock data
    const saved = localStorage.getItem('dog_listings');
    if (saved) {
      setListings(JSON.parse(saved));
    } else {
      setListings(MOCK_DOGS);
    }
  }, []);

  useEffect(() => {
    if (listings.length > 0) {
      localStorage.setItem('dog_listings', JSON.stringify(listings));
    }
  }, [listings]);

  const handleAddListing = (listing: DogListing) => {
    setListings(prev => [listing, ...prev]);
    setFormType(null);
    setView('listings');
  };

  const handleUpdateStatus = (id: string, status: DogStatus) => {
    setListings(prev => prev.map(dog => dog.id === id ? { ...dog, status } : dog));
  };

  const handleDeleteListing = (id: string) => {
    setListings(prev => prev.filter(dog => dog.id !== id));
  };

  const navigateToDetail = (dog: DogListing) => {
    setSelectedDog(dog);
    setView('detail');
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header onNavigate={(v) => { setView(v); setFormType(null); }} />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {view === 'home' && (
          <Home 
            onSearch={(f) => { setFilters(f); setView('listings'); }} 
            onRegisterLost={() => setFormType(DogStatus.LOST)}
            onRegisterFound={() => setFormType(DogStatus.FOUND)}
            recentDogs={listings.filter(d => d.status !== DogStatus.RESOLVED).slice(0, 4)}
            onViewDog={navigateToDetail}
          />
        )}

        {view === 'listings' && (
          <ListingsPage 
            listings={listings} 
            filters={filters} 
            setFilters={setFilters}
            onViewDog={navigateToDetail}
          />
        )}

        {view === 'detail' && selectedDog && (
          <DogDetailPage 
            dog={selectedDog} 
            onBack={() => setView('listings')}
          />
        )}

        {view === 'admin' && (
          <AdminDashboard 
            listings={listings}
            onUpdateStatus={handleUpdateStatus}
            onDelete={handleDeleteListing}
          />
        )}
      </main>

      {formType && (
        <ListingForm 
          type={formType} 
          onClose={() => setFormType(null)} 
          onSubmit={handleAddListing} 
        />
      )}

      <Footer onNavigate={setView} />
    </div>
  );
};

export default App;
