import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoutes({isAuth}) {
    return(isAuth === 200 ? <Outlet/> : isAuth === null ? <h1>Loading</h1> : <Navigate to={'auth/login'}/>)
}