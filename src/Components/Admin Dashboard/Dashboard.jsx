import React, { useState, useContext, useEffect } from 'react'
import Context from "../../Context/Context"
import { useNavigate } from 'react-router-dom'
import './AdminDashboard.css'
import NewOrders from './New-Orders'
import ProcessedOrders from './ProcessedOrders'
import DeliveredOrders from './Delivered-Orders'
import DisputedOrders from './Disputed-Orders'
import CancelledOrders from './Cancelled-Orders'
import AllFeedback from './AllFeedbacks'
import CreateAdmin from './CreateAdmin'
import ViewQuotes from './ViewQuotes'
export default function Dashboard() {
    const Global = useContext(Context)
    let Username = "Customer"
    if (Global.User) {
        Username = `${Global.User.firstName}  ${Global.User.lastName}`
    }

    const [Selected, setSelected] = useState('1')
    const [selectedState, setSelectedState] = useState("New Orders");

    const Navigate = useNavigate()
    const handleRadioChange = (e) => { setSelectedState(e.target.value); };



    return (
        <div className="ADashboard-Body">
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
                        Navigate('/')
                    }}>Logout</button>
                </div>
            </div>
            <div id="Navbar2">
                <div id="Componentx" onClick={() => { setSelected('1') }}>
                    Manage Orders
                </div>
                <div id="Componentx" onClick={() => { setSelected('2') }}>
                    Manage Feedbacks
                </div>
                <div id="Componentx" onClick={() => { setSelected('3') }}>
                    Add Admin
                </div>
                <div id="Componentx" onClick={() => { setSelected('4') }}>
                    View Quotes
                </div>

            </div>

            { Selected==='1' && 
            <div className='Radio-Holder'>
                <div className="radio-inputs-admin">
                    <label className="radio-admin">
                        <input
                            type="radio"
                            name="radio"
                            value="New Orders"
                            checked={selectedState === 'New Orders'}
                            onChange={handleRadioChange}
                        />
                        <span className="name">New Orders</span>
                    </label>
                    <label className="radio-admin">
                        <input
                            type="radio"
                            name="radio"
                            value="In Process"
                            checked={selectedState === 'In Process'}
                            onChange={handleRadioChange}
                        />
                        <span className="name">In Process</span>
                    </label>
                    <label className="radio-admin">
                        <input
                            type="radio"
                            name="radio"
                            value="Delivered"
                            checked={selectedState === 'Delivered'}
                            onChange={handleRadioChange}
                        />
                        <span className="name">Delivered</span>
                    </label>
                    <label className="radio-admin">
                        <input
                            type="radio"
                            name="radio"
                            value="Disputed"
                            checked={selectedState === 'Disputed'}
                            onChange={handleRadioChange}
                        />
                        <span className="name">Disputed</span>
                    </label>
                    <label className="radio-admin">
                        <input
                            type="radio"
                            name="radio"
                            value="Cancelled"
                            checked={selectedState === 'Cancelled'}
                            onChange={handleRadioChange}
                        />
                        <span className="name">Cancelled</span>
                    </label>
                </div>
            </div>
            }
            { Selected==='1' && selectedState==="New Orders"
                && <NewOrders/>
            }
            { Selected==='1'  && selectedState==="In Process"
                && <ProcessedOrders/>
            }
            { Selected==='1' && selectedState==="Delivered"
                && <DeliveredOrders/>
            }
            { Selected==='1' && selectedState==="Disputed"
                && <DisputedOrders/>
            }
            { Selected==='1' && selectedState==="Cancelled"
                && <CancelledOrders/>
            }
            { Selected==='2' 
                && <AllFeedback/>
            }
            { Selected==='3' 
                && <CreateAdmin/>
            }
            { Selected==='4' 
                && <ViewQuotes/>
            }

            
            <div></div>

           </div>
    )
} 