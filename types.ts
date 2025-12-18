
export enum DogStatus {
  LOST = 'PERDIDO',
  FOUND = 'ENCONTRADO',
  RESOLVED = 'RESOLVIDO'
}

export enum DogSize {
  SMALL = 'Pequeno',
  MEDIUM = 'Médio',
  LARGE = 'Grande'
}

export enum DogGender {
  MALE = 'Macho',
  FEMALE = 'Fêmea',
  UNKNOWN = 'Não sei'
}

export interface Sighting {
  id: string;
  date: string;
  time: string;
  description: string;
  location: string;
  createdAt: number;
}

export interface Report {
  id: string;
  listingId: string;
  reason: string;
  createdAt: number;
}

export interface DogListing {
  id: string;
  name?: string;
  status: DogStatus;
  images: string[];
  breed: string;
  color: string;
  size: DogSize;
  gender: DogGender;
  age?: string;
  date: string;
  time?: string;
  location: {
    state: string;
    city: string;
    neighborhood: string;
    reference?: string;
    lat: number;
    lng: number;
  };
  description: string;
  behavior?: string;
  collar?: string;
  isDocile?: boolean;
  contact: {
    name: string;
    phone: string;
    email?: string;
    showPhonePublicly: boolean;
  };
  sightings: Sighting[];
  createdAt: number;
}

export interface SearchFilters {
  city: string;
  neighborhood: string;
  breed: string;
  size: string;
  color: string;
  status: string;
  query: string;
}
