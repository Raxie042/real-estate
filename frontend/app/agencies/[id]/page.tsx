'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import PropertyCard from '@/components/properties/PropertyCard';
import { Building2, Mail, Phone, Globe, MapPin, Star, StarHalf } from 'lucide-react';

export default function AgencyProfilePage() {
  const params = useParams();
  const id = params.id as string;

  const { data: agencyResponse, isLoading: loadingAgency } = useQuery({
    queryKey: ['agency', id],
    queryFn: () => api.agencies.getById(id),
  });

  const agency = agencyResponse?.data;

  const { data: listingsData, isLoading: loadingListings } = useQuery({
    queryKey: ['agency-listings', id],
    queryFn: () => api.listings.getAll({ agencyId: id, status: 'ACTIVE' }),
    enabled: !!id,
  });

  const { data: reviewsData, isLoading: loadingReviews } = useQuery({
    queryKey: ['agency-reviews', id],
    queryFn: () => api.agencies.getReviews(id),
    enabled: !!id,
  });

  if (loadingAgency) {
    return (
      <div className="min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lux-card h-64 animate-pulse mb-8" />
        </div>
      </div>
    );
  }

  if (!agency) {
    return (
      <div className="min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-semibold text-[#1C1A17] mb-4">Agency Not Found</h1>
            <Link href="/agencies" className="text-[#C9A96A] hover:text-[#B78F4A] font-semibold">
              ← Back to Agencies
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const listings = listingsData?.data || [];
  const reviews = reviewsData?.data?.reviews || [];
  const stats = reviewsData?.data?.stats || { average: 0, count: 0, distribution: {} };

  // Calculate rating display
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="w-5 h-5 fill-[#C9A96A] text-[#C9A96A]" />);
    }
    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className="w-5 h-5 fill-[#C9A96A] text-[#C9A96A]" />);
    }
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-5 h-5 text-[#E8E1D7]" />);
    }
    return stars;
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link href="/" className="text-[#C9A96A] hover:text-[#B78F4A]">
            Home
          </Link>
          <span className="mx-2 text-[#9A8B7A]">/</span>
          <Link href="/agencies" className="text-[#C9A96A] hover:text-[#B78F4A]">
            Agencies
          </Link>
          <span className="mx-2 text-[#9A8B7A]">/</span>
          <span className="text-[#2B2620] font-semibold">{agency.name}</span>
        </div>

        {/* Agency Header */}
        <div className="lux-card p-8 mb-8">
          <div className="flex items-start gap-6">
            {agency.logo ? (
              <Image
                src={agency.logo}
                alt={agency.name}
                width={96}
                height={96}
                unoptimized
                className="w-24 h-24 rounded-xl object-cover"
              />
            ) : (
              <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-[#C9A96A] to-[#B78F4A] flex items-center justify-center">
                <Building2 className="w-12 h-12 text-white" />
              </div>
            )}
            
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-semibold text-[#1C1A17] mb-2">{agency.name}</h1>
                  {agency.verified && (
                    <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                      ✓ Verified Agency
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex">{renderStars(stats.average)}</div>
                  <span className="text-lg font-semibold text-[#2B2620]">{stats.average.toFixed(1)}</span>
                  <span className="text-sm text-[#7A6E60]">({stats.count} reviews)</span>
                </div>
              </div>

              {agency.description && (
                <p className="text-[#5F5448] mb-4">{agency.description}</p>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {agency.email && (
                  <div className="flex items-center text-[#5F5448]">
                    <Mail className="w-5 h-5 mr-2 text-[#C9A96A] flex-shrink-0" />
                    <a href={`mailto:${agency.email}`} className="hover:text-[#C9A96A]">
                      {agency.email}
                    </a>
                  </div>
                )}
                {agency.phone && (
                  <div className="flex items-center text-[#5F5448]">
                    <Phone className="w-5 h-5 mr-2 text-[#C9A96A] flex-shrink-0" />
                    <a href={`tel:${agency.phone}`} className="hover:text-[#C9A96A]">
                      {agency.phone}
                    </a>
                  </div>
                )}
                {agency.website && (
                  <div className="flex items-center text-[#5F5448]">
                    <Globe className="w-5 h-5 mr-2 text-[#C9A96A] flex-shrink-0" />
                    <a href={agency.website} target="_blank" rel="noopener noreferrer" className="hover:text-[#C9A96A]">
                      Website
                    </a>
                  </div>
                )}
                {(agency.city || agency.state) && (
                  <div className="flex items-center text-[#5F5448]">
                    <MapPin className="w-5 h-5 mr-2 text-[#C9A96A] flex-shrink-0" />
                    <span>
                      {[agency.city, agency.state, agency.country].filter(Boolean).join(', ')}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Active Listings */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-[#1C1A17] mb-6">
            Active Listings ({listings.length})
          </h2>
          {loadingListings ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="lux-card h-96 animate-pulse" />
              ))}
            </div>
          ) : listings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {listings.map((listing: any) => (
                <PropertyCard key={listing.id} listing={listing} />
              ))}
            </div>
          ) : (
            <p className="text-[#7A6E60] text-center py-12">No active listings</p>
          )}
        </div>

        {/* Reviews */}
        <div>
          <h2 className="text-2xl font-semibold text-[#1C1A17] mb-6">
            Reviews ({stats.count})
          </h2>

          {/* Rating Distribution */}
          {stats.count > 0 && (
            <div className="lux-card p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="text-center mb-4">
                    <div className="text-5xl font-bold text-[#C9A96A] mb-2">{stats.average.toFixed(1)}</div>
                    <div className="flex justify-center mb-2">{renderStars(stats.average)}</div>
                    <div className="text-sm text-[#7A6E60]">Based on {stats.count} reviews</div>
                  </div>
                </div>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((rating) => {
                    const count = stats.distribution[rating] || 0;
                    const percentage = stats.count > 0 ? (count / stats.count) * 100 : 0;
                    return (
                      <div key={rating} className="flex items-center gap-3">
                        <span className="text-sm text-[#7A6E60] w-12">{rating} stars</span>
                        <div className="flex-1 bg-[#F8F6F3] rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-[#C9A96A] h-full transition-all"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="text-sm text-[#7A6E60] w-12 text-right">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Review List */}
          {loadingReviews ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="lux-card h-32 animate-pulse" />
              ))}
            </div>
          ) : reviews.length > 0 ? (
            <div className="space-y-4">
              {reviews.map((review: any) => (
                <div key={review.id} className="lux-card p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {review.author?.avatar ? (
                        <Image
                          src={review.author.avatar}
                          alt={review.author.firstName}
                          width={40}
                          height={40}
                          unoptimized
                          className="w-10 h-10 rounded-full"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-[#F8F6F3] flex items-center justify-center">
                          <span className="text-[#C9A96A] font-semibold">
                            {review.author?.firstName?.[0]}{review.author?.lastName?.[0]}
                          </span>
                        </div>
                      )}
                      <div>
                        <div className="font-semibold text-[#1C1A17]">
                          {review.author?.firstName} {review.author?.lastName}
                        </div>
                        <div className="text-sm text-[#7A6E60]">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex">{renderStars(review.rating)}</div>
                  </div>
                  {review.comment && (
                    <p className="text-[#5F5448]">{review.comment}</p>
                  )}
                  {review.isVerified && (
                    <div className="mt-3 text-sm text-green-600">
                      ✓ Verified review
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[#7A6E60] text-center py-12">No reviews yet</p>
          )}
        </div>
      </div>
    </div>
  );
}
