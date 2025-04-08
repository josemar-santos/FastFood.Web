import { zodResolver } from "@hookform/resolvers/zod";
import { SquarePen } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/common/libs/shadcn/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/common/libs/shadcn/components/ui/dialog";
import { Input } from "@/common/libs/shadcn/components/ui/input";
import { Label } from "@/common/libs/shadcn/components/ui/label";
import { Textarea } from "@/common/libs/shadcn/components/ui/textarea";
import { useCategory } from "@/common/stores";
import { HttpStatus } from "@/common/utils";
import { Category } from "../../interface/category";
import { updateSchema, UpdateschemaType } from "../../schema/update";
import { Separator } from "@/common/libs/shadcn/components/ui/separator";
import { request } from "@/common/libs/axios";

type UpdateProps = {
  category: Category;
};

export const Update = ({ category }: UpdateProps) => {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
    reset,
  } = useForm<UpdateschemaType>({
    resolver: zodResolver(updateSchema),
    defaultValues: {
      name: category.name,
      description: category.description,
    },
  });
  const retriveCategories = useCategory((state) => state.fetch);
  const onSubmit = async (values: UpdateschemaType) => {
    try {
      if (isValid) {
        const formRequest = new FormData();

        formRequest.append("name", values.name);
        formRequest.append("description", values.description || "");

        if (values.icon?.[0]) {
          formRequest.append("icon", values.icon[0]);
        }

        const response = await request.put(`/category/${category.id}`, formRequest);

        if (response.status === HttpStatus.OK) {
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
          <Button
            variant="ghost"
            className="text-emerald-600 cursor-pointer hover:bg-emerald-600 hover:text-emerald-300"
          >
            <SquarePen />
          </Button>
        </DialogTrigger>
        <DialogContent className="top-[30%]">
          <DialogHeader>
            <DialogTitle>Criar Categoria</DialogTitle>
          </DialogHeader>

          <Separator />
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
              <Label htmlFor="icon">Icone</Label>
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
