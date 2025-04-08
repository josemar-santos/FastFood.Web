import { SquarePen, SquareX } from "lucide-react";
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
import { Separator } from "@radix-ui/react-separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Label } from "@/common/libs/shadcn/components/ui/label";
import { Input } from "@/common/libs/shadcn/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/common/libs/shadcn/components/ui/select";
import { Textarea } from "@/common/libs/shadcn/components/ui/textarea";
import { Spinner } from "@/common/components/spinner";
import clsx from "clsx";
import { Category } from "../../../category/interface/category";
import { getCategories, getFood } from "../../services";
import { Food } from "../../interface/food";
import { baseUrl } from "@/common/utils";
import { updateFoodService } from "../../services/update-food";
import { useFood } from "@/common/stores";
import { IUpdateFoodSchema, UpdateFoodSchema } from "../../schema/update-food";

export type Update_Food_Props = {
  identifier: string;
};
export const Update_Food = ({ identifier }: Update_Food_Props) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentFood, setCurrentFood] = useState<Food>();
  const [image, setImage] = useState<string>();
  const retriveFood = useFood((state) => state.retrive);
  const {
    handleSubmit,
    register,
    setValue,
    trigger,
    reset,
    formState: { errors },
  } = useForm<IUpdateFoodSchema>({
    resolver: zodResolver(UpdateFoodSchema),
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  const onSubmit = async (data: IUpdateFoodSchema) => {
    setLoading(true);

    const sucess = await updateFoodService(identifier, data);

    if (sucess) {
      resetAll();
      retriveFood();
      setOpen(false);
    }

    setLoading(false);
  };

  const resetAll = () => {
    reset();
    setImagePreview(null);
  };

  useEffect(() => {
    async function loadData() {
      setLoading(true);

      const [categories, food] = await Promise.all([
        getCategories(),
        getFood(identifier),
      ]);

      setCategories(categories);

      if (food) {
        setCurrentFood(food);
        setValue("name", food.name);
        setValue("description", food.description);
        setValue("price", food.price.toString());
        setValue("time", food.time);
        setValue("category", food.category_id);
        setImage(`${baseUrl}/upload/${food.image}`);
      }

      setLoading(false);
    }

    if (identifier) {
      loadData();
    }
  }, [identifier]);
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
        <DialogContent className="top-[49%]">
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
                    {imagePreview || image ? (
                      <img
                        src={imagePreview || image}
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
                <p></p>
                <Label htmlFor="category">
                  Categoria <span className="text-destructive">*</span>
                </Label>
                <Select
                  defaultValue={currentFood?.category_id}
                  onValueChange={(e) => {
                    setValue("category", e);
                    trigger("category");
                  }}
                >
                  <SelectTrigger
                    className={clsx(
                      "w-full",
                      errors.category && "border-destructive"
                    )}
                    id="category"
                  >
                    <SelectValue
                      aria-invalid={errors.category ? true : false}
                      placeholder="Selecionar Categoria"
                    />
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
