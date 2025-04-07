import z from "zod";
import { MAX_SIZE, validImage } from "./create-food";

export const UpdateFoodSchema = z.object({
  name: z.string().min(1, "O nome é obrigátorio"),
  description: z.string().optional(),
  price: z.string().min(1, "O Preço é obrigátorio"),
  time: z.string().min(1, "O Tempo de Preparo é obrigátorio"),
  category: z.string().min(1, "Categoria é obrigátorio"),
  image: z
    .any()
    .refine(
      (fileList) => {
        if (!fileList || fileList.length === 0) return true;
        const file = fileList[0];
        return validImage.includes(file.type);
      },
      { message: "Apenas imagens PNG ou JPEG são permitidas" }
    )
    .refine(
      (fileList) => {
        if (!fileList || fileList.length === 0) return true;
        const file = fileList[0];
        return file.size <= MAX_SIZE;
      },
      { message: "O arquivo deve ter no máximo 2MB" }
    )
    .optional(),
});
export type IUpdateFoodSchema = z.infer<typeof UpdateFoodSchema>;
