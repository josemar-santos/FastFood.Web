import { Loader, Search as SearchICon } from "lucide-react";
import { useState } from "react";
import { useCategory } from "../../../../common/stores";
export const Search = () => {
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const [is_search, setSearching] = useState(false);
  const retriveCategories = useCategory((state) => state.fetch);
  const search = useCategory((state) => state.search);
    
  const searching = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const newTimeoutId = setTimeout(() => {
      search(e.target.value);
      retriveCategories();

      setSearching(false);
    }, 500);

    setSearching(true);
    setTimeoutId(newTimeoutId);
  };


  return (
    <>
      <div className="w-80 h-9 border rounded-md flex items-center gap-1 px-3 text-slate-700">
        <SearchICon />
        <input
          type="text"
          placeholder="Buscar Categoria"
          className="size-full focus:outline-none text-sm"
          onInput={searching}
        />
        {is_search && <Loader className="animate-spin" />}
      </div>
    </>
  );
};
