import { useSelector } from "react-redux";


// Cambia 'email' para que tenga formato de 'user': user@gmail.com
function mailToUser(email){return email.split("@")[0]}

const Profile = () => {
    const user = useSelector((state) => state.auth.user);

    return (
        <div>
            <h3>Profile</h3>
            {user ? <h4>Hi, {mailToUser(user)}!</h4> : null}
        </div>
    )
}

export default Profile