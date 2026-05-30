import carsData from '@/lib/data/cars.json';
import { Car } from '@/lib/types';
import HeroSearch from '@/components/home/HeroSearch';
import CategoryGrid from '@/components/home/CategoryGrid';
import FeaturedCars from '@/components/home/FeaturedCars';
import Link from 'next/link';
import { Sparkles, Shield, GitCompare } from 'lucide-react';

const cars = carsData as Car[];

const topRated = [...cars].sort((a, b) => b.reviewScore - a.reviewScore).slice(0, 8);
const safest   = [...cars].sort((a, b) => b.safetyRating - a.safetyRating).slice(0, 8);

export default function HomePage() {
  return (
    <main>
      <HeroSearch />
      <CategoryGrid />
      <FeaturedCars cars={topRated} title="Top Rated Cars" />
      <FeaturedCars cars={safest}   title="Safest Cars" />

      {/* Quiz CTA */}
      <section className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5 text-sm mb-6">
            <Sparkles size={14} /> Personalised Recommendations
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Not sure which car to buy?
          </h2>
          <p className="text-indigo-200 text-lg max-w-xl mx-auto mb-8">
            Answer 6 quick questions and we&apos;ll match you with the best cars for your budget, lifestyle and priorities.
          </p>
          <Link
            href="/quiz"
            className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-gray-900 font-bold px-8 py-3.5 rounded-2xl text-lg transition-colors"
          >
            <Sparkles size={18} /> Take the Quiz — It&apos;s Free
          </Link>
        </div>
      </section>

      {/* Why FindMyCar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-10">
          Why use FindMyCar?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: <GitCompare size={28} className="text-indigo-600" />,
              title: 'Side-by-Side Compare',
              desc: 'Compare up to 3 cars simultaneously — specs, price, mileage and safety all in one table.',
            },
            {
              icon: <Shield size={28} className="text-green-600" />,
              title: 'Real Safety Data',
              desc: 'NCAP safety ratings for every car so you never compromise on what matters most.',
            },
            {
              icon: <Sparkles size={28} className="text-amber-500" />,
              title: 'Smart Recommendations',
              desc: 'Our quiz algorithm scores cars across 6 factors to shortlist the best picks for you.',
            },
          ].map((item) => (
            <div key={item.title} className="bg-white rounded-2xl border border-gray-100 p-6">
              <div className="mb-4">{item.icon}</div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
