import { LayoutGrid, Tag } from "lucide-react";
import { Create } from "../components/create";
import { CategoryPagination } from "../components/pagination";
import { CategoryTable } from "../components/table";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../../common/libs/shadcn/components/ui/breadcrumb";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../common/libs/shadcn/components/ui/select";
import { Separator } from "../../../common/libs/shadcn/components/ui/separator";
import { useCategory } from "../../../common/stores";
import { pagination } from "../../../common/utils";
import { Search } from "../components/search";

export const CategoryView = () => {
  const resize = useCategory((state) => state.resize);
  const params = useCategory((state) => state.params);
  const retriveCategories = useCategory((state) => state.fetch);

  const resizing = (size: string) => {
    resize(size);
    retriveCategories();
  };

  return (
    <>
      <section className="space-y-4">
        <div className="flex justify-between items-center bg-white py-3 px-6 shadow-md">
          <h1 className="font-semibold text-xl">Categorias</h1>

          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard">
                  <span className="flex gap-2 items-center">
                    <LayoutGrid size={16} /> Dashboard
                  </span>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>
                  <span className="flex gap-2 items-center">
                    <Tag size={16} />
                    Categorias
                  </span>
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="bg-white shadow py-2">
          <div className="px-6 py-2 flex justify-between items-center">
            <Select
              value={params.perPage.toString()}
              onValueChange={(e) => resizing(e)}
            >
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
              <Search />
              <Create />
            </div>
          </div>
          <Separator />
          <CategoryTable />
          <Separator />
          <CategoryPagination />
        </div>
      </section>
    </>
  );
};
