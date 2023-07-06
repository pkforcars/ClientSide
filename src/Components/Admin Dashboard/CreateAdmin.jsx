import React, { useState } from 'react'
import Footer from '../Admin/Admin-Footer'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {

    const [firstName, SetFirstName] = useState("")
    const [lastName, SetLastName] = useState("")
    const [email, SetEmail] = useState();
    const [password, SetPassword] = useState();
    const [phone, SetPhone] = useState("")
    const HandleEmailValue = (event) => { SetEmail(event.target.value); };
    const HandlePasswordValue = (event) => { SetPassword(event.target.value); };
    const HandleFirstName = (event) => { SetFirstName(event.target.value); };
    const HandleLastName = (event) => { SetLastName(event.target.value); };
    const HandlePhone = (event) => { SetPhone(event.target.value); };

    const Submit = async (e) => {
        e.preventDefault();
        let Success = false;
        try {
            const Response = await fetch(`${process.env.REACT_APP_BASE_URL}/admin/CreateAccount`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ firstName, lastName, email, password, phone })
                });

            const ResponseToJson = await Response.json();
            Success = ResponseToJson.Success;
            if (Success) {
                toast.success("Admin Created Successfully");
            }
            else {
                toast.error("Unable to Create Admin");
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <div className='container my-2' id="admincreate" >
                <div className='sidebar1A'>
                    <h4 className='sidebar1-Title'>Create Account</h4>
                    <h5 className='sidebar1-Title2'>Enter Personal Information</h5>
                    <form onSubmit={Submit}>
                        <div className="form">
                            <div className='form-inner-2'>
                                <input name="name" required  placeholder="First Name" autoComplete='off' className="sidebar1-text1C" id="abox" label="Name" onChange={HandleFirstName} />
                                <input name="lname" required id="abox" placeholder="Last Name" autoComplete='off' className="sidebar1-text2C" label="lName" onChange={HandleLastName} />
                            </div>

                            <input name="phonenumber" required id="phonenumber" placeholder="Phone Number" autoComplete='off' className="sidebar1-text" label="phonenumber" onChange={HandlePhone} />

                            <input required name="email" id="email" placeholder="Email" autoComplete='off' className="sidebar1-text" label="Email" onChange={HandleEmailValue} />
                            <input required type="password" name="password" id="password" autoComplete='off' placeholder="Password" className="sidebar1-text" label="Password" onChange={HandlePasswordValue} />
                        </div>

                        <div className="login-2">
                            <button type="submit" className="Delete-Btn"> Create Account </button>
                        </div>


                    </form>
                </div>
            </div>
            <ToastContainer theme="colored" />
            <Footer />

        </>
    )
}
