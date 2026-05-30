import Link from 'next/link';

const categories = [
  { label: 'Hatchbacks',    bodyType: 'Hatchback',    emoji: '🚗', description: 'Compact & affordable',  bg: 'bg-orange-50',  border: 'border-orange-100', text: 'text-orange-600' },
  { label: 'Sedans',        bodyType: 'Sedan',         emoji: '🚙', description: 'Comfort & style',       bg: 'bg-blue-50',    border: 'border-blue-100',   text: 'text-blue-600'   },
  { label: 'Compact SUVs',  bodyType: 'Compact SUV',   emoji: '🚐', description: 'Urban-ready SUVs',      bg: 'bg-green-50',   border: 'border-green-100',  text: 'text-green-600'  },
  { label: 'SUVs',          bodyType: 'SUV',           emoji: '🛻', description: 'Bold & spacious',       bg: 'bg-purple-50',  border: 'border-purple-100', text: 'text-purple-600' },
  { label: 'Electric',      fuelType: 'Electric',      emoji: '⚡', description: 'Zero emissions',        bg: 'bg-teal-50',    border: 'border-teal-100',   text: 'text-teal-600'   },
  { label: 'Under ₹7L',    maxPrice: 700000,          emoji: '💰', description: 'Budget-friendly picks', bg: 'bg-amber-50',   border: 'border-amber-100',  text: 'text-amber-600'  },
];

export default function CategoryGrid() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Browse by Category</h2>
        <Link href="/cars" className="text-sm text-indigo-600 hover:underline font-medium">
          View all →
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {categories.map((cat) => {
          const params = new URLSearchParams();
          if ('bodyType' in cat && cat.bodyType) params.set('bodyType', cat.bodyType);
          if ('fuelType' in cat && cat.fuelType) params.set('fuelType', cat.fuelType);
          if ('maxPrice' in cat && cat.maxPrice) params.set('maxPrice', String(cat.maxPrice));

          return (
            <Link
              key={cat.label}
              href={`/cars?${params.toString()}`}
              className={`flex flex-col items-center gap-2 p-4 rounded-2xl border ${cat.bg} ${cat.border} hover:scale-105 transition-transform`}
            >
              <span className="text-3xl">{cat.emoji}</span>
              <span className={`font-semibold text-sm ${cat.text}`}>{cat.label}</span>
              <span className="text-xs text-gray-500 text-center leading-tight">{cat.description}</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
