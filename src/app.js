import React, { useEffect, useRef } from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/landingpage";
import AuthPage from "./pages/authorization";
import LoginPage from "./pages/login-page";
import SignupPage from "./pages/signup-page";
import ProtectedRoutes from "./util/ProtectedRoutes";
import useAuthuser from "./hooks/useAuthuser";
import RegularRoutes from "./util/RegularRoutes";
import RestrictAuthRoutes from "./util/RestrictAuthRoutes";


export default function App(){
    const [response, setresponse] = useAuthuser()
    const redirect_url = useRef('/')
    useEffect(()=>{
        setresponse(null, 'GET', 200, 'http://localhost:80/user')
    }, [])
 
    console.log(response);
    return( 
        <>
            <Routes>
                <Route element={<RegularRoutes redirect_url={redirect_url}/>}>
                    <Route path="/" element={<LandingPage/>}/>
                </Route>

                <Route element={<ProtectedRoutes isAuth={response.status} redirect_url={redirect_url}/>}>
                </Route> 
                <Route element={<RestrictAuthRoutes isAuth={response.status} redirect_url={redirect_url}/>}>
                    <Route path="/auth">
                        <Route index element={<AuthPage/>}/>
                        <Route path="signup" element={ <SignupPage/> } />
                        <Route path="login" element={<LoginPage login={setresponse} response={response}/>}/>
                    </Route>
                </Route>
            </Routes>
        </>
    )    
}
