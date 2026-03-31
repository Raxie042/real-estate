import { PrismaClient, ListingStatus, ListingType, PropertyType, PropertySubType, Currency, OfferStatus } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');


  // Create sample users
  const passwordHash = await bcrypt.hash('password123', 10);

  const agent = await prisma.user.upsert({
    where: { email: 'demo@realestate.com' },
    update: {},
    create: {
      email: 'demo@realestate.com',
      passwordHash,
      firstName: 'Demo',
      lastName: 'User',
      role: 'AGENT',
      phone: '+1-555-0100',
      emailVerified: true,
    },
  });

  const admin = await prisma.user.upsert({
    where: { email: 'admin@realestate.com' },
    update: {},
    create: {
      email: 'admin@realestate.com',
      passwordHash,
      firstName: 'Admin',
      lastName: 'User',
      role: 'PLATFORM_ADMIN',
      phone: '+1-555-0101',
      emailVerified: true,
    },
  });
  // Create sample agency
  const agency = await prisma.agency.upsert({
    where: { id: '00000000-0000-0000-0000-000000000001' },
    update: {},
    create: {
      id: '00000000-0000-0000-0000-000000000001',
      name: 'Premium Realty Group',
      email: 'contact@premiumrealty.com',
      phone: '+1-555-0200',
      description: 'Leading real estate agency with over 20 years of experience',
      website: 'https://premiumrealty.com',
      country: 'USA',
      verified: true,
    },
  });

  console.log('✅ Created agency:', agency.name);

  const londonLuxuryImagePool = [
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1800&q=85',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=85',
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1800&q=85',
    'https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1800&q=85',
    'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1800&q=85',
    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1800&q=85',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1800&q=85',
    'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1800&q=85',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=85',
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1800&q=85',
    'https://images.unsplash.com/photo-1560184897-ae75f418493e?auto=format&fit=crop&w=1800&q=85',
    'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1800&q=85',
    'https://images.unsplash.com/photo-1600585152915-d208bec867a1?auto=format&fit=crop&w=1800&q=85',
    'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1800&q=85',
    'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1800&q=85',
    'https://images.unsplash.com/photo-1600047509782-20d39509f26d?auto=format&fit=crop&w=1800&q=85',
  ];

  const gallery = (start: number) => [
    londonLuxuryImagePool[start % londonLuxuryImagePool.length],
    londonLuxuryImagePool[(start + 1) % londonLuxuryImagePool.length],
    londonLuxuryImagePool[(start + 2) % londonLuxuryImagePool.length],
  ];

  // Create 15 high-quality Prime Central London demo listings
  const listings = [
    {
      title: 'Eaton Square Mansion',
      slug: 'eaton-square-mansion',
      description: 'A grand stucco-fronted mansion on one of Belgravia’s most prestigious squares, featuring a ballroom, private garden, and luxury spa.',
      price: 24500000,
      currency: Currency.GBP,
      listingType: ListingType.SALE,
      propertyType: PropertyType.RESIDENTIAL,
      propertySubType: PropertySubType.HOUSE,
      status: ListingStatus.ACTIVE,
      bedrooms: 7,
      bathrooms: 8,
      sqft: 12000,
      addressLine1: 'Eaton Square',
      city: 'London',
      state: '',
      postalCode: 'SW1W 9DF',
      country: 'UK',
      countryCode: 'GB',
      latitude: 51.4956,
      longitude: -0.1517,
      images: gallery(0),
      userId: agent.id,
      agencyId: agency.id,
    },
    {
      title: 'One Hyde Park Penthouse',
      slug: 'one-hyde-park-penthouse',
      description: 'A world-class penthouse in the iconic One Hyde Park, with panoramic views, private pool, and 24/7 concierge.',
      price: 18500000,
      currency: Currency.GBP,
      listingType: ListingType.SALE,
      propertyType: PropertyType.RESIDENTIAL,
      propertySubType: PropertySubType.PENTHOUSE,
      status: ListingStatus.ACTIVE,
      bedrooms: 5,
      bathrooms: 6,
      sqft: 8000,
      addressLine1: 'One Hyde Park',
      city: 'London',
      state: '',
      postalCode: 'SW1X 7LJ',
      country: 'UK',
      countryCode: 'GB',
      latitude: 51.5025,
      longitude: -0.1597,
      images: gallery(1),
      userId: agent.id,
      agencyId: agency.id,
    },
    {
      title: 'Mayfair Park View Residence',
      slug: 'mayfair-park-view-residence',
      description: 'Elegant lateral apartment overlooking Hyde Park, with bespoke interiors and private terrace.',
      price: 12750000,
      currency: Currency.GBP,
      listingType: ListingType.SALE,
      propertyType: PropertyType.RESIDENTIAL,
      propertySubType: PropertySubType.APARTMENT,
      status: ListingStatus.ACTIVE,
      bedrooms: 4,
      bathrooms: 5,
      sqft: 4200,
      addressLine1: 'Park Lane',
      city: 'London',
      state: '',
      postalCode: 'W1K 7AF',
      country: 'UK',
      countryCode: 'GB',
      latitude: 51.5070,
      longitude: -0.1507,
      images: gallery(2),
      userId: agent.id,
      agencyId: agency.id,
    },
    {
      title: 'Knightsbridge Garden Villa',
      slug: 'knightsbridge-garden-villa',
      description: 'A rare detached villa with private gardens, wine cellar, and home cinema, moments from Harrods.',
      price: 16200000,
      currency: Currency.GBP,
      listingType: ListingType.SALE,
      propertyType: PropertyType.RESIDENTIAL,
      propertySubType: PropertySubType.VILLA,
      status: ListingStatus.ACTIVE,
      bedrooms: 6,
      bathrooms: 7,
      sqft: 9500,
      addressLine1: 'Montpelier Walk',
      city: 'London',
      state: '',
      postalCode: 'SW7 1JH',
      country: 'UK',
      countryCode: 'GB',
      latitude: 51.4975,
      longitude: -0.1657,
      images: gallery(3),
      userId: agent.id,
      agencyId: agency.id,
    },
    {
      title: 'Chelsea Riverside Apartment',
      slug: 'chelsea-riverside-apartment',
      description: 'Contemporary riverside apartment with floor-to-ceiling windows, private balcony, and Thames views.',
      price: 4950000,
      currency: Currency.GBP,
      listingType: ListingType.SALE,
      propertyType: PropertyType.RESIDENTIAL,
      propertySubType: PropertySubType.APARTMENT,
      status: ListingStatus.ACTIVE,
      bedrooms: 3,
      bathrooms: 3,
      sqft: 2100,
      addressLine1: 'Chelsea Embankment',
      city: 'London',
      state: '',
      postalCode: 'SW3 4LW',
      country: 'UK',
      countryCode: 'GB',
      latitude: 51.4851,
      longitude: -0.1682,
      images: gallery(4),
      userId: agent.id,
      agencyId: agency.id,
    },
    {
      title: 'Belgravia Townhouse',
      slug: 'belgravia-townhouse',
      description: 'Classic white-stucco townhouse with six floors, lift, and private mews garage.',
      price: 11200000,
      currency: Currency.GBP,
      listingType: ListingType.SALE,
      propertyType: PropertyType.RESIDENTIAL,
      propertySubType: PropertySubType.TOWNHOUSE,
      status: ListingStatus.ACTIVE,
      bedrooms: 5,
      bathrooms: 6,
      sqft: 5200,
      addressLine1: 'Chester Square',
      city: 'London',
      state: '',
      postalCode: 'SW1W 9HH',
      country: 'UK',
      countryCode: 'GB',
      latitude: 51.4942,
      longitude: -0.1501,
      images: gallery(5),
      userId: agent.id,
      agencyId: agency.id,
    },
    {
      title: 'St. John’s Wood Villa',
      slug: 'st-johns-wood-villa',
      description: 'Detached villa with landscaped gardens, gym, and indoor pool, close to Regent’s Park.',
      price: 9800000,
      currency: Currency.GBP,
      listingType: ListingType.SALE,
      propertyType: PropertyType.RESIDENTIAL,
      propertySubType: PropertySubType.VILLA,
      status: ListingStatus.ACTIVE,
      bedrooms: 6,
      bathrooms: 7,
      sqft: 8000,
      addressLine1: 'Avenue Road',
      city: 'London',
      state: '',
      postalCode: 'NW8 6HP',
      country: 'UK',
      countryCode: 'GB',
      latitude: 51.5341,
      longitude: -0.1707,
      images: gallery(6),
      userId: agent.id,
      agencyId: agency.id,
    },
    {
      title: 'Kensington Palace Gardens Residence',
      slug: 'kensington-palace-gardens-residence',
      description: 'A rare opportunity to own on London’s most exclusive street. Impeccable security, embassy neighbors, and palatial proportions.',
      price: 32000000,
      currency: Currency.GBP,
      listingType: ListingType.SALE,
      propertyType: PropertyType.RESIDENTIAL,
      propertySubType: PropertySubType.HOUSE,
      status: ListingStatus.ACTIVE,
      bedrooms: 8,
      bathrooms: 10,
      sqft: 18000,
      addressLine1: 'Kensington Palace Gardens',
      city: 'London',
      state: '',
      postalCode: 'W8 4QP',
      country: 'UK',
      countryCode: 'GB',
      latitude: 51.5058,
      longitude: -0.1885,
      images: gallery(7),
      userId: agent.id,
      agencyId: agency.id,
    },
    {
      title: 'Marylebone Penthouse',
      slug: 'marylebone-penthouse',
      description: 'A full-floor penthouse with wraparound terrace, skyline views, and direct lift access.',
      price: 8250000,
      currency: Currency.GBP,
      listingType: ListingType.SALE,
      propertyType: PropertyType.RESIDENTIAL,
      propertySubType: PropertySubType.PENTHOUSE,
      status: ListingStatus.ACTIVE,
      bedrooms: 4,
      bathrooms: 5,
      sqft: 3500,
      addressLine1: 'Wimpole Street',
      city: 'London',
      state: '',
      postalCode: 'W1G 9RT',
      country: 'UK',
      countryCode: 'GB',
      latitude: 51.5185,
      longitude: -0.1497,
      images: gallery(8),
      userId: agent.id,
      agencyId: agency.id,
    },
    {
      title: 'Soho Designer Loft',
      slug: 'soho-designer-loft',
      description: 'Industrial-chic loft with exposed brick, steel beams, and bespoke kitchen in the heart of Soho.',
      price: 3950000,
      currency: Currency.GBP,
      listingType: ListingType.SALE,
      propertyType: PropertyType.RESIDENTIAL,
      propertySubType: PropertySubType.APARTMENT,
      status: ListingStatus.ACTIVE,
      bedrooms: 2,
      bathrooms: 2,
      sqft: 1800,
      addressLine1: 'Dean Street',
      city: 'London',
      state: '',
      postalCode: 'W1D 3RS',
      country: 'UK',
      countryCode: 'GB',
      latitude: 51.5136,
      longitude: -0.1316,
      images: gallery(9),
      userId: agent.id,
      agencyId: agency.id,
    },
    {
      title: 'Regent’s Park Mansion',
      slug: 'regents-park-mansion',
      description: 'A stately mansion with private park access, indoor pool, and art gallery.',
      price: 21000000,
      currency: Currency.GBP,
      listingType: ListingType.SALE,
      propertyType: PropertyType.RESIDENTIAL,
      propertySubType: PropertySubType.HOUSE,
      status: ListingStatus.ACTIVE,
      bedrooms: 9,
      bathrooms: 11,
      sqft: 22000,
      addressLine1: 'Outer Circle',
      city: 'London',
      state: '',
      postalCode: 'NW1 4LL',
      country: 'UK',
      countryCode: 'GB',
      latitude: 51.5313,
      longitude: -0.1536,
      images: gallery(10),
      userId: agent.id,
      agencyId: agency.id,
    },
    {
      title: 'Chelsea Mews House',
      slug: 'chelsea-mews-house',
      description: 'Charming mews house with cobbled courtyard, modern interiors, and private garage.',
      price: 3250000,
      currency: Currency.GBP,
      listingType: ListingType.SALE,
      propertyType: PropertyType.RESIDENTIAL,
      propertySubType: PropertySubType.HOUSE,
      status: ListingStatus.ACTIVE,
      bedrooms: 3,
      bathrooms: 3,
      sqft: 1800,
      addressLine1: 'Draycott Mews',
      city: 'London',
      state: '',
      postalCode: 'SW3 2EA',
      country: 'UK',
      countryCode: 'GB',
      latitude: 51.4911,
      longitude: -0.1647,
      images: gallery(11),
      userId: agent.id,
      agencyId: agency.id,
    },
    {
      title: 'Fitzrovia Modern Apartment',
      slug: 'fitzrovia-modern-apartment',
      description: 'Sleek modern apartment with open-plan living, smart home tech, and city views.',
      price: 2850000,
      currency: Currency.GBP,
      listingType: ListingType.SALE,
      propertyType: PropertyType.RESIDENTIAL,
      propertySubType: PropertySubType.APARTMENT,
      status: ListingStatus.ACTIVE,
      bedrooms: 2,
      bathrooms: 2,
      sqft: 1400,
      addressLine1: 'Charlotte Street',
      city: 'London',
      state: '',
      postalCode: 'W1T 1RS',
      country: 'UK',
      countryCode: 'GB',
      latitude: 51.5202,
      longitude: -0.1356,
      images: gallery(12),
      userId: agent.id,
      agencyId: agency.id,
    },
    {
      title: 'Westminster Riverfront Apartment',
      slug: 'westminster-riverfront-apartment',
      description: 'Luxury apartment with direct river views, 24/7 security, and private parking.',
      price: 5650000,
      currency: Currency.GBP,
      listingType: ListingType.SALE,
      propertyType: PropertyType.RESIDENTIAL,
      propertySubType: PropertySubType.APARTMENT,
      status: ListingStatus.ACTIVE,
      bedrooms: 3,
      bathrooms: 4,
      sqft: 2300,
      addressLine1: 'Millbank',
      city: 'London',
      state: '',
      postalCode: 'SW1P 4QP',
      country: 'UK',
      countryCode: 'GB',
      latitude: 51.4917,
      longitude: -0.1275,
      images: gallery(13),
      userId: agent.id,
      agencyId: agency.id,
    },
    {
      title: 'Sloane Square Apartment',
      slug: 'sloane-square-apartment',
      description: 'Bright and airy apartment with designer finishes, steps from Sloane Square boutiques.',
      price: 3750000,
      currency: Currency.GBP,
      listingType: ListingType.SALE,
      propertyType: PropertyType.RESIDENTIAL,
      propertySubType: PropertySubType.APARTMENT,
      status: ListingStatus.ACTIVE,
      bedrooms: 2,
      bathrooms: 2,
      sqft: 1200,
      addressLine1: 'Sloane Square',
      city: 'London',
      state: '',
      postalCode: 'SW1W 8EG',
      country: 'UK',
      countryCode: 'GB',
      latitude: 51.4921,
      longitude: -0.1569,
      images: gallery(14),
      userId: agent.id,
      agencyId: agency.id,
    },
    {
      title: 'Bayswater Garden Flat',
      slug: 'bayswater-garden-flat',
      description: 'Garden-level flat with private patio, high ceilings, and period features.',
      price: 2150000,
      currency: Currency.GBP,
      listingType: ListingType.SALE,
      propertyType: PropertyType.RESIDENTIAL,
      propertySubType: PropertySubType.APARTMENT,
      status: ListingStatus.ACTIVE,
      bedrooms: 2,
      bathrooms: 2,
      sqft: 1100,
      addressLine1: 'Queensway',
      city: 'London',
      state: '',
      postalCode: 'W2 4QN',
      country: 'UK',
      countryCode: 'GB',
      latitude: 51.5116,
      longitude: -0.1870,
      images: gallery(15),
      userId: agent.id,
      agencyId: agency.id,
    },
  ];

  for (const listing of listings) {
    const { slug, ...updateData } = listing;
    const created = await prisma.listing.upsert({
      where: { slug },
      update: updateData,
      create: listing,
    });
    console.log('✅ Created listing:', created.title);
  }

  // Create additional users
  const buyer1 = await prisma.user.upsert({
    where: { email: 'buyer1@example.com' },
    update: {},
    create: {
      email: 'buyer1@example.com',
      passwordHash,
      firstName: 'Sarah',
      lastName: 'Johnson',
      role: 'BUYER',
      phone: '+1-555-0301',
      emailVerified: true,
    },
  });

  const buyer2 = await prisma.user.upsert({
    where: { email: 'buyer2@example.com' },
    update: {},
    create: {
      email: 'buyer2@example.com',
      passwordHash,
      firstName: 'Michael',
      lastName: 'Chen',
      role: 'BUYER',
      phone: '+1-555-0302',
      emailVerified: true,
    },
  });

  console.log('✅ Created additional users');

  // Get created listings
  const allListings = await prisma.listing.findMany();
  
  // Create Open Houses
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const nextWeek = new Date(now);
  nextWeek.setDate(nextWeek.getDate() + 7);

  const openHouses = [
    {
      listingId: allListings[0].id, // Modern Downtown Loft
      startTime: new Date(tomorrow.setHours(14, 0, 0, 0)),
      endTime: new Date(tomorrow.setHours(16, 0, 0, 0)),
      description: 'Open house this Saturday! Come see this amazing loft.',
      maxAttendees: 20,
    },
    {
      listingId: allListings[1].id, // Suburban Family Home
      startTime: new Date(nextWeek.setHours(10, 0, 0, 0)),
      endTime: new Date(nextWeek.setHours(12, 0, 0, 0)),
      description: 'Family-friendly open house with refreshments provided.',
      maxAttendees: 15,
    },
    {
      listingId: allListings[2].id, // Luxury Beachfront Condo
      startTime: new Date(nextWeek.setHours(15, 0, 0, 0)),
      endTime: new Date(nextWeek.setHours(17, 0, 0, 0)),
      description: 'Exclusive showing of this stunning beachfront property.',
      maxAttendees: 10,
    },
  ];

  for (const oh of openHouses) {
    const created = await prisma.openHouse.create({
      data: oh,
    });
    console.log('✅ Created open house for listing');

    // Add RSVPs
    await prisma.openHouseRSVP.create({
      data: {
        openHouseId: created.id,
        userId: buyer1.id,
        name: `${buyer1.firstName} ${buyer1.lastName}`,
        email: buyer1.email,
        phone: buyer1.phone,
        guests: 2,
        status: 'CONFIRMED',
      },
    });
  }

  console.log('✅ Created open houses with RSVPs');

  // Create Offers
  const offers = [
    {
      listingId: allListings[0].id, // Modern Downtown Loft - $850,000
      buyerId: buyer1.id,
      amount: 825000,
      currency: Currency.USD,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      conditions: { financing: true, inspection: true },
      status: OfferStatus.PENDING,
    },
    {
      listingId: allListings[1].id, // Suburban Family Home - $675,000
      buyerId: buyer2.id,
      amount: 680000,
      currency: Currency.USD,
      expiresAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days
      conditions: { financing: false, inspection: true },
      status: OfferStatus.PENDING,
    },
    {
      listingId: allListings[2].id, // Luxury Beachfront Condo - $1,250,000
      buyerId: buyer1.id,
      amount: 1200000,
      currency: Currency.USD,
      expiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
      conditions: { financing: false, inspection: false },
      status: OfferStatus.PENDING,
    },
  ];

  for (const offer of offers) {
    await prisma.offer.create({
      data: offer,
    });
  }

  console.log('✅ Created sample offers');

  // Create Chat Rooms and Messages
  const chatRoom1 = await prisma.chatRoom.create({
    data: {
      listingId: allListings[0].id,
      participants: [agent.id, buyer1.id],
    },
  });

  await prisma.chatMessage.create({
    data: {
      roomId: chatRoom1.id,
      senderId: buyer1.id,
      content: 'Hi, I\'m interested in viewing this property. Is it still available?',
    },
  });

  await prisma.chatMessage.create({
    data: {
      roomId: chatRoom1.id,
      senderId: agent.id,
      content: 'Yes, it\'s still available! Would you like to schedule a showing?',
    },
  });

  console.log('✅ Created chat rooms and messages');

  // Create sample Documents
  await prisma.document.create({
    data: {
      listingId: allListings[0].id,
      userId: agent.id,
      title: 'Property Disclosure Statement',
      type: 'DISCLOSURE',
      fileUrl: 'https://example.com/documents/disclosure.pdf',
      fileName: 'disclosure-statement.pdf',
      fileSize: 245000,
      mimeType: 'application/pdf',
      isPublic: true,
    },
  });

  await prisma.document.create({
    data: {
      listingId: allListings[1].id,
      userId: agent.id,
      title: 'Home Inspection Report',
      type: 'INSPECTION',
      fileUrl: 'https://example.com/documents/inspection.pdf',
      fileName: 'home-inspection-report.pdf',
      fileSize: 1250000,
      mimeType: 'application/pdf',
      isPublic: false,
    },
  });

  console.log('✅ Created sample documents');

  // Update listing view counts for analytics
  await prisma.listing.update({
    where: { id: allListings[0].id },
    data: { viewCount: 156 },
  });

  await prisma.listing.update({
    where: { id: allListings[1].id },
    data: { viewCount: 203 },
  });

  await prisma.listing.update({
    where: { id: allListings[2].id },
    data: { viewCount: 89 },
  });

  console.log('✅ Updated view counts');

  console.log('🎉 Enhanced seeding completed!');
  console.log('\n📊 Summary:');
  console.log(`- ${allListings.length} listings`);
  console.log(`- 3 users (1 agent, 2 buyers)`);
  console.log(`- 3 open houses with RSVPs`);
  console.log(`- 3 pending offers`);
  console.log(`- 1 chat conversation`);
  console.log(`- 2 documents`);
  console.log('\n🔐 Login credentials:');
  console.log('Agent: demo@realestate.com / password123');
  console.log('Buyer 1: buyer1@example.com / password123');
  console.log('Buyer 2: buyer2@example.com / password123');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
