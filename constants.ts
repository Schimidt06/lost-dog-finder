
import { DogListing, DogStatus, DogSize, DogGender } from './types';

export const MOCK_DOGS: DogListing[] = [
  {
    id: '1',
    name: 'Bolinha',
    status: DogStatus.LOST,
    images: ['https://picsum.photos/seed/dog1/800/600'],
    breed: 'Poodle',
    color: 'Branco',
    size: DogSize.SMALL,
    gender: DogGender.MALE,
    age: '2 anos',
    date: '2024-05-10',
    location: {
      state: 'SP',
      city: 'São Paulo',
      neighborhood: 'Vila Mariana',
      lat: -23.5895,
      lng: -46.6347
    },
    description: 'Sumiu próximo ao metrô Ana Rosa. É muito dócil mas está assustado.',
    contact: {
      name: 'Maria Silva',
      phone: '11999999999',
      showPhonePublicly: true
    },
    // Fix: Added missing sightings property
    sightings: [],
    createdAt: Date.now() - 86400000
  },
  {
    id: '2',
    name: 'Desconhecido',
    status: DogStatus.FOUND,
    images: ['https://picsum.photos/seed/dog2/800/600'],
    breed: 'SRD',
    color: 'Caramelo',
    size: DogSize.MEDIUM,
    gender: DogGender.FEMALE,
    date: '2024-05-12',
    location: {
      state: 'RJ',
      city: 'Rio de Janeiro',
      neighborhood: 'Copacabana',
      lat: -22.9714,
      lng: -43.1823
    },
    description: 'Encontrado vagando na orla. Estava com uma coleira azul sem identificação.',
    contact: {
      name: 'João Souza',
      phone: '21988888888',
      showPhonePublicly: true
    },
    // Fix: Added missing sightings property
    sightings: [],
    createdAt: Date.now() - 43200000
  }
];

export const STATES = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];