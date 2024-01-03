import React, { useEffect, useRef } from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/landingpage";
import AuthPage from "./pages/authorization";
import LoginPage from "./pages/login-page";
import SignupPage from "./pages/signup-page";
import ProtectedRoutes from "./util/ProtectedRoutes";
import useRequest from "./hooks/useRequest";
import RegularRoutes from "./util/RegularRoutes";
import AuthRoutes from "./util/AuthRoutes";
import io from "socket.io-client";
import useCreateOrderProcessingSocket from "./hooks/useOrderProcessingSocket";


export default function App(){
    const [user, getUser] = useRequest()
    const redirectUrl = useRef('/')
    const order = useRef(null)
    const [createOrder, disconnectOrder] = useCreateOrderProcessingSocket(order)

    useEffect(()=>{
        getUser(null, 'GET', 200, 'http://localhost:80/user')
    }, [])


    return( 
        <>
            <Routes>
                <Route element={
                    <RegularRoutes 
                        user={user}
                        redirectUrl={redirectUrl} 
                        orderProcessingWebSocket={disconnectOrder}
                        order={order} 
                    />
                }>
                    <Route path="/" element={<LandingPage/>}/>
                </Route>

                <Route element={
                    <ProtectedRoutes 
                        user={user} 
                        redirectUrl={redirectUrl} 
                        orderProcessingWebSocket={disconnectOrder} 
                    />
                }>
                </Route> 

                <Route element={
                    <AuthRoutes 
                        user={user} 
                        redirectUrl={redirectUrl} 
                        orderProcessingWebSocket={disconnectOrder} 
                    />
                }>
                    <Route path="/auth">
                        <Route index element={<AuthPage  orderProcessingWebSocket={createOrder} order={order} />}/>
                        <Route path="signup" element={ <SignupPage/> } />
                        <Route path="login" element={<LoginPage getUser={getUser}/>}/>
                    </Route>
                </Route>
            </Routes>
        </>
    )    
}
