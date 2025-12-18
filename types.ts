
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
