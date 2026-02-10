import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ClassificationInput, ClassificationResult } from '@/lib/regulations/nis2/types';

interface WizardState {
  // Navigation state
  currentStep: number;
  totalSteps: number;

  // Form data (persisted to localStorage)
  formData: Partial<ClassificationInput>;
  classificationResult: ClassificationResult | null;

  // Actions
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  updateFormData: (data: Partial<ClassificationInput>) => void;
  setClassificationResult: (result: ClassificationResult) => void;
  reset: () => void;
}

export const useWizardStore = create<WizardState>()(
  persist(
    (set, get) => ({
      currentStep: 0,
      totalSteps: 3,
      formData: {},
      classificationResult: null,

      setStep: (step) => set({ currentStep: step }),
      nextStep: () =>
        set((state) => ({
          currentStep: Math.min(state.currentStep + 1, state.totalSteps - 1),
        })),
      prevStep: () =>
        set((state) => ({
          currentStep: Math.max(state.currentStep - 1, 0),
        })),
      updateFormData: (data) =>
        set((state) => ({
          formData: { ...state.formData, ...data },
        })),
      setClassificationResult: (result) => set({ classificationResult: result }),
      reset: () => set({ currentStep: 0, formData: {}, classificationResult: null }),
    }),
    {
      name: 'nis2-wizard-storage', // localStorage key
      partialize: (state) => ({
        formData: state.formData,
        currentStep: state.currentStep,
        classificationResult: state.classificationResult,
      }), // Only persist these
    }
  )
);
