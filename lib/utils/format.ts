import { Car } from '@/lib/types';

export function formatPrice(price: number): string {
  if (price >= 10000000) {
    return `₹${(price / 10000000).toFixed(2)} Cr`;
  }
  if (price >= 100000) {
    return `₹${(price / 100000).toFixed(2)} L`;
  }
  return `₹${price.toLocaleString('en-IN')}`;
}

export function formatPriceShort(price: number): string {
  if (price >= 10000000) {
    return `₹${(price / 10000000).toFixed(1)}Cr`;
  }
  return `₹${(price / 100000).toFixed(1)}L`;
}

export function formatMileage(car: Car): string {
  if (car.fuelType === 'Electric') {
    return `${car.mileage} km range`;
  }
  if (car.fuelType === 'CNG') {
    return `${car.mileage} km/kg`;
  }
  return `${car.mileage} kmpl`;
}

export function formatMileageShort(car: Car): string {
  if (car.fuelType === 'Electric') {
    return `${car.mileage}km`;
  }
  return `${car.mileage}`;
}

export function formatMileageUnit(car: Car): string {
  if (car.fuelType === 'Electric') return 'km range';
  if (car.fuelType === 'CNG') return 'km/kg';
  return 'kmpl';
}

export function getCarLabel(car: Car): string {
  return `${car.make} ${car.model} ${car.variant}`;
}

export function getCarSlug(car: Car): string {
  return `${car.make} ${car.model}`.toLowerCase().replace(/\s+/g, '-');
}

export function getFuelTypeColor(fuelType: string): string {
  const map: Record<string, string> = {
    Petrol: 'bg-orange-100 text-orange-700',
    Diesel: 'bg-gray-100 text-gray-700',
    CNG: 'bg-green-100 text-green-700',
    Electric: 'bg-blue-100 text-blue-700',
    'Petrol Hybrid': 'bg-teal-100 text-teal-700',
  };
  return map[fuelType] ?? 'bg-gray-100 text-gray-600';
}

export function getBodyTypeIcon(bodyType: string): string {
  const map: Record<string, string> = {
    Hatchback: '🚗',
    Sedan: '🚙',
    'Compact SUV': '🚐',
    SUV: '🛻',
  };
  return map[bodyType] ?? '🚘';
}

export function getSafetyLabel(rating: number): string {
  if (rating === 0) return 'Not Rated';
  if (rating === 1) return 'Poor';
  if (rating === 2) return 'Marginal';
  if (rating === 3) return 'Acceptable';
  if (rating === 4) return 'Good';
  return 'Excellent';
}

export function getReviewLabel(score: number): string {
  if (score >= 4.5) return 'Outstanding';
  if (score >= 4.0) return 'Very Good';
  if (score >= 3.5) return 'Good';
  if (score >= 3.0) return 'Average';
  return 'Below Average';
}
