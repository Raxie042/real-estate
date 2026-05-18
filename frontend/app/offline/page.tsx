'use client';

import Link from 'next/link';
import { WifiOff, Home, Search } from 'lucide-react';

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-[#F6F2EC] flex items-center justify-center">
            <WifiOff className="w-10 h-10 text-[#C9A96A]" />
          </div>
        </div>

        <p className="text-[#C9A96A] text-xs uppercase tracking-[0.3em] mb-3 font-medium">
          No Connection
        </p>
        <h1 className="font-serif text-3xl text-[#2B2620] mb-4">
          You&apos;re Offline
        </h1>
        <p className="text-[#8C7E6E] text-base leading-relaxed mb-8">
          It looks like you&apos;ve lost your internet connection. Some content
          you&apos;ve previously viewed may still be available below.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-[#C9A96A] text-white text-sm font-medium rounded-lg hover:bg-[#B8944F] transition-colors"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="px-6 py-3 border border-[#E8E1D7] text-[#2B2620] text-sm font-medium rounded-lg hover:bg-[#F6F2EC] transition-colors flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            Home
          </Link>
          <Link
            href="/search"
            className="px-6 py-3 border border-[#E8E1D7] text-[#2B2620] text-sm font-medium rounded-lg hover:bg-[#F6F2EC] transition-colors flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4" />
            Search
          </Link>
        </div>

        <p className="mt-10 text-[#B8A898] text-xs">
          Raxie Zenith Estate &mdash; Luxury Properties Worldwide
        </p>
      </div>
    </div>
  );
}
