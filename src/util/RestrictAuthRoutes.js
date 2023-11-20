import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function RestrictAuthRoutes({isAuth}) {
    return(isAuth === 200 ? <Navigate to={'/'}/> : <Outlet/>)
}