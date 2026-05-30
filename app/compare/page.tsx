'use client';

import Link from 'next/link';
import { GitCompare, Plus } from 'lucide-react';
import { useAppContext } from '@/lib/context/AppContext';
import CompareTable from '@/components/compare/CompareTable';

export default function ComparePage() {
  const { compareList, removeFromCompare, clearCompare } = useAppContext();

  if (compareList.length === 0) {
    return (
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="text-6xl mb-4">⚖️</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">No Cars to Compare</h1>
        <p className="text-gray-500 mb-8">
          Browse cars and click <strong>Compare</strong> on up to 3 cars to see them side-by-side.
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
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <GitCompare size={22} className="text-indigo-600" />
          <h1 className="text-2xl font-bold text-gray-900">Compare Cars</h1>
          <span className="bg-indigo-100 text-indigo-700 text-sm font-semibold px-2.5 py-0.5 rounded-full">
            {compareList.length} of 3
          </span>
        </div>

        <div className="flex items-center gap-3">
          {compareList.length < 3 && (
            <Link
              href="/cars"
              className="flex items-center gap-1.5 text-sm text-indigo-600 hover:underline font-medium"
            >
              <Plus size={15} /> Add More
            </Link>
          )}
          <button
            onClick={clearCompare}
            className="text-sm text-red-500 hover:text-red-600 font-medium"
          >
            Clear All
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <CompareTable cars={compareList} onRemove={removeFromCompare} />
      </div>

      <p className="text-center text-xs text-gray-400 mt-6">
        Green highlight = best value in that category. Prices are ex-showroom.
      </p>
    </main>
  );
}
