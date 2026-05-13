import Hero from '@/components/home/Hero';
import BrandMessage from '@/components/home/BrandMessage';
import PopularCities from '@/components/home/PopularCities';
import LifestyleCollection from '@/components/home/LifestyleCollection';
import FeaturedListings from '@/components/home/FeaturedListings';
import EditorialContent from '@/components/home/EditorialContent';
import CollectionsPreview from '@/components/home/CollectionsPreview';
import PropertyOfTheWeek from '@/components/home/PropertyOfTheWeek';
import SocialProof from '@/components/home/SocialProof';
import PressLogos from '@/components/home/PressLogos';
import Testimonials from '@/components/home/Testimonials';
import FeaturedAgents from '@/components/home/FeaturedAgents';
import AgentRankingsPreview from '@/components/home/AgentRankingsPreview';
import dynamic from 'next/dynamic';
import SectionBoundary from '@/components/layout/SectionBoundary';
const WealthReferralSection = dynamic(() => import('@/components/WealthReferralSection'), { ssr: false });

export default function HomePage() {
  return (
    <>
      <SectionBoundary sectionName="Hero">
        <Hero />
      </SectionBoundary>
      <SectionBoundary sectionName="Brand message">
        <BrandMessage />
      </SectionBoundary>
      <SectionBoundary sectionName="Agent rankings">
        <AgentRankingsPreview />
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
      <SectionBoundary sectionName="Wealth referral">
        <WealthReferralSection />
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
