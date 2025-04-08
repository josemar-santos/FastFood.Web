
import { Category } from "../../category/interface/category";
import { HttpStatus } from "@/common/utils";
import { request } from "@/common/libs/axios";

export async function getCategories(): Promise<Category[]> {
  const response = await request.get<Category[]>('/category/dropdown');

  if (response.status === HttpStatus.OK) {
    return response.data;
  }

  return []
}
