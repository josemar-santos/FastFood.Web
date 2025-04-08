import { ChefHat, LayoutGrid } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/common/libs/shadcn/components/ui/breadcrumb";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/common/libs/shadcn/components/ui/select";
import { pagination } from "@/common/utils";
import { Separator } from "@/common/libs/shadcn/components/ui/separator";
import { Food_Table } from "../components/table";
import { Food_Pagination } from "../components/pagination";
import { Create_Food } from "../components/create";

export const FoodView = () => {
  return (
    <>
      <section className="space-y-4">
        <div className="py-3 px-6 rounded bg-white shadow-md flex justify-between">
          <h1 className="font-semibold text-xl">Comidas</h1>

          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard">
                  <span className="flex gap-2 items-center">
                    <LayoutGrid size={16} /> Painel de Controlo
                  </span>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>
                  <span className="flex gap-2 items-center">
                    <ChefHat size={16} />
                    Comidas
                  </span>
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="bg-white shadow-md py-2">
          <div className="px-6 py-2 flex justify-between items-center">
            <Select>
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Items por Página" />
              </SelectTrigger>
              <SelectContent>
                {pagination.perPage.map((size) => (
                  <SelectItem value={size.toString()} key={size}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex gap-2">

              <Create_Food />
            </div>
          </div>
          <Separator />
          <Food_Table />
          <Separator />
          <Food_Pagination />
        </div>
      </section>
    </>
  );
};
