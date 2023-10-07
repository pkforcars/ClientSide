import React, { useContext, useState, useEffect } from 'react'
import Navigation from '../Navigation/Navigation'
import Context from "../../Context/Context"
import './Cart.css'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import Stripe from './Stripe'
import Footer from '../Footer/Footer'
import { DeleteOutlined } from '@ant-design/icons';
import { ToastContainer, toast } from 'react-toastify';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_API_KEY);


export default function Cart2() {

    const [DeliveryCharges, SetDeliveryCharges] = useState(0)
    const [orderData, setOrderData] = useState({
        email: '',
        address1: '',
        address2: '',
        city: '',
        postcode: '',
        country: '',
        phone: '',
        delivery: 'N/A',
        total: ""
    });
    const [SubmitClicked, SetSubmitClicked] = useState(false)

    const HandleOrderEmail = (event) => { setOrderData({ ...orderData, email: event.target.value }); };
    const HandleAddress1 = (event) => { setOrderData({ ...orderData, address1: event.target.value }); };
    const HandleAddress2 = (event) => { setOrderData({ ...orderData, address2: event.target.value }); };
    const HandleCity = (event) => { setOrderData({ ...orderData, city: event.target.value }); };
    const HandlePostcode = (event) => { setOrderData({ ...orderData, postcode: event.target.value }); };
    const HandleCountry = (event) => { setOrderData({ ...orderData, country: event.target.value }); };
    const HandlePhone = (event) => { setOrderData({ ...orderData, phone: event.target.value }); };
    const HandleDelivery = (event) => {
        setOrderData({ ...orderData, delivery: event.target.value });
        if (event.target.value === "Local in Milton Keynes free delivery/collection") {
            SetDeliveryCharges(0)
        };
        if (event.target.value === "Standard Delivery £3.99") {
            SetDeliveryCharges(3.99)
        };
        if (event.target.value === "First Class Tracked £6.99") {
            SetDeliveryCharges(6.99)
        };
        if (event.target.value === "Spacial Delivery £11.99") {
            SetDeliveryCharges(11.99)
        };
    };

    const Global = useContext(Context)
    const [clientSecret, setClientSecret] = useState()

    const GetPaymentIntent = async () => {
        let Total = Global?.Total + DeliveryCharges
        const Response = await fetch(`${process.env.REACT_APP_BASE_URL}/PaymentIntent`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ Price: parseInt(Total + 1) }),
            });
        const ResponseToJson = await Response.json();
        setClientSecret(ResponseToJson.ClientSecret)
        orderData.total = (Global?.Total + DeliveryCharges).toFixed(2)
    }

    const removeFromCart = (item) => {

        let NewCart = Global.Cart.filter((cartItem) => {
            return cartItem.id !== item.id
        })
        console.log("New Cart ", NewCart);
        Global.SetCart(NewCart)
        let NewTotal = Global.Total - item.price
        Global.SetTotal(NewTotal)
    }

    const removeOrder = () => {
        Global.SetOrder()
        Global.SetTotal(
            Global.Total - Global.Order.Total
        )
    }


    return (
        <>
            <Navigation />
            <div className='container my-5' id="Cart-Holder">
                <div className='Order-Display'>

                    <>
                        {(Global?.Order?.Type === 'standard') &&

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
                                {Global.Order.Spare &&
                                    <div><b>Spare:</b> Spare Included</div>}
                                {!Global.Order.Spare &&
                                    <div><b>Spare:</b> Spare Excluded</div>}
                                {Global.Order.FittingKit &&
                                    <div><b>Fitting Kit:</b> Included</div>}
                                {!Global.Order.FittingKit &&
                                    <div><b>Fitting Kit:</b> Excluded</div>}
                                <div className="Accessories" >
                                    <div className='Acc-Header'>
                                        <div><b>Price:</b> £{Global.Order.Total}</div>
                                    </div>
                                    <div className='Acc2'>
                                        <DeleteOutlined onClick={() => removeOrder()} />
                                    </div>
                                </div>

                            </div>
                        }
                        {(Global?.Order?.Type === '4D') &&
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
                                {Global.Order.Spare &&
                                    <div><b>Spare:</b> Spare Included</div>}
                                {!Global.Order.Spare &&
                                    <div><b>Spare:</b> Spare Excluded</div>}
                                {Global.Order.FittingKit &&
                                    <div><b>Fitting Kit:</b> Included</div>}
                                {!Global.Order.FittingKit &&
                                    <div><b>Fitting Kit:</b >Excluded</div>}
                                <div className="Accessories" >
                                    <div className='Acc-Header'>
                                        <div><b>Price:</b> £{Global.Order.Total}</div>
                                    </div>
                                    <div className='Acc2'>
                                        <DeleteOutlined onClick={() => removeOrder()} />
                                    </div>
                                </div>
                            </div>
                        }
                        {(Global?.Order?.Type === 'custom') &&
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
                                    <div><b>Left Badge :</b> {Global.Order.LeftBadge.Image} [{Global.Order.LeftBadgeBackground}]  {Global.Order.PlateChoice === 'Front and Rear' ? "£29.99" : "£14.99"}</div>
                                }
                                {typeof Global.Order.RightBadge?.Image !== "undefined" &&
                                    <div><b>Right Badge:</b> {Global.Order.RightBadge.Image} [{Global.Order.RightBadgeBackground}] {Global.Order.PlateChoice === 'Front and Rear' ? "£29.99" : "£14.99"}</div>
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
                                    <div><b>Spare:</b> {Global.Order.PlateChoice === 'Front and Rear' ? "£30.00" : "£15.00"}</div>
                                }
                                {Global.Order.FittingKit &&
                                    <div><b>Fitting Kit:</b> £3.99</div>
                                }
                                {Global.Order.Font &&
                                    <div><b>Font Color:</b> {Global.Order.Font}</div>
                                }
                                <div><b>Material:</b> Standard ABS</div>
                                <div className="Accessories" >
                                    <div className='Acc-Header'>
                                        <div><b>Price:</b> £{Global.Order.Total}</div>
                                    </div>
                                    <div className='Acc2'>
                                        <DeleteOutlined onClick={() => removeOrder()} />
                                    </div>
                                </div>
                            </div>
                        }
                        {(Global?.Order?.Type === 'Motor' && Global.Order.PlateChoice === 'Front and Rear') &&
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
                                <div className="Accessories" >
                                    <div className='Acc-Header'>
                                        <div><b>Price:</b> £{Global.Order.Total}</div>
                                    </div>
                                    <div className='Acc2'>
                                        <DeleteOutlined onClick={() => removeOrder()} />
                                    </div>
                                </div>
                            </div>
                        }
                        {(Global?.Order?.Type === 'Motor' && Global.Order.PlateChoice === 'Front Only') &&
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
                                <div className="Accessories" >
                                    <div className='Acc-Header'>
                                        <div><b>Price:</b> £{Global.Order.Total}</div>
                                    </div>
                                    <div className='Acc2'>
                                        <DeleteOutlined onClick={() => removeOrder()} />
                                    </div>
                                </div>
                            </div>
                        }
                        {(Global?.Order?.selectedState === 'Motor' && Global.Order.PlateChoice === 'Rear Only') &&
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
                                <div className="Accessories" >
                                    <div className='Acc-Header'>
                                        <div><b>Price:</b> £{Global.Order.Total}</div>
                                    </div>
                                    <div className='Acc2'>
                                        <DeleteOutlined onClick={() => removeOrder()} />
                                    </div>
                                </div>
                            </div>

                        }
                        <div>
                            {Global?.Cart?.map((item, index) => {
                                return (
                                    <div className="Accessories" key={index}>
                                        <div className='Acc-Header'>
                                            {item.name} [x1]
                                        </div>
                                        <div className='Acc2'
                                        >
                                            <div> £{item.price}</div>
                                            <DeleteOutlined onClick={() => removeFromCart(item)} />
                                        </div>

                                    </div>
                                )
                            })}
                        </div>
                    </>




                    <div className='Price-display'>
                        <div>Total Amount:</div>
                        <div>£{(Global?.Total + DeliveryCharges).toFixed(2)}</div>
                    </div>
                </div>

                <div className="Order-Button">
                    <div className='Order-Header'>
                        Address Details
                    </div>
                    <div className="Order-Form">
                        <input placeholder="Enter Email Address" id="TopBox" required onChange={HandleOrderEmail}
                            value={orderData.email} disabled={SubmitClicked}
                        />
                    </div>

                    <div className="Order-Form2">
                        <input placeholder="Address Line 1" id="TopBox2" required onChange={HandleAddress1}
                            value={orderData.address1} disabled={SubmitClicked}
                        ></input>
                        <input placeholder="Address Line 2" id="TopBox21" onChange={HandleAddress2}
                            value={orderData.address2} disabled={SubmitClicked}
                        ></input>
                    </div>
                    <div className="Order-Form2">
                        <input placeholder="City" id="TopBox2" required onChange={HandleCity}
                            value={orderData.city} disabled={SubmitClicked}
                        ></input>
                        <input placeholder="Postcode" id="TopBox21" required onChange={HandlePostcode}
                            value={orderData.postcode} disabled={SubmitClicked}
                        ></input>
                    </div>

                    <div className="Order-Form2">
                        <input placeholder="Country" id="TopBox2" required onChange={HandleCountry}
                            value={orderData.country} disabled={SubmitClicked}
                        ></input>
                        <input placeholder="Phone Number" id="TopBox21" required onChange={HandlePhone}
                            value={orderData.phone} disabled={SubmitClicked}
                        ></input>
                    </div>
                    <div className="Order-Form2">
                        {SubmitClicked === false &&
                            <select id='Dropdown' required onChange={HandleDelivery} style={{ color: "black" }}>
                                <option value="N/A">-- Select Delivery Option--</option>
                                <option value="Local in Milton Keynes free delivery/collection">Local in Milton Keynes free delivery/collection</option>
                                <option value="Standard Delivery £3.99">Standard Delivery [3-5 Working Days] £3.99</option>
                                <option value="First Class Tracked £6.99">First Class Tracked [1-2 Working Days] £6.99</option>
                                <option value="Spacial Delivery £11.99">Spacial Delivery [Next Working Day] £11.99</option>
                            </select>
                        }
                        {SubmitClicked === true &&
                            <select id='Dropdown' required style={{ color: "black" }}
                                value={
                                    orderData.delivery === "N/A" ? "N/A" :
                                        orderData.delivery === "Local in Milton Keynes free delivery/collection" ? "Local in Milton Keynes free delivery/collection" :
                                            orderData.delivery === "Standard Delivery £3.99" ? "Standard Delivery £3.99" :
                                                orderData.delivery === "First Class Tracked £6.99" ? "First Class Tracked £6.99" :
                                                    orderData.delivery === "Spacial Delivery £11.99" ? "Spacial Delivery £11.99" : "N/A"
                                }

                                disabled>
                                <option value="N/A">-- Select Delivery Option--</option>
                                <option value="Local in Milton Keynes free delivery/collection">Local in Milton Keynes free delivery/collection</option>
                                <option value="Standard Delivery £3.99">Standard Delivery [3-5 Working Days] £3.99</option>
                                <option value="First Class Tracked £6.99">First Class Tracked [1-2 Working Days] £6.99</option>
                                <option value="Spacial Delivery £11.99">Spacial Delivery [Next Working Day] £11.99</option>
                            </select>
                        }
                        {SubmitClicked === false &&
                            <button
                                className="Paynow3" onClick={() => {
                                    if (orderData.email === "" || orderData.address1 === "" || orderData.city === "" || orderData.postcode === "" || orderData.country === "" || orderData.phone === "") {                                        
                                        toast.error("Please fill all the fields")
                                        return
                                    }                                  
                                    GetPaymentIntent()
                                    SetSubmitClicked(true)
                                }
                                }
                            >Submit Order</button>
                        }
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
            <ToastContainer/>

            <Footer />
        </>
    )
}

