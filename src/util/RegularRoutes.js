import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../component/navbar";

export default function RegularRoutes() {
    return(
        <>
            <NavBar/>
            <Outlet/>
        </>
    )
}