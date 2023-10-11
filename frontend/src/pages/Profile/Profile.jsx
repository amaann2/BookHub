import { useState } from 'react'
import './profile.css'
import GeneralProfile from '../../components/GeneralSettings/GeneralProfile'
import ChangePassword from '../../components/changePassword/ChangePassword'
import MyOrder from '../../components/MyOrder/MyOrder'
import MyReviews from '../../components/MyReview/MyReviews'
import { useSelector } from 'react-redux'
const name = {
    GENERAL: 'GENERAL',
    PASSWORD: 'PASSWORD',
    ORDER: 'ORDER',
    REVIEW: 'REVIEW',
}
const Profile = () => {

    const [avtivePage, setActivePage] = useState(name.GENERAL)
    const { currentUser } = useSelector(state => state.user)
    const handleClick = (component) => {
        setActivePage(component)
    }

    return (
        <div className="container">

            <div className="profile">
                <h2>Account</h2>
                <p>{currentUser?.firstName} {currentUser?.lastName}</p>

                <div className="profile-row">

                    <div className="profile-left">
                        <ul>
                            <li onClick={() => handleClick(name.GENERAL)} className={avtivePage === name.GENERAL ? 'active-tab' : ''}>General</li>
                            <li onClick={() => handleClick(name.PASSWORD)}
                                className={avtivePage === name.PASSWORD ? 'active-tab' : ''}>Change Passsword</li>
                            <li onClick={() => handleClick(name.ORDER)} className={avtivePage === name.ORDER ? 'active-tab' : ''}>My order</li>
                            <li onClick={() => handleClick(name.REVIEW)} className={avtivePage === name.REVIEW ? 'active-tab' : ''}>My Reviews</li>
                        </ul>
                    </div>
                    <div className="profile-right">
                        {avtivePage === name.GENERAL && <GeneralProfile />}
                        {avtivePage === name.PASSWORD && <ChangePassword />}
                        {avtivePage === name.ORDER && <MyOrder />}
                        {avtivePage === name.REVIEW && <MyReviews />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile