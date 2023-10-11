import { Link } from 'react-router-dom'
import './Hero.css'
const Hero = () => {

    return (
        <div className="hero">
            <div className="container ">
                <div className="row">
                    <div className="col-2 mt-12">
                        <h1 >
                            Embark on a Journey Through Words
                        </h1>
                        <p className='hero-desc'>
                            Dive into a world of captivating stories and boundless knowledge. Explore our extensive library to find your next literary adventure.
                        </p>
                        <Link to="/books" className="btn">
                            Explore Now →
                        </Link>
                    </div>
                    <div className="col-2"></div>
                </div>
            </div>

        </div>
    )
}

export default Hero