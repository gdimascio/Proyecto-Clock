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
    const navItems = ['CLOCKS', 'PROJECTS', 'CALENDAR'];


    return(
        <div>
            { isLoggedIn ? 
                <nav className="side-nav">
                    <div>
                        <ul>
                            {navItems.map((item, active) => (
                                <li
                                    key={active}
                                    className={showActive === active ? 'side-nav-active' : ''}
                                    onClick={() => handleActive(active)}
                                >
                                    <Link to={`/${item}`} onClick={handleActive}>{item}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </nav>
            : null}
        </div>


    )
}