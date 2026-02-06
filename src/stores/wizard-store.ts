import { create } from 'zustand';

interface WizardState {
  currentStep: number;
  setStep: (step: number) => void;
  reset: () => void;
}

export const useWizardStore = create<WizardState>((set) => ({
  currentStep: 0,
  setStep: (step) => set({ currentStep: step }),
  reset: () => set({ currentStep: 0 }),
}));
