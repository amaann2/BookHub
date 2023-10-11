import './review.css'
import user from '../../assets/users/default.jpg'
import Star from '../star/Star';
import { Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import "swiper/css/pagination";
const Review = ({ reviews }) => {
    return (
        <>
            <div className='review'>
                <Swiper navigation={true}
                    grabCursor={true}
                    spaceBetween={50}
                    slidesPerView={1}
                    breakpoints={{
                        800: { slidesPerView: 3 },
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    autoplay={{
                        delay: 4000,
                    }}
                    modules={[Autoplay, Pagination]}
                    className="mySwiper">

                    <div className="container">
                        <div className="review-row">

                            {reviews?.length !== 0 ? reviews?.map((review, i) => (
                                <SwiperSlide key={i}>

                                    <div className="review-box">
                                        <img src={user} alt="" />
                                        <h3>{review?.user?.firstName}</h3>
                                        <Star rating={review.rating} />
                                        <p>{review.comment}</p>
                                    </div>
                                </SwiperSlide>
                            )) : <><h1 className='white'>NO reviews for this book ...</h1></>}

                        </div>
                    </div>
                </Swiper>

            </div >
        </>
    );
};

export default Review

