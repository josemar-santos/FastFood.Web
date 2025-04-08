
import { CreateCategorySchemaType } from "../schema/create";
import { HttpStatus } from "@/common/utils";
import { toast } from "sonner";
import { request } from "@/common/libs/axios";

export async function createCategoryService(data: CreateCategorySchemaType) {
  try {
    const formRequest = new FormData();

    formRequest.append("name", data.name);
    formRequest.append("image", data.icon[0]);
    formRequest.append("description", data.description || "");

    const response = await request.post('/category', formRequest);

    if (response.status === HttpStatus.CREATED) {
     
      toast.success("Criado com sucesso", {
        description: response.data.message,
        closeButton: true,
      });
      
      return true;
    }

    return false
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
