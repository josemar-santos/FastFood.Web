import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateCategoryschema,
  CreateCategorySchemaType,
} from "../../schema/create";
import { useState } from "react";
import { Plus } from "lucide-react";
import { useCategory } from "@/common/stores";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/common/libs/shadcn/components/ui/dialog";
import { Button } from "@/common/libs/shadcn/components/ui/button";
import { Input } from "@/common/libs/shadcn/components/ui/input";
import { Label } from "@/common/libs/shadcn/components/ui/label";
import { Textarea } from "@/common/libs/shadcn/components/ui/textarea";
import { createCategoryService } from "../../services";
import { Separator } from "@/common/libs/shadcn/components/ui/separator";

export const Create = () => {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateCategorySchemaType>({
    resolver: zodResolver(CreateCategoryschema),
  });
  const retriveCategories = useCategory((state) => state.fetch);

  const onSubmit = async (value: CreateCategorySchemaType) => {
    const response = await createCategoryService(value);

    if (response) {
      reset();
      retriveCategories();
      setOpen(false);
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
