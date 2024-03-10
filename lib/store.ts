import { create } from "zustand";

export type State = {
  branchCode: number | null;
  managerId: string;
};

export type Actions = {
  setBranch: (branchCode: number) => void;
  setManager: (managerId: string) => void;
  reset: () => void;
};

const initialState: State = {
  branchCode: 0,
  managerId: "",
};

export const useTaskStore = create<State & Actions>()((set) => ({
  ...initialState,
  setBranch: (branchCode: number) => {
    set({ branchCode: branchCode });
  },
  setManager: (managerId: string) => {
    set({ managerId: managerId });
  },
  reset: () => {
    set(initialState)
  }
}));
