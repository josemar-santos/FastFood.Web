import { create } from "zustand";
import axios from "axios";
import { baseUrl, HttpStatus } from "../utils";
import { Meta, Page } from "../interfaces/page";
import { CategoryMeta } from "../../admin/category/interface/pagination";
import { Category } from "../../admin/category/interface/category";

type State = {
  categories: Array<Category>;
  selected: string[];
  meta: Meta;
  params: CategoryMeta;
};

type Action = {
  fetch: () => void;
  resize: (size: string) => void;
  nextPage: (page: number) => void;
};

export const useCategory = create<State & Action>((set, get) => ({
  categories: [],
  selected: [],
  params: {
    page: 1,
    perPage: 5,
    name: undefined,
  },
  meta: {
    page: 1,
    perPage: 5,
    total: 0,
  },
  fetch: async () => {
    try {
      const { params } = get();

      const Pathparams = new URLSearchParams({
        page: params.page.toString(),
        perPage: params.perPage.toString(),
      });

      const response = await axios.get<Page<Category>>(
        `${baseUrl}/category?${Pathparams.toString()}`
      );

      if (response.status === HttpStatus.OK) {
        set((state) => ({
          ...state,
          categories: response.data.content,
          meta: response.data.meta,
        }));
      }
    } catch (error) {}
  },
  resize: (size) => {
    set((state) => ({
      ...state,
      params: {
        ...state.params,
        perPage: Number(size),
      },
    }));
  },
  nextPage: (page: number) => {
    set((state) => ({
      ...state,
      params: {
        ...state.params,
        page: page,
      },
    }));
  },
}));
