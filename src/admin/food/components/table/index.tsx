import { motion } from "framer-motion";
import { Spinner } from "../../../../common/components/spinner";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../../../../common/libs/shadcn/components/ui/table";
import { useFood } from "../../../../common/stores";
import { useEffect } from "react";
import { baseUrl, Currency } from "../../../../common/utils";

export const Food_Table = () => {
  const foods = useFood((state) => state.foods);
  const retriveFood = useFood((state) => state.retrive);
  const loading = useFood((state) => state.loading);

  useEffect(() => {
    retriveFood();
    console.log(foods);
  }, []);

  return (
    <>
      {loading ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Spinner />
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px] text-center">#</TableHead>
                <TableHead className="w-[25%]">Comida</TableHead>
                <TableHead className="text-center w-[15%]">Preço</TableHead>
                <TableHead className="text-center w-[15%]">Tempo de preparo</TableHead>
                <TableHead className="text-center">Categoria</TableHead>
                <TableHead className="text-center">Acção</TableHead>
              </TableRow>
            </TableHeader>
            {foods.length > 0 ? (
              <TableBody>
                {foods.map((food, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-center"> {index + 1}</TableCell>
                    <TableCell>
                      <span className="flex items-center gap-3">
                        <img
                          src={`${baseUrl}/upload/${food.image}`}
                          alt={`imagem de ${food.name}`}
                          className="size-8"
                        />

                        {food.name}
                      </span>
                    </TableCell>

                    <TableCell className="text-center">
                      {Currency(food.price)}
                    </TableCell>
                    <TableCell className="text-center">
                        {food.time}
                    </TableCell>
                    <TableCell className="text-center">
                      {food.category}
                    </TableCell>


                    <TableCell className="text-center">
                      {food.category}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            ) : (
              <TableCaption className="py-5">
                Sem nenhuma comida
              </TableCaption>
            )}
          </Table>
        </motion.div>
      )}
    </>
  );
};
