import { Link } from 'react-router-dom'
// import excusive from '../../assets/shoes/2.png'
import './offer.css'
const Offer = () => {
    return (
        <div className="offer">
            <div className="container">
                <div className="row">
                    <div className="col-2">
                        <img src={'https://upload.wikimedia.org/wikipedia/commons/0/06/Atomic_habits.jpg'} alt="" className='offer-img' />
                    </div>
                    <div className="col-2">
                        <p>Exclusive Available on BookHub</p>
                        <h1>Atomic Habits</h1>
                        <small>
                            Unlock the secrets to lasting personal transformation with "Atomic Habits." This groundbreaking book, a legend in the world of self-improvement, offers timeless wisdom and actionable strategies
                        </small>
                        <br />
                        <Link to="/books" className="offer-btn btn">
                            see More →
                        </Link>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Offer