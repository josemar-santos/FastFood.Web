import { create } from "zustand";
import { Food } from "../../admin/food/interface/food";
import { baseUrl, HttpStatus } from "../utils";
import { Meta, Page } from "../interfaces/page";
import axios from "axios";
import { FoodPagination } from "../../admin/food/interface/food-page";

type State = {
  loading: boolean;
  foods: Food[];
  params: FoodPagination;
  meta: Meta
};

type Action = {
  retrive: () => void;
  goTo: (page: number) => void;
};

export const useFood = create<State & Action>((set, get) => ({
  loading: false,
  foods: [],
  params: {
    page: 1,
    perPage: 5
  },
  meta: {
    page: 1,
    perPage: 5,
    total: 0,
  },
  retrive: async () => {
    try {
      set((state) => ({
        ...state,
        loading: true,
      }));

      const { params } = get();

      const pathparams = new URLSearchParams({
        page: params.page.toString(),
        perPage: params.perPage.toString()
      });

      if (params.name) pathparams.append("name", params.name);

      const response = await axios.get<Page<Food>>(
        `${baseUrl}/food?${pathparams.toString()}`
      );

      if (response.status === HttpStatus.OK) {
        set((state) => ({
          ...state,
          foods: response.data.content,
          meta: response.data.meta,
          loading: false,
        }));
      }
    } catch (error) {
      set((state) => ({
        ...state,
        loading: false,
        foods: [],
      }));
    }
  },

  goTo: (page: number) => {
    set((state) => ({
      ...state,
      params: {
        ...state.params,
        page: page,
      },
    }));
  },
}));
