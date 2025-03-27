import { Pagination } from "../../../../common/components/pagination";
import { useCategory } from "../../../../common/stores";


export const CategoryPagination = () => {
  const nextPage = useCategory((state) => state.nextPage);
  const meta = useCategory((state) => state.meta);
  const retriveCategories = useCategory((state) => state.fetch);
  
  return (
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
  );
};
