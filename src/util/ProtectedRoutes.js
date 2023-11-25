import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoutes({isAuth, redirect_url}) {
    if (isAuth === 400) {
        redirect_url.current = window.location.pathname
    }
    return(isAuth === 200 ? <Outlet/> : isAuth === null ? <h1>Loading</h1> : <Navigate to={'auth/login'}/>)
}
