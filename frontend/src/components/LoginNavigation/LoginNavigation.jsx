import { Link } from 'react-router-dom'

const LoginNavigation = () => {
    return (
        <div className="container row  login-navigation">
            <button className="btn"><Link to='/login' className='white'>Login</Link> </button>
        </div>
    )
}

export default LoginNavigation