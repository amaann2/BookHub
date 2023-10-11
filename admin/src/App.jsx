import './styles/global.scss'
import './styles/app.css'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import User from './pages/Users/User'
import Book from './pages/Books/Book'
import Footer from './components/Footer/Footer'
import Navbar from './components/Navbar/Navbar'
import Menu from './components/menu/Menu'
import { useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import Category from './pages/Category/Category'
import Review from './pages/review/Review'
import Order from './pages/Order/Order'
import AddBooks from './pages/Books/AddBooks'
import EditBooks from './pages/Books/EditBooks'
import AddCategory from './pages/Category/AddCategory'
import EditCategory from './pages/Category/EditCategory'
import { useEffect } from 'react'
import store from '../../frontend/src/redux/store'
import { loadUser } from './redux/User/userAction'
import axios from 'axios'
import Blogs from './pages/Blogs/Blogs'
import AddBlogs from './pages/Blogs/AddBlogs'
import EditBlogs from './pages/Blogs/EditBlogs'
function App() {
  axios.defaults.withCredentials = true
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])
  const { isAuthentication } = useSelector(state => state.user)
  const { currentUser } = useSelector(state => state.user)

  const Layout = () => {
    return (
      <div className='main'>
        <Navbar />
        <div className="container">
          <div className="menuContainer">
            <Menu />
          </div>
          <div className="contentContainer">
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    )
  }
  const router = createBrowserRouter([
    {
      path: '/',
      element: isAuthentication && currentUser?.role === 'admin' ? <Layout /> : <Login />,
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: '/users',
          element: <User />
        },
        {
          path: '/books',
          element: <Book />
        },
        {
          path: '/add/book',
          element: <AddBooks />
        },
        {
          path: '/edit/book/:id',
          element: <EditBooks />
        },
        {
          path: '/category',
          element: <Category />
        },
        {
          path: '/add/category',
          element: <AddCategory />
        },
        {
          path: '/edit/category/:id',
          element: <EditCategory />
        },
        {
          path: '/order',
          element: <Order />
        },
        {
          path: '/review',
          element: <Review />
        },
        {
          path: '/blogs',
          element: <Blogs />
        },
        {
          path: '/add/blog',
          element: <AddBlogs />
        },
        {
          path: '/edit/blog/:id',
          element: <EditBlogs />
        },
      ]
    },
    {
      path: '/login',
      element: isAuthentication ? <Home /> : <Login />
    }
  ])
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />

    </>
  )
}

export default App
