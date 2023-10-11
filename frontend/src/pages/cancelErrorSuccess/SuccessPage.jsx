import { Link } from 'react-router-dom'
import './success.css'

const SuccessPage = () => {
    return (
        <div id="card" className="animated fadeIn">
            <div id="upper-side">
                <h3 id="status">Success</h3>
            </div>
            <div id="lower-side">
                <p id="message">
                    Congratulations, your order has been successfully placed.
                </p>
                <Link to={'/'} className='btn '>
                    Continue
                </Link>
            </div>
        </div>

    )
}

export default SuccessPage