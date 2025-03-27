import { Outlet } from "react-router-dom"
import { Content } from "../../common/components/content"
import { Header } from "../../common/components/header"
import { Sidebar } from "../../common/components/sidebar"

export const AdminLayout = ()=> {
    return (
        <>
            <Header />
            <Sidebar />
            <Content>
                <Outlet />
            </Content>
        </>
    )
}