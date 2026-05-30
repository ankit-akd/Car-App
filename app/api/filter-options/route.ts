import { NextResponse } from 'next/server';
import carsData from '@/lib/data/cars.json';
import { Car, FilterOptions } from '@/lib/types';

const cars = carsData as Car[];

export async function GET() {
  const prices   = cars.map((c) => c.price);
  const mileages = cars.filter((c) => c.fuelType !== 'Electric').map((c) => c.mileage);

  const options: FilterOptions = {
    makes:        [...new Set(cars.map((c) => c.make))].sort() as string[],
    bodyTypes:    [...new Set(cars.map((c) => c.bodyType))] as FilterOptions['bodyTypes'],
    fuelTypes:    [...new Set(cars.map((c) => c.fuelType))] as FilterOptions['fuelTypes'],
    transmissions:[...new Set(cars.map((c) => c.transmission))] as FilterOptions['transmissions'],
    priceRange:   { min: Math.min(...prices),   max: Math.max(...prices)   },
    mileageRange: { min: Math.min(...mileages), max: Math.max(...mileages) },
    seatingOptions:[...new Set(cars.map((c) => c.seatingCapacity))].sort((a, b) => a - b),
  };

  return NextResponse.json(options);
}
