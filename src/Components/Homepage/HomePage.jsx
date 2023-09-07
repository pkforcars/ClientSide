import React from 'react';
import Navigation from '../Navigation/Navigation';
import './Homepage.css'
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import AssuredWorkloadOutlinedIcon from '@mui/icons-material/AssuredWorkloadOutlined';
import Footer from '../Footer/Footer';
import { useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';

export default function HomePage() {
  const navigate = useNavigate()
  return (
    <>
      <Navigation />

      <div className="homepage">
        <div className='container cover-div'>
          <h1>Standard/4D Number Plates and Replacement Keys</h1>
          <div className='cover-inner-div'>
            <div className='cover-inner-div-left'>
            <h2>Order Number Plates</h2>
              <br />
              <p>
                We offer a wide range of number plates, made of high quality materials. We also offer Standard / 4D / Private number plates. Contact us today
              </p>
              <br />
              <button className='cover-btn' onClick={
                () => {
                  navigate('/customized')
                }
              }>Design Plates</button>

            </div>
            <div className='cover-inner-div-right'>
                            <h2>Order Replacement Keys</h2>
              <br />
              <p>
                Lost your keys? We've got you covered. Fast and affordable replacement key service to get you back on track. Contact us today
              </p>
              <br />
              <button className='cover-btn'
                onClick={
                  () => { navigate('/requestquote') }
                }
              >Order Keys</button>

            </div>
          </div>
        </div>
      </div>

      <div className='extras'>
        <div className='container extras-inner'>
          <div className="extras-box">
            <RequestQuoteIcon className='extras-icon' />
            <h5>Request Quotation</h5>
          </div>
          <div className="extras-box">
            <LocalShippingOutlinedIcon className='extras-icon' />
            <h5>Urgent Delivery</h5>
          </div>
          <div className="extras-box">
            <PaymentsOutlinedIcon className='extras-icon' />
            <h5>Secure Payment</h5>
          </div>
          <div className="extras-box">
            <AssuredWorkloadOutlinedIcon className='extras-icon' />
            <h5>Guaranteed Service</h5></div>
        </div>
      </div>

      <div className='container about-us'>
        <h3>Order yourself new plates or replacement keys!</h3>
        <p>
          We have been in the industry for over 20 years and have a wealth of experience in the field. We offer a wide range of number plates, made of high quality materials. We also offer Standard / 4D / Private number plates. We also offer a fast and affordable replacement key service to get you back on track. Contact us today
        </p>
      </div>

      <div className='container products'>
        <div className='product' onClick={
          () => {
            navigate('/standardplates')
          }
        }>
          <h5>Standard Number Plates</h5>
          <img src="/StandardPlate.png" alt="" />
        </div>
        <div className='product' 
        onClick={()=>{
          navigate('/4dplates')
        }}>
          <h5>4D Number Plates</h5>
          <img src="/4DPlate.png" alt="" />
        </div>
        <div className='product'
        onClick={()=>navigate(
          '/customized'
        )}>
          <h5>Custom Plates</h5>
          <img src="/PrivatePlate.png" alt="" />
        </div>
        <div className='product2'
        onClick={()=>navigate('/motorplates')
        }>
          <h5>Motorcycle Plates</h5>
          <img src="/MotorPlate.png" alt="" />
        </div>
      </div>

      <div className='container about-us'>
        <h3>Why Choose Us?</h3>
        <p>
          You're in safe hands!
        </p>
      </div>

      <div className="container Divider1">
        <div id="Divider-Holder1">
          <img className="DividerImage" src="/Plates.png" alt="Cover2"></img>
          <div className="Divider-Box1">
            <div className="Divider-Text1">Customised Legal Number Plate Replacement</div>
            <div className="Divider-Text2">Upgrade your vehicle with our Customised Legal Number Plate Replacement services. Express your style with Standard Plates or add a touch of sophistication with our 4D Plates. Our expert team ensures compliance with all legal regulations while giving you the freedom to personalize your plates. Stand out on the road with a unique plate that reflects your personality. Whether you're looking for a sleek design or a bold statement, we've got you covered. Enhance your vehicle's aesthetics while staying within the legal framework. We prioritize quality, creativity, and adherence to standards. Join countless satisfied customers who have already transformed their vehicles. Drive with confidence, knowing you're road legal and turning heads. Elevate your driving experience today with our exceptional number plate solutions. Contact us to discuss your customization options!</div>
          </div>
        </div>
        <div id="Divider-Holder1">
          <div className="Divider-Box1">
            <div className="Divider-Text1">Customised Legal Number Plate Replacement</div>
            <div className="Divider-Text2">Experience seamless key replacement with us. Whether you've lost your keys or need spares, our expert service has you covered. We understand the urgency of regaining access, which is why we offer swift and reliable solutions tailored to your needs.

              We prioritize your security without compromising on convenience. Our skilled professionals use the latest technology to craft replacement keys with precision, ensuring they function seamlessly with your locks.

              Don't let a lost key disrupt your routine or compromise your safety. Trust us to provide a stress-free experience from start to finish. We take pride in offering top-notch customer service and peace of mind. Reach out to us today for efficient key replacement that you can rely on</div>
          </div>
          <img className="DividerImage" src="/Plates2.png" alt="Cover2"></img>
        </div>

      </div>

      <ToastContainer/>
      <Footer />

    </>
  );
}