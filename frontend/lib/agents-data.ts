export interface StaticAgent {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  title: string;
  location: string;
  phone: string;
  email: string;
  rating: number;
  reviews: number;
  deals: number;
  years: number;
  specialties: string[];
  image: string;
  isCEO?: boolean;
  featured?: boolean;
  bio: string;
}

export const AGENTS: StaticAgent[] = [
  {
    id: '0',
    name: 'Felix Attah',
    firstName: 'Felix',
    lastName: 'Attah',
    title: 'Chief Executive Officer & Founder',
    location: 'Mayfair, London',
    phone: '+44 20 7123 4567',
    email: 'felix@raxiezenithestate.com',
    rating: 5.0,
    reviews: 112,
    deals: 180,
    years: 10,
    specialties: ['Prime PCL', 'UHNW Clients', 'International', 'Off-Market'],
    image: '/images/felix-attah.png',
    isCEO: true,
    featured: true,
    bio: 'Felix Attah is the founder and CEO of Raxie Zenith Estate, one of London\'s most respected luxury property consultancies. With over a decade at the forefront of Prime Central London\'s property market, Felix has personally overseen 180+ landmark transactions for UHNW clients, family offices, and institutional investors across 35 countries. His reputation is built on absolute discretion, unrivalled market intelligence, and a relentless pursuit of exceptional outcomes for every client.',
  },
  {
    id: '1',
    name: 'Alexandra Pemberton',
    firstName: 'Alexandra',
    lastName: 'Pemberton',
    title: 'Senior Luxury Specialist',
    location: 'London, UK',
    phone: '+44 20 7123 4567',
    email: 'a.pemberton@raxieprime.com',
    rating: 4.9,
    reviews: 64,
    deals: 52,
    years: 14,
    specialties: ['Mayfair', 'Knightsbridge', 'Off-Market', 'Residential'],
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&q=80',
    featured: true,
    bio: 'Alexandra brings 14 years of Prime Central London expertise and an exceptional network of discreet buyers and sellers. She has consistently delivered above-asking-price results and is particularly sought after for her access to pre-market inventory in Mayfair and Knightsbridge.',
  },
  {
    id: '2',
    name: 'James Hartwell',
    firstName: 'James',
    lastName: 'Hartwell',
    title: 'Country Estates Director',
    location: 'Cotswolds, UK',
    phone: '+44 20 7123 4568',
    email: 'j.hartwell@raxieprime.com',
    rating: 4.8,
    reviews: 41,
    deals: 38,
    years: 11,
    specialties: ['Country Houses', 'Equestrian', 'New Developments', 'Rural'],
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80',
    featured: true,
    bio: 'James leads our country estates division with 11 years of specialist knowledge spanning the Cotswolds, Home Counties, and beyond. His deep understanding of rural property — from listed farmhouses to working equestrian estates — makes him the go-to advisor for clients seeking the finest outside London.',
  },
  {
    id: '3',
    name: 'Sophia Carrington',
    firstName: 'Sophia',
    lastName: 'Carrington',
    title: 'Prime Central London',
    location: 'Chelsea, London',
    phone: '+44 20 7123 4569',
    email: 's.carrington@raxieprime.com',
    rating: 5.0,
    reviews: 27,
    deals: 29,
    years: 8,
    specialties: ['Chelsea', 'Belgravia', 'Luxury Penthouses', 'Investment'],
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
    featured: false,
    bio: 'Sophia specialises in Chelsea and Belgravia\'s most coveted addresses, with a particular focus on lateral conversions and trophy penthouses. Her 8-year track record in Prime Central London has earned her a loyal following among high-profile clients seeking both principal residences and investment-grade assets.',
  },
  {
    id: '4',
    name: 'Oliver Ashworth',
    firstName: 'Oliver',
    lastName: 'Ashworth',
    title: 'Investment & Commercial',
    location: 'City of London',
    phone: '+44 20 7123 4570',
    email: 'o.ashworth@raxieprime.com',
    rating: 4.7,
    reviews: 33,
    deals: 44,
    years: 16,
    specialties: ['Investment', 'Commercial', 'BTL Portfolio', 'Development'],
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80',
    featured: false,
    bio: 'Oliver is our investment and commercial specialist with 16 years advising private clients, family offices, and institutions on portfolio construction, BTL acquisitions, and commercial-to-residential conversions across London and the South East.',
  },
  {
    id: '5',
    name: 'Isabella Montague',
    firstName: 'Isabella',
    lastName: 'Montague',
    title: 'International Residential',
    location: 'Dubai & London',
    phone: '+971 50 123 4567',
    email: 'i.montague@raxieprime.com',
    rating: 4.9,
    reviews: 19,
    deals: 21,
    years: 7,
    specialties: ['Dubai', 'International', 'Relocation', 'Overseas Buyers'],
    image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&q=80',
    featured: false,
    bio: 'Isabella bridges the London and Dubai markets, guiding international buyers and relocating executives through cross-border acquisitions with seamless precision. Her bilingual approach and first-hand knowledge of both markets have made her indispensable for clients purchasing in multiple jurisdictions.',
  },
  {
    id: '6',
    name: 'Edward Blackwood',
    firstName: 'Edward',
    lastName: 'Blackwood',
    title: 'New Developments Lead',
    location: 'Manchester & London',
    phone: '+44 161 123 4567',
    email: 'e.blackwood@raxieprime.com',
    rating: 4.8,
    reviews: 22,
    deals: 34,
    years: 9,
    specialties: ['New Builds', 'Off-Plan', 'Buy-to-Let', 'Manchester'],
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    featured: false,
    bio: 'Edward leads new developments across London and Manchester, partnering with leading housebuilders and developers to offer clients privileged early access to the finest off-plan opportunities. His 9-year track record in the new-build sector delivers consistent capital appreciation for buy-to-let and investment buyers alike.',
  },
];
