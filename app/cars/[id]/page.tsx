import { notFound } from 'next/navigation';
import carsData from '@/lib/data/cars.json';
import { Car } from '@/lib/types';
import SpecsTable from '@/components/cars/SpecsTable';
import SafetyRatingCard from '@/components/cars/SafetyRatingCard';
import SimilarCars from '@/components/cars/SimilarCars';
import CarDetailActions from './CarDetailActions';
import { formatPrice, formatMileage, getFuelTypeColor, getBodyTypeIcon } from '@/lib/utils/format';
import { getCarColorBg, getCarEmoji } from '@/lib/utils/carColors';
import StarRating from '@/components/ui/StarRating';
import Badge from '@/components/ui/Badge';
import { cn } from '@/lib/utils/cn';
import Link from 'next/link';
import type { Metadata } from 'next';

const allCars = carsData as Car[];

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return allCars.map((c) => ({ id: c.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const car = allCars.find((c) => c.id === id);
  if (!car) return { title: 'Car Not Found' };
  return {
    title: `${car.make} ${car.model} ${car.variant} — Price, Specs & Review`,
    description: `${car.make} ${car.model} ${car.variant}: Ex-showroom price ${formatPrice(car.price)}, mileage ${formatMileage(car)}, ${car.safetyRating} star safety rating.`,
  };
}

export default async function CarDetailPage({ params }: PageProps) {
  const { id } = await params;
  const car = allCars.find((c) => c.id === id);
  if (!car) notFound();

  const similar = allCars
    .filter((c) => c.id !== id && c.bodyType === car.bodyType)
    .sort((a, b) => Math.abs(a.price - car.price) - Math.abs(b.price - car.price))
    .slice(0, 4);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-400 mb-6 flex items-center gap-1.5">
        <Link href="/cars" className="hover:text-indigo-600">Cars</Link>
        <span>›</span>
        <span className="text-gray-500">{car.bodyType}s</span>
        <span>›</span>
        <span className="text-gray-700 font-medium">{car.make} {car.model}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Hero */}
          <div className={`relative rounded-3xl overflow-hidden h-72 flex items-center justify-center ${getCarColorBg(car.make)}`}>
            <span className="text-[120px]">{getCarEmoji(car.bodyType)}</span>
            {car.safetyRating >= 5 && (
              <div className="absolute top-4 left-4 bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
                ✓ 5-Star NCAP Safety
              </div>
            )}
          </div>

          {/* Title + actions */}
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-sm text-gray-400 mb-0.5">{car.make}</p>
              <h1 className="text-3xl font-bold text-gray-900">{car.model}</h1>
              <p className="text-gray-500">{car.variant}</p>
              <div className="flex items-center gap-2 mt-2">
                <StarRating value={car.reviewScore} showValue />
                <span className="text-sm text-gray-400">User reviews</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400">Starting ex-showroom</p>
              <p className="text-3xl font-bold text-indigo-600">{formatPrice(car.price)}</p>
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2">
            <span className={cn('inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium', getFuelTypeColor(car.fuelType))}>
              {car.fuelType}
            </span>
            <Badge variant="outline" className="px-3 py-1.5 text-sm">{car.transmission}</Badge>
            <Badge variant="outline" className="px-3 py-1.5 text-sm">{getBodyTypeIcon(car.bodyType)} {car.bodyType}</Badge>
            <Badge variant="outline" className="px-3 py-1.5 text-sm">{car.seatingCapacity} Seater</Badge>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Price',         value: formatPrice(car.price),  sub: 'Ex-showroom'           },
              { label: 'Mileage',       value: car.fuelType === 'Electric' ? `${car.mileage} km` : `${car.mileage}`, sub: car.fuelType === 'Electric' ? 'Range' : 'kmpl (ARAI)' },
              { label: 'Safety Rating', value: car.safetyRating > 0 ? `${car.safetyRating}/5 ★` : 'N/R', sub: 'Global NCAP' },
            ].map((s) => (
              <div key={s.label} className="bg-white rounded-2xl border border-gray-100 p-4 text-center">
                <p className="text-xs text-gray-400 mb-1">{s.label}</p>
                <p className="text-xl font-bold text-gray-900">{s.value}</p>
                <p className="text-[11px] text-gray-400">{s.sub}</p>
              </div>
            ))}
          </div>

          {/* Full specs */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Full Specifications</h2>
            <SpecsTable car={car} />
          </div>

          {/* Similar cars */}
          <SimilarCars cars={similar} />
        </div>

        {/* Right column (sticky) */}
        <div className="space-y-4">
          <div className="sticky top-24 space-y-4">
            <SafetyRatingCard car={car} />
            <CarDetailActions car={car} />

            {/* Info card */}
            <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 text-sm text-amber-800">
              <p className="font-semibold mb-1">💡 Buying Tip</p>
              <p className="text-xs leading-relaxed text-amber-700">
                Prices shown are ex-showroom Delhi. On-road price includes registration, insurance & handling charges.
                Always confirm with your local dealer.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
