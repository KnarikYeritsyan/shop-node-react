import React from 'react';

function Footer(props) {
    return (
        <div style={{position: "relative"}}>
            <div className='footer'>
                <div className="footer__container">

                    <div className="center">
                        {/*<h2 className="center__title">OUR SHOP</h2>*/}
                        <div className="location">
                            <i className="fa-solid fa-location-dot"></i>
                            <div className="center__text">
                                <p className="center__desc">Ruko cucruk, Jl. Radio luar dalem jos </p>
                                <p className="center__desc">No.12 - 13, Kalideres - Jakarta Barat</p>
                                <p className="center__desc">11480 - Indonesia</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <i className="focus-input100 fa fa-solid fa-envelope"></i>
                        <a href="mailto:jobs@templateocean.com" className="footer__contact__link">jobs@templateocean.com</a>
                        <br/>
                        <i className="focus-input100 fa fa-solid fa-phone"></i>
                        <a href="tel:(+62) 21-2224 3333" className="footer__contact__link">(+62) 21-2224 3333</a>
                    </div>


                    <div className="footer__soc">
                        <span>Follow</span>
                        <a href="#" className="soc__link">
                            <i className="fab fa-facebook"></i>
                        </a>
                        <a href="#" className="soc__link">
                            <i className="fab fa-square-twitter"></i>

                        </a>
                        <a href="#" className="soc__link">
                            <i className="fab fa-pinterest"></i>
                        </a>
                        <a href="#" className="soc__link">
                            <i className="fab fa-instagram"></i>
                        </a>
                        <a href="#" className="soc__link">
                            <i className="fab fa-dribbble"></i>
                        </a>
                    </div>

                </div>
            </div>
        </div>

    );
}

export default Footer;