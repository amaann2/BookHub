import axios from 'axios'
import './productcard.css'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
const ProductCard = ({ book }) => {
    const { title, price, category, image, _id } = book
    const AddItemToCart = async () => {
        try {
            const { data } = await axios.post(`/api/v1/cart/${_id}/add`, { quantity: 1 })
            toast.success(data.message)
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
    return (
        <div className='card'>
            <div className="card-head">
                <Link to={`/book/${_id}`}><img src={image} alt="" className='card-image' /></Link>
            </div>
            <div className="card-body">
                <Link to={`/book/${_id}`}><h3>{title}</h3></Link>
                <div className="price-tag">
                    <span className='tag'>{category[0]?.name}</span>
                    <span className='tag price'>Rs {price}</span>

                </div>
                <button className="btn" onClick={AddItemToCart}>Add to cart</button>
            </div>
        </div>
    )
}

export default ProductCard