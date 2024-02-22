import './singleOrder.css'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { getSingleOrder } from '../../redux/Order/orderAction';
import { FallingLines } from 'react-loader-spinner';

const SingleOrder = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const { singleOrder, loading, error } = useSelector(state => state.orders)

    useEffect(() => {
        if (error) toast.error(error)
        dispatch(getSingleOrder(id))
    }, [error, id, dispatch])

    return (
        <div>
            {loading ? <FallingLines
                color="white"
                width="100"
                visible={true}
                ariaLabel='falling-lines-loading'
            /> :
                <>
                    <div className="shipping">
                        <h2>Shipping info</h2>
                        <p><strong>Name</strong>: {singleOrder?.user?.firstName}  {singleOrder?.user?.lastName}</p>
                        <p><strong>Email</strong>: {singleOrder?.user?.email}</p>
                        <p><strong>Adress</strong>: {singleOrder?.shipping_address}</p>
                    </div>

                    <div className='payment'>
                        <h2>Payment</h2>
                        <p>{singleOrder?.payment_status}</p>
                        <div><strong>Total Amount</strong>: {(singleOrder?.total_price / 100).toFixed(2)}</div>
                    </div>

                    <div className='orderstatus'>
                        <h2>order status</h2>
                        <p>{singleOrder?.delivery_status}</p>
                    </div>


                    <div className='items'>
                        <h2>Items</h2>
                        {singleOrder?.books?.map((book, id) => (
                            <div key={id} className='table'>
                                <div className="bookimg">
                                    <img src={book?.book?.image} alt="" />
                                </div>
                                <div className="bookName">{book?.book?.title}</div>
                                <div className="price">{book.quantity} * {book?.book?.price} = {book.quantity * book?.book?.price}</div>
                            </div>
                        ))}
                    </div>
                </>
            }
        </div>
    )
}

export default SingleOrder