import React, { useState } from "react";
import Context from "./Context"

const States = (props)=>
{
    const AdminEmail = "admin@nu.edu.pk";
    const [ Order , SetOrder ] = useState()
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [User , SetUser] = useState()
    const [RedirectToCart , SetRedirectToCart ] = useState(false)
    const [Cart , SetCart] = useState([])

    const AddToCart = (item) => {
        SetCart((prevCart) => [...prevCart, item]);
      }
      
    return (
        <Context.Provider value={{ AdminEmail , Order , SetOrder , isLoggedIn, setIsLoggedIn, RedirectToCart , SetRedirectToCart, User , SetUser , Cart , SetCart , AddToCart}}>
            {props.children}
        </Context.Provider>
    )
}

export default States;
