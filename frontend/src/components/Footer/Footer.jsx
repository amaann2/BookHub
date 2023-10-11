import './Footer.css'
const Footer = () => {
    return (
        <div className="footer">
            <div className="container">
                <div className="row">
                    <div className="footer-col-1">
                        <h3>Download Our App</h3>
                        <p>Download App for Android and ios mobile phone.</p>
                        <div className="app-logo">
                            {/* <img src={playstore} alt="" /> */}
                            {/* <img src={appstore} alt="" /> */}
                        </div>
                    </div>
                    <div className="footer-col-2">
                        <h1>BookHub.</h1>
                        <p>
                            Our Purpose Is To Sustainably Make the Pleasure and Benefits of Sports
                            Accessible to the Many.
                        </p>
                    </div>
                    <div className="footer-col-3">
                        <h3>Useful Links</h3>
                        <ul>
                            <li>coupons</li>
                            <li>Blog Post</li>
                            <li>Return Policy</li>
                            <li>Join Affiliate</li>
                        </ul>
                    </div>
                    <div className="footer-col-4">
                        <h3>Follow Us</h3>
                        <ul>
                            <li>Facebook</li>
                            <li>Instagram</li>
                            <li>Twitter</li>
                            <li>Youtube</li>
                        </ul>
                    </div>
                </div>
                <hr />
                <p className="copyright">©copyright 2023 - @ Designed and Developed BY Amaan Ansari</p>
            </div>
        </div>

    )
}

export default Footer