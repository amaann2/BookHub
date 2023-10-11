import './cart.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { getUserCart } from '../../redux/cart/cartAction'
import axios from 'axios'
import toast from 'react-hot-toast'
import LoginNavigation from '../../components/LoginNavigation/LoginNavigation'

import { Hourglass } from 'react-loader-spinner'
import { Link } from 'react-router-dom'
const Cart = () => {
    const dispatch = useDispatch()
    const { cart } = useSelector(state => state.cart)
    const { currentUser } = useSelector(state => state.user)
    const { isAuthentication } = useSelector(state => state.user)
    const [totalPrice, setTotalPrice] = useState(0)
    const [loading, setLoading] = useState(false)
    const gst = 0

    useEffect(() => {
        dispatch(getUserCart())
    }, [dispatch])
    useEffect(() => {
        if (cart?.books) {
            const calculateTotalPrice = cart.books.reduce((total, item) => {
                return total + (item.quantity * item.book.price)
            }, 0)
            setTotalPrice(calculateTotalPrice)
        }
    }, [cart])
    const removeItemFromCart = async (id) => {
        try {
            const { data } = await axios.put(`/api/v1/cart/${id}/remove`)
            dispatch(getUserCart())
            toast.success(data.message)
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    const updateCartQuantity = async (e, id) => {
        const newQuantity = parseInt(e.target.value, 10);
        try {
            const { data } = await axios.patch(`/api/v1/cart/quantity`, { bookId: id, quantity: newQuantity })
            toast.success(data.message)
            dispatch(getUserCart())
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
    const clearCart = async () => {
        try {
            const data = await axios.delete(`/api/v1/cart/delete`, { withCredentials: true })
            if (data.status === 204) {
                toast.success('Cart cleared')
            }
            dispatch(getUserCart())
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
    const handleCheckout = async () => {
        try {
            setLoading(true)
            const res = await axios.post('/api/v1/order/checkout', { withCredentials: true, cart, currentUser })
            if (res.data.url) {
                setLoading(false)
                window.location.href = res.data.url
            }
        } catch (error) {
            setLoading(false)
            toast.error(error.response.data.message)
        }
    }
    return (
        <>
            <div className="small-container cart-page">
                {isAuthentication ?
                    <>
                        <table>
                            <tbody>
                                <tr>
                                    <th>Item</th>
                                    <th>Quantity</th>
                                    <th></th>
                                    <th>price</th>
                                    <th>Total price</th>
                                </tr>
                                {cart?.books?.length !== 0 ?
                                    cart?.books?.map((item, i) => (
                                        <tr key={i}>
                                            <td>
                                                <div className="cart-info">
                                                    <img src={item?.book?.image} alt="" />
                                                    <div>
                                                        <h3>{item?.book?.title}</h3>
                                                        <p>{item?.book?.author}   <span>{item?.book?.category?.name}</span></p>
                                                        <br />
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <input type="number" defaultValue={item.quantity} max={item?.book?.stock} onChange={(e) => updateCartQuantity(e, item?.book?._id)} />
                                            </td>
                                            <td><button className='btn' onClick={() => removeItemFromCart(item?.book?._id)}>Remove</button></td>
                                            <td>Rs {item?.book?.price}</td>
                                            <td>Rs {item.quantity * item?.book?.price}</td>

                                        </tr>

                                    )) : <><h2 className='center row'>No item found in cart <Link to={'/books'} className='btn'>Shop Now</Link></h2></>}
                            </tbody>
                        </table>

                        <div className="total-price">
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Sub-Total</td>
                                        <td>Rs {totalPrice}</td>
                                    </tr>
                                    <tr>
                                        <td>Tax</td>
                                        <td>Rs {gst}</td>
                                    </tr>
                                    <tr>
                                        <td>Total</td>
                                        <td>Rs {totalPrice + gst}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="btn-row">
                            <button className='btn mr-2' onClick={clearCart}>clear cart</button>
                            <button className='btn mr-2' onClick={handleCheckout}>{loading ? <Hourglass
                                visible={true}
                                height="20"
                                width="20"
                                ariaLabel="hourglass-loading"
                                wrapperStyle={{}}
                                wrapperClass=""
                                colors={['#000', 'white']}
                            /> : 'Checkout'}</button>
                        </div>
                    </>
                    :
                    <LoginNavigation />

                }
            </div>
        </>
    )
}

export default Cart