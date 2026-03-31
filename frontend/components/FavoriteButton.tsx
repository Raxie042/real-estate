'use client';

import { Heart } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { useIsFavorite, useToggleFavorite } from '@/lib/hooks';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { SUPPORTED_LANGUAGES } from '@/lib/preferences-context';

interface FavoriteButtonProps {
  listingId: string;
  className?: string;
  size?: number;
  showCount?: boolean;
}

export default function FavoriteButton({ 
  listingId, 
  className = '', 
  size = 20,
  showCount = false 
}: FavoriteButtonProps) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const { data: isFavorite, isLoading } = useIsFavorite(listingId);
  const toggleFavoriteMutation = useToggleFavorite();
  const [optimisticFavorite, setOptimisticFavorite] = useState<boolean | null>(null);

  const pathLocale = pathname?.split('/')[1];
  const hasLocalePrefix = !!pathLocale && SUPPORTED_LANGUAGES.includes(pathLocale as (typeof SUPPORTED_LANGUAGES)[number]);
  const locale = hasLocalePrefix ? pathLocale : 'en';
  const nextPath = encodeURIComponent(pathname || '/');
  const loginPath = `/${locale}/login?next=${nextPath}`;

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      router.push(loginPath);
      return;
    }

    // Optimistic update
    const currentState = optimisticFavorite !== null ? optimisticFavorite : isFavorite;
    setOptimisticFavorite(!currentState);

    try {
      await toggleFavoriteMutation.mutateAsync({
        listingId,
        isFavorite: currentState || false,
      });
      // Reset optimistic state after successful mutation
      setOptimisticFavorite(null);
    } catch (error) {
      // Revert optimistic update on error
      setOptimisticFavorite(currentState || false);
    }
  };

  const favoriteState = optimisticFavorite !== null ? optimisticFavorite : isFavorite;

  if (isLoading && !isAuthenticated) {
    return null;
  }

  return (
    <button
      onClick={handleClick}
      disabled={toggleFavoriteMutation.isPending}
      className={`
        group relative flex items-center gap-2 transition-all duration-200
        ${favoriteState 
          ? 'text-red-600' 
          : 'text-[#7A6E60] hover:text-red-600'
        }
        ${toggleFavoriteMutation.isPending ? 'opacity-50 cursor-wait' : 'cursor-pointer'}
        ${className}
      `}
      aria-label={favoriteState ? 'Remove from favorites' : 'Add to favorites'}
    >
      <Heart
        size={size}
        className={`
          transition-all duration-200
          ${favoriteState ? 'fill-current' : 'fill-none'}
          ${!favoriteState && 'group-hover:scale-110'}
        `}
      />
      {showCount && favoriteState && (
        <span className="text-sm font-medium">Saved</span>
      )}
    </button>
  );
}
