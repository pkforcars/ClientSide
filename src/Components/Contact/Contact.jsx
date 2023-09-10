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
                            21 Radcliffe Street Wolverton Milton Keynes mk125dq
                        </h6>
                    </div>
                    <div>
                        <h6 className='Contact1'>
                            Email us at:
                        </h6 >
                        <h6 className='Contact'>
                            platenkeys@gmail.com
                        </h6>
                    </div>
                    
                    <div>
                        <h6 className='Contact1'>
                            Call us at:
                        </h6 >
                        <h6 className='Contact'>
                            Office: 01908 222555
                        </h6>
                        <h6 className='Contact'>
                            Phone: 07572448224
                        </h6>
                    </div>

                </div>
                <div className='Contact-Holder2'>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2453.0330093536595!2d-0.8096840999999999!3d52.0609226!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48770155f0085179%3A0x1dd820b4ec34b64e!2sPlate%20n%20Keys%204%20Cars!5e0!3m2!1sen!2s!4v1694371275604!5m2!1sen!2s"
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
