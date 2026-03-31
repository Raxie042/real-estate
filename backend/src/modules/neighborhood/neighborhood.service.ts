import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class NeighborhoodService {
  async getNeighborhoodInsights(lat: number, lng: number) {
    const [walkScore, schools, demographics, transit] = await Promise.allSettled([
      this.getWalkScore(lat, lng),
      this.getNearbySchools(lat, lng),
      this.getDemographics(lat, lng),
      this.getTransitScore(lat, lng),
    ]);

    return {
      walkScore: walkScore.status === 'fulfilled' ? walkScore.value : null,
      schools: schools.status === 'fulfilled' ? schools.value : [],
      demographics: demographics.status === 'fulfilled' ? demographics.value : null,
      transit: transit.status === 'fulfilled' ? transit.value : null,
    };
  }

  private async getWalkScore(lat: number, lng: number) {
    // Walk Score API integration
    // Note: Requires API key from walkscore.com
    const apiKey = process.env.WALKSCORE_API_KEY;

    if (!apiKey) {
      return {
        walkScore: 75,
        transitScore: 65,
        bikeScore: 70,
        description: 'Very Walkable',
      };
    }

    try {
      const url = `https://api.walkscore.com/score?format=json&lat=${lat}&lon=${lng}&wsapikey=${apiKey}`;
      const response = await axios.get(url);

      return {
        walkScore: response.data.walkscore,
        transitScore: response.data.transit?.score || 0,
        bikeScore: response.data.bike?.score || 0,
        description: response.data.description,
      };
    } catch (error) {
      console.error('Walk Score API error:', error.message);
      return {
        walkScore: 75,
        transitScore: 65,
        bikeScore: 70,
        description: 'Very Walkable',
      };
    }
  }

  private async getNearbySchools(lat: number, lng: number) {
    // GreatSchools API or similar
    // Mock data for now
    void lat;
    void lng;
    return [
      {
        name: 'Lincoln Elementary School',
        type: 'Elementary',
        rating: 9,
        distance: 0.5,
        grades: 'K-5',
      },
      {
        name: 'Washington Middle School',
        type: 'Middle',
        rating: 8,
        distance: 1.2,
        grades: '6-8',
      },
      {
        name: 'Jefferson High School',
        type: 'High',
        rating: 9,
        distance: 2.1,
        grades: '9-12',
      },
    ];
  }

  private async getDemographics(lat: number, lng: number) {
    // Census API or similar
    // Mock data for now
    void lat;
    void lng;
    return {
      population: 45230,
      medianAge: 38,
      medianIncome: 87500,
      employmentRate: 96.5,
      educationLevel: {
        highSchool: 95,
        bachelors: 62,
        graduate: 28,
      },
      crimeIndex: 'Low',
    };
  }

  private async getTransitScore(lat: number, lng: number) {
    // Transit data from local APIs
    void lat;
    void lng;
    return {
      score: 72,
      description: 'Excellent Transit',
      nearbyStops: [
        { type: 'Bus', name: 'Main St Station', distance: 0.2 },
        { type: 'Metro', name: 'Downtown Station', distance: 0.8 },
      ],
    };
  }

  async getPlacesNearby(lat: number, lng: number, type: string) {
    // Google Places API or similar
    // Mock data for common place types
    const places = {
      restaurant: [
        { name: 'The Golden Spoon', distance: 0.3, rating: 4.5 },
        { name: 'Bella Italia', distance: 0.5, rating: 4.7 },
      ],
      grocery_store: [
        { name: 'Whole Foods Market', distance: 0.6, rating: 4.3 },
        { name: "Trader Joe's", distance: 1.1, rating: 4.6 },
      ],
      park: [
        { name: 'Central Park', distance: 0.4, rating: 4.8 },
        { name: 'Riverside Park', distance: 1.5, rating: 4.5 },
      ],
      hospital: [{ name: 'City Medical Center', distance: 2.3, rating: 4.2 }],
      gym: [
        { name: "Gold's Gym", distance: 0.7, rating: 4.4 },
        { name: 'Planet Fitness', distance: 1.2, rating: 4.0 },
      ],
    };

    return places[type] || [];
  }

  async getCommuteTime(
    fromLat: number,
    fromLng: number,
    toLat: number,
    toLng: number,
    mode: string = 'driving',
  ) {
    // Google Distance Matrix API or similar
    // Mock data for now
    const times = {
      driving: 25,
      transit: 42,
      walking: 85,
      bicycling: 35,
    };

    return {
      mode,
      duration: times[mode] || 30,
      distance: 12.5,
    };
  }
}
