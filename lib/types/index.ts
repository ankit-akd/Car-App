export type FuelType = 'Petrol' | 'Diesel' | 'CNG' | 'Electric' | 'Petrol Hybrid';
export type Transmission = 'Manual' | 'Automatic';
export type BodyType = 'Hatchback' | 'Sedan' | 'Compact SUV' | 'SUV';
export type SortOption = 'price_asc' | 'price_desc' | 'mileage_desc' | 'rating_desc' | 'review_desc';

export interface Car {
  id: string;
  make: string;
  model: string;
  variant: string;
  price: number;
  mileage: number;
  safetyRating: number;
  fuelType: FuelType;
  transmission: Transmission;
  seatingCapacity: number;
  bodyType: BodyType;
  reviewScore: number;
}

export interface CarFilters {
  make?: string;
  bodyType?: string;
  fuelType?: string;
  transmission?: string;
  minPrice?: number;
  maxPrice?: number;
  minSeating?: number;
  minSafetyRating?: number;
  minMileage?: number;
  sort?: SortOption;
  q?: string;
}

export type BudgetRange = 'under5' | '5to10' | '10to15' | '15to20' | 'above20';
export type UsageType = 'city' | 'highway' | 'both';
export type FamilySize = 'small' | 'medium' | 'large';
export type FuelPreference = 'petrol' | 'diesel' | 'cng' | 'electric' | 'any';
export type BodyPreference = 'hatchback' | 'sedan' | 'suv' | 'any';
export type Priority = 'mileage' | 'safety' | 'price' | 'comfort';

export interface QuizAnswers {
  budget: BudgetRange;
  usage: UsageType;
  familySize: FamilySize;
  fuelPreference: FuelPreference;
  bodyPreference: BodyPreference;
  priority: Priority;
}

export interface RecommendedCar {
  car: Car;
  score: number;
  matchReasons: string[];
}

export interface FilterOptions {
  makes: string[];
  bodyTypes: BodyType[];
  fuelTypes: FuelType[];
  transmissions: Transmission[];
  priceRange: { min: number; max: number };
  mileageRange: { min: number; max: number };
  seatingOptions: number[];
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
