import React from "react";
import { useNavigate } from "react-router-dom";


export default function AuthPage() {
    const navigate = useNavigate()

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
                
            </div>
        </section>
    )
}