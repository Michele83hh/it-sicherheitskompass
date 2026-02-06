import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ClassificationInput } from '@/lib/nis2/types';

interface WizardState {
  // Navigation state
  currentStep: number;
  totalSteps: number;

  // Form data (persisted to localStorage)
  formData: Partial<ClassificationInput>;

  // Actions
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  updateFormData: (data: Partial<ClassificationInput>) => void;
  reset: () => void;
}

export const useWizardStore = create<WizardState>()(
  persist(
    (set, get) => ({
      currentStep: 0,
      totalSteps: 3,
      formData: {},

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
      reset: () => set({ currentStep: 0, formData: {} }),
    }),
    {
      name: 'nis2-wizard-storage', // localStorage key
      partialize: (state) => ({
        formData: state.formData,
        currentStep: state.currentStep,
      }), // Only persist these
    }
  )
);
