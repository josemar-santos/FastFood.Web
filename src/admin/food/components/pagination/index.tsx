import { Pagination } from "@/common/components/pagination";
import { useFood } from "@/common/stores";

export const Food_Pagination = () => {
  const nextPage = useFood((state) => state.goTo);
  const meta = useFood((state) => state.meta);
  const retriveCategories = useFood((state) => state.retrive);
  return (
    <>
      <div className="px-6 py-2 flex justify-between items-center">
        <p className="text-sm text-slate-700">
          Mostrado {meta.page} a {meta.perPage} de {meta.total} categorias
        </p>
        <Pagination
          total={meta.total}
          perPage={meta.perPage}
          page={meta.page}
          value={nextPage}
          change={retriveCategories}
        />
      </div>
    </>
  );
};
