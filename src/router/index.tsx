import { createBrowserRouter } from "react-router-dom";
import { AdminLayout } from "../layout/admin";
import { CategoryView } from "../admin/category/views/category";
import { FoodView } from "../admin/food/views/food";

export const routes = createBrowserRouter([

    {
        path: '/',
        element: <AdminLayout />,
        children: [
            { path: '/category', element: <CategoryView /> },
            { path: '/food', element: <FoodView /> },
        ]
    }
]);