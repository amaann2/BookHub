import './Testimonial.css'
import user1 from '../../assets/users/user-17.jpg'
import user2 from '../../assets/users/user-19.jpg'
import user3 from '../../assets/users/user-14.jpg'
const Testimonial = () => {
    return (
        <div className="testimonial">
            <h2 className="title">Testimonials</h2>
            <div className="small-container">
                <div className="row">
                    <div className="col-3">
                        <h3>Seraphina Montgomery</h3>
                        <img src={user1} alt="" />
                        <p>
                            “ I recently discovered BookHub, and I must say, the quality and variety of books exceeded my expectations. It's evident that they put great care into their book selection. I've found my new favorite place for discovering captivating stories and expanding my reading horizons.“
                        </p>
                        ★★★☆☆
                    </div>
                    <div className="col-3">
                        <h3>Maximilian Everest</h3>
                        <img src={user2} alt="" />
                        <p>
                            “As an avid reader, I've explored numerous bookstores, but BookHub stands out. The carefully curated selection of books, along with their commitment to quality, makes BookHub my top choice for literary adventures. Thanks to them, my reading list is never-ending, and I'm always excited to dive into a new book“
                        </p>
                        ★★★★☆
                    </div>
                    <div className="col-3">
                        <h3>sabella Fiora</h3>
                        <img src={user3} alt="" />
                        <p>
                            “BookHub has completely transformed my reading experience. Their extensive collection of books, from classics to contemporary bestsellers, is truly impressive. The ease of navigation and the user-friendly interface make it a joy to explore. I can't recommend BookHub enough to fellow book lovers!“
                        </p>
                        ★★★☆☆
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Testimonial