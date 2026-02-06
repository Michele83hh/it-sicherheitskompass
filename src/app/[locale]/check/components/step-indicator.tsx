'use client';

interface StepIndicatorProps {
  currentStep: number;
  steps: { label: string }[];
}

export function StepIndicator({ currentStep, steps }: StepIndicatorProps) {
  return (
    <nav aria-label="Progress" className="mb-8">
      <ol className="flex items-center justify-center gap-2">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;
          const isUpcoming = index > currentStep;

          return (
            <li key={index} className="flex items-center">
              {/* Step circle */}
              <div className="flex flex-col items-center">
                <div
                  className={`
                    flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-semibold transition-all
                    ${
                      isCompleted || isActive
                        ? 'border-blue-800 bg-blue-800 text-white'
                        : 'border-gray-300 bg-white text-gray-400'
                    }
                    ${isActive ? 'ring-4 ring-blue-200' : ''}
                  `}
                >
                  {index + 1}
                </div>
                {/* Step label */}
                <span
                  className={`
                    mt-2 hidden text-sm sm:block
                    ${isActive ? 'font-medium text-blue-900' : 'text-gray-600'}
                  `}
                >
                  {step.label}
                </span>
              </div>

              {/* Connecting line */}
              {index < steps.length - 1 && (
                <div
                  className={`
                    mx-2 h-0.5 w-12 transition-all sm:w-16
                    ${isCompleted ? 'bg-blue-800' : 'bg-gray-300'}
                  `}
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
