import React, { useState, useContext, useEffect } from 'react'
import './Navigation.css'
import { useNavigate } from 'react-router-dom'
import Context from "../../Context/Context"
import { Button, Drawer } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { CloseOutlined } from '@ant-design/icons';


export default function Navigation() {
  const Global = useContext(Context)
  let Username = "Customer"
  if (Global.User) {
    Username = `${Global.User.firstName}  ${Global.User.lastName}`
  }
  const [isMobile, setIsMobile] = useState(false);

  const handleOptionSelect = (value) => {
    Navigate(value)
  };

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 428); // Adjust the breakpoint as needed
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize(); // Check the initial screen size

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleToggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const Navigate = useNavigate()

  if (Global.isLoggedIn) {
    return (
      <>
        <div id="NavbarPT">
          <div id="NavbarPT1">
            <h3><span>PLATES N KEYS </span>FOR CARS</h3>
          </div>
          <div id="NavbarPT2">
            <div className='Username-Holder'>{Username}</div>
            <button className='Logout-Btn' onClick={() => {
              localStorage.removeItem('Token')
              Global.SetUser(null)
              Global.setIsLoggedIn(false)
              Global.SetRedirectToCart(false)
              Navigate('/')
            }}>Logout</button>
          </div>
        </div>

        <div id="Navbar2">
          <div id="Componentx" onClick={() => { Navigate('/dashboard') }}>
            Manage Orders
          </div>
          <div id="Componentx" onClick={() => { Navigate('/dashboard') }}>
            Manage Feedbacks
          </div>
          <div id="Componentx" onClick={() => { Navigate('/') }}>
            Shop Now
          </div>

        </div>

      </>
    )

  }
  else {
    return (
      <>
        <div id="Navbar">
          {!isMobile &&
            <div id="Component-1">
              <img src="/Logo.png" />
            </div>
          }
          <div id="Component-2">
            {isMobile &&
              <div className="mobile-menu">
                <img src="/Logo.png" />
                <MenuOutlined className="menu-icon" onClick={handleToggleDrawer} />
                <Drawer
                  placement="left"
                  closable={false}
                  onClose={handleToggleDrawer}
                  visible={isDrawerOpen}
                  className='drawer'
                >
                  <div className='Drawer-Top'>
                    <h5>PLATES N KEYS FOR CARS</h5>
                    <CloseOutlined className='close-icon'
                      onClick={handleToggleDrawer}
                     />
                  </div>
                  <div className='Drawer-Inner'>
                    <div onClick={() => handleOptionSelect('/')}>Home</div>
                    <div onClick={() => handleOptionSelect('/contact')}>Contact</div>
                    <div onClick={() => handleOptionSelect('/services')}>Services</div>
                    <div onClick={() => handleOptionSelect('/login')}>Login</div>
                    <div onClick={() => handleOptionSelect('/createaccount')}>Register</div>
                  </div>
                  <button onClick={() => { Navigate('/requestquote') }} className='RequestB'>Request a Quote</button>
                 
                </Drawer>
              </div>
            }
            {!isMobile &&
              <div id="Component-2">
                <h6 onClick={() => Navigate('/')}>Home</h6>
                <h6 onClick={() => Navigate('/contact')}>Contact</h6>
                <h6 onClick={() => Navigate('/services')}>Services</h6>
                <h6>|</h6>
                <h6 onClick={() => Navigate('/login')}>Login</h6>
                <h6 onClick={() => Navigate('/createaccount')}>Register</h6>
              </div>
            }
          </div>
          {!isMobile &&
            <button onClick={() => { Navigate('/requestquote') }} className='Request'>Request a Quote</button>}
        </div>
      </>
    )
  }
}
