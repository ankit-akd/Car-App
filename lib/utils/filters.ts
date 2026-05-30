import { Car, CarFilters, SortOption } from '@/lib/types';

export function applyFilters(cars: Car[], filters: CarFilters): Car[] {
  let result = [...cars];

  if (filters.q) {
    const q = filters.q.toLowerCase();
    result = result.filter(
      (c) =>
        c.make.toLowerCase().includes(q) ||
        c.model.toLowerCase().includes(q) ||
        c.variant.toLowerCase().includes(q) ||
        c.bodyType.toLowerCase().includes(q) ||
        c.fuelType.toLowerCase().includes(q)
    );
  }

  if (filters.make) {
    result = result.filter((c) => c.make === filters.make);
  }

  if (filters.bodyType) {
    result = result.filter((c) => c.bodyType === filters.bodyType);
  }

  if (filters.fuelType) {
    result = result.filter((c) => c.fuelType === filters.fuelType);
  }

  if (filters.transmission) {
    result = result.filter((c) => c.transmission === filters.transmission);
  }

  if (filters.minPrice !== undefined) {
    result = result.filter((c) => c.price >= filters.minPrice!);
  }

  if (filters.maxPrice !== undefined) {
    result = result.filter((c) => c.price <= filters.maxPrice!);
  }

  if (filters.minSeating !== undefined) {
    result = result.filter((c) => c.seatingCapacity >= filters.minSeating!);
  }

  if (filters.minSafetyRating !== undefined) {
    result = result.filter((c) => c.safetyRating >= filters.minSafetyRating!);
  }

  if (filters.minMileage !== undefined) {
    result = result.filter((c) => c.fuelType !== 'Electric' && c.mileage >= filters.minMileage!);
  }

  return applySort(result, filters.sort ?? 'review_desc');
}

export function applySort(cars: Car[], sort: SortOption): Car[] {
  const sorted = [...cars];
  switch (sort) {
    case 'price_asc':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price_desc':
      return sorted.sort((a, b) => b.price - a.price);
    case 'mileage_desc':
      return sorted.sort((a, b) => {
        if (a.fuelType === 'Electric') return 1;
        if (b.fuelType === 'Electric') return -1;
        return b.mileage - a.mileage;
      });
    case 'rating_desc':
      return sorted.sort((a, b) => b.safetyRating - a.safetyRating);
    case 'review_desc':
    default:
      return sorted.sort((a, b) => b.reviewScore - a.reviewScore);
  }
}

export function paginate<T>(items: T[], page: number, pageSize: number) {
  const start = (page - 1) * pageSize;
  return {
    data: items.slice(start, start + pageSize),
    total: items.length,
    page,
    pageSize,
    totalPages: Math.ceil(items.length / pageSize),
  };
}
