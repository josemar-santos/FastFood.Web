import { request } from "../../../common/libs/axios";
import { HttpStatus } from "../../../common/utils";
import { Food } from "../interface/food";

export async function getFood(id: string): Promise<Food | null> {
  const response = await request.get<Food>(`/food/${id}`);

  if (response.status === HttpStatus.OK) {
    return response.data;
  }

  return null;
}
