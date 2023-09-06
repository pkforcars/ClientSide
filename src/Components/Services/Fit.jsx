import React, { useState } from 'react'
import Navigation from '../Navigation/Navigation'
import './Services.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../Footer/Footer'
import { useNavigate } from "react-router-dom";

export default function Accessories() {



    return (
        <>
            <Navigation />
            <div className="homepage2">
                <div className='container'>
                    <h1>How To Fit</h1>
                </div>
            </div>

            <div className="container fix" style={{
                marginTop: '50px',
                marginBottom: '50px'
            }}>
                <h4>HOW TO FIT OUR NUMBER PLATES</h4>

                <p>
                    You will need a drill with a 6mm drill bit and either our car or bike number plate fixing kit or alternatively the sticky pad kit if you don't want to use screws.
                </p>

                <h6>
                    FITTING USING THE CAR NUMBER PLATE FIXING KIT:
                </h6>

                <p>
                    Carefully remove your old plate from the vehicle and use it as a template to drill the holes into your new plate. This is easiest done by placing your old plate on top of new one and lining them up perfectly to drill the holes.
                </p>

                <p>
                    Make sure the surface where you choose to fit the new plate is clean and completely free of dirt/grease etc before fixing.
                </p>

                <p>
                    Fix your new plate to the vehicle using the screws provided and ensure it is tightly fitted and secure with the caps placed over the screws.
                </p>

                <h6>
                    FITTING USING THE BIKE NUMBER PLATE FIXING KIT:
                </h6>

                <p>
                    Carefully remove your old plate from the vehicle and use it as a template to drill the holes into your new plate. This is easiest done by placing your old plate on top of new one and lining them up perfectly to drill the holes.
                </p>

                <p>
                    Make sure the surface where you choose to fit the new plate is clean and completely free of dirt/grease etc before fixing.
                </p>

                <p>
                    Fix your new plate to the vehicle using the screws provided and ensure it is tightly fitted and secure with the caps placed over the screws.
                </p>

            </div>


            <Footer />
        </>
    )
}
