import { Bell, Menu, User } from "lucide-react";
import clsx from "clsx";
import { useSidebarStore } from "../../stores/sidebar";
import { Button } from "../../libs/shadcn/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../../libs/shadcn/components/ui/dropdown-menu";
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
        "bg-white border-b shadow px-10 py-2 transition-all duration-300",
        status ? "w-[calc(100%-18rem)] ml-72" : "w-[calc(100%-5rem)] ml-20"
      )}
    >
      <div className="flex justify-between">
        <Button
          onClick={toggle}
          variant="outline"
          className="cursor-pointer hover:bg-white text-slate-800"
        >
          <Menu />
        </Button>

        <div className="flex gap-6">
          <Button variant="outline" className="relative text-slate-800">
            <Bell />

            <span className="bg-red-600 text-white absolute top-[-5px] right-[-5px] px-1 rounded">
              2
            </span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback className="bg-emerald-700 text-white">
                  <span className="text-lg">CN</span>
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
              <DropdownMenuItem>
                <User />
                Meu Perfil
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
