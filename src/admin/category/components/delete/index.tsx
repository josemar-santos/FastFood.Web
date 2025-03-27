import axios from "axios";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useCategory } from "../../../../common/stores";
import { baseUrl, HttpStatus } from "../../../../common/utils";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../../../../common/libs/shadcn/components/ui/alert-dialog";
import { Button } from "../../../../common/libs/shadcn/components/ui/button";

export interface CategoryDeleteProps {
  category: string;
}
export const CategoryDelete = ({ category }: CategoryDeleteProps) => {
  const retriveCategories = useCategory((state) => state.fetch);
  const remove = async () => {
    try {
      const response = await axios.delete(`${baseUrl}/category/${category}`);

      if (response.status === HttpStatus.OK) {
        toast.success("Realizado com sucesso", {
          description: response.data.message,
          closeButton: true,
        });
        retriveCategories();
      }
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
    }
  };
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="ghost"
            className="text-red-600 hover:bg-red-600 hover:text-red-300 cursor-pointer"
          >
            <Trash2 />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Tem a certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação é irreversível. Se excluir esta categoria, não poderá
              recuperá-la.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => remove()}>
              Continuar
            </AlertDialogAction>
            <AlertDialogCancel className="bg-red-500 border-0 text-red-200 hover:bg-red-700 hover:text-red-200">
              Cancelar
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
