import { Link, useParams } from 'react-router-dom';
import './singleBook.css'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getSingleBook } from '../../redux/Book/bookAction'
import Review from '../../components/Review/Review';
import { getReiviewOfBook } from '../../redux/Review/reviewAction';
import axios from 'axios';
import toast from 'react-hot-toast';
import Star from '../../components/star/Star';
import { Bars } from 'react-loader-spinner';
import Modal from '../../components/Modal/Modal';
import { totalUserCartQuantity } from '../../redux/cart/cartAction';
function SingleBook() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const [averageRating, setAverageRating] = useState('')

    const { book, loading } = useSelector(state => state.singleBook)
    const { reviews } = useSelector(state => state.reviews)


    useEffect(() => {
        dispatch(getSingleBook(id))
        dispatch(getReiviewOfBook(id))

        const getAverageRating = async () => {
            try {
                const { data } = await axios.get(`/api/v1/review/${id}/rating`)
                setAverageRating(data.averageRating)
            } catch (error) {
                console.log(error.response.data.message)
            }
        }
        getAverageRating()
    }, [dispatch, id])

    const [quantity, setQuantity] = useState(1)
    const AddItemToCart = async () => {
        try {
            const quantityNumber = parseInt(quantity, 10)
            const { data } = await axios.post(`/api/v1/cart/${id}/add`, { quantity: quantityNumber })
            toast.success(data.message)
            dispatch(totalUserCartQuantity())
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
    const isOutOfStock = book.stock === 0

    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal(true)
    }
    return (
        <>
            <div className="small-container single-product">
                {showModal && <Modal closeModal={() => setShowModal(false)} id={id} />}

                {loading ? <Bars
                    height="80"
                    width="80"
                    color="#8a2aaa"
                    ariaLabel="bars-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                /> :
                    <div className="row">
                        <div className="col-2">
                            <img src={book.image} width="100%" alt="" id="productImg" />
                        </div>
                        <div className="col-2">
                            <p><Link to={'/books'}>books</Link> / {book.title}</p>
                            <h1>{book?.title}</h1>
                            <h4>Author : <strong>{book.author}</strong></h4>
                            <h4>Rs <strong> {book.price}.00</strong></h4>
                            <h4>Rating :  <strong> {averageRating?.toString().slice(0, 3)} / 5 </strong><Star rating={averageRating} /> </h4>
                            <h3 className='singlepage-title'>Product Details</h3>
                            <p className='desc'>
                                {book.description}
                            </p>

                            <input type="number" defaultValue={1} value={quantity} min={1} max={book?.stock} onChange={e => setQuantity(e.target.value)} />
                            {isOutOfStock ? (
                                <button className="btn">Out of stock</button>
                            ) : (
                                <button className="btn" onClick={AddItemToCart}>Add to Cart</button>
                            )}
                            <h3>stock : <strong>{book.stock}</strong></h3>
                            <h3>publish Date : <strong>{book?.publish_date?.slice(0, 10)}</strong></h3>
                            <h3>pages : <strong>{book.pages}</strong></h3>
                            <h3>ISBN : <strong>{book.ISBN}</strong></h3>

                            <button className='btn' onClick={toggleModal}>write a review</button>
                        </div>
                    </div>
                }
            </div>
            <Review reviews={reviews} id={id} />
        </>
    );
}

export default SingleBook;