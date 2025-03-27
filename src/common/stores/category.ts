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
  loading: boolean;
};

type Action = {
  fetch: () => void;
  resize: (size: string) => void;
  nextPage: (page: number) => void;
  search: (name: string) => void;
};

export const useCategory = create<State & Action>((set, get) => ({
  loading: false,
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
      set((state) => ({
        ...state,
        loading: true,
      }));

      const { params } = get();

      const pathparams = new URLSearchParams({
        page: params.page.toString(),
        perPage: params.perPage.toString(),
      });

      if(params.name) pathparams.append("name", params.name);
      
      const response = await axios.get<Page<Category>>(
        `${baseUrl}/category?${pathparams.toString()}`
      );

      if (response.status === HttpStatus.OK) {
        set((state) => ({
          ...state,
          categories: response.data.content,
          meta: response.data.meta,
          loading: false,
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

  search: (name: string) => {
    set((state) => ({
      ...state,
      params: {
        ...state.params,
        name: name,
      },
    }));
  },
}));
