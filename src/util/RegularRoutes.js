import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../component/navbar";

export default function RegularRoutes({redirect_url}) {
    redirect_url.current = window.location.pathname
    return(
        <>
            <NavBar/>
            <Outlet/>
        </>
    )
}