import Hero from '@/components/home/Hero';
import BrandMessage from '@/components/home/BrandMessage';
import FeaturedListings from '@/components/home/FeaturedListings';
import PropertyOfTheWeek from '@/components/home/PropertyOfTheWeek';
import SocialProof from '@/components/home/SocialProof';
import SectionBoundary from '@/components/layout/SectionBoundary';
import dynamic from 'next/dynamic';

const FeaturedAgents = dynamic(() => import('@/components/home/FeaturedAgents'));
const PressLogos = dynamic(() => import('@/components/home/PressLogos'));
const PopularCities = dynamic(() => import('@/components/home/PopularCities'));
const CollectionsPreview = dynamic(() => import('@/components/home/CollectionsPreview'));
const LifestyleCollection = dynamic(() => import('@/components/home/LifestyleCollection'));
const EditorialContent = dynamic(() => import('@/components/home/EditorialContent'));
const Testimonials = dynamic(() => import('@/components/home/Testimonials'));

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
      <SectionBoundary sectionName="Property of the week">
        <PropertyOfTheWeek />
      </SectionBoundary>
      <SectionBoundary sectionName="Social proof">
        <SocialProof />
      </SectionBoundary>
      <SectionBoundary sectionName="Featured agents">
        <FeaturedAgents />
      </SectionBoundary>
      <SectionBoundary sectionName="Press logos">
        <PressLogos />
      </SectionBoundary>
      <SectionBoundary sectionName="Popular cities">
        <PopularCities />
      </SectionBoundary>
      <SectionBoundary sectionName="Collections preview">
        <CollectionsPreview />
      </SectionBoundary>
      <SectionBoundary sectionName="Lifestyle collection">
        <LifestyleCollection />
      </SectionBoundary>
      <SectionBoundary sectionName="Editorial content">
        <EditorialContent />
      </SectionBoundary>
      <SectionBoundary sectionName="Testimonials">
        <Testimonials />
      </SectionBoundary>
    </>
  );
}
