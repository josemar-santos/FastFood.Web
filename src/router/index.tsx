import { createBrowserRouter } from "react-router-dom";
import { AdminLayout } from "../layout/admin";
import { CategoryView } from "../admin/category/views/category";

export const routes = createBrowserRouter([

    {
        path: '/',
        element: <AdminLayout />,
        children: [
            { path: '/category', element: <CategoryView /> }
        ]
    }
]);