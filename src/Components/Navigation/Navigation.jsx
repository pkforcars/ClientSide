import React, { useState, useContext, useEffect } from 'react'
import './Navigation.css'
import { useNavigate } from 'react-router-dom'
import Context from "../../Context/Context"
import { MenuItem, IconButton, Menu, ListItemIcon, ListItemText } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MenuIcon from '@mui/icons-material/Menu';

export default function Navigation() {
  const Global = useContext(Context)
  let Username = "Customer"
  if (Global.User) {
    Username = `${Global.User.firstName}  ${Global.User.lastName}`
  }
  const [isMobile, setIsMobile] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOption, setSelectedOption] = useState('');

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleOptionSelect = (value) => {
    setSelectedOption(value);
    Navigate(value)
    handleCloseMenu();
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


  const Navigate = useNavigate()

  if (Global.isLoggedIn) {
    return (
      <>
        <div id="NavbarPT">
          <div id="NavbarPT1">
            <h3><span>Plate And </span>Keys For Cars</h3>
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
          <div id="Component-1">
            <h3><span>Plate And </span>Keys For Cars</h3>
          </div>
          <div id="Component-2">
            {isMobile &&
              <div className="mobile-menu">
                <IconButton onClick={handleOpenMenu}>
                  <MenuIcon className="menu-icon" />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleCloseMenu}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                >
                  <MenuItem onClick={() => handleOptionSelect('/')}>
                    <ListItemText primary="Home" />
                  </MenuItem>
                  <MenuItem onClick={() => handleOptionSelect('/contact')}>
                    <ListItemText primary="Contact" />
                  </MenuItem>
                  <MenuItem onClick={() => handleOptionSelect('/services')}>
                    <ListItemText primary="Services" />
                  </MenuItem>
                </Menu>
                <h6 onClick={() => Navigate('/login')}>Login</h6>
                <h6 onClick={() => Navigate('/createaccount')}>Register</h6>

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
          <button onClick={() => { Navigate('/requestquote') }} className='Request'>Request a Quote</button>
        </div>
      </>
    )
  }
}
