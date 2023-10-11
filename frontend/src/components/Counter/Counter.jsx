import { AiOutlineHome } from 'react-icons/ai'
import { PiBooksFill } from 'react-icons/pi'
import { BsFillPeopleFill } from 'react-icons/bs'
import './counter.css'

const Counter = () => {
    return (
        <div className='counter'>
            <div className="container">
                <div className="row">
                    <div className="col-3">
                        <h2 className='counter-heading'> <AiOutlineHome /> 268</h2>
                        <p className='counter-info'>our stores around the world</p>
                    </div>
                    <div className="col-3">
                        <h2 className='counter-heading'><BsFillPeopleFill /> 25,638</h2>
                        <p className='counter-info'>our Happy customers</p>
                    </div>
                    <div className="col-3">
                        <h2 className='counter-heading'><PiBooksFill />68+ k</h2>
                        <p className='counter-info'>Book collection</p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Counter