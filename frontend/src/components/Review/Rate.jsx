import { useMemo, useState } from "react"
import { FaStar } from "react-icons/fa"
import PropTypes from 'prop-types'
const Rate = ({ count, rating, color, onRating }) => {
    const [hoverRating, setHoverRating] = useState(0)
    const getColor = index => {
        if (hoverRating >= index) {
            return '#FFBA5A'
        }
        else if (!hoverRating && rating >= index) {
            return '#FFBA5A'
        }
        return 'grey'
    }
    const starRating = useMemo(() => {
        return Array(count)
            .fill(0)
            .map((_, i) => i + 1)
            .map(idx => (
                <FaStar
                    key={idx}
                    onClick={() => onRating(idx)}
                    style={{ color: getColor(idx) }}
                    onMouseEnter={() => setHoverRating(idx)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="star-icons"
                />))
    }, [count, rating, hoverRating])
    return (
        <div>{starRating}</div>
    )
}
Rate.prototype = {
    count: PropTypes.number,
    rating: PropTypes.number,
    onchange: PropTypes.func,
    color: {
        filled: PropTypes.string,
        unfilled: PropTypes.string,

    }
}
Rate.defaultProps = {
    count: 5,
    rating: 0,
    color: {
        filled: '#f5eb3b',
        unfilled: '#DCDCDC'
    }
}

export default Rate