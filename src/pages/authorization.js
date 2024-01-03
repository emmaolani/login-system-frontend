import React, { useRef } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthPage({orderProcessingWebSocket, order}) {
    const navigate = useNavigate()
    const redirect = useNavigate()  
    orderProcessingWebSocket()
    
    order.current.on('orderPlaced', (data)=>{
        console.log(data);
    })

    function emitdata() {
        order.current.emit('send_message', {message: 'hello world'})
    }

    function goto_page(page) {
        navigate(page)
    }

    return(
        <section id="auth-page">
            <div id="Auth-sect">
                <h2 className="auth-sect1">Let's Get Started</h2>
                <p className="auth-sect2">Sign-up or Login</p>
          
                <div className="auth-desc" onClick={ () => {goto_page("/auth/login")} }>
                    <p>login with existing account</p>
                </div>
        
                <div className="auth-desc" onClick={ () => {goto_page("/auth/signup")} }>
                    <p>create new account</p>
                </div>
                <button onClick={emitdata}>
                    click
                </button>
                
            </div>
        </section>
    )
}