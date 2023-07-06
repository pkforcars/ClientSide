import React, { useContext } from 'react'
import {Navigate, useLocation} from "react-router-dom"
import Context from './Context/Context';

const ProtectedRoute = ({children}) => {

    const Global = useContext(Context)
    let location = useLocation();

    if(!Global.isLoggedIn) {
        return <Navigate to="/login" state={{ from: location}} replace />
    }
   return children

};

export default ProtectedRoute;