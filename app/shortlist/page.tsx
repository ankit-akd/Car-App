'use client';

import Link from 'next/link';
import { Heart, Plus, GitCompare } from 'lucide-react';
import { useAppContext } from '@/lib/context/AppContext';
import ShortlistGrid from '@/components/shortlist/ShortlistGrid';

export default function ShortlistPage() {
  const { shortlist, clearShortlist, compareList } = useAppContext();

  if (shortlist.length === 0) {
    return (
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="text-6xl mb-4">❤️</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Your Shortlist is Empty</h1>
        <p className="text-gray-500 mb-8">
          Click the heart icon on any car to save it here for later review.
        </p>
        <Link
          href="/cars"
          className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-2xl font-semibold hover:bg-indigo-700 transition-colors"
        >
          <Plus size={18} /> Browse Cars
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Heart size={22} className="text-red-500 fill-red-500" />
          <h1 className="text-2xl font-bold text-gray-900">My Shortlist</h1>
          <span className="bg-red-100 text-red-600 text-sm font-semibold px-2.5 py-0.5 rounded-full">
            {shortlist.length} car{shortlist.length !== 1 ? 's' : ''}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {compareList.length > 0 && (
            <Link
              href="/compare"
              className="flex items-center gap-1.5 text-sm text-indigo-600 font-medium hover:underline"
            >
              <GitCompare size={15} /> Go to Compare ({compareList.length})
            </Link>
          )}
          <button
            onClick={clearShortlist}
            className="text-sm text-red-500 hover:text-red-600 font-medium"
          >
            Clear All
          </button>
        </div>
      </div>

      <ShortlistGrid cars={shortlist} />
    </main>
  );
}
