import { useSidebarStore } from "../../../stores/sidebar";
import { NavLink } from "react-router-dom";
import { Icon } from "../../../icon";

export interface SideProps {
  text: string;
  href: string;
  icon: any;
}

export const NavItem = ({ text, href, icon }: SideProps) => {
  const status = useSidebarStore((state) => state.status);

  const IconComponent = Icon[icon] || null;
  return (
    <NavLink
      to={href}
      className={({ isActive }) => {
        let baseClass =
          "flex items-center text-sm px-3 py-2.5 rounded-md text-slate-700 hover:bg-primary hover:text-white";
        let activeClass = isActive
          ? "bg-primary text-white"
          : "";

        let statusClass = status
          ? "gap-2"
          : "justify-center";

        return `${baseClass} ${activeClass} ${statusClass}`;
      }}
    >
      <span>{IconComponent}</span>
      {status && text}
    </NavLink>
  );
};
