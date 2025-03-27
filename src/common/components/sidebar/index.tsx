"use client";
import menu from "../../utils/menu.json";
import clsx from "clsx";
import { useSidebarStore } from "../../stores/sidebar";
import { NavItem } from "./nav-item";

export const Sidebar = () => {
  const status = useSidebarStore((state) => state.status);
  return (
    <>
      <section
        className={clsx(
          "transition-all duration-300 h-full fixed top-0 left-0 shadow border-r overflow-hidden bg-white py-3",
          status ? "w-72" : "w-20"
        )}
      >
        <nav className="px-3 h-full flex flex-col justify-between">
          <div className="space-y-2">
            {menu.map((item) => (
              <NavItem
                key={item.text}
                icon={item.icon}
                text={item.text}
                href={item.href}
              />
            ))}
          </div>
          
          <NavItem
            icon="logout"
            text="Terminar Sessão"
            href="/logout"
          />
        </nav>
      </section>
    </>
  );
};
