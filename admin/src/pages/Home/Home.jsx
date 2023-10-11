import { useSelector, useDispatch } from "react-redux";
import DashboardBox from '../../components/ChartBox/DashboardBox'
import OrderStatus from '../../components/OrderStatus/OrderStatus'
import RecentOrder from '../../components/RecentOrder/RecentOrder'
import './home.scss'
import { useEffect } from "react";
import { getAllUser } from "../../redux/User/userAction";
import { getAllBook } from "../../redux/Book/bookAction";
import { getAllOrder } from "../../redux/Order/orderAction";
import StockBox from "../../components/StockBox/StockBox";
import useFetchData from "../../hooks/useFetchData";
import { FallingLines } from "react-loader-spinner";


const Home = () => {
    const dispatch = useDispatch()

    const { users, } = useSelector(state => state.allUser)
    const { books } = useSelector(state => state.books)
    const { orders } = useSelector(state => state.orders)

    const { data: revenueData } = useFetchData('/api/v1/order/getRevenue')
    const { data: summary, isLoading } = useFetchData('/api/v1/order/orderStatusSummary')

    useEffect(() => {
        dispatch(getAllUser());
        dispatch(getAllBook());
        dispatch(getAllOrder());
    }, [dispatch])


    const UserBoxInfo = {
        icon: '/userIcon.svg',
        title: 'Total User',
        number: users?.length,
        link: '/users'
    }
    const productBoxInfo = {
        icon: '/productIcon.svg',
        title: 'Total Books',
        number: books?.length,
        link: '/books'
    }
    const orderBoxInfo = {
        icon: '/revenueIcon.svg',
        title: 'Total Order',
        number: orders?.length,
        link: '/order'
    }
    const RevenueBoxInfo = {
        icon: '/conversionIcon.svg',
        title: 'Total Reveneue',
        number: `${revenueData?.sliceRevenue}`,
        link: '/'
    }
    return (
        <div className="home">
            {isLoading ? <FallingLines
                color="white"
                width="100"
                visible={true}
                ariaLabel='falling-lines-loading'
            /> :
                <>
                    <div className="box box1"><OrderStatus summary={summary} /></div>
                    <div className="box box2"><DashboardBox {...UserBoxInfo} /></div>
                    <div className="box box3"><DashboardBox {...productBoxInfo} /></div>
                    <div className="box box4"><StockBox /></div>
                    <div className="box box5"><DashboardBox {...orderBoxInfo} /></div>
                    <div className="box box6"><DashboardBox {...RevenueBoxInfo} /></div>
                    <div className="box box7"><RecentOrder /></div>
                </>
            }
        </div>
    )
}

export default Home