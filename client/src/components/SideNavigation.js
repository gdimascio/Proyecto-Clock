import { useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

export default function SideNavigation(){
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
    
    // Manejar el clic en los elementos de la lista
    const [showActive, setShowActive] = useState(null)
    const handleActive = (active) => {
        setShowActive(active);
    };
    const navItems = ['clocks', 'projects', 'calendar'];


    return(
        <div>
            { isLoggedIn ? 
                <nav className="side-nav">
                    <div>
                        <ul>
                            {navItems.map((item, active) => (
                                <li key={active} className={showActive === active ? 'side-nav-active' : ''}>
                                    <Link to={`/${item}`} 
                                        className="navItems"
                                        
                                        onClick={() => handleActive(active)}
                                    >{item}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </nav>
            : null}
        </div>


    )
}