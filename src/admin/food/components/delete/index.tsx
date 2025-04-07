import { Trash2 } from "lucide-react";
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
} from "../../../../common/libs/shadcn/components/ui/alert-dialog";
import { Button } from "../../../../common/libs/shadcn/components/ui/button";

export const Delete_Food = () => {
  const remove = () => {};
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
