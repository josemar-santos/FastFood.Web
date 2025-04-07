import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Spinner } from "../../../common/components/spinner";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../../common/libs/shadcn/components/ui/breadcrumb";
import { ChefHat, LayoutGrid } from "lucide-react";
import { Food } from "../interface/food";
import { getFood } from "../services";
import { baseUrl, Currency } from "../../../common/utils";
import { ListExtra } from "../components/list-extra";
import { useExtra } from "../../../common/stores/extra";

export const DetailsFoodView = () => {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [currentFood, setCurrentFood] = useState<Food>();
  const setFood = useExtra(state => state.setFood);

  useEffect(() => {
    async function loadData() {
      if (params.id) {
        setLoading(true);
        setFood(params.id);
        const [food] = await Promise.all([getFood(params.id)]);

        if (food) {
          setCurrentFood(food);
        }

        setLoading(false);
      }
    }

    loadData();
  }, [params.id]);
  return (
    <>
      {!loading ? (
        <section className="space-y-4">
          <div className="py-3 px-6 rounded bg-white shadow-md flex justify-end">
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
                  <BreadcrumbLink href="/food">
                    <span className="flex gap-2 items-center">
                      <ChefHat size={16} /> Comidas
                    </span>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Detalhes</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="bg-white shadow-md p-4">
            <div className="flex gap-4 h-full">
              <div className="w-[45%]">
                <img src={`${baseUrl}/upload/${currentFood?.image}`} className="rounded-lg max-h-full" />
              </div>
              <div className="w-[55%]">
                <div className="space-y-2">
                  <h1 className="font-semibold text-3xl text-slate-700">
                    {currentFood?.name}
                  </h1>

                  <p className="text-slate-500 my-2">
                    {currentFood?.description || "Sem descrição..."}
                  </p>

                  <p className="text-slate-500 my-2">{currentFood?.category}</p>
                  <h2 className="font-semibold text-xl text-slate-700">
                    {Currency(currentFood?.price || 0)}
                  </h2>

                  <ListExtra />
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <Spinner />
      )}
    </>
  );
};
