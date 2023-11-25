import React from "react";
import { Navigate, Outlet } from "react-router-dom";


export default function RestrictAuthRoutes({isAuth, redirect_url}) {
    return(isAuth === 200 ? <Navigate to={redirect_url.current}/> : <Outlet/>)
}