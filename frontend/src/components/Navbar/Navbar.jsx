import { useRef, useState } from "react";
import "./Navbar.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { BsBag } from "react-icons/bs";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileToggle from "../ProfileToggle/ProfileToggle";
import { useDispatch } from 'react-redux'
import { logout } from "../../redux/User/userAction";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { getAllBook } from "../../redux/Book/bookAction";
import SearchBookToggle from "../SearchBookToggle/SearchBookToggle";
import { totalUserCartQuantity } from "../../redux/cart/cartAction";

const Navbar = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()
    const { isAuthentication, currentUser } = useSelector((state) => state.user);
    const { quantity } = useSelector(state => state.cart)

    //* -------------responsive nabar----------------
    const [navIsOpen, setNavIsOpen] = useState(false);
    const toggleNav = () => {
        setNavIsOpen(!navIsOpen);
    };

    useEffect(() => {
        dispatch(totalUserCartQuantity())
    }, [dispatch])

    //* --------toggle profile------------
    const [toggleProfile, setToggleProfile] = useState(false)
    const handleToggle = () => {
        setToggleProfile(!toggleProfile)
    }

    const navbarRef = useRef(null)
    // Add an event listener to the window to handle clicks outside of the Navbar
    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (navbarRef.current && !navbarRef.current.contains(e.target)) {
                setToggleProfile(false)
            }
        }
        // Add the event listener when the component mounts
        window.addEventListener("click", handleOutsideClick);
        // Remove the event listener when the component unmounts
        return () => {
            window.addEventListener("click", handleOutsideClick);
        }
    }, [])

    //* ---logout -----------
    const logoutUser = () => {
        dispatch(logout())
        toast.success('Logout Successfully')
        setToggleProfile(false)
    }

    //* search functionalty -- search by book
    const [search, setSearch] = useState('')
    useEffect(() => {
        // if route is changing then set the search empty
        setSearch('')
    }, [navigate])
    useEffect(() => {
        if (location.pathname === '/') {
            dispatch(getAllBook(1, "", "", search));
        }
    }, [dispatch, search, location.pathname])

    //* ------search box boooks-----------

    return (
        <>
            <nav ref={navbarRef} className={`${navIsOpen ? "active" : ""}`}>
                <h2 className="logo"><Link to={'/'}>BookHub.</Link></h2>
                <div className="bars">
                    <GiHamburgerMenu onClick={toggleNav} />
                </div>

                <ul className="nav-links">
                    {location.pathname === '/' && (
                        <li className="nav-link">
                            <input type="text" className="navbar-input" placeholder="FInd Book here" value={search} onChange={(e) => setSearch(e.target.value)} />
                        </li>
                    )}
                    <li className="nav-link">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="nav-link">
                        <Link to="/books">Books</Link>
                    </li>
                    <li className="nav-link">
                        <Link to="/about">About us</Link>
                    </li>
                    <li className="nav-link">
                        <Link to="/blogs">Blogs</Link>
                    </li>

                    <li className="nav-link">
                        <Link to="/cart" >
                            <BsBag className="navbar-icon" />
                            <span className="cart-item-indicator">{quantity ? quantity : ''}</span>
                        </Link>
                    </li>
                    {
                        isAuthentication ?
                            <li className="nav-link auth">
                                <Link onClick={handleToggle}>{currentUser.firstName}</Link>
                            </li>
                            :
                            <li className="nav-link auth">
                                <Link to="/login">Sign in</Link>
                            </li>
                    }

                </ul>
                {
                    toggleProfile && <ProfileToggle logoutUser={logoutUser} />
                }
                {search && <SearchBookToggle />}
            </nav>
        </>
    );
};

export default Navbar;