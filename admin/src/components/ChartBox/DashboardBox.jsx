import './dashboardBox.scss'
import { Link } from 'react-router-dom'
const DashboardBox = (props) => {

    return (
        <div className='chartBox'>
            <div className="boxInfo">
                <div className="title">
                    <img src={props.icon} alt="" />
                    <span>{props.title}</span>
                </div>
                <h1>{props.number}</h1>
                <Link to={props.link} >View All</Link>
            </div>
        </div>
    )
}

export default DashboardBox