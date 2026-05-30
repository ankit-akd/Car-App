'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, RotateCcw } from 'lucide-react';
import { QuizAnswers, RecommendedCar } from '@/lib/types';
import QuizStep from '@/components/quiz/QuizStep';
import QuizResults from '@/components/quiz/QuizResults';
import Button from '@/components/ui/Button';

const STEPS = [
  {
    key: 'budget' as keyof QuizAnswers,
    question: "What's your budget?",
    options: [
      { value: 'under5',  label: 'Under ₹5 Lakh',   emoji: '💰', description: 'Entry-level options' },
      { value: '5to10',   label: '₹5L – ₹10L',      emoji: '💳', description: 'Popular mid-range'   },
      { value: '10to15',  label: '₹10L – ₹15L',     emoji: '🏦', description: 'Feature-rich SUVs'   },
      { value: '15to20',  label: '₹15L – ₹20L',     emoji: '💎', description: 'Premium segment'     },
      { value: 'above20', label: 'Above ₹20 Lakh',  emoji: '🚀', description: 'Luxury choices'      },
    ],
  },
  {
    key: 'usage' as keyof QuizAnswers,
    question: 'How will you primarily use the car?',
    options: [
      { value: 'city',    label: 'City Commute',  emoji: '🏙️', description: 'Short daily drives'      },
      { value: 'highway', label: 'Highway Trips', emoji: '🛣️', description: 'Long distance travel'    },
      { value: 'both',    label: 'Both Equally',  emoji: '🗺️', description: 'Versatile all-rounder'   },
    ],
  },
  {
    key: 'familySize' as keyof QuizAnswers,
    question: 'How many people will ride regularly?',
    options: [
      { value: 'small',  label: '1 – 2 People',  emoji: '👤', description: 'Solo or couple'         },
      { value: 'medium', label: '3 – 4 People',  emoji: '👨‍👩‍👧', description: 'Small family'           },
      { value: 'large',  label: '5+ People',     emoji: '👨‍👩‍👧‍👦', description: 'Big family, need 7-seater' },
    ],
  },
  {
    key: 'fuelPreference' as keyof QuizAnswers,
    question: 'Preferred fuel type?',
    options: [
      { value: 'petrol',   label: 'Petrol',    emoji: '⛽', description: 'Smooth, widely available' },
      { value: 'diesel',   label: 'Diesel',    emoji: '🛢️', description: 'Better mileage on highways' },
      { value: 'cng',      label: 'CNG',       emoji: '🌿', description: 'Low running cost' },
      { value: 'electric', label: 'Electric',  emoji: '⚡', description: 'Zero emissions, future-ready' },
      { value: 'any',      label: 'No Preference', emoji: '🤷', description: 'Show me all options' },
    ],
  },
  {
    key: 'bodyPreference' as keyof QuizAnswers,
    question: 'Which body style do you prefer?',
    options: [
      { value: 'hatchback', label: 'Hatchback', emoji: '🚗', description: 'Compact & easy to park' },
      { value: 'sedan',     label: 'Sedan',     emoji: '🚙', description: 'Boot space & elegance'  },
      { value: 'suv',       label: 'SUV',       emoji: '🛻', description: 'High ground clearance'  },
      { value: 'any',       label: 'No Preference', emoji: '🤷', description: 'Show me all types'  },
    ],
  },
  {
    key: 'priority' as keyof QuizAnswers,
    question: 'What matters most to you?',
    options: [
      { value: 'mileage',  label: 'Best Mileage', emoji: '⛽', description: 'Low fuel cost matters' },
      { value: 'safety',   label: 'Safety First',  emoji: '🛡️', description: 'NCAP stars are critical' },
      { value: 'price',    label: 'Value for Money', emoji: '💰', description: 'Maximum bang per rupee' },
      { value: 'comfort',  label: 'Comfort & Features', emoji: '✨', description: 'Best overall experience' },
    ],
  },
];

const DEFAULT_ANSWERS: QuizAnswers = {
  budget: '' as QuizAnswers['budget'],
  usage: '' as QuizAnswers['usage'],
  familySize: '' as QuizAnswers['familySize'],
  fuelPreference: '' as QuizAnswers['fuelPreference'],
  bodyPreference: '' as QuizAnswers['bodyPreference'],
  priority: '' as QuizAnswers['priority'],
};

export default function QuizPage() {
  const [step,    setStep]    = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>(DEFAULT_ANSWERS);
  const [results, setResults] = useState<RecommendedCar[] | null>(null);
  const [loading, setLoading] = useState(false);

  const currentStep = STEPS[step];
  const currentValue = answers[currentStep.key] as string;
  const canGoNext = currentValue !== '';
  const isLastStep = step === STEPS.length - 1;

  async function submitQuiz() {
    setLoading(true);
    try {
      const res = await fetch('/api/recommendations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(answers),
      });
      const data = await res.json();
      setResults(data);
    } finally {
      setLoading(false);
    }
  }

  function handleSelect(value: string) {
    setAnswers((prev) => ({ ...prev, [currentStep.key]: value }));
  }

  function handleNext() {
    if (isLastStep) {
      submitQuiz();
    } else {
      setStep((s) => s + 1);
    }
  }

  function handleReset() {
    setStep(0);
    setAnswers(DEFAULT_ANSWERS);
    setResults(null);
  }

  if (results) {
    return (
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-24">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 rounded-full px-4 py-1.5 text-sm font-medium mb-4">
            <Sparkles size={14} /> Your personalised matches are ready
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Cars Matched for You</h1>
          <p className="text-gray-500">Based on your answers, here are your best picks</p>
        </div>

        <QuizResults results={results} />

        <div className="text-center mt-8">
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            <RotateCcw size={14} /> Retake the quiz
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-500">Question {step + 1} of {STEPS.length}</span>
          <span className="text-sm font-medium text-indigo-600">{Math.round(((step + 1) / STEPS.length) * 100)}%</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-600 rounded-full transition-all duration-300"
            style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
          />
        </div>
      </div>

      <QuizStep
        question={currentStep.question}
        options={currentStep.options}
        selected={currentValue}
        onSelect={handleSelect}
      />

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8">
        <Button
          variant="ghost"
          onClick={() => setStep((s) => s - 1)}
          disabled={step === 0}
          className="flex items-center gap-1"
        >
          <ChevronLeft size={16} /> Back
        </Button>

        <Button
          variant="primary"
          onClick={handleNext}
          disabled={!canGoNext}
          loading={loading}
          className="flex items-center gap-1 px-6"
        >
          {isLastStep ? (
            <>Find My Cars <Sparkles size={15} /></>
          ) : (
            <>Next <ChevronRight size={16} /></>
          )}
        </Button>
      </div>
    </main>
  );
}
