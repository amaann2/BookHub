import React from 'react'
import './Error.css'
import { Link } from 'react-router-dom'
const Error = () => {
    return (
        <section className="page_404">
            <div className="container">
                <div className="row">
                    <div className="four_zero_four_bg">
                        <h1 className=" center purple">404 NOT FOUND</h1>
                        <img src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif" alt="" />

                    </div>
                    <div className="contant_box_404">
                        <h1>Look like you're lost</h1>
                        <p>the page you are looking for not avaible!</p>
                        <Link to="/" className="btn">
                            Go to Home
                        </Link>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default Error