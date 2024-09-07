import { Outlet } from "react-router-dom";
import Navigation from '../components/Navigation'
import SideNavigation from '../components/SideNavigation'


export default function RootLayout() {
    return (
        <div>
            <Navigation/>
            <SideNavigation/>
            <Outlet/>
        </div>
    )
}