import Hero from '@/components/home/Hero';
import BrandMessage from '@/components/home/BrandMessage';
import PopularCities from '@/components/home/PopularCities';
import LifestyleCollection from '@/components/home/LifestyleCollection';
import FeaturedListings from '@/components/home/FeaturedListings';
import EditorialContent from '@/components/home/EditorialContent';
import SectionBoundary from '@/components/layout/SectionBoundary';

export default function HomePage() {
  return (
    <>
      <SectionBoundary sectionName="Hero">
        <Hero />
      </SectionBoundary>
      <SectionBoundary sectionName="Brand message">
        <BrandMessage />
      </SectionBoundary>
      <SectionBoundary sectionName="Featured listings">
        <FeaturedListings />
      </SectionBoundary>
      <SectionBoundary sectionName="Popular cities">
        <PopularCities />
      </SectionBoundary>
      <SectionBoundary sectionName="Lifestyle collection">
        <LifestyleCollection />
      </SectionBoundary>
      <SectionBoundary sectionName="Editorial content">
        <EditorialContent />
      </SectionBoundary>
    </>
  );
}
