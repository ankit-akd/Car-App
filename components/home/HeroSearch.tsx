'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Sparkles } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function HeroSearch() {
  const router = useRouter();
  const [query, setQuery] = useState('');

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/cars?q=${encodeURIComponent(query.trim())}`);
    }
  }

  return (
    <section className="relative bg-gradient-to-br from-indigo-950 via-indigo-800 to-indigo-600 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 25% 50%, white 0%, transparent 60%)' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur rounded-full px-4 py-1.5 text-sm mb-6">
          <Sparkles size={14} className="text-amber-300" />
          <span>India&apos;s smartest car research platform</span>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
          Find the{' '}
          <span className="text-amber-300">perfect car</span>
          <br />
          for your lifestyle
        </h1>
        <p className="text-indigo-200 text-lg md:text-xl max-w-2xl mx-auto mb-10">
          Compare specs, mileage, safety ratings and real user reviews for 40+ cars — go from confused to confident.
        </p>

        <form onSubmit={handleSearch} className="flex max-w-xl mx-auto gap-2">
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Swift, Nexon, Creta…"
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white text-gray-900 placeholder:text-gray-400 text-base focus:outline-none focus:ring-2 focus:ring-amber-300"
            />
          </div>
          <Button size="lg" type="submit" className="rounded-2xl px-6 bg-amber-400 hover:bg-amber-300 text-gray-900 font-semibold">
            Search
          </Button>
        </form>

        <p className="text-indigo-300 text-sm mt-4">
          Or{' '}
          <button onClick={() => router.push('/quiz')} className="underline underline-offset-2 hover:text-white transition-colors">
            take the car finder quiz
          </button>{' '}
          and get personalized recommendations
        </p>
      </div>
    </section>
  );
}
