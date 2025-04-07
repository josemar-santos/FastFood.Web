import z from "zod";

export const validImage = ["image/png", "image/jpeg", "image/webp", "image/jpg", "image/tiff", "image/svg"];
export const MAX_SIZE = 5 * 1024 * 1024;

export const CreateFoodSchema = z.object({
  name: z.string().min(1, "O nome é obrigátorio"),
  description: z.string().optional(),
  price: z.string().min(1, "O Preço é obrigátorio"),
  time: z.string().min(1, "O Tempo de Preparo é obrigátorio"),
  category: z.string().min(1, "Categoria é obrigátorio"),
  image: z
    .custom<FileList>(
      (fileList) => fileList instanceof FileList && fileList.length > 0,
      {
        message: "O imagem é obrigatório",
      }
    )
    .refine(
      (fileList) => {
        const file = fileList?.[0];
        return (
          
          file && validImage.includes(file.type)
        );
      },
      { message: "Apenas imagens PNG ou JPEG são permitidas" }
    )
    .refine(
      (fileList) => {
        const file = fileList?.[0];
        return file && file.size <= MAX_SIZE;
      },
      { message: "O arquivo deve ter no máximo 2MB" }
    ),
});
export type ICreateFoodSchema = z.infer<typeof CreateFoodSchema>;
