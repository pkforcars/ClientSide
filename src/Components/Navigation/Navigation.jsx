import React, { useState, useContext } from 'react'
import './Navigation.css'
import { useNavigate } from 'react-router-dom'
import Context from "../../Context/Context"

export default function Navigation() {
  const Global = useContext(Context)
  let Username = "Customer"
  if (Global.User) {
    Username = `${Global.User.firstName}  ${Global.User.lastName}`
  }

  const Navigate = useNavigate()

  if (Global.isLoggedIn) {
    return (
      <>
        <div id="NavbarPT">
          <div id="NavbarPT1">
            <h3><span>Bancroft Auto </span>Locksmiths</h3>
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
            <h3><span>Bancroft Auto </span>Locksmiths</h3>
          </div>
          <div id="Component-2">
            <h6 onClick={() => { Navigate('/') }}>Home</h6>
            <h6 onClick={() => { Navigate('/contact') }}>Contact</h6>
            <h6 onClick={() => { Navigate("/services")}}>Services</h6>        
            <h6 >|</h6>
            <h6 onClick={() => { Navigate('/login') }}>Login</h6>
            <h6 onClick={() => { Navigate('/createaccount') }}>Register</h6>
          </div>
          <button onClick={() => { Navigate('/requestquote') }} className='Request'>Request a Quote</button>
          </div>
        </>
    )
  }
}
