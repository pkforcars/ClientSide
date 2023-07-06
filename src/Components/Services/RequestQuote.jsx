import React, { useState } from 'react'
import Navigation from '../Navigation/Navigation'
import './Services.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../Footer/Footer'
import { useNavigate } from "react-router-dom";

export default function Services() {

    const Navigate = useNavigate();
    const [Email, SetEmail] = useState("")
    const [Name , SetName ] = useState("")
    const [PhoneNumber , SetPhone] = useState("")
    const [Registeration, SetRegisteration] = useState("")
    const [Service , SetService] = useState("")
    const [Location , SetLocation] = useState("")
    const [Description , SetDescription ] = useState("")
    const HandleEmail = (e) => { SetEmail(e.target.value) }
    const HandleName = (e) => { SetName(e.target.value) }
    const HandlePhone = (e) => { SetPhone(e.target.value) }
    const HandleRegisteration = (e) => { SetRegisteration(e.target.value) }
    const HandleService = (e) => { SetService(e.target.value) }
    const HandleLocation = (e) => { SetLocation(e.target.value) }
    const HandleDescription = (e) => { SetDescription(e.target.value) }

    const Submit = async (e) => {
        e.preventDefault()
        if ( Email === "" || Name === "" || PhoneNumber === "" || Registeration === "" || Service === "" || Location === "" || Description === "")
        {
            toast.error("Please fill all the fields")
            return
        } 
        let Success = false;
        try
        {
          toast.success("Please wait...")
           const Response = await fetch(`${process.env.REACT_APP_BASE_URL}/quote/AddQuote`, 
           {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                email: Email,
                name: Name,
                phone: PhoneNumber,
                registeration: Registeration,
                service: Service,
                location: Location,
                description: Description
            })})

          const ResponseToJson = await Response.json();
          Success = ResponseToJson.Success;
          if (Success) {
            toast.success("You'll be contacted soon");
            setTimeout(() => {
                Navigate("/");
          }, 2000)}
        }
        catch(err)
        {
            console.log(err);
        }
        
    }
      
    return (
        <>
            <Navigation />

            <div className='Services-Head'>Request Quote</div>

                <div className="container RequestForm" id="ReqForm">
                    <div className="FCont1">
                        <h4><span>Areas</span> we cover</h4>
                        <div className="Areas-Div">
                            <h5>Aylesbury</h5>
                            <h5>Bedfordshire</h5>
                            <h5>Buckinghamshire</h5>
                            <h5>Leighton Buzzard</h5>
                            <h5>Luton</h5>
                            <h5>Northamptonshire</h5>
                            <h5>Wellingborough</h5>
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
                    <div className="FCont2">
                        <div className="container my-2">
                            <h4><span>Get</span> in touch now!</h4>
                        </div>

                        <div className="container my-2" id="Selection-Options">
                            <input required onChange={HandleEmail} type="email" name="email" id="email" placeholder="Email*" autoComplete="off" className="Request-Input" label="Email" />
                        </div>

                        <div className="container my-2" id="Selection-Options">
                            <input required onChange={HandleName} name="name" type="text" id="name" placeholder="Name*" autoComplete="off" className="Request-Input" label="Name" />
                        </div>

                        <div className="container my-2" id="Selection-Options">
                            <input required onChange={HandlePhone}   name="phone" type="text" id="phone" placeholder="Phone Number*" autoComplete="off" className="Request-Input" label="Phone Number" />
                        </div>

                        <div className="container my-2" id="Selection-Options">
                            <input required onChange={HandleRegisteration} name="carRegistration" type="text" id="carRegistration" placeholder="Car Registration*" autoComplete="off" className="Request-Input" label="Car Registration" />
                        </div>

                        <div className="container my-2" id="Selection-Options">
                            <select id="Dropdown-Request" required onChange={HandleService}>
                                <option value="">-- Select Service --</option>
                                <option value="Car Key Cutting And Programming">Car Key Cutting And Programming</option>
                                <option value="Car Replacement Services">Car Replacement Services</option>
                                <option value="Secure Car Opening">Secure Car Opening</option>
                                <option value="Instrument Cluster Repair Services">Instrument Cluster Repair Services</option>
                                <option value="Immobiliser Problems">Immobiliser Problems</option>
                                <option value="Car Key Repairs">Car Key Repairs</option>
                                <option value="Van Locks">Van Locks</option>
                            </select>
                        </div>

                        <div className="container my-2" id="Selection-Options">
                            <select id="Dropdown-Request" required onChange={HandleLocation}>
                                <option value="">-- Select Location --</option>
                                <option value="Aylesbury">Aylesbury</option>
                                <option value="Bedfordshire">Bedfordshire</option>
                                <option value="Buckinghamshire">Buckinghamshire</option>
                                <option value="Leighton Buzzard">Leighton Buzzard</option>
                                <option value="Luton">Luton</option>
                                <option value="Northamptonshire">Northamptonshire</option>
                                <option value="Wellingborough">Wellingborough</option>
                            </select>
                        </div>

                        <div className="container my-2" id="Selection-Options">
                            <textarea placeholder="Description" id="Request-area" onChange={HandleDescription}></textarea>
                        </div>

                        <div className="container my-2" id="Selection-Options">
                            <button className="Request-Button" onClick={Submit} >Submit</button>
                        </div>
                    </div>
                </div>


            <ToastContainer theme="colored"/>
            <Footer/>
            </>
            )
}
