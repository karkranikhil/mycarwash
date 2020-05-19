import React from 'react';
import Form from '../Form/index'
import './style.css'
const Banner = () => {

    return (
        <>
            <section className="banner-area relative" id="home">

                <div className="overlay overlay-bg"></div>
                <div className="container ">
                    <a className="heading_logo" href="/">My <span className="yellow">Car Wash</span></a>
                    <div className="row fullscreen d-flex align-items-center justify-content-center pt-5 height-100vh">
                        <div className="banner-content col-lg-7 col-md-6 ">
                            <h6 className="text-white ">Professional washing and cleaning of your car</h6>
                            <h1 className="text-white text-uppercase">
                                <span className="yellow">Your Car Always in Great Hand With Us</span>
                            </h1>
                            <p className="pt-20 pb-20 text-white">
                                Our service is not just a wash as it is a real treatment for your car.  The car gets a rebirth due to our CCS which is truly regenerative therapy. Research has shown, steam pressure cleaning prevents corrosion for a period of 2 years when compared to the regular use of water for cleaning.
							</p>
                        </div>
                        <div className="col-lg-5  col-md-6 header-right">
                            <h4 className="text-white pb-30 mb-5">Book Your Appointment</h4>
                            <Form />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Banner