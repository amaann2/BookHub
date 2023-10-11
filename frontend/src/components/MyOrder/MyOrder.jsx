import { useEffect, useState } from 'react'
import './myorder.css'
import { useDispatch, useSelector } from 'react-redux'
import { getMyOrder } from '../../redux/order/orderAction'
import Modal from '../Modal/Modal'
import { BiTimeFive, BiErrorCircle, BiXCircle } from 'react-icons/bi'
import { FiLoader, FiCheckCircle } from 'react-icons/fi'
import { BsTruck } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { FallingLines } from 'react-loader-spinner'
const MyOrder = () => {
    const { myOrder, loading } = useSelector(state => state.myOrder)
    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        dispatch(getMyOrder())
    }, [dispatch])
    const toggleModal = () => {
        setShowModal(true)
    }
    console.log(loading)
    const renderDeliveryStatusIcon = (status) => {
        switch (status) {
            case "Pending":
                return <BiTimeFive />;
            case "Processing":
                return <FiLoader />;
            case "Out for Delivery":
                return <BsTruck />;
            case "Delivered":
                return <FiCheckCircle />;
            case "Failed":
                return <BiErrorCircle />;
            case "Canceled":
                return <BiXCircle />;
            default:
                return null;
        }
    };
    return (
        <>
            <div className='order-page'>
                {loading ? <FallingLines
                    color="#8a2aaa"
                    width="100"
                    visible={true}
                    ariaLabel='falling-lines-loading'
                /> :
                    myOrder.map((order) => (
                        <>
                            <div className="order-card">
                                <div className="order-header">
                                    <h1 className='purple'>{renderDeliveryStatusIcon(order?.delivery_status)} {order.delivery_status}</h1>
                                    <h3>Order Id :<span className='purple'>{order._id}</span></h3>
                                    <h3>Total Price : <span className='purple'>Rs {order?.total_price?.toString().slice(0, -2)}</span> </h3>

                                </div>
                                {order?.books?.map((item) => (
                                    <>
                                        {showModal && <Modal closeModal={() => setShowModal(false)} id={item?.book?._id} />}
                                        <div className="order-body">
                                            <div className="order-img" >
                                                <img src={item?.book?.image} alt="" />
                                            </div>
                                            <div className="order-info">
                                                <h1><Link to={`/book/${item?.book?._id}`}> {item?.book?.title}</Link></h1>
                                                <h3>price : <span className="purple">{item?.book?.price}</span></h3>
                                                <h3>Quantity : <span className='purple'>{item?.quantity} x {item?.book?.price}</span></h3>
                                                <h3>sub_total : <span className='purple'>{item?.quantity * item?.book?.price}</span></h3>
                                                <button className='btn' onClick={toggleModal}>write a review</button>
                                            </div>
                                        </div>
                                    </>
                                ))}

                            </div>
                        </>
                    ))
                }
                {myOrder.length === 0 && <div className='order-header'>
                    <h1 className="purple">No order</h1>
                    <button className='btn'><Link to={'/books'}>Shop now</Link></button>
                </div>}


            </div>
        </>
    )
}

export default MyOrder