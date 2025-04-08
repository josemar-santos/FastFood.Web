import { request } from "@/common/libs/axios";
import { HttpStatus } from "@/common/utils";
import { toast } from "sonner";
import { ICreateExtraSchema } from "../schema/extra";

export async function createExtraService(food: string, data: ICreateExtraSchema) {
  try {

    const response = await request.post("extra", {
        food,
        name: data.name,
        price: Number(data.price),
        increase: data.increase
    });

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
