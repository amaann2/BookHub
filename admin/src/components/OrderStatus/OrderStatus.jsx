import './orderStatus.scss'
import { BiTimeFive, BiErrorCircle, BiXCircle } from 'react-icons/bi'
import { FiLoader, FiCheckCircle } from 'react-icons/fi'
import { BsTruck } from 'react-icons/bs'
const OrderStatus = ({ summary }) => {
    return (
        <div className='topbox'>
            <h3>Order Summary</h3>
            <div className="list">
                <div className="listItem">
                    <div className="summary">
                        <BiTimeFive className='summary-icon' />
                        <div className="summaryTexts">
                            <span>Pending </span>
                        </div>
                    </div>
                    <span className="amount">{summary?.pendingOrders}</span>
                </div>
                <div className="listItem">
                    <div className="summary">
                        <FiLoader className='summary-icon' />
                        <div className="summaryTexts">
                            <span>Processing </span>
                        </div>
                    </div>
                    <span className="amount">{summary?.processingOrders}</span>
                </div>
                <div className="listItem">
                    <div className="summary">
                        <BsTruck className='summary-icon' />
                        <div className="summaryTexts">
                            <span>Out for Delivery</span>
                        </div>
                    </div>
                    <span className="amount">{summary?.outForDeliveryOrders}</span>
                </div>
                <div className="listItem">
                    <div className="summary">
                        <FiCheckCircle className='summary-icon' />
                        <div className="summaryTexts">
                            <span>Delivered</span>
                        </div>
                    </div>
                    <span className="amount">{summary?.deliveredOrders}</span>
                </div>
                <div className="listItem">
                    <div className="summary">
                        <BiErrorCircle className='summary-icon' />
                        <div className="summaryTexts">
                            <span>Failed </span>
                        </div>
                    </div>
                    <span className="amount">{summary?.failedOrders}</span>
                </div>
                <div className="listItem">
                    <div className="summary">
                        <BiXCircle className='summary-icon' />
                        <div className="summaryTexts">
                            <span>Canceled </span>
                        </div>
                    </div>
                    <span className="amount">{summary?.cancelOrders}</span>
                </div>
            </div>

        </div>
    )
}
export default OrderStatus