import { request } from "../../../common/libs/axios";
import { HttpStatus } from "../../../common/utils";
import { Extra } from "../interface/extra";

export async function getExtraService(id: string): Promise<Extra[]> {
  const response = await request.get<Extra[]>(`/extra/${id}`);

  if (response.status === HttpStatus.OK) {
    return response.data;
  }
  return [];
}
