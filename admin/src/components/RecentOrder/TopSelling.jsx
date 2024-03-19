import { HiArrowTrendingUp } from "react-icons/hi2";
import './TopSelling.css'
const TopSelling = ({ topSelling }) => {

    return (
        <div className='topbox'>
            <h3>Top Selling books <HiArrowTrendingUp /></h3>
            <div className="topSelling">

                {topSelling?.data?.map((b) => (
                    <>
                        <img src={b?.bookDetails[0]?.image} alt={b?.bookDetails[0]?.title} className="top-selling-image" />
                    </>
                ))}
            </div>
        </div>
    )
}

export default TopSelling