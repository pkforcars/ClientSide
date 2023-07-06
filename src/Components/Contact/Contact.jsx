import React from 'react'
import './Contact.css'
import Navigation from '../Navigation/Navigation'
import Iframe from 'react-iframe';
import Footer from '../Footer/Footer';

export default function Contact() {
    return (
        <>
            <Navigation />

            <div className="container" id="Contact-Body">
                <div className="Contact-Holder">
                    <h5 className='Contact'>Contact Us</h5>
                    <div>
                        <h6 className='Contact1'>
                            Visit us at:
                        </h6 >
                        <h6 className='Contact'>
                            21 Radcliffe Street Wolverton Milton Keynes mk125dq 01908222555
                        </h6>
                    </div>
                    <div>
                        <h6 className='Contact1'>
                            Or call us at:
                        </h6 >
                        <h6 className='Contact'>
                            Phone: 07572448224
                        </h6>
                        <h6 className='Contact'>
                            Office: 01908 222555
                        </h6>
                    </div>

                </div>
                <div className='Contact-Holder2'>
                    <Iframe
                        url="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d9813.707126822095!2d-0.7884601!3d52.0537522!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4877006436cdf543%3A0x89da46a1b548beb3!2sBancroft%20Auto%20Locksmiths!5e0!3m2!1sen!2s!4v1686868263232!5m2!1sen!2s"
                        className='Map'
                        frameBorder="0"
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />

                </div>

            </div>


            <Footer />
        </>
    )
}
