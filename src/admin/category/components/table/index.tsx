"use client";
import { CategoryDelete } from "../delete";

import { useEffect } from "react";
import { Update } from "../update";
import { toast } from "sonner";
import axios from "axios";
import { Checkbox } from "../../../../common/libs/shadcn/components/ui/checkbox";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../common/libs/shadcn/components/ui/avatar";
import { useCategory } from "../../../../common/stores";
import { baseUrl, HttpStatus } from "../../../../common/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../common/libs/shadcn/components/ui/table";
import { Switch } from "../../../../common/libs/shadcn/components/ui/switch";
export const CategoryTable = () => {
  const categories = useCategory((state) => state.categories);
  const retriveCategories = useCategory((state) => state.fetch);

  useEffect(() => {
    retriveCategories();
  }, []);

  const toggle = async (id: string) => {
    try {
      const response = await axios.patch(`${baseUrl}/category/${id}`);

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
      <Table>
        {/*<TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]"></TableHead>
            <TableHead className="w-[150px]">#</TableHead>
            <TableHead className="w-[30%]">Categoria</TableHead>
            <TableHead className="text-center w-[20%]">Criado Em</TableHead>
            <TableHead className="text-center w-[10%]">Estado</TableHead>
            <TableHead className="text-center">Acções</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium flex items-center justify-center">
                <Checkbox />
              </TableCell>
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                <span className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={`${baseUrl}/upload/${category.icon}`} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
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
      </Table>
    </>
  );
};
