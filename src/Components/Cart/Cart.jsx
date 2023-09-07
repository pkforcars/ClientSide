import React, { useContext, useState, useEffect } from 'react'
import Navigation from '../Navigation/Navigation'
import Context from "../../Context/Context"
import './Cart.css'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import Stripe from './Stripe'
import Footer from '../Footer/Footer'

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_API_KEY);


export default function Cart2() {
    const [orderData, setOrderData] = useState({
        email: '',
        address1: '',
        address2: '',
        city: '',
        postcode: '',
        country: '',
        phone: '',
    });
    const HandleOrderEmail = (event) => { setOrderData({ ...orderData, email: event.target.value }); };
    const HandleAddress1 = (event) => { setOrderData({ ...orderData, address1: event.target.value }); };
    const HandleAddress2 = (event) => { setOrderData({ ...orderData, address2: event.target.value }); };
    const HandleCity = (event) => { setOrderData({ ...orderData, city: event.target.value }); };
    const HandlePostcode = (event) => { setOrderData({ ...orderData, postcode: event.target.value }); };
    const HandleCountry = (event) => { setOrderData({ ...orderData, country: event.target.value }); };
    const HandlePhone = (event) => { setOrderData({ ...orderData, phone: event.target.value }); };
    const Global = useContext(Context)
    const [clientSecret, setClientSecret] = useState()

    const GetPaymentIntent = async () => {
        const Response = await fetch(`${process.env.REACT_APP_BASE_URL}/PaymentIntent`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ Price: Global.Order.Total }),
            });
        const ResponseToJson = await Response.json();
        setClientSecret(ResponseToJson.ClientSecret)
    }


    useEffect(() => {
        GetPaymentIntent()
    }, [])

    return (
        <>
            <Navigation />
            <div className='container my-5' id="Cart-Holder">
                <div className='Order-Display'>

                    <>
                        {(Global.Order.Type === 'standard') &&

                            <div className="Order-His">
                                <div className='Order-Header'>
                                    Order Details
                                </div>
                                <div><b>Plate Type:</b> Standard [{Global.Order.PlateChoice}]</div>
                                <div><b>Plate Number:</b> {Global.Order.PlateText}</div>
                                {(Global.Order.PlateChoice === 'Front and Rear' || Global.Order.PlateChoice === 'Front Only') &&
                                    <div><b>Front Plate Size:</b> {Global.Order.FrontText}</div>
                                }
                                {(Global.Order.PlateChoice === 'Front and Rear' || Global.Order.PlateChoice === 'Rear Only') &&
                                    <div><b>Rear Plate Size:</b> {Global.Order.RearText}</div>
                                }
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
                                    <div><b>Badge Type:</b> Electric</div>
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
                                    <div><b>Fitting Kit:</b> Excluded</div>}
                            </div>
                        }
                        {(Global.Order.Type === '4D') &&
                            <div className="Order-His">
                                <div className='Order-Header'>
                                    Order Details
                                </div>
                                <div><b>Plate Type:</b> 4D [Front and Rear]</div>
                                <div><b>Plate Number:</b> {Global.Order.PlateText}</div>
                                <div><b>Front Plate Size:</b> {Global.Order.FrontText}</div>
                                <div><b>Rear Plate Size:</b> {Global.Order.RearText}</div>
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
                                    <div><b>Fitting Kit:</b >Excluded</div>}
                            </div>
                        }
                        {(Global.Order.Type === 'custom') &&
                            <div className="Order-His">
                                <div className='Order-Header'>
                                    Order Details
                                </div>
                                <div><b>Plate Type:</b> Custom [{Global.Order.PlateChoice}]</div>
                                {(Global.Order.PlateChoice === 'Front and Rear' || Global.Order.PlateChoice === 'Front Only') &&
                                    <div><b>FrontSize:</b> {Global.Order.FrontText} £9.99</div>
                                }
                                {(Global.Order.PlateChoice === 'Front and Rear' || Global.Order.PlateChoice === 'Rear Only') &&
                                    <div><b>RearSize:</b> {Global.Order.RearText} £9.99</div>
                                }
                                {(Global.Order.Border !== "transparent") &&
                                    <div><b>Border:</b> {Global.Order.Border} £21.99</div>
                                }
                                {typeof Global.Order.LeftBadge?.Image !== "undefined" &&
                                    <div><b>Left Badge :</b> {Global.Order.LeftBadge.Image} [{Global.Order.LeftBadgeBackground}]  £29.99</div>
                                }
                                {typeof Global.Order.RightBadge?.Image !== "undefined" &&
                                    <div><b>Right Badge:</b> {Global.Order.RightBadge.Image} [{Global.Order.RightBadgeBackground}] £29.99</div>
                                }
                                {Global.Order.Badge !== "" &&
                                    <div><b>Badge:</b> {Global.Order.Badge} £14.99</div>
                                }
                                {Global.Order.PlateType &&
                                    <div><b>Plate Type:</b> {Global.Order.PlateType}</div>
                                }
                                {Global.Order.FooterText !== "" &&
                                    <div><b>Footer Text:</b> {Global.Order.FooterText} [{Global.Order.FooterColor}]</div>
                                }
                                {Global.Order.Spare &&
                                    <div><b>Spare:</b> £15.00</div>
                                }
                                {Global.Order.FittingKit &&
                                    <div><b>Fitting Kit:</b> £3.99</div>
                                }
                                {Global.Order.Font &&
                                    <div><b>Font Color:</b> {Global.Order.Font}</div>
                                }
                                <div><b>Material:</b> Standard ABS</div>
                                <div><b>Delivery:</b> {Global.Order.Delivery}</div>
                            </div>
                        }
                        {(Global.Order.Type === 'Motor' && Global.Order.PlateChoice === 'Front and Rear') &&
                            <div className="Order-His">
                                <div className='Order-Header'>
                                    Order Details
                                </div>
                                <div><b>Plate Type:</b> Motor Plates</div>
                                <div><b>FrontSize:</b> {Global.Order.FrontText} £9.99</div>
                                <div><b>RearSize:</b> {Global.Order.RearText} £9.99</div>
                                {(Global.Order.Border !== "transparent") &&
                                    <div><b>Border:</b> {Global.Order.Border} £21.99</div>
                                }
                                {Global.Order.Badge !== "" &&
                                    <div><b>Badge:</b> {Global.Order.Badge} £29.99</div>
                                }
                                {Global.Order.Badge !== "" && Global.Order.BadgeBackground === '#366CB7' &&
                                    <div><b>Badge Type:</b> Normal</div>
                                }
                                {Global.Order.Badge !== "" && Global.Order.BadgeBackground !== '#366CB7' &&
                                    <div><b>Badge Type:</b> Electric</div>
                                }
                                <div><b>Material:</b> Standard ABS</div>
                                {Global.Order.Spare &&
                                    <div><b>Spare:</b> £30.00</div>
                                }
                                {Global.Order.FittingKit &&
                                    <div><b>Fitting Kit:</b> £3.99</div>
                                }
                                <div><b>Delivery:</b> {Global.Order.Delivery}</div>
                            </div>
                        }
                        {(Global.Order.Type === 'Motor' && Global.Order.PlateChoice === 'Front Only') &&
                            <div className="Order-His">
                                <div className='Order-Header'>
                                    Order Details
                                </div>

                                <div><b>Plate Type:</b> Motor Plates [Front Only]</div>
                                <div><b>FrontSize:</b> {Global.Order.FrontText} £9.99</div>
                                {(Global.Order.Border !== "transparent") &&
                                    <div><b>Border:</b> {Global.Order.Border} £10.99</div>
                                }
                                {Global.Order.Badge !== "" &&
                                    <div><b>Badge:</b> {Global.Order.Badge} £14.99</div>
                                }
                                {Global.Order.Badge !== "" && Global.Order.BadgeBackground === '#366CB7' &&
                                    <div><b>Badge Type:</b> Normal</div>
                                }
                                {Global.Order.Badge !== "" && Global.Order.BadgeBackground !== '#366CB7' &&
                                    <div><b>Badge Type:</b> Electric</div>
                                }
                                {Global.Order.Spare &&
                                    <div><b>Spare:</b> £30.00</div>
                                }
                                {Global.Order.FittingKit &&
                                    <div><b>Fitting Kit:</b> £3.99</div>
                                }
                                <div><b>Material:</b> Standard ABS</div>
                                <div><b>Delivery:</b> {Global.Order.Delivery}</div>
                            </div>
                        }
                        {(Global.Order.selectedState === 'Motor' && Global.Order.PlateChoice === 'Rear Only') &&
                            <div className="Order-His">
                                <div className='Order-Header'>
                                    Order Details
                                </div>

                                <div><b>Plate Type:</b> Motor Plates [Rear Only]</div>
                                <div><b>RearSize:</b> {Global.Order.RearText} £9.99</div>
                                {(Global.Order.Border !== "transparent") &&
                                    <div><b>Border:</b> {Global.Order.Border} £10.99</div>
                                }
                                {Global.Order.Badge !== "" &&
                                    <div><b>Badge:</b> {Global.Order.Badge} £14.99</div>
                                }
                                {Global.Order.Badge !== "" && Global.Order.BadgeBackground === '#366CB7' &&
                                    <div><b>Badge Type:</b> Normal</div>
                                }
                                {Global.Order.Badge !== "" && Global.Order.BadgeBackground !== '#366CB7' &&
                                    <div><b>Badge Type:</b> Electric</div>
                                }
                                {Global.Order.Spare &&
                                    <div><b>Spare:</b> £30.00</div>
                                }
                                {Global.Order.FittingKit &&
                                    <div><b>Fitting Kit:</b> £3.99</div>
                                }
                                <div><b>Material:</b> Standard ABS</div>
                                <div><b>Delivery:</b> {Global.Order.Delivery}</div>
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
                        <input placeholder="Enter Email Address" id="TopBox" required onChange={HandleOrderEmail} />
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

                    {clientSecret &&
                        (
                            <Elements stripe={stripePromise} options={{ clientSecret }}>
                                <Stripe orderData={orderData} />
                            </Elements>
                        )
                    }
                </div>
            </div >

            <Footer />
        </>
    )
}

