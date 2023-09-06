import React from 'react'
import Iframe from 'react-iframe';
import './Footer.css'
export default function Footer() {
  return (
    <>
      <div id="Footer_Main">
        <div className="container" id="Footer-Component-1">
          <h3>PLATES N KEYS<span> 4 CARS</span></h3>

          <div className='Divider-Text5'>Looking for the best Plates on the market then you have come to the right place.
            Bancroft Auto, a leading plate maker offering you the style and flexibility you want, at the right price.
          </div>

          <div className='Divider-Text6'>
            Secure and Online Payments Via</div>
          <div className='Cards'>
            <img src='/Mastercard.png' alt="Mastercard" width={60} height={35}></img>
            <img src='/Visa.png' alt="Visa" width={60} height={35}></img>
          </div>


        </div>
        <div id="Footer-Component-3">
          <iframe src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d2453.3214123808266!2d-0.8021525260753841!3d52.055670991911754!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNTLCsDAzJzIwLjQiTiAwwrA0OCcwMi44Ilc!5e0!3m2!1sen!2s!4v1689532374681!5m2!1sen!2s" 
            width="400"
            height="200"
            frameBorder="0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            />
        </div>
      </div>

      <div className="FooterContainer">
        <div className="Content">
          &copy; Copyright 2005-2023 Plate N Keys 4 Cars. All rights Reserved.
        </div>
      </div>

    </>
  )
}
