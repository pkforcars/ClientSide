import React, { useState } from 'react'
import Navigation from '../Navigation/Navigation'
import Footer from '../Footer/Footer'
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

export default function Login() {

    const [firstName , SetFirstName ] = useState("")
    const [lastName , SetLastName ] = useState("")
    const [email, SetEmail] = useState();
    const [password, SetPassword] = useState();
    const [phone , SetPhone ] = useState("")

  
    const Navigate = useNavigate();
  
    const HandleEmailValue = (event) => {SetEmail(event.target.value);};
    const HandlePasswordValue = (event) => {SetPassword(event.target.value);};
    const HandleFirstName = (event) => {SetFirstName(event.target.value);};
    const HandleLastName = (event) => {SetLastName(event.target.value);};
    const HandlePhone = (event) => {SetPhone(event.target.value);};

    const Submit = async (e) => 
    {
      e.preventDefault();
      let Success = false;
      try
      {
        toast.success("Please wait...")
         const Response = await fetch(`${process.env.REACT_APP_BASE_URL}/customer/CreateAccount`, 
         {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ firstName , lastName , email , password , phone })
        });
    
        const ResponseToJson = await Response.json();
        Success = ResponseToJson.Success;
        if (Success) {
          toast.success("Login Successful");
          setTimeout(() => {
              Navigate("/checkout");
        }, 1000)}
        else 
        {
          toast.error("Email already exsists");
        }
      }
      catch(err)
      {
          console.log(err);
      }
    }

    return (
    <>  
        <Navigation/>
            

        <div className='container my-5' id="Div-Holder">
            <div className='sidebar2'>
                <img src="/Sidebar.png" alt="Sidebar"></img>
            </div>
            <div className='sidebar1'>
                    <h4 className='sidebar1-Title'>Create Account</h4>
                    <h5 className='sidebar1-Title2'>Enter Personal Information</h5>
                    <form onSubmit={Submit}>
                        <div className="form">
                            <div className='form-inner-2'>
                                <input name="name" required  id="name" placeholder="First Name"  autoComplete='off' className="sidebar1-text1C" label="Name" onChange={HandleFirstName}/>
                                <input name="lname"  required  id="lname" placeholder="Last Name" autoComplete='off' className="sidebar1-text2C" label="lName" onChange={HandleLastName}/>
                            </div>

                            <input name="phonenumber" required  id="phonenumber" placeholder="Phone Number" autoComplete='off' className="sidebar1-text" label="phonenumber" onChange={HandlePhone}/>

                            <input required name="email" id="email" placeholder="Email" autoComplete='off' className="sidebar1-text" label="Email" onChange={HandleEmailValue} />
                            <input required type="password" name="password"  id="password" autoComplete='off' placeholder="Password"  className="sidebar1-text"  label="Password"   onChange={HandlePasswordValue}   />
                        </div>

                    <div className="login-2">
                        <button type="submit" className="login-button"> Create Account </button>
                    </div>

                    <h6 className='sidebar1-Title3'>Already have an account?? <Link to="/login">Login</Link></h6>
                    
                    </form>
            </div>
        </div>
        <ToastContainer theme="colored"/>
        <Footer/>
    
    </>
  )
}
