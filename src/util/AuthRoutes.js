import React from "react";
import { Navigate, Outlet } from "react-router-dom";


export default function AuthRoutes({user, redirectUrl}) {
    return(user.loginStatus === 200 ? <Navigate to={redirectUrl.current}/> : user.loginStatus === null ? <h3>Loading</h3> :  <Outlet/>  )
}