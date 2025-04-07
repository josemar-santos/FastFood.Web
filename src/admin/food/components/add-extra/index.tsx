import { Separator } from "@radix-ui/react-separator";
import { Spinner } from "../../../../common/components/spinner";
import { Button } from "../../../../common/libs/shadcn/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../common/libs/shadcn/components/ui/dialog";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Label } from "../../../../common/libs/shadcn/components/ui/label";
import { Input } from "../../../../common/libs/shadcn/components/ui/input";
import { CreateExtraSchema, ICreateExtraSchema } from "../../schema/extra";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "../../../../common/libs/shadcn/components/ui/checkbox";
import { useExtra } from "../../../../common/stores/extra";
import { createExtraService } from "../../services/create-extra";

export const Add_Extra = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const retrive = useExtra(state => state.retrive);
  const food = useExtra(state => state.food);
  const {
    handleSubmit,
    register,
    setValue,
    watch,
    trigger,
    reset,
    formState: { errors },
  } = useForm<ICreateExtraSchema>({
    resolver: zodResolver(CreateExtraSchema),
    defaultValues: { increase: true, price: 0 },
  });

  const onSubmit = async (data: ICreateExtraSchema) => {

    setLoading(true);

const sucess = await createExtraService(food, data);

    if(sucess) {
      reset();
      retrive();
      setOpen(false);
    }
    setLoading(false);
  };
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="cursor-pointer">
            <Plus />
            Adicionar Extra
          </Button>
        </DialogTrigger>
        <DialogContent className="top-[45%]">
          <DialogHeader>
            <DialogTitle>Criar Categoria</DialogTitle>
          </DialogHeader>
          <Separator />

          {!loading ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name">
                  Nome do Extra <span className="text-destructive">*</span>
                </Label>
                <Input
                  type="text"
                  id="name"
                  placeholder="Nome da comida"
                  {...register("name")}
                  aria-invalid={errors.name ? true : false}
                />
                {errors.name && (
                  <span className="text-destructive text-sm">
                    {errors.name.message}
                  </span>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">
                  Preço do Extra <span className="text-destructive">*</span>
                </Label>
                <Input
                  type="number"
                  id="price"
                  placeholder="Preço do extra"
                  {...register("price")}
                  aria-invalid={errors.price ? true : false}
                />
                {errors.price && (
                  <span className="text-destructive text-sm">
                    {errors.price.message}
                  </span>
                )}
              </div>
              <div className="space-y-2">
                <div className="flex gap-2 items-center">
                  <Checkbox
                    id="increase"
                    checked={watch("increase")}
                    onCheckedChange={(checked) => {
                      setValue("increase", !!checked);
                      trigger("increase");
                    }}
                    aria-invalid={errors.price ? true : false}
                  />
                  <Label htmlFor="increase">Alterar Valor do Preço</Label>
                </div>
                {errors.increase && (
                  <span className="text-destructive text-sm">
                    {errors.increase.message}
                  </span>
                )}
              </div>

              <DialogFooter>
                <Button type="submit" disabled={loading}>
                  Salvar
                </Button>

                <DialogClose asChild>
                  <Button variant="destructive">Cancelar</Button>
                </DialogClose>
              </DialogFooter>
            </form>
          ) : (
            <Spinner />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
