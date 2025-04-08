import { request } from "@/common/libs/axios";
import { HttpStatus } from "@/common/utils";
import { toast } from "sonner";
import { IUpdateFoodSchema } from "../schema/update-food";

export async function updateFoodService(id: string, data: IUpdateFoodSchema) {
  try {
    const form = new FormData();

    form.append("name", data.name);
    form.append("time", data.time);
    form.append("price", data.price);
    form.append("category", data.category);

    if(data.image) form.append("image", data.image[0]);
    if(data.description) form.append("description", data.description);

    const response = await request.put(`/food/${id}`, form);

    if (response.status === HttpStatus.OK) {
      toast.success("Atualizado com sucesso", {
        description: response.data.message,
        closeButton: true,
      });

      return true;
    }

    return false;
  } catch (error: any) {
    if (error.response?.data?.message) {
      const messages = error.response.data.message;

      if (typeof messages === "string") {
        toast.error("Ocorreu um erro", {
          description: messages,
          closeButton: true,
        });
      } else if (Array.isArray(messages)) {
        messages.forEach((msg) =>
          toast.error("Ocorreu um erro", {
            description: msg,
            closeButton: true,
          })
        );
      }
    } else {
      toast.error("Ocorreu um erro", {
        description: "Tente novamente mais tarde.",
        closeButton: true,
      });
    }

    return false;
  }
}
