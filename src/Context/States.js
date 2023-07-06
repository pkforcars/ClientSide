import React, { useState } from "react";
import Context from "./Context"

const States = (props)=>
{
    const AdminEmail = "admin@nu.edu.pk";
    const [ Order , SetOrder ] = useState()
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [User , SetUser] = useState()
    const [RedirectToCart , SetRedirectToCart ] = useState(false)
    return (
        <Context.Provider value={{ AdminEmail , Order , SetOrder , isLoggedIn, setIsLoggedIn, RedirectToCart , SetRedirectToCart, User , SetUser }}>
            {props.children}
        </Context.Provider>
    )
}

export default States;
