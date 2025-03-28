import { ICreateFoodSchema } from "../schema/create-food";
import { request } from "../../../common/libs/axios";
import { HttpStatus } from "../../../common/utils";
import { toast } from "sonner";

export async function createFoodService(data: ICreateFoodSchema) {
  try {
    const form = new FormData();

    form.append("name", data.name);
    form.append("image", data.image[0]);
    form.append("time", data.time);
    form.append("price", data.price);
    form.append("category", data.category);
    form.append("description", data.description ?? "");

    const response = await request.post("food", form);

    if (response.status === HttpStatus.CREATED) {
      toast.success("Criado com sucesso", {
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
