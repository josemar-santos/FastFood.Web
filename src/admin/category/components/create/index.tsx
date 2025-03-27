import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema, SchemaType } from "../../schema/create";
import axios from "axios";
import { toast } from "sonner";
import { useState } from "react";
import { Plus } from "lucide-react";
import { useCategory } from "../../../../common/stores";
import { baseUrl, HttpStatus } from "../../../../common/utils";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../common/libs/shadcn/components/ui/dialog";
import { Button } from "../../../../common/libs/shadcn/components/ui/button";
import { Input } from "../../../../common/libs/shadcn/components/ui/input";
import { Label } from "../../../../common/libs/shadcn/components/ui/label";
import { Textarea } from "../../../../common/libs/shadcn/components/ui/textarea";

export const Create = () => {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
    reset,
  } = useForm<SchemaType>({
    resolver: zodResolver(schema),
  });
  const retriveCategories = useCategory((state) => state.fetch);
  const onSubmit = async (values: SchemaType) => {
    try {
      if (isValid) {
        const formRequest = new FormData();

        formRequest.append("name", values.name);
        formRequest.append("image", values.icon[0]);
        formRequest.append("description", values.description || "");

        const response = await axios.post(`${baseUrl}/category`, formRequest);

        if (response.status === HttpStatus.CREATED) {
          reset();
          setOpen(false);
          toast.success("Criado com sucesso", {
            description: response.data.message,
            closeButton: true,
          });
          retriveCategories();
        }
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
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>
            <Plus />
            Novo
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Criar Categoria</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="name">
                Nome <span className="text-destructive">*</span>
              </Label>
              <Input
                type="text"
                id="name"
                placeholder="Nome da Categoria"
                {...register("name")}
                aria-invalid={errors.name ? true : false}
              />
              {errors.name && (
                <span className="text-destructive text-sm">
                  {errors.name.message}
                </span>
              )}
            </div>

            <div>
              <Label htmlFor="icon">
                Icone <span className="text-destructive">*</span>
              </Label>
              <Input
                type="file"
                id="icon"
                accept="image/*"
                placeholder="Icone"
                {...register("icon")}
                aria-invalid={errors.icon ? true : false}
              />
              {errors.icon && (
                <span className="text-destructive text-sm">
                  {errors.icon.message}
                </span>
              )}
            </div>

            <div>
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                placeholder="Digitar Descrição."
                {...register("description")}
                aria-invalid={errors.description ? true : false}
              />
              {errors.description && (
                <span className="text-destructive text-sm">
                  {errors.description.message}
                </span>
              )}
            </div>

            <DialogFooter>
              <Button type="submit">Salvar</Button>

              <DialogClose onClick={() => reset()} asChild>
                <Button variant="destructive">Cancelar</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
