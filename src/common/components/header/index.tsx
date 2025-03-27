import { AlignLeft, Bell } from "lucide-react";
import clsx from "clsx";
import { useSidebarStore } from "../../stores/sidebar";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../libs/shadcn/components/ui/avatar";

export const Header = () => {
  const status = useSidebarStore((state) => state.status);
  const toggle = useSidebarStore((state) => state.toggle);

  return (
    <header
      className={clsx(
        "bg-white border-b shadow px-8 py-3 transition-all duration-300",
        status ? "w-[calc(100%-18rem)] ml-72" : "w-[calc(100%-5rem)] ml-20"
      )}
    >
      <div className="flex justify-between">
        <button
          onClick={toggle}
          className="cursor-pointer hover:bg-slate-100 p-2 rounded-full text-slate-800"
        >
          <AlignLeft />
        </button>

        <div className="flex gap-6">
          <button className="relative border text-slate-800 py-1.5 px-3 hover:bg-slate-100 rounded-full">
            <Bell size={17} />

            <span className="bg-red-600 text-white absolute top-[-5px] right-[-5px] py-0.5 rounded-full text-sm px-1.5 ">
              2
            </span>
          </button>

          <div className="flex gap-2">

            <div className="flex flex-col">
              <span className="text-sm font-semibold text-slate-700">
                Your name
              </span>
              <span className="text-sm font-light text-slate-500">
                ADMIN
              </span>
            </div>
            <Avatar className="size-10 ">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback className="bg-emerald-700 text-white">
                <span className="text-lg">CN</span>
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
};
