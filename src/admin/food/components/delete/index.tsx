import { Trash2, TriangleAlert } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/common/libs/shadcn/components/ui/alert-dialog";
import { Button } from "@/common/libs/shadcn/components/ui/button";
import { Update_Food_Props } from "../update";
import { useFood } from "@/common/stores";
import { deleteFoodService } from "../../services/delete-food";

export const Delete_Food = ({ identifier }: Update_Food_Props) => {
  const retriveFood = useFood(state => state.retrive);

  const remove = async() => {
    const sucess = await deleteFoodService(identifier);

    if(sucess) retriveFood();
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
              <div className="flex justify-center mb-2 text-red-500">
                <TriangleAlert size={80} />
              </div>
              <p className="text-center">
                Esta ação é irreversível. Se excluir esta categoria, não poderá
                recuperá-la
              </p>
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
