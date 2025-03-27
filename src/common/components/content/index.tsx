import clsx from "clsx";
import { useSidebarStore } from "../../stores/sidebar";

export interface ContentProps {
  children: React.ReactNode;
}

export const Content = ({ children }: ContentProps) => {
  const status = useSidebarStore((state) => state.status);

  return (
    <>
      <section
        className={clsx(
          "transition-all duration-300 pt-12 px-6 bg-slate-50",
          status ? "ml-72" : "ml-20"
        )}
      >
        {children}
      </section>
    </>
  );
};
