import React, { useRef, useState } from "react"
import useRequest from "../hooks/useRequest"

export default function LoginPage({getUserData}){
    const [userFields, setUserFields] = useState({email:"", password:""})
    const loginAttempts = useRef(0)
    const [response, authenticateUser] = useRequest()
    let LoginButtonClassName = ""
    let responseMessage = ""

    async function loginUser() {
        try {
            await authenticateUser(userFields, 'POST', 200, 'http://localhost:80/log-in');
            console.log('yooo');
            await getUserData(null, 'GET', 200, 'http://localhost:80/user')
            loginAttempts.current = loginAttempts.current + 1
        } catch (error) {
            console.log(error);
            loginAttempts.current = loginAttempts.current + 1
        }   
    }
    
    function updateLoginDetailsOnKeyStroke(e) {
        setUserFields((prev)=>{
            return(
                {
                    ...prev,
                    [e.target.name]: e.target.value
                }
            )
        })
    }

    if (response.status !== null && loginAttempts > 0) {
        if (response.status === 200) {
            responseMessage = response.message
            LoginButtonClassName = "hide"
        }else if (response.status === 400) {
            responseMessage = response.message
            LoginButtonClassName = "fwd-bwd"
        }else if (response.status === 500) {
            responseMessage = response.message
            LoginButtonClassName = "fwd-bwd"
        }
    }

    return (
        <section id="auth-page">
            <div id="Auth-sect">
                <h2 className="auth-sect1">Let's Get Started</h2>
                <p className="auth-sect2">enter email and password to login</p>
                <div className="auth-inp-cont">
                    <input
                        type="email"
                        placeholder="email"
                        onChange={updateLoginDetailsOnKeyStroke}
                        name="email"
                        className="auth-inp"
                    />
                    <input
                        type="password"
                        placeholder="password"
                        onChange={updateLoginDetailsOnKeyStroke}
                        name="password"
                        className="auth-inp"
                    />
                </div>

                <div className="status">
                    <p>{responseMessage}</p>
                </div>

                <div className={LoginButtonClassName}>
                    <button className="auth-bwd-btn">Back</button>
                    <button className="auth-fwd-btn" onClick={()=>{loginUser()}}>Login</button>
                </div>
            </div>
        </section>
    )
}