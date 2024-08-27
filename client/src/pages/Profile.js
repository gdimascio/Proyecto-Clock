
import { useLocation } from "react-router-dom";

const Profile = () => {
    const location = useLocation();
    const profile = location.state;

    return (
        <div>
            <h3>Profile</h3>
            {profile ? <h4>Hi, {profile}!</h4> : null}
            {profile.password}
        </div>
    )
}

export default Profile