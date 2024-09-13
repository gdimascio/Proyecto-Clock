import { Outlet } from "react-router-dom";
import Navigation from '../components/Navigation'
import SideNavigation from '../components/SideNavigation'


export default function RootLayout() {
    return (
        <>
            <Navigation/>
            <div className="main-screen">
                <SideNavigation/>
                <Outlet/>
            </div>
        </>
    )
}