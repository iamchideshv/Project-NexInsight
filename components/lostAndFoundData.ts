import { LostAndFoundItem } from '../types';

export let lostAndFoundData: LostAndFoundItem[] = [
  {
    id: 1,
    name: 'iPhone 13',
    type: 'Lost',
    description: 'Black iPhone 13 in a clear case. Last seen near the library.',
    date: '2024-07-22',
    location: 'Central Library',
    status: 'Unclaimed',
    image: 'https://placehold.co/600x400/000000/FFFFFF/png?text=iPhone'
  },
  {
    id: 2,
    name: 'Blue Water Bottle',
    type: 'Found',
    description: 'A blue Hydro Flask water bottle, found in the basketball court.',
    date: '2024-07-21',
    location: 'Basketball Court',
    status: 'Unclaimed',
    image: 'https://placehold.co/600x400/0000FF/FFFFFF/png?text=Bottle'
  },
  {
    id: 3,
    name: 'Keys on a Lanyard',
    type: 'Found',
    description: 'A set of keys on a red university lanyard. Found in Hall-B.',
    date: '2024-07-20',
    location: 'Hall-B',
    status: 'Claimed',
    image: 'https://placehold.co/600x400/FF0000/FFFFFF/png?text=Keys',
    claimedByEmail: 'test@example.com'
  },
  {
    id: 4,
    name: 'Notebook',
    type: 'Lost',
    description: 'A black Moleskine notebook with important class notes for AI & DS.',
    date: '2024-07-19',
    location: 'AI & DS Department',
    status: 'Unclaimed',
    image: 'https://placehold.co/600x400/333333/FFFFFF/png?text=Notebook'
  },
];