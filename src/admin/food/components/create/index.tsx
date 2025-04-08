import { Plus, SquareX } from "lucide-react";
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
import { useEffect, useState } from "react";
import clsx from "clsx";
import { Spinner } from "@/common/components/spinner";
import { useForm } from "react-hook-form";
import { CreateFoodSchema, ICreateFoodSchema } from "../../schema/create-food";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/common/libs/shadcn/components/ui/label";
import { Input } from "@/common/libs/shadcn/components/ui/input";
import { Textarea } from "@/common/libs/shadcn/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/common/libs/shadcn/components/ui/select";
import { Category } from "../../../category/interface/category";
import { getCategories } from "../../services";
import { createFoodService } from "../../services/create-food";
import { useFood } from "@/common/stores";
import { Separator } from "@/common/libs/shadcn/components/ui/separator";

export const Create_Food = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const retriveFood = useFood(state => state.retrive);

  const {
    handleSubmit,
    register,
    setValue,
    trigger,
    reset,
    formState: { errors },
  } = useForm<ICreateFoodSchema>({
    resolver: zodResolver(CreateFoodSchema)
  });

  const onSubmit = async (data: ICreateFoodSchema) => {
    setLoading(true);

    const sucess = await createFoodService(data);

    if(sucess) {
      resetAll();
      retriveFood();
      setOpen(false);
    }

    setLoading(false);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  const resetAll = () => {
    reset()
    setImagePreview(null);
  }
  useEffect(() => {
    async function defineCategories() {
      const categories = await getCategories();
      console.log(categories);
      setCategories(categories);
    }
    defineCategories();
  }, []);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>
            <Plus />
            Novo
          </Button>
        </DialogTrigger>
        <DialogContent className="top-[45%]">
          <DialogHeader>
            <DialogTitle>Criar Categoria</DialogTitle>
          </DialogHeader>
          <Separator />

          {!loading ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <div
                  className={clsx(
                    "w-32 h-32 border rounded-md relative text-gray-600",
                    errors.image ? "border-red-500 text-red-500" : ""
                  )}
                >
                  <label
                    className="size-full  flex items-center justify-center overflow-hidden"
                    htmlFor="icon"
                  >
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Prévia"
                        className="size-[92%] object-cover rounded-md"
                      />
                    ) : (
                      <span className=" text-center text-sm">
                        Selecionar imagem
                      </span>
                    )}
                  </label>
                  <input
                    type="file"
                    id="icon"
                    accept="image/*"
                    className="hidden"
                    {...register("image", { onChange: handleImageChange })}
                  />

                  {imagePreview && (
                    <div className="absolute top-1 right-1 z-20">
                      <button
                        type="button"
                        className="text-slate-500 cursor-pointer hover:bg-slate-50"
                        onClick={() => setImagePreview(null)}
                      >
                        {" "}
                        <SquareX />
                      </button>
                    </div>
                  )}
                </div>
                {errors.image?.message && (
                  <span className="text-destructive text-sm">
                    {typeof errors.image.message === "string"
                      ? errors.image.message
                      : JSON.stringify(errors.image.message)}
                  </span>
                )}
              </div>

              <div className="space-y-1">
                <Label htmlFor="name">
                  Nome da Comida <span className="text-destructive">*</span>
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

              <div className="flex gap-2">
                <div className="space-y-1 w-full">
                  <Label htmlFor="price">
                    Preço <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    type="number"
                    id="price"
                    placeholder="0.0 kz"
                    {...register("price")}
                    aria-invalid={errors.price ? true : false}
                  />
                  {errors.price && (
                    <span className="text-destructive text-sm">
                      {errors.price.message}
                    </span>
                  )}
                </div>
                <div className="space-y-1 w-full">
                  <Label htmlFor="time">
                    Tempo de Preparo <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    type="time"
                    id="time"
                    placeholder="0.0 kz"
                    {...register("time")}
                    className="w-full"
                    aria-invalid={errors.time ? true : false}
                  />
                  {errors.time && (
                    <span className="text-destructive text-sm">
                      {errors.time.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="category">
                  Categoria <span className="text-destructive">*</span>
                </Label>
                <Select onValueChange={(e) => {
                    setValue('category', e)
                    trigger('category')
                }}>
                  <SelectTrigger className={clsx("w-full", errors.category && "border-destructive")} id="category">
                    <SelectValue aria-invalid={errors.category ? true : false} placeholder="Selecionar Categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem value={category.id} key={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category && (
                  <span className="text-destructive text-sm">
                    {errors.category.message}
                  </span>
                )}
              </div>

              <div className="space-y-1">
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
