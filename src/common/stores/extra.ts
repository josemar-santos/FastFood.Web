import { create } from "zustand";
import { getExtraService } from "../../admin/food/services";
import { Extra } from "../../admin/food/interface/extra";

type Action = {
  food: string;
  extras: Extra[]
};

type State = {
  setFood: (id: string) => void;
  retrive: () => void;
};
export const useExtra = create<Action & State>((set, get) => ({
  food: "",
  extras: [],
  retrive: async() => {

    const { food: id } = get();
    const extras = await getExtraService(id);

    set((state)=>({
        ...state,
        extras
    }))
  },
  setFood(id: string) {
    set((state) => ({
      ...state,
      food: id,
    }));
  },
}));
