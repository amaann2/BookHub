import './Subscribe.css'

const Subscrbe = () => {
    return (
        <div className='subscribe'>
            <div className="container">
                <div className="row">
                    <div className="col-2">
                        <h2>Subscribe our newsletter <br /> for newest books update</h2>
                    </div>
                    <div className="col-2">
                        <input type="text"  placeholder='Type your email here'/>
                        <button className="btn">Subscribe</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Subscrbe