import './menu.scss'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import toast from "react-hot-toast";

import { menu } from './../../data'
import { logout } from '../../../../frontend/src/redux/User/userAction';
const Menu = () => {
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(logout())
        toast.success('Logout Successfully')
    }
    return (
        <div className='menu'>
            {menu.map((item) => (
                <>
                    <div className="item" key={item.id}>
                        <span className="title">{item.title}</span>

                        {
                            item.listItems.map(listItem => (
                                <>
                                    <Link to={listItem.url} className='listItem' key={listItem.id}>
                                        <img src={listItem.icons} alt="" />
                                        <span className="listItemTitle">{listItem.title}</span>
                                    </Link>
                                </>
                            ))
                        }
                    </div>
                </>
            ))}
            <button className='admin-btn' onClick={handleLogout}>logout</button>


        </div>
    )
}

export default Menu