'use client';

import Link from 'next/link';
import { X, GitCompare } from 'lucide-react';
import { useAppContext } from '@/lib/context/AppContext';

export default function CompareBar() {
  const { compareList, removeFromCompare } = useAppContext();

  if (compareList.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-4">
        <div className="flex-1 flex items-center gap-3 overflow-x-auto">
          {compareList.map((car) => (
            <div
              key={car.id}
              className="flex items-center gap-2 bg-indigo-50 border border-indigo-100 rounded-xl px-3 py-1.5 shrink-0"
            >
              <span className="text-sm font-medium text-indigo-800">
                {car.make} {car.model}
              </span>
              <button
                onClick={() => removeFromCompare(car.id)}
                className="text-indigo-400 hover:text-indigo-700 transition-colors"
              >
                <X size={14} />
              </button>
            </div>
          ))}
          {compareList.length < 3 && (
            <span className="text-sm text-gray-400 shrink-0">
              Add {3 - compareList.length} more car{3 - compareList.length !== 1 ? 's' : ''} to compare
            </span>
          )}
        </div>

        <Link
          href="/compare"
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors shrink-0"
        >
          <GitCompare size={16} />
          Compare Now
        </Link>
      </div>
    </div>
  );
}
