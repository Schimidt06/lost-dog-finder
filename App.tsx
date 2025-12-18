
import React, { useState, useEffect } from 'react';
import { DogListing, DogStatus, SearchFilters, Sighting, Report } from './types';
import { MOCK_DOGS } from './constants';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ListingsPage from './pages/ListingsPage';
import DogDetailPage from './pages/DogDetailPage';
import ListingForm from './components/ListingForm';
import AdminDashboard from './pages/AdminDashboard';
import SafetyGuide from './pages/SafetyGuide';

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'listings' | 'detail' | 'admin' | 'safety'>('home');
  const [listings, setListings] = useState<DogListing[]>([]);
  const [selectedDog, setSelectedDog] = useState<DogListing | null>(null);
  const [formType, setFormType] = useState<DogStatus | null>(null);
  const [reports, setReports] = useState<Report[]>([]);
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
    const savedListings = localStorage.getItem('dog_listings');
    const savedReports = localStorage.getItem('dog_reports');
    
    if (savedListings) {
      setListings(JSON.parse(savedListings));
    } else {
      // Initialize mock dogs with empty sightings array
      setListings(MOCK_DOGS.map(d => ({ ...d, sightings: [] })));
    }

    if (savedReports) {
      setReports(JSON.parse(savedReports));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('dog_listings', JSON.stringify(listings));
  }, [listings]);

  useEffect(() => {
    localStorage.setItem('dog_reports', JSON.stringify(reports));
  }, [reports]);

  const handleAddListing = (listing: DogListing) => {
    setListings(prev => [listing, ...prev]);
    setFormType(null);
    setView('listings');
  };

  const handleAddSighting = (dogId: string, sighting: Sighting) => {
    setListings(prev => prev.map(dog => 
      dog.id === dogId 
        ? { ...dog, sightings: [sighting, ...dog.sightings] } 
        : dog
    ));
    // Update selected dog if it's the one receiving the sighting
    if (selectedDog?.id === dogId) {
      setSelectedDog(prev => prev ? { ...prev, sightings: [sighting, ...prev.sightings] } : null);
    }
  };

  const handleReportListing = (listingId: string, reason: string) => {
    const newReport: Report = {
      id: Math.random().toString(36).substr(2, 9),
      listingId,
      reason,
      createdAt: Date.now()
    };
    setReports(prev => [newReport, ...prev]);
    alert("Denúncia enviada com sucesso. Nossa equipe irá analisar.");
  };

  const handleUpdateStatus = (id: string, status: DogStatus) => {
    setListings(prev => prev.map(dog => dog.id === id ? { ...dog, status } : dog));
  };

  const handleDeleteListing = (id: string) => {
    setListings(prev => prev.filter(dog => dog.id !== id));
    setReports(prev => prev.filter(r => r.listingId !== id));
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
            allListings={listings}
            onBack={() => setView('listings')}
            onAddSighting={handleAddSighting}
            onReport={handleReportListing}
            onViewDog={navigateToDetail}
          />
        )}

        {view === 'safety' && (
          <SafetyGuide />
        )}

        {view === 'admin' && (
          <AdminDashboard 
            listings={listings}
            reports={reports}
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
