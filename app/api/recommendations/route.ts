import { NextRequest, NextResponse } from 'next/server';
import carsData from '@/lib/data/cars.json';
import { Car, QuizAnswers } from '@/lib/types';
import { getRecommendations } from '@/lib/utils/recommendations';

const cars = carsData as Car[];

export async function POST(req: NextRequest) {
  try {
    const answers: QuizAnswers = await req.json();
    const results = getRecommendations(cars, answers);
    return NextResponse.json(results);
  } catch {
    return NextResponse.json({ error: 'Invalid quiz answers' }, { status: 400 });
  }
}
