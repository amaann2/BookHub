
import { Link } from 'react-router-dom'
import './profileToggle.css'
const ProfileToggle = ({ logoutUser }) => {
    return (
        <div className="profile-toggle">
            <p className='profile-toggle-p'><Link to={'/profile'}>profile</Link></p>
            <p className='profile-toggle-p'><Link to={'/cart'}>My Cart</Link></p>
            <p className='profile-toggle-p'><Link to={'/profile'}>Order</Link></p>
            <hr />
            <p className='profile-toggle-p auth' onClick={logoutUser}>logout</p>
        </div>
    )
}

export default ProfileToggle