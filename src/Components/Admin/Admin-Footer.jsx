import React from 'react'
import Iframe from 'react-iframe';
export default function Footer() {
  return (
    <>
      <div id="Footer_MainA">
        <div id="Footer-Component-1">
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
          <Iframe
            url="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2453.0330093536595!2d-0.8096840999999999!3d52.0609226!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48770155f0085179%3A0x1dd820b4ec34b64e!2sPlate%20n%20Keys%204%20Cars!5e0!3m2!1sen!2s!4v1694371275604!5m2!1sen!2s"
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
          &copy; Copyright 2005-2023 Plate and Keys 4 Cars. All rights Reserved.
        </div>
      </div>

    </>
  )
}
