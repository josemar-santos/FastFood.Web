import axios from "axios";
import { Category } from "../../category/interface/category";
import { baseUrl, HttpStatus } from "../../../common/utils";

export async function getCategories(): Promise<Category[]> {
  const response = await axios.get<Category[]>(`${baseUrl}/category/dropdown`);

  if (response.status === HttpStatus.OK) {
    return response.data;
  }

  return []
}
