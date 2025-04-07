import { request } from "../../../common/libs/axios";
import { HttpStatus } from "../../../common/utils";
import { toast } from "sonner";

export async function deleteFoodService(id: string) {
  try {
    const response = await request.delete(`/food/${id}`);

    if (response.status === HttpStatus.OK) {
      toast.success("Eliminado com sucesso", {
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
