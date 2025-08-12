// stores/branchStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface BranchState {
  branch: string;
  setBranch: (branchId: string) => void;
}

export const useBranchStore = create<BranchState>()(
  persist(
    (set) => ({
      branch: "",
      setBranch: (branchId: string) => set({ branch: branchId }),
    }),
    {
      name: "branch-storage", 
      getStorage: () => localStorage,
    }
  )
);
