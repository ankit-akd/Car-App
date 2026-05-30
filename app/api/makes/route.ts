import { NextResponse } from 'next/server';
import carsData from '@/lib/data/cars.json';
import { Car } from '@/lib/types';

const cars = carsData as Car[];

export async function GET() {
  const makes = [...new Set(cars.map((c) => c.make))].sort();
  return NextResponse.json(makes);
}
