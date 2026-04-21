'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronRight, Upload, X } from 'lucide-react';
import { useCreateListing } from '@/lib/hooks';
import { geocodeAddress } from '@/lib/geocoding';
import { getValidMapboxPublicToken } from '@/lib/mapbox';
import ProtectedRoute from '@/components/ProtectedRoute';
import ImageUpload from '@/components/ImageUpload';
import api from '@/lib/api';

export default function ListPropertyPage() {
  const router = useRouter();
  const createListingMutation = useCreateListing();
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [isGeocoding, setIsGeocoding] = useState(false);
  const [isGeneratingDescription, setIsGeneratingDescription] = useState(false);
  const [geocodeError, setGeocodeError] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    address: '',
    addressLine2: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'USA',
    countryCode: 'US',
    latitude: '',
    longitude: '',
    price: '',
    currency: 'USD',
    bedrooms: '',
    bathrooms: '',
    squareFeet: '',
    yearBuilt: '',
    lotSize: '',
    propertyType: 'RESIDENTIAL',
    propertySubType: 'HOUSE',
    listingType: 'SALE',
    amenities: [] as string[],
    amenityInput: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
    setGeocodeError('');
  };

  const buildGeocodeAddress = () => {
    return [
      formData.address,
      formData.addressLine2,
      formData.city,
      formData.state,
      formData.zipCode,
      formData.country,
    ]
      .filter(Boolean)
      .join(', ');
  };

  const handleGeocode = async () => {
    if (isGeocoding) return;

    const token = getValidMapboxPublicToken(process.env.NEXT_PUBLIC_MAPBOX_TOKEN);
    if (!token) {
      setGeocodeError('Mapbox public token is missing or invalid');
      return;
    }

    const address = buildGeocodeAddress();
    if (!address) {
      setGeocodeError('Enter address fields first');
      return;
    }

    setIsGeocoding(true);
    setGeocodeError('');

    try {
      const result = await geocodeAddress(address, token);
      if (!result) {
        setGeocodeError('No results found for this address');
        return;
      }

      setFormData(prev => ({
        ...prev,
        latitude: result.latitude.toString(),
        longitude: result.longitude.toString(),
      }));
    } catch (err) {
      setGeocodeError('Failed to fetch coordinates');
    } finally {
      setIsGeocoding(false);
    }
  };

  const handleAutoGeocode = () => {
    if (formData.latitude || formData.longitude) return;

    const hasRequiredFields =
      formData.address &&
      formData.city &&
      formData.state &&
      formData.zipCode &&
      formData.country;

    if (hasRequiredFields) {
      void handleGeocode();
    }
  };

  const handleAddAmenity = (value: string) => {
    if (value.trim()) {
      setFormData(prev => ({
        ...prev,
        amenities: [...prev.amenities, value.trim()],
      }));
    }
  };

  const handleRemoveAmenity = (index: number) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.filter((_, i) => i !== index),
    }));
  };

  const handleGenerateDescription = async () => {
    if (isGeneratingDescription) return;
    if (!formData.title.trim()) {
      setError('Enter a title before generating AI description');
      return;
    }

    setIsGeneratingDescription(true);
    setError('');
    try {
      const response = await api.ai.generateDescription({
        title: formData.title,
        bedrooms: Number(formData.bedrooms || 0),
        bathrooms: Number(formData.bathrooms || 0),
        squareFeet: Number(formData.squareFeet || 0),
        yearBuilt: Number(formData.yearBuilt || new Date().getFullYear()),
        features: formData.amenities,
        neighborhood: [formData.city, formData.state].filter(Boolean).join(', '),
      });

      if (response.data?.description) {
        setFormData((prev) => ({ ...prev, description: response.data.description }));
      }
    } catch (err) {
      setError('Failed to generate AI description');
    } finally {
      setIsGeneratingDescription(false);
    }
  };



  const validateStep = () => {
    if (step === 1) {
      if (!formData.title.trim()) {
        setError('Please enter a property title');
        return false;
      }
      if (!formData.description.trim()) {
        setError('Please enter a description');
        return false;
      }
    } else if (step === 2) {
      if (!formData.address.trim()) {
        setError('Please enter an address');
        return false;
      }
      if (!formData.city.trim()) {
        setError('Please enter a city');
        return false;
      }
      if (!formData.state.trim()) {
        setError('Please select a state');
        return false;
      }
      if (!formData.zipCode.trim()) {
        setError('Please enter a zip code');
        return false;
      }
      if (!formData.country.trim()) {
        setError('Please enter a country');
        return false;
      }
      if (!formData.countryCode.trim()) {
        setError('Please enter a country code');
        return false;
      }
      if (!formData.latitude.trim() || Number.isNaN(Number(formData.latitude))) {
        setError('Please enter a valid latitude');
        return false;
      }
      if (!formData.longitude.trim() || Number.isNaN(Number(formData.longitude))) {
        setError('Please enter a valid longitude');
        return false;
      }
    } else if (step === 3) {
      if (!formData.price.trim()) {
        setError('Please enter a price');
        return false;
      }
      if (!formData.bedrooms.trim()) {
        setError('Please enter number of bedrooms');
        return false;
      }
      if (!formData.bathrooms.trim()) {
        setError('Please enter number of bathrooms');
        return false;
      }
      if (!formData.squareFeet.trim()) {
        setError('Please enter square footage');
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep() && step < 4) {
      setError('');
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
      setError('');
    }
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;

    try {
      const listingData = {
        title: formData.title,
        description: formData.description,
        addressLine1: formData.address,
        addressLine2: formData.addressLine2 || undefined,
        city: formData.city,
        state: formData.state,
        postalCode: formData.zipCode,
        country: formData.country,
        countryCode: formData.countryCode,
        latitude: parseFloat(formData.latitude),
        longitude: parseFloat(formData.longitude),
        price: parseFloat(formData.price),
        currency: formData.currency,
        bedrooms: parseInt(formData.bedrooms),
        bathrooms: parseFloat(formData.bathrooms),
        sqft: parseInt(formData.squareFeet),
        yearBuilt: formData.yearBuilt ? parseInt(formData.yearBuilt) : undefined,
        lotSize: formData.lotSize ? parseFloat(formData.lotSize) : undefined,
        propertyType: formData.propertyType,
        propertySubType: formData.propertySubType,
        listingType: formData.listingType,
        images: images,
        features: formData.amenities,
      };

      await createListingMutation.mutateAsync(listingData);
      router.push('/my-listings');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create listing');
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen">
      {/* Breadcrumb */}
      <nav className="bg-white/70 backdrop-blur border-b border-[#E8E1D7]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-[#9A8B7A] hover:text-[#B78F4A]">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-[#1C1A17] font-medium">List Your Property</span>
          </div>
        </div>
      </nav>

      {/* Form Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="lux-card p-8 lux-form">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-[#1C1A17]">List Your Property</h2>
              <span className="text-sm text-[#9A8B7A]">Step {step} of 4</span>
            </div>
            <div className="w-full bg-[#EFE8DD] rounded-full h-2">
              <div
                className="bg-[#C9A96A] h-2 rounded-full transition-all duration-300"
                style={{ width: `${(step / 4) * 100}%` }}
              ></div>
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 text-sm font-medium">{error}</p>
            </div>
          )}

          {/* Step 1: Basic Information */}
          {step === 1 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-[#1C1A17]">Basic Information</h3>
              <div>
                <label className="block text-sm font-medium text-[#5F5448] mb-1">
                  Property Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="lux-input"
                  placeholder="e.g., Beautiful Modern Loft in Downtown"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#5F5448] mb-1">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="lux-input"
                  placeholder="Describe your property in detail..."
                />
                <div className="mt-3">
                  <button
                    type="button"
                    onClick={handleGenerateDescription}
                    disabled={isGeneratingDescription}
                    className="lux-button-outline disabled:opacity-50"
                  >
                    {isGeneratingDescription ? 'Generating...' : 'Generate with AI'}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#5F5448] mb-1">
                  Listing Type *
                </label>
                <select
                  name="listingType"
                  value={formData.listingType}
                  onChange={handleInputChange}
                  className="lux-input"
                >
                  <option value="SALE">For Sale</option>
                  <option value="RENT">For Rent</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#5F5448] mb-1">
                  Property Type *
                </label>
                <select
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleInputChange}
                  className="lux-input"
                >
                  <option value="RESIDENTIAL">Residential</option>
                  <option value="COMMERCIAL">Commercial</option>
                  <option value="LAND">Land</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#5F5448] mb-1">
                  Property Sub-Type *
                </label>
                <select
                  name="propertySubType"
                  value={formData.propertySubType}
                  onChange={handleInputChange}
                  className="lux-input"
                >
                  <option value="HOUSE">House</option>
                  <option value="APARTMENT">Apartment</option>
                  <option value="CONDO">Condo</option>
                  <option value="TOWNHOUSE">Townhouse</option>
                  <option value="VILLA">Villa</option>
                  <option value="STUDIO">Studio</option>
                  <option value="DUPLEX">Duplex</option>
                  <option value="PENTHOUSE">Penthouse</option>
                  <option value="OFFICE">Office</option>
                  <option value="RETAIL">Retail</option>
                  <option value="WAREHOUSE">Warehouse</option>
                  <option value="RESTAURANT">Restaurant</option>
                  <option value="HOTEL">Hotel</option>
                  <option value="RESIDENTIAL_LAND">Residential Land</option>
                  <option value="COMMERCIAL_LAND">Commercial Land</option>
                  <option value="AGRICULTURAL_LAND">Agricultural Land</option>
                  <option value="INDUSTRIAL_LAND">Industrial Land</option>
                </select>
              </div>
            </div>
          )}

          {/* Step 2: Location */}
          {step === 2 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-[#1C1A17]">Location</h3>
              <div>
                <label className="block text-sm font-medium text-[#5F5448] mb-1">
                  Street Address *
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="lux-input"
                  placeholder="123 Main Street"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#5F5448] mb-1">
                  Address Line 2
                </label>
                <input
                  type="text"
                  name="addressLine2"
                  value={formData.addressLine2}
                  onChange={handleInputChange}
                  className="lux-input"
                  placeholder="Apt, Suite, Unit"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#5F5448] mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="lux-input"
                    placeholder="New York"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#5F5448] mb-1">
                    State *
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="lux-input"
                    placeholder="NY"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#5F5448] mb-1">
                  Zip Code *
                </label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  onBlur={handleAutoGeocode}
                  className="lux-input"
                  placeholder="10001"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#5F5448] mb-1">
                    Country *
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    onBlur={handleAutoGeocode}
                    className="lux-input"
                    placeholder="USA"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#5F5448] mb-1">
                    Country Code *
                  </label>
                  <input
                    type="text"
                    name="countryCode"
                    value={formData.countryCode}
                    onChange={handleInputChange}
                    onBlur={handleAutoGeocode}
                    className="lux-input"
                    placeholder="US"
                  />
                </div>
              </div>
              {geocodeError && (
                <p className="text-sm text-red-600">{geocodeError}</p>
              )}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleGeocode}
                  disabled={isGeocoding}
                  className="lux-button-outline disabled:opacity-50"
                >
                  {isGeocoding ? 'Getting coordinates...' : 'Get coordinates'}
                </button>
                <p className="text-xs text-[#7A6E60]">Uses Mapbox based on the address fields.</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#5F5448] mb-1">
                    Latitude *
                  </label>
                  <input
                    type="number"
                    name="latitude"
                    value={formData.latitude}
                    onChange={handleInputChange}
                    className="lux-input"
                    placeholder="40.7128"
                    step="0.000001"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#5F5448] mb-1">
                    Longitude *
                  </label>
                  <input
                    type="number"
                    name="longitude"
                    value={formData.longitude}
                    onChange={handleInputChange}
                    className="lux-input"
                    placeholder="-74.0060"
                    step="0.000001"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Details */}
          {step === 3 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-[#1C1A17]">Property Details</h3>
              <div>
                <label className="block text-sm font-medium text-[#5F5448] mb-1">
                  Price ($) *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="lux-input"
                  placeholder="500000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#5F5448] mb-1">
                  Currency
                </label>
                <select
                  name="currency"
                  value={formData.currency}
                  onChange={handleInputChange}
                  className="lux-input"
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                  <option value="AUD">AUD</option>
                  <option value="CAD">CAD</option>
                </select>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#5F5448] mb-1">
                    Bedrooms *
                  </label>
                  <input
                    type="number"
                    name="bedrooms"
                    value={formData.bedrooms}
                    onChange={handleInputChange}
                    className="lux-input"
                    placeholder="3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#5F5448] mb-1">
                    Bathrooms *
                  </label>
                  <input
                    type="number"
                    name="bathrooms"
                    value={formData.bathrooms}
                    onChange={handleInputChange}
                    className="lux-input"
                    placeholder="2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#5F5448] mb-1">
                    Square Feet *
                  </label>
                  <input
                    type="number"
                    name="squareFeet"
                    value={formData.squareFeet}
                    onChange={handleInputChange}
                    className="lux-input"
                    placeholder="2500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#5F5448] mb-1">
                    Year Built
                  </label>
                  <input
                    type="number"
                    name="yearBuilt"
                    value={formData.yearBuilt}
                    onChange={handleInputChange}
                    className="lux-input"
                    placeholder="2020"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#5F5448] mb-1">
                    Lot Size (sqft)
                  </label>
                  <input
                    type="number"
                    name="lotSize"
                    value={formData.lotSize}
                    onChange={handleInputChange}
                    className="lux-input"
                    placeholder="5000"
                  />
                </div>
              </div>
            </div>
          )}
          {/* Step 4: Photos & Amenities */}
          {step === 4 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-[#1C1A17]">Photos & Amenities</h3>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-[#5F5448] mb-3">
                  Property Photos (Max 10 images)
                </label>
                <ImageUpload images={images} onChange={setImages} maxImages={10} />
              </div>

              {/* Amenities */}
              <div>
                <label className="block text-sm font-medium text-[#5F5448] mb-3">
                  Amenities
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    id="amenity-input"
                    placeholder="e.g., Pool, Garage, Garden"
                    className="flex-1 lux-input"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        const input = document.getElementById('amenity-input') as HTMLInputElement;
                        handleAddAmenity(input.value);
                        input.value = '';
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const input = document.getElementById('amenity-input') as HTMLInputElement;
                      handleAddAmenity(input.value);
                      input.value = '';
                    }}
                    className="lux-button"
                  >
                    Add
                  </button>
                </div>

                {/* Amenities Tags */}
                {formData.amenities.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.amenities.map((amenity, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 bg-[#F6F2EC] text-[#5F5448] px-3 py-1 rounded-full border border-[#E8E1D7]"
                      >
                        <span className="text-sm">{amenity}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveAmenity(index)}
                          className="hover:text-[#C9A96A]"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="mt-8 flex justify-between">
            <button
              onClick={handlePrev}
              disabled={step === 1}
              className="px-6 py-2 border border-[#E8E1D7] rounded-full text-[#5F5448] hover:bg-white/70 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            {step < 4 ? (
              <button
                onClick={handleNext}
                className="lux-button"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="lux-button-dark"
              >
                Publish Listing
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
    </ProtectedRoute>
  );
}
