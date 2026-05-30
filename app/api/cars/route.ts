import { NextRequest, NextResponse } from 'next/server';
import carsData from '@/lib/data/cars.json';
import { Car, CarFilters } from '@/lib/types';
import { applyFilters, paginate } from '@/lib/utils/filters';

const cars = carsData as Car[];

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  const filters: CarFilters = {
    q:               searchParams.get('q')               ?? undefined,
    make:            searchParams.get('make')            ?? undefined,
    bodyType:        searchParams.get('bodyType')        ?? undefined,
    fuelType:        searchParams.get('fuelType')        ?? undefined,
    transmission:    searchParams.get('transmission')    ?? undefined,
    minPrice:        searchParams.get('minPrice')        ? Number(searchParams.get('minPrice'))        : undefined,
    maxPrice:        searchParams.get('maxPrice')        ? Number(searchParams.get('maxPrice'))        : undefined,
    minSeating:      searchParams.get('minSeating')      ? Number(searchParams.get('minSeating'))      : undefined,
    minSafetyRating: searchParams.get('minSafetyRating') ? Number(searchParams.get('minSafetyRating')) : undefined,
    minMileage:      searchParams.get('minMileage')      ? Number(searchParams.get('minMileage'))      : undefined,
    sort:            (searchParams.get('sort') as CarFilters['sort']) ?? undefined,
  };

  const page     = Math.max(1, Number(searchParams.get('page')     ?? 1));
  const pageSize = Math.min(24, Number(searchParams.get('pageSize') ?? 12));

  const filtered = applyFilters(cars, filters);
  const result   = paginate(filtered, page, pageSize);

  return NextResponse.json(result);
}
