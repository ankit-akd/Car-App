'use client';

interface Option {
  value: string;
  label: string;
  description?: string;
  emoji?: string;
}

interface QuizStepProps {
  question: string;
  options: Option[];
  selected: string;
  onSelect: (value: string) => void;
}

export default function QuizStep({ question, options, selected, onSelect }: QuizStepProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">{question}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onSelect(opt.value)}
            className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all text-center ${
              selected === opt.value
                ? 'border-indigo-600 bg-indigo-50'
                : 'border-gray-200 bg-white hover:border-indigo-200 hover:bg-indigo-50/50'
            }`}
          >
            {opt.emoji && <span className="text-3xl">{opt.emoji}</span>}
            <span className={`font-semibold text-sm ${selected === opt.value ? 'text-indigo-700' : 'text-gray-800'}`}>
              {opt.label}
            </span>
            {opt.description && (
              <span className="text-xs text-gray-400 leading-tight">{opt.description}</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
