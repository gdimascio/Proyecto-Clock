import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/fontawesome-free-regular"

const userImg = <FontAwesomeIcon icon={faUser}/>
const logo = "img/logo.png"


export default function Navigation(){
    const loggedIn = useSelector((state) => state.auth.isLoggedIn);
    const user = useSelector((state) => state.auth.user);

    const dispath = useDispatch();

    // States for the display of the user options
    const [showUserMenu, setshowUserMenu] = useState(false)
    const handleUserMenu = () => {setshowUserMenu(prevState => !prevState)}
    const handleLogout = () => {setshowUserMenu(false); dispath(logout())}

    function mailToUser(email){return email.split("@")[0]}


    return (
        <nav className="top-nav">
            <div className="nav-logo">
                <Link to='/'>
                    <img className="logo" src={logo} alt="LOGO"/>
                </Link>

            </div>

            { loggedIn ? 
                <div className="nav-profile">
                    <span className="userImg" onClick={handleUserMenu}>{userImg}</span>
                    {user ? <h4>Hi, {mailToUser(user)}!</h4> : null}

                    { showUserMenu ? 
                        <div className="user-menu">
                            <ul>
                                <li><Link to='/profile'>Profile</Link></li>
                                <li><Link to='/' onClick={handleLogout}>Logout</Link></li>
                            </ul>
                        </div>
                    : null }
                </div>
            : null }
        </nav>
    )
}