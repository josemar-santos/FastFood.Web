import clsx from "clsx";
import { motion } from "framer-motion";
import { Loader } from "lucide-react";

type LoadingProps = {
  className?: string;
};
export const Spinner = ({ className = "" }: LoadingProps) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div
          className={clsx(
            " w-full min-h-24 bg-white flex justify-center items-center",
            className
          )}
        >
          <Loader className="animate-spin text-center" size={60} />
        </div>
      </motion.div>
    </>
  );
};
