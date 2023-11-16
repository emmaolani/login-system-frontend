import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/landingpage";
import NavBar from "./component/navbar";
import AuthPage from "./pages/authorization";
import LoginPage from "./pages/login-page";
import SignupPage from "./pages/signup-page";
import ProtectedRoutes from "./hooks/ProtectedRoutes";
import useAuthuser from "./hooks/useAuthuser";


export default function App(){
    const [response, setresponse] = useAuthuser()

    useEffect(()=>{
        setresponse(null, 'GET', 200, 'http://localhost:80/user')
        console.log('here')
    }, [])

    console.log(response);
    return( 
        <>
            <NavBar/>
            <Routes>
                <Route element={<ProtectedRoutes isAuth={response.status}/>}>
                    <Route path="/" element={<LandingPage/>}/>
                </Route>
                <Route path="/auth">
                    <Route index element={<AuthPage/>}/>
                    <Route path="signup" element={ <SignupPage/> } />
                    <Route path="login" element={response.status === 200 ? <Navigate to={'/'}/> : <LoginPage login={setresponse} response={response}/>}/>
                </Route>
            </Routes>
        </>
    )
    
}