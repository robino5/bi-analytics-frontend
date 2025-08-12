// stores/branchStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TraderState {
  trader: string;
  setTrader: (trader: string) => void;
}

export const useTraderStore = create<TraderState>()(
  persist(
    (set) => ({
      trader: "amirul.pathan",
      setTrader: (trader: string) => set({ trader: trader }),
    }),
    {
      name: "trader-storage", 
      getStorage: () => localStorage,
    }
  )
);
