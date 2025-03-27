import { z } from 'zod'
export const schema = z.object({
    name: z.string().min(1, "O nome é obrigatório"),
    description: z.string().optional(),
    icon: z
        .custom<FileList>((fileList) => fileList instanceof FileList && fileList.length > 0, {
            message: "O ícone é obrigatório",
        })
        .refine((fileList) => {
            const file = fileList?.[0];
            return file && ["image/png", "image/jpeg"].includes(file.type);
        }, { message: "Apenas imagens PNG ou JPEG são permitidas" })
        .refine((fileList) => {
            const file = fileList?.[0];
            return file && file.size <= 2 * 1024 * 1024;
        }, { message: "O arquivo deve ter no máximo 2MB" }),
});

export type SchemaType = z.infer<typeof schema>;