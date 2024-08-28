import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";

export default function Navigation(){
    const loggedIn = useSelector((state) => state.auth.isLoggedIn);
    const dispath = useDispatch();
    return (
        <nav>
            <Link to='/'>
                <span>TITLE</span>
            </Link>
            { loggedIn ? 
                <ul>
                    <li><Link to='/profile'>Profile</Link></li>
                    <li><Link to='/' onClick={() => dispath(logout())}>Logout</Link></li>
                </ul>
                :
                <ul>
                    <li><Link to='/signup'>Sign Up</Link></li>
                    <li><Link to='/signin'>Sign In</Link></li>
                </ul>
            }
        </nav>
    )
}