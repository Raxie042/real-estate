import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Property {
  id: string;
  title: string;
  price: number;
  images: string[];
  city: string;
  state: string;
}

interface ComparisonStore {
  properties: Property[];
  addProperty: (property: Property) => void;
  removeProperty: (id: string) => void;
  clearAll: () => void;
  isInComparison: (id: string) => boolean;
}

export const useComparisonStore = create<ComparisonStore>()(
  persist(
    (set, get) => ({
      properties: [],
      
      addProperty: (property) => {
        const current = get().properties;
        if (current.length >= 4) {
          return; // Max 4 properties
        }
        if (current.some(p => p.id === property.id)) {
          return; // Already added
        }
        set({ properties: [...current, property] });
      },
      
      removeProperty: (id) => {
        set({ properties: get().properties.filter(p => p.id !== id) });
      },
      
      clearAll: () => {
        set({ properties: [] });
      },
      
      isInComparison: (id) => {
        return get().properties.some(p => p.id === id);
      },
    }),
    {
      name: 'property-comparison',
    }
  )
);
