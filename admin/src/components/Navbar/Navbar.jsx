import './Navbar.scss'
import { useSelector } from 'react-redux'
const Navbar = () => {
    const { currentUser } = useSelector(state => state.user)
    return (
        <div className='navbar'>
            <div className="logo">
                <span>BookHub.</span>
            </div>
            <div className="icons">
                <div className="user">
                    <img src="https://images.pexels.com/photos/11038549/pexels-photo-11038549.jpeg?auto=compress&cs=tinysrg&w=1600&lazy=loads" alt="" />
                    <span>{currentUser?.firstName}</span>
                </div>
            </div>
        </div>
    )
}

export default Navbar