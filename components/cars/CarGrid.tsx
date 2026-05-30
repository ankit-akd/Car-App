import { Car } from '@/lib/types';
import CarCard from './CarCard';
import { CarCardSkeleton } from '@/components/ui/Skeleton';

interface CarGridProps {
  cars?: Car[];
  loading?: boolean;
  skeletonCount?: number;
}

export default function CarGrid({ cars, loading, skeletonCount = 12 }: CarGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <CarCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!cars || cars.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-5xl mb-4">🔍</p>
        <p className="text-gray-600 font-medium text-lg">No cars found</p>
        <p className="text-gray-400 text-sm mt-1">Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {cars.map((car) => (
        <CarCard key={car.id} car={car} />
      ))}
    </div>
  );
}
