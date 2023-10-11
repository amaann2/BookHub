import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";
const Star = ({ rating }) => {
    const ratingStar = Array.from({ length: 5 }, (elem, index) => {
        let number = index + 0.5
        return (
            <span key={index}>
                {
                    rating >= index + 1 ? (<FaStar className="star-icon" />) : rating >= number ? (<FaStarHalfAlt className="star-icon" />) : (<AiOutlineStar className="star-icon" />)
                }
            </span>
        )
    })
    return (
        <div>{ratingStar}</div>
    )
}

export default Star