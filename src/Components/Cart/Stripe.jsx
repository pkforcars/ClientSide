import React, { useContext } from 'react'
import { useStripe, useElements } from '@stripe/react-stripe-js'
import { PaymentElement } from '@stripe/react-stripe-js'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Context from "../../Context/Context"
import { useNavigate } from 'react-router-dom';
import './Cart.css'
import { useRef , useEffect , useState} from "react";
import emailjs from "@emailjs/browser";

export default function Page2(props) {
    const Global = useContext(Context)
    const Navigate = useNavigate()
    const stripe = useStripe()
    const elements = useElements()
    const nameRef = useRef(props.orderData.email);
    const emailRef = useRef(props.orderData.email);

    const [loading, setLoading] = useState(false);
    useEffect(() => emailjs.init("4UXhp1ho-2XzxocHz"), []);

    const AddOrder = async () => {
        try {
          const response = await fetch(`${process.env.REACT_APP_BASE_URL}/createOrder`, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                'Authorization-Token' : localStorage.getItem('Token')      
            },
            body: JSON.stringify({
              Email: props.orderData.email,
              Address1: props.orderData.address1,
              Address2: props.orderData.address2,
              City: props.orderData.city,
              PostCode: props.orderData.postcode,
              Country: props.orderData.country,
              Phone: props.orderData.phone,
              Type: Global.Order.Type,
              FrontOption: Global.Order.FrontOption,
              RearOption: Global.Order.RearOption,
              PlateChoice: Global.Order.PlateChoice,
              PlateText: Global.Order.PlateText,
              FrontSize: Global.Order.FrontSize,
              RearSize: Global.Order.RearSize,
              Badge: Global.Order.Badge,
              BadgeBackground: Global.Order.BadgeBackground,
              Border: Global.Order.Border,
              Vertical: Global.Order.Vertical,
              ShortHand: Global.Order.ShortHand,
              Delivery: Global.Order.Delivery,
              Spare: Global.Order.Spare,
              OrderValue: Global.Order.Total,
              FittingKit :  Global.Order.FittingKit ,     
              Material :  Global.Order.Material,
              FrontText :  Global.Order.FrontText,
              RearText :  Global.Order.RearText,   
            }),
            
          });
          const ResponseToJson = await response.json()
        
          if (ResponseToJson.success) {
            Navigate('/dashboard')
            const serviceId = "service_x8viupa";
            const templateId = "template_89adesx";
            setLoading(true);
            await emailjs.send(serviceId, templateId, 
              {
                to_name : props.orderData.email,
                plate_number:  Global.Order.PlateText,
                plate_type: Global.Order.Type,
                plate_front: Global.Order.FrontText,
                plate_rear: Global.Order.RearText,
                plate_material: Global.Order.Material,
                plate_badge: Global.Order.Badge,
                plate_badge_background: Global.Order.BadgeBackground,
                plate_border: Global.Order.Border,
                plate_delivery: Global.Order.Delivery,
                plate_spare: Global.Order.Spare,
                plate_fitting_kit: Global.Order.FittingKit,
                plate_total: Global.Order.Total,
              });
            setLoading(false);
            toast.success("Order Placed Successfully")
          } else {
            toast.error("Request Failed")
            throw new Error("Request failed with status " + response.status);
          }
        } catch (error) {
          console.error(error);
        }
      };
      
    
    
    const MakePayment = async (e) => {
            e.preventDefault()
            toast.success('Please Wait.....')

            if (!stripe || !elements) {
                return
            }
            if (props.orderData.email === "" || props.orderData.address1 === "" || props.orderData.city === "" || props.orderData.postcode === "" || props.orderData.country === "" || props.orderData.phone === "") {
                toast.error("Please fill all the fields")
                return
            }

            const { error, paymentIntent } = await stripe.confirmPayment(
                {
                    elements,
                    confirmParams: {
                        return_url: `${window.location.origin}/PaymentSuccess`, // Specify the return URL
                    },
                    redirect: "if_required"

                })
            if (error) {
                toast.error('Unable to Process')
            }
            else if (paymentIntent && paymentIntent.status === "succeeded") {
                toast.success('Payment Successful')
                AddOrder()
            }
            else {
                toast.error('Card Declined')
            }
        }


        return (
            <>
                <PaymentElement />
                <div className="login-2">
                    <button className="btn-pay2" onClick={()=>{Navigate('/dashboard')}} style={{marginRight: "2px"}} >Cancel</button>

                    <button onClick={MakePayment} className="Paynow">Pay Now</button>
                </div>

                <ToastContainer theme="colored"></ToastContainer>
            </>
        )
    }
