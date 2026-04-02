import { create } from "zustand";

interface FilterState {
  showVisited: boolean;
  showUnvisited: boolean;
  toggleVisited: () => void;
  toggleUnvisited: () => void;
}

export const useSearchFilterStore = create<FilterState>((set) => ({
  showVisited: false,
  showUnvisited: false,
  toggleVisited: () => set((state) => ({ showVisited: !state.showVisited })),
  toggleUnvisited: () =>
    set((state) => ({ showUnvisited: !state.showUnvisited })),
}));
