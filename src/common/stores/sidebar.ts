import { create } from "zustand";

type State = {
  status: boolean;
};

type Action = {
  toggle: () => void;
};

export const useSidebarStore = create<State & Action>((set) => ({
  status: false,
  toggle: () => set((state) => ({ status: !state.status })),
}));
