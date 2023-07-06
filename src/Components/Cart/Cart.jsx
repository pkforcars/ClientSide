import React, { useContext, useState, useEffect } from 'react'
import Navigation from '../Navigation/Navigation'
import Context from "../../Context/Context"
import './Cart.css'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import Stripe from './Stripe'
export default function Cart2() {
    const [stripePromise, setStripePromise] = useState(null)
    const [orderData, setOrderData] = useState({
        email: '',
        address1: '',
        address2: '',
        city: '',
        postcode: '',
        country: '',
        phone: '',
      });
    const HandleOrderEmail = (event) => { setOrderData({ ...orderData, email: event.target.value });};
    const HandleAddress1 = (event) => {setOrderData({ ...orderData, address1: event.target.value });};
    const HandleAddress2 = (event) => { setOrderData({ ...orderData, address2: event.target.value });};
    const HandleCity = (event) => { setOrderData({ ...orderData, city: event.target.value }); };
    const HandlePostcode = (event) => { setOrderData({ ...orderData, postcode: event.target.value });};
    const HandleCountry = (event) => {setOrderData({ ...orderData, country: event.target.value });};
    const HandlePhone = (event) => {  setOrderData({ ...orderData, phone: event.target.value });};
    const Global = useContext(Context)
    const [clientSecret, setClientSecret] = useState()
    useEffect(() => {
        const stripeApiKey = process.env.REACT_APP_STRIPE_API_KEY;
        const stripePromise = loadStripe(stripeApiKey);
        setStripePromise(stripePromise)
    }, [])
    useEffect(() => {
        const CreatePaymentIntent = async () => {
            const Response = await fetch(`${process.env.REACT_APP_BASE_URL}/create-payment-intent`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({Price: Global.Order.Total}),
                });

            const ResponseToJson = await Response.json();
            setClientSecret(ResponseToJson.ClientSecret)
        }
        CreatePaymentIntent()
    }, [])


    return (
        <>
            <Navigation />
            <div className='container my-5' id="Cart-Holder">
                <div className='Order-Display'>
                    <div className='Order-Header'>
                        Order Details
                    </div>

                    <>
                        {(Global.Order.Type === 'standard' && Global.Order.PlateChoice === 'Front and Rear') &&
                            <div className="Order-His">
                                <div><b>Plate Type:</b> Standard [Front and Rear]</div>
                                <div><b>Plate Number:</b> {Global.Order.PlateText}</div>
                                <div><b>Front Plate Size:</b> {ReturnSize(Global.Order.FrontSize)}</div>
                                <div><b>Rear Plate Size:</b> {ReturnSize(Global.Order.RearSize)}</div>
                                {(Global.Order.Border !== "transparent") &&
                                    <div><b>Border:</b> {Global.Order.Border}</div>
                                }
                                {(Global.Order.Border === "transparent") &&
                                    <div><b>Border:</b> None</div>
                                }
                                {Global.Order.Badge !== "" &&
                                    <>
                                        <div><b>Badge:</b> {Global.Order.Badge}</div>
                                    </>
                                }
                                {Global.Order.Badge === "" &&
                                    <div><b>Badge:</b> No Badges</div>
                                }
                                {Global.Order.Badge !== "" && Global.Order.BadgeBackground === '#366CB7' &&
                                    <div><b>Badge Type:</b> Normal</div>
                                }
                                {Global.Order.Badge !== "" && Global.Order.BadgeBackground !== '#366CB7' &&
                                    <div><b>Badge Type:</b> Gel</div>
                                }
                                <div><b>Material:</b> Standard ABS</div>
                                <div><b>Delivery:</b> {Global.Order.Delivery} Delivery</div>
                                {Global.Order.Spare &&
                                    <div><b>Spare:</b> Spare Included</div>}
                                {!Global.Order.Spare &&
                                    <div><b>Spare:</b> Spare Excluded</div>}
                                {Global.Order.FittingKit &&
                                    <div><b>Fitting Kit:</b> Included</div>}
                                {!Global.Order.FittingKit &&
                                    <div><b>Fitting Kit:</b>Excluded</div>}
                    
                            </div>
                        }
                        {(Global.Order.Type === 'standard' && Global.Order.PlateChoice === 'Front Only') &&
                            <div className="Order-His">
                                <div><b>Plate Type:</b> Standard [Front Only]</div>
                                <div><b>Plate Number:</b> {Global.Order.PlateText}</div>
                                <div><b>Front Plate Size:</b> {ReturnSize(Global.Order.FrontSize)}</div>
                                {(Global.Order.Border !== "transparent") &&
                                    <div><b>Border:</b> {Global.Order.Border}</div>
                                }
                                {(Global.Order.Border === "transparent") &&
                                    <div><b>Border:</b> None</div>
                                }
                                {Global.Order.Badge !== "" &&
                                    <>
                                        <div><b>Badge:</b> {Global.Order.Badge}</div>
                                    </>
                                }
                                {Global.Order.Badge === "" &&
                                    <div><b>Badge:</b> No Badges</div>
                                }
                                {Global.Order.Badge !== "" && Global.Order.BadgeBackground === '#366CB7' &&
                                    <div><b>Badge Type:</b> Normal</div>
                                }
                                {Global.Order.Badge !== "" && Global.Order.BadgeBackground !== '#366CB7' &&
                                    <div><b>Badge Type:</b> Gel</div>
                                }
                                <div><b>Material:</b> Standard ABS</div>
                                <div><b>Delivery:</b> {Global.Order.Delivery} Delivery</div>
                                {Global.Order.Spare &&
                                    <div><b>Spare:</b> Spare Included</div>}
                                {!Global.Order.Spare &&
                                    <div><b>Spare:</b> Spare Excluded</div>}
                                {Global.Order.FittingKit &&
                                    <div><b>Fitting Kit:</b> Included</div>}
                                {!Global.Order.FittingKit &&
                                    <div><b>Fitting Kit:</b>Excluded</div>}

                            </div>
                        }
                        {(Global.Order.Type === 'standard' && Global.Order.PlateChoice === 'Rear Only') &&
                            <div className="Order-His">
                                <div><b>Plate Type:</b> Standard [Rear Only]</div>
                                <div><b>Plate Number:</b> {Global.Order.PlateText}</div>
                                <div><b>Rear Plate Size:</b> {ReturnSize(Global.Order.RearSize)}</div>
                                {(Global.Order.Border !== "transparent") &&
                                    <div><b>Border:</b> {Global.Order.Border}</div>
                                }
                                {(Global.Order.Border === "transparent") &&
                                    <div><b>Border:</b> None</div>
                                }
                                {Global.Order.Badge !== "" &&
                                    <>
                                        <div><b>Badge:</b> {Global.Order.Badge}</div>
                                    </>
                                }
                                {Global.Order.Badge === "" &&
                                    <div><b>Badge:</b> No Badges</div>
                                }
                                {Global.Order.Badge !== "" && Global.Order.BadgeBackground === '#366CB7' &&
                                    <div><b>Badge Type:</b> Normal</div>
                                }
                                {Global.Order.Badge !== "" && Global.Order.BadgeBackground !== '#366CB7' &&
                                    <div><b>Badge Type:</b> Gel</div>
                                }
                                <div><b>Material:</b> Standard ABS</div>
                                <div><b>Delivery:</b> {Global.Order.Delivery} Delivery</div>
                                {Global.Order.Spare &&
                                    <div><b>Spare:</b> Spare Included</div>}
                                {!Global.Order.Spare &&
                                    <div><b>Spare:</b> Spare Excluded</div>}
                                {Global.Order.FittingKit &&
                                    <div><b>Fitting Kit:</b> Included</div>}
                                {!Global.Order.FittingKit &&
                                    <div><b>Fitting Kit:</b>Excluded</div>}
                            </div>
                        }
                        {(Global.Order.Type !== 'standard') &&
                            <div className="Order-His">
                                <div><b>Plate Type:</b> 4D [Front and Rear]</div>
                                <div><b>Plate Number:</b> {Global.Order.PlateText}</div>
                                <div><b>Front Plate Size:</b> {ReturnSize(Global.Order.FrontSize)}</div>
                                <div><b>Rear Plate Size:</b> {ReturnSize(Global.Order.RearSize)}</div>
                                {(Global.Order.Border !== "transparent") &&
                                    <div><b>Border:</b> {Global.Order.Border}</div>
                                }
                                {(Global.Order.Border === "transparent") &&
                                    <div><b>Border:</b> None</div>
                                }

                                <div><b>Material:</b> Standard ABS</div>
                                <div><b>Delivery:</b> {Global.Order.Delivery} Delivery</div>
                                {Global.Order.Spare &&
                                    <div><b>Spare:</b> Spare Included</div>}
                                {!Global.Order.Spare &&
                                    <div><b>Spare:</b> Spare Excluded</div>}
                                {Global.Order.FittingKit &&
                                    <div><b>Fitting Kit:</b> Included</div>}
                                {!Global.Order.FittingKit &&
                                    <div><b>Fitting Kit:</b>Excluded</div>}
                            </div>
                        }
                    </>


                    <div className='Price-display'>
                        <div>Total Amount:</div>
                        <div>£{Global.Order.Total}</div>
                    </div>
                </div>

                <div className="Order-Button">
                    <div className='Order-Header'>
                        Address Details
                    </div>
                    <div className="Order-Form">
                        <input placeholder="Enter Email Address" id="TopBox" required onChange={HandleOrderEmail}/>
                    </div>

                    <div className="Order-Form2">
                        <input placeholder="Address Line 1" id="TopBox2" required onChange={HandleAddress1}></input>
                        <input placeholder="Address Line 2" id="TopBox21" onChange={HandleAddress2}></input>
                    </div>
                    <div className="Order-Form2">
                        <input placeholder="City" id="TopBox2" required onChange={HandleCity}></input>
                        <input placeholder="Postcode" id="TopBox21" required onChange={HandlePostcode}></input>
                    </div>

                    <div className="Order-Form2">
                        <input placeholder="Country" id="TopBox2" required onChange={HandleCountry}></input>
                        <input placeholder="Phone Number" id="TopBox21" required onChange={HandlePhone}></input>
                    </div>

                {stripePromise && clientSecret &&
                (
                    <Elements stripe={stripePromise} options={{clientSecret}}>
                        <Stripe  orderData={orderData} />
                    </Elements>
                    )
                }
                </div>
        </div >

        <div className="FooterContainer1">
        <div className="Content1">
          &copy; Copyright 2005-2023 Bancroft Auto Locksmiths. All rights Reserved.
        </div>
      </div>

        </>
    )
}

const ReturnSize = (Option) => {
    const Size = {
        Option1: 'Standard Size (20.5x4.4in)',
        Option6: 'Standard UK Car Large Rear',
        Option2: 'Short Plate [ 6 Letters ]',
        Option3: 'Short Plate [ 5 Letters ]',
        Option4: 'Standard UK Motorcycle',
        Option5: 'Standard 4x4 Plate'
    }
    return Size[Option] || ""
}
