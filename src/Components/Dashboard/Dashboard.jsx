import React, { useState, useContext } from 'react'
import Context from "../../Context/Context"
import './Dashboard.css'
import ViewOrders from './ViewOrders'
import GiveFeedback from './GiveFeedback'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const Global = useContext(Context)
  let Username = "Customer"
  if (Global.User) {
    Username = `${Global.User.firstName}  ${Global.User.lastName}`
  }
  const [Selected , setSelected] = useState('1')

  const Navigate = useNavigate()


  return (
    <>
      <div id="NavbarPT">
        <div id="NavbarPT1">
          <h3><span>Bancroft Auto </span>Locksmiths</h3>
        </div>
        <div id="NavbarPT2">
          <div className='Username-Holder'>{Username}</div>
          <button className='Logout-Btn' onClick={()=>{
            localStorage.removeItem('Token')
            Global.SetUser(null)
            Global.setIsLoggedIn(false)
            Global.SetRedirectToCart(false)
            Navigate('/')
          }}>Logout</button>
        </div>
      </div>

      <div id="Navbar2">
        <div id="Componentx" onClick={()=>{setSelected('1')}}>
          Manage Orders
        </div>
        <div id="Componentx" onClick={()=>{setSelected('2')}}>
          Manage Feedbacks
        </div>
        <div id="Componentx" onClick={()=>{ Navigate('/')}}>
          Shop Now
        </div>
      
      </div>

      <div className="ADashboard-Body" style={{paddingTop: "2rem"}}>

      {Selected === '1' && <ViewOrders/>}
      {Selected === '2' && <GiveFeedback/>}
 
      </div>
    </>
  );

};
