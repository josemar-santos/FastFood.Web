import { CategoryDelete } from "../delete";
import { useEffect } from "react";
import { Update } from "../update";
import { toast } from "sonner";
import { useCategory } from "@/common/stores";
import { baseUrl, HttpStatus } from "@/common/utils";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/common/libs/shadcn/components/ui/table";
import { Switch } from "@/common/libs/shadcn/components/ui/switch";
import { Spinner } from "@/common/components/spinner";
import { Table_Animation } from "@/common/components/table-animation";
import { request } from "@/common/libs/axios";

export const CategoryTable = () => {
  const categories = useCategory((state) => state.categories);
  const retriveCategories = useCategory((state) => state.fetch);
  const loading = useCategory((state) => state.loading);

  useEffect(() => {
    retriveCategories();
  }, []);

  const toggle = async (id: string) => {
    try {
      const response = await request.patch(`/category/${id}`);

      if (response.status === HttpStatus.OK) {
        toast.success("Realizado com sucesso", {
          description: response.data.message,
          closeButton: true,
        });
        retriveCategories();
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
      {loading ? (
        <Spinner />
      ) : (
        <Table_Animation>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px] text-center">#</TableHead>
                <TableHead className="w-[30%]">Categoria</TableHead>
                <TableHead className="text-center w-[20%]">Criado Em</TableHead>
                <TableHead className="text-center w-[10%]">Estado</TableHead>
                <TableHead className="text-center">Acções</TableHead>
              </TableRow>
            </TableHeader>
            {categories.length > 0 ? (
              <TableBody>
                {categories.map((category, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-center"> {index + 1}</TableCell>
                    <TableCell>
                      <span className="flex items-center gap-3">
                        <img
                          src={`${baseUrl}/upload/${category.icon}`}
                          alt={`imagem de ${category.name}`}
                          className="size-8"
                        />

                        {category.name}
                      </span>
                    </TableCell>

                    <TableCell className="text-center">
                      {new Date(category.createdAt).toDateString()}
                    </TableCell>
                    <TableCell className="text-center">
                      <Switch
                        defaultChecked={category.status}
                        onClick={() => toggle(category.id)}
                      />
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex gap-1 justify-center">
                        <CategoryDelete category={category.id} />
                        <Update category={category} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            ) : (
              <TableCaption className="py-5">
                Sem nenhuma categoria
              </TableCaption>
            )}
          </Table>
        </Table_Animation>
      )}
    </>
  );
};
