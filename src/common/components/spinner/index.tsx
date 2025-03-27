import clsx from "clsx";
import { Loader } from "lucide-react";

type LoadingProps = {
  className?: string;
};
export const Spinner = ({ className = "" }: LoadingProps) => {
  return (
    <>
      <div className={clsx(" w-full min-h-24 bg-white flex justify-center items-center", className)}>
        <Loader className="animate-spin text-center" size={60} />
      </div>
    </>
  );
};