import { Bike, ChefHat, DoorOpen, Gift, LayoutGrid, Settings, ShoppingBag, Tag, User } from "lucide-react";
import { JSX } from "react";

export const Icon: Record<string, JSX.Element> = {
    dashboard: <LayoutGrid />,
    config: <Settings />,
    category: <Tag />,
    deliveryPerson: <Bike />,
    order: <ShoppingBag />,
    user: <User />,
    promotion: <Gift />,
    food: <ChefHat />,
    logout: <DoorOpen />
}