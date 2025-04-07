import { Trash2 } from "lucide-react";
import { useExtra } from "../../../../common/stores/extra";
import { useEffect } from "react";
import { Currency } from "../../../../common/utils";
import { Add_Extra } from "../add-extra";

export const ListExtra = () => {
  const food = useExtra((state) => state.food);
  const extras = useExtra((state) => state.extras);
  const retrive = useExtra((state) => state.retrive);

  useEffect(() => {
    if (food) retrive();
  }, [food]);

  return (
    <>
      <div className="py-2 space-y-4">
        <h1 className="text-lg font-semibold text-slate-700">Extras</h1>
        <div className="grid grid-cols-2 gap-4">
          {extras.map(extra => (
            <div className="border rounded-md w-full shadow px-4 py-2 space-y-1 relative">
              <h1 className="font-semibold text-slate-600">{extra.name}</h1>

              <p className="text-sm text-slate-500">
                {extra.increase && "+"}
                {Currency(extra.price)}
                </p>

              <button className="text-slate-600 absolute top-1 right-1 hover:bg-slate-200 p-2 rounded-full cursor-pointer">
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
       <Add_Extra />
      </div>
    </>
  );
};
