import { Link } from "react-router-dom";

export default function Navigation(){
    return (
        <nav>
            <Link to='/'>
                <span>TITLE</span>
            </Link>
            <ul>
                <li><Link to='/signup'>Sign Up</Link></li>
                <li><Link to='/signin'>Sign In</Link></li>
            </ul>
        </nav>
    )
}