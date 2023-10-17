import { Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'
import About from './pages/About/About'
import Cart from './pages/Cart/Cart'
import Login from './pages/Account/Login'
import Books from './pages/Books/Books'
import SingleBook from './pages/singleBook/SingleBook'
import Footer from './components/Footer/Footer'
import Register from './pages/Account/Register'
import ForgotPassword from './pages/Account/ForgotPassword'
import ResetPassword from './pages/Account/ResetPassword'
import axios from 'axios';
import { Suspense, useEffect } from 'react';
import store from './redux/store';
import { loadUser } from './redux/User/userAction';
import { useSelector } from 'react-redux';
import CategoryBook from './pages/CategoryBook/CategoryBook';
import Profile from './pages/Profile/Profile';
import CancelPage from './pages/cancelErrorSuccess/CancelPage';
import Error from './pages/cancelErrorSuccess/Error';
import SuccessPage from './pages/cancelErrorSuccess/SuccessPage';
import Blogs from './pages/Blogs/Blogs';
import SingleBlog from './pages/Blogs/SingleBlog';
import VerfiryEmail from './pages/Account/VerfiryEmail';
axios.defaults.withCredentials = true
function App() {
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])
  const { isAuthentication } = useSelector(state => state.user)
  const toastOptions = {
    success: {
      iconTheme: {
        primary: "#8a2aaa",
        secondary: "white",
      }
    },
    error: {
      iconTheme: {
        primary: "#8a2aaa",
        secondary: "white",
      }
    },
    style: {
      fontSize: '1.4rem'
    }
  }
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/books' element={<Books />} />
        <Route path='/bookss/:id' element={<CategoryBook />} />
        <Route path='/book/:id' element={<SingleBook />} />
        <Route path='/about' element={<About />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/blogs' element={<Blogs />} />
        <Route path='/blog/:id' element={<SingleBlog />} />
        <Route path='/login' element={isAuthentication ? <Home /> : <Login />} />
        <Route path='/register' element={isAuthentication ? <Home /> : <Register />} />
        <Route path='/verifyEmail/:token' element={isAuthentication ? <Home /> : <VerfiryEmail />} />
        <Route path='/forgotPassword' element={isAuthentication ? <Home /> : <ForgotPassword />} />
        <Route path='/resetPassword/:id' element={isAuthentication ? <Home /> : <ResetPassword />} />
        <Route path='/cancel' element={<CancelPage />} />
        <Route path='/success' element={<SuccessPage />} />
        <Route path='*' element={<Error />} />
      </Routes>
      <Footer />
      <Toaster toastOptions={toastOptions} />

    </>
  )
}

export default App
