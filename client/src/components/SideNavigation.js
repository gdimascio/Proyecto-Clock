import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

export default function SideNavigation(){
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
    
    // Manejar el clic en los elementos de la lista
    const [showActive, setShowActive] = useState(null);

    // Maneja que el elemento 'clocks' sea el activado al iniciar sesion
    useEffect(() => {
        if (isLoggedIn) {setShowActive(0)}
    }, [isLoggedIn]);

    const handleActive = (active) => {
        setShowActive(active);
    };
    const navItems = ['clocks', 'projects', 'calendar'];


    return(
        <>
            { isLoggedIn ? 
                <nav className="side-nav">
                    <div>
                        <ul>
                            {navItems.map((item, index) => (
                                <li key={index} className={showActive === index ? 'side-nav-active' : ''}>
                                    <Link to={`/${item}`} 
                                        className="navItems"
                                        
                                        onClick={() => handleActive(index)}
                                    >{item}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </nav>
            : null}
        </>


    )
}