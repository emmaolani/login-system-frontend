import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoutes({user, redirectUrl, orderProcessingWebSocket}) {
    if (user.loginStatus === 400) {
        redirectUrl.current = window.location.pathname
    }
    orderProcessingWebSocket()
    return(user.loginStatus === 200 ? <Outlet/> : user.loginStatus === null ? <h1>Loading</h1> : <Navigate to={'auth/login'}/>)
}
