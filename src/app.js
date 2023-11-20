import React, { useEffect } from "react";
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

    useEffect(()=>{
        setresponse(null, 'GET', 200, 'http://localhost:80/user')
    }, [])

    console.log(response);
    return( 
        <>
            <Routes>
                <Route element={<RegularRoutes/>}>
                    <Route path="/" element={<LandingPage/>}/>
                </Route>

                {/* <Route element={<ProtectedRoutes isAuth={response.status}/>}>
                </Route> */}
                <Route element={<RestrictAuthRoutes isAuth={response.status}/>}>
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