import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../component/navbar";

export default function RegularRoutes({user, redirectUrl, orderProcessingWebSocket, order}) {
    if (user.loginStatus === 400) {
        redirectUrl.current = window.location.pathname    
    }
    if (order.current !== null){
        orderProcessingWebSocket()
    }
    
    return(
        <>
            <NavBar/>
            <Outlet/>
        </>
    )
}