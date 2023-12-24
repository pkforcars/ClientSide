import React, { useContext } from 'react'
import { useStripe, useElements } from '@stripe/react-stripe-js'
import { PaymentElement } from '@stripe/react-stripe-js'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Context from "../../Context/Context"
import { useNavigate } from 'react-router-dom';
import './Cart.css'
import { useRef, useEffect, useState } from "react";
import emailjs from "@emailjs/browser";

export default function Page2(props) {
  const Global = useContext(Context)
  const Navigate = useNavigate()
  const stripe = useStripe()
  const elements = useElements()
  const [PaymentClicked, SetPaymentClicked] = useState(false)
  useEffect(() => emailjs.init("JNRdUDii08iSKCinb"), []);

  const AddOrder = async () => {
    try {
      let body = {}
      if (typeof Global?.Order !== 'undefined') {
        body = {
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
          Delivery: props.orderData.delivery,
          Spare: Global.Order.Spare,
          OrderValue: props.orderData.total,
          FittingKit: Global.Order.FittingKit,
          Material: Global.Order.Material,
          FrontText: Global.Order.FrontText,
          RearText: Global.Order.RearText,
          Font: Global.Order.Font,
          LeftBadge: Global.Order.LeftBadge,
          LeftBadgeBackground: Global.Order.LeftBadgeBackground,
          RightBadge: Global.Order.RightBadge,
          RightBadgeBackground: Global.Order.RightBadgeBackground,
          FooterText: Global.Order.FooterText,
          FooterColor: Global.Order.FooterColor,
          PlateType: Global.Order.PlateType,
          BadgeCity: Global.Order.BadgeCity,
          BadgeFlag: Global.Order.BadgeFlag,
          Layout: Global.Order.Layout,
          OtherItems: Global.Cart
        }
      }
      else {
        body = {
          Email: props.orderData.email,
          Address1: props.orderData.address1,
          Address2: props.orderData.address2,
          City: props.orderData.city,
          PostCode: props.orderData.postcode,
          Country: props.orderData.country,
          Phone: props.orderData.phone,
          OtherItems: Global.Cart,
          Delivery: props.orderData.delivery,
          OrderValue: props.orderData.total,
        }
      }

      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/createOrder`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: 
          JSON.stringify(body)

      });
      const ResponseToJson = await response.json()

      if (ResponseToJson.success) {
        toast.success("Order Placed Successfully")
        setTimeout(
          () => {
            Navigate('/')
          }, 3000
        )
        Global.SetTotal(0)
        Global.SetCart([])
        Global.SetOrder()
      } else {
        toast.error("Request Failed")
        throw new Error("Request failed with status " + response.status);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const SendEmail = async() =>{
    const serviceId = "service_wztqj7b";
    const templateId = "template_sszvgp2";
    await emailjs.send(serviceId, templateId,
      {
        to_name: props.orderData.email,
        plate_number: Global.Order.PlateText,
        plate_type: Global.Order.Type,
        plate_front: Global.Order.FrontText,
        plate_rear: Global.Order.RearText,
        plate_material: Global.Order.Material,
        plate_badge: Global.Order.Badge,
        plate_badge_background: Global.Order.BadgeBackground,
        plate_border: Global.Order.Border,
        plate_delivery: props.orderData.delivery,
        plate_spare: Global.Order.Spare,
        plate_fitting_kit: Global.Order.FittingKit,
        plate_total: Global.Order.Total,
        plate_font: Global.Order.Font,
        plate_left_badge: Global.Order.LeftBadge,
        plate_left_badge_background: Global.Order.LeftBadgeBackground,
        plate_right_badge: Global.Order.RightBadge,
        plate_right_badge_background: Global.Order.RightBadgeBackground,
        plate_footer_text: Global.Order.FooterText,
        plate_footer_color: Global.Order.FooterColor,
        plate_plate_type: Global.Order.PlateType,
        plate_badge_city: Global.Order.BadgeCity,
        plate_badge_flag: Global.Order.BadgeFlag,
        plate_layout: Global.Order.Layout,
        plate_front_size: Global.Order.FrontSize,
        plate_rear_size: Global.Order.RearSize,
        plate_front_option: Global.Order.FrontOption,
        plate_rear_option: Global.Order.RearOption,
        plate_choice: Global.Order.PlateChoice,
        plate_short_hand: Global.Order.ShortHand,
        plate_other_items: Global.Cart,
        plate_address1: props.orderData.address1,
        plate_address2: props.orderData.address2,
        plate_city: props.orderData.city,
        plate_postcode: props.orderData.postcode,
        plate_country: props.orderData.country,
        plate_phone: props.orderData.phone,
        plate_order_value: props.orderData.total,
      });
    const templateId2 = "template_octykrb"
    await emailjs.send(serviceId, templateId2,
      {
        to_name: "platenkeys@gmail.com",
        plate_number: Global.Order.PlateText,
        plate_type: Global.Order.Type,
        plate_front: Global.Order.FrontText,
        plate_rear: Global.Order.RearText,
        plate_material: Global.Order.Material,
        plate_badge: Global.Order.Badge,
        plate_badge_background: Global.Order.BadgeBackground,
        plate_border: Global.Order.Border,
        plate_delivery: props.orderData.delivery,
        plate_spare: Global.Order.Spare,
        plate_fitting_kit: Global.Order.FittingKit,
        plate_total: Global.Order.Total,
        plate_font: Global.Order.Font,
        plate_left_badge: Global.Order.LeftBadge,
        plate_left_badge_background: Global.Order.LeftBadgeBackground,
        plate_right_badge: Global.Order.RightBadge,
        plate_right_badge_background: Global.Order.RightBadgeBackground,
        plate_footer_text: Global.Order.FooterText,
        plate_footer_color: Global.Order.FooterColor,
        plate_plate_type: Global.Order.PlateType,
        plate_badge_city: Global.Order.BadgeCity,
        plate_badge_flag: Global.Order.BadgeFlag,
        plate_layout: Global.Order.Layout,
        plate_front_size: Global.Order.FrontSize,
        plate_rear_size: Global.Order.RearSize,
        plate_front_option: Global.Order.FrontOption,
        plate_rear_option: Global.Order.RearOption,
        plate_choice: Global.Order.PlateChoice,
        plate_short_hand: Global.Order.ShortHand,
        plate_other_items: Global.Cart,
        plate_address1: props.orderData.address1,
        plate_address2: props.orderData.address2,
        plate_city: props.orderData.city,
        plate_postcode: props.orderData.postcode,
        plate_country: props.orderData.country,
        plate_phone: props.orderData.phone,
        plate_order_value: props.orderData.total,
      });
  }



  const MakePayment = async (e) => {
    if (e) {
      e.preventDefault();
    }
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
    if (paymentIntent && paymentIntent.status === "succeeded") {
      toast.success('Payment Successful')
      AddOrder()
      SendEmail()
    }
    else if (error) {
      SetPaymentClicked(false)
      toast.error('Payment Failed')
    }
    else {
      SetPaymentClicked(false)
      toast.error('Card Declined')
    }
  }


  return (
    <>
      <PaymentElement />
      <div className="login-2">
        <button className="btn-pay2" onClick={() => { Navigate('/dashboard') }} style={{ marginRight: "2px" }} >Cancel</button>

        <button onClick={(e) => {
                MakePayment(e);           
                SetPaymentClicked(true)
        }
        } className="Paynow"
          disabled={PaymentClicked}
        >Pay Now</button>
      </div>

      <ToastContainer theme="colored"></ToastContainer>
    </>
  )
}
