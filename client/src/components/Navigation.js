import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";

export default function Navigation(){
    const loggedIn = useSelector((state) => state.auth.isLoggedIn);
    const user = useSelector((state) => state.auth.user);

    const dispath = useDispatch();

    function mailToUser(email){return email.split("@")[0]}


    return (
        <nav className="top-nav">
            <Link to='/'>
                <span>LOGO</span>
            </Link>
            { loggedIn ? 
                <div className="profile">
                    <ul>
                        <li><Link to='/profile'>Profile</Link></li>
                        <li><Link to='/' onClick={() => dispath(logout())}>Logout</Link></li>
                    </ul>

                    {user ? <h4>Hi, {mailToUser(user)}!</h4> : null}


                </div>
                :
                null
            }
        </nav>
    )
}