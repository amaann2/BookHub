import React from 'react'
import { Link } from 'react-router-dom'

const CancelPage = () => {
    return (
        <div id="card" className="animated fadeIn">
            <div id="upper-side">
                <h3 id="status">cancel</h3>
            </div>
            <div id="lower-side">
                <p id="message">
                    Payment cancel.
                </p>
                <Link to={'/cart'} className='btn '>
                    Try again
                </Link>
            </div>
        </div>
    )
}

export default CancelPage