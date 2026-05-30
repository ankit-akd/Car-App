import { Car, QuizAnswers, RecommendedCar } from '@/lib/types';

const BUDGET_RANGES: Record<string, [number, number]> = {
  under5:  [0,        500000],
  '5to10': [500000,   1000000],
  '10to15':[1000000,  1500000],
  '15to20':[1500000,  2000000],
  above20: [2000000,  Infinity],
};

export function scoreCar(car: Car, answers: QuizAnswers): RecommendedCar {
  let score = 0;
  const matchReasons: string[] = [];

  const [minBudget, maxBudget] = BUDGET_RANGES[answers.budget] ?? [0, Infinity];
  if (car.price >= minBudget && car.price <= maxBudget) {
    score += 30;
    matchReasons.push('Fits your budget');
  } else if (car.price <= maxBudget * 1.1) {
    score += 15;
  }

  if (answers.fuelPreference !== 'any') {
    const fuelMap: Record<string, string[]> = {
      petrol:   ['Petrol', 'Petrol Hybrid'],
      diesel:   ['Diesel'],
      cng:      ['CNG'],
      electric: ['Electric'],
    };
    if (fuelMap[answers.fuelPreference]?.includes(car.fuelType)) {
      score += 20;
      matchReasons.push(`${car.fuelType} fuel matches your preference`);
    }
  } else {
    score += 10;
  }

  if (answers.bodyPreference !== 'any') {
    const bodyMap: Record<string, string[]> = {
      hatchback: ['Hatchback'],
      sedan:     ['Sedan'],
      suv:       ['Compact SUV', 'SUV'],
    };
    if (bodyMap[answers.bodyPreference]?.includes(car.bodyType)) {
      score += 20;
      matchReasons.push(`${car.bodyType} body style you prefer`);
    }
  } else {
    score += 10;
  }

  if (answers.familySize === 'large' && car.seatingCapacity >= 7) {
    score += 15;
    matchReasons.push('7-seater for your large family');
  } else if (answers.familySize === 'medium' && car.seatingCapacity >= 5) {
    score += 10;
    matchReasons.push('Comfortable for a family of 4–5');
  } else if (answers.familySize === 'small') {
    score += 8;
  }

  switch (answers.priority) {
    case 'mileage':
      if (car.fuelType !== 'Electric' && car.mileage >= 20) {
        score += 15;
        matchReasons.push('Excellent fuel efficiency');
      } else if (car.fuelType === 'Electric') {
        score += 15;
        matchReasons.push('Zero running cost with EV');
      } else if (car.mileage >= 17) {
        score += 8;
      }
      break;
    case 'safety':
      if (car.safetyRating >= 5) {
        score += 15;
        matchReasons.push('5-star NCAP safety rating');
      } else if (car.safetyRating >= 4) {
        score += 10;
        matchReasons.push('High safety rating');
      }
      break;
    case 'price':
      if (car.price <= minBudget + (maxBudget - minBudget) * 0.6) {
        score += 15;
        matchReasons.push('Great value for money');
      } else {
        score += 5;
      }
      break;
    case 'comfort':
      if (car.reviewScore >= 4.4) {
        score += 15;
        matchReasons.push('Top-rated for overall comfort');
      } else if (car.reviewScore >= 4.0) {
        score += 8;
      }
      break;
  }

  if (answers.usage === 'city' && car.fuelType !== 'Electric') {
    if (car.mileage >= 18) score += 5;
  } else if (answers.usage === 'highway') {
    if (['SUV', 'Compact SUV', 'Sedan'].includes(car.bodyType)) score += 5;
  }

  score += car.reviewScore * 1.5;

  return { car, score: Math.round(score * 10) / 10, matchReasons };
}

export function getRecommendations(cars: Car[], answers: QuizAnswers, limit = 6): RecommendedCar[] {
  return cars
    .map((car) => scoreCar(car, answers))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}
