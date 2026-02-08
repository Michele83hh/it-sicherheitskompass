import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface PDFSectionKeys {
  penalty: boolean;
  costSummary: boolean;
  roadmap: boolean;
  dsgvoOverlap: boolean;
  iso27001: boolean;
  dinSpec: boolean;
  evidence: boolean;
  sectorGuidance: boolean;
  kritis: boolean;
  progress: boolean;
}

export type PDFSectionKey = keyof PDFSectionKeys;

interface PDFSectionsState {
  sections: PDFSectionKeys;
  toggleSection: (key: PDFSectionKey) => void;
  selectAll: () => void;
  deselectAll: () => void;
}

const ALL_TRUE: PDFSectionKeys = {
  penalty: true,
  costSummary: true,
  roadmap: true,
  dsgvoOverlap: true,
  iso27001: true,
  dinSpec: true,
  evidence: true,
  sectorGuidance: true,
  kritis: true,
  progress: true,
};

const ALL_FALSE: PDFSectionKeys = {
  penalty: false,
  costSummary: false,
  roadmap: false,
  dsgvoOverlap: false,
  iso27001: false,
  dinSpec: false,
  evidence: false,
  sectorGuidance: false,
  kritis: false,
  progress: false,
};

export const usePdfSectionsStore = create<PDFSectionsState>()(
  persist(
    (set) => ({
      sections: { ...ALL_TRUE },
      toggleSection: (key) =>
        set((state) => ({
          sections: { ...state.sections, [key]: !state.sections[key] },
        })),
      selectAll: () => set({ sections: { ...ALL_TRUE } }),
      deselectAll: () => set({ sections: { ...ALL_FALSE } }),
    }),
    {
      name: 'nis2-pdf-sections-storage',
    }
  )
);
