import React, { useEffect, useState } from "react"
import useAuthuser from "../hooks/useAuthuser"

export default function LoginPage({login, response}){
    const [user, setuser] = useState({email:"", password:""})
    const [attempts, setAttempt] = useState(0)

    // hook to check if user have an account
    const [isauth, setauth] = useAuthuser()

    let showstatus = "hide"
    let showbtn = ""
    let statusmessage = "fwd-bwd"

    async function login_user() {
        try {
            //ajax function to log the user in
            await setauth(user, 'POST', 200, 'http://localhost:80/log-in');

            // ajax function to get user data from server
            await login(null, 'GET', 200, 'http://localhost:80/user')

            // Increasing the number of login attemt by 1
            setAttempt((prev)=>{
                return prev + 1
            }) 
        } catch (error) {
            // Increasing the number of login attemt by 1
            setAttempt((prev)=>{
                return prev + 1
            }) 
        }   
    }
    
    function updateuser(e) {
        setuser((prev)=>{
            return(
                {
                    ...prev,
                    [e.target.name]: e.target.value
                }
            )
        })
    }

    if (isauth.status !== null && attempts > 0) {
        if (isauth.status === 200) {
            showstatus = "status"
            statusmessage = isauth.message
            showbtn = "hide"
        }else if (isauth.status === 400) {
            showstatus = "status"
            statusmessage = isauth.message
            showbtn = "fwd-bwd"
        }else if (isauth.status === 500) {
            showstatus = "status"
            statusmessage = isauth.message
            showbtn = "fwd-bwd"
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
                        onChange={updateuser}
                        name="email"
                        className="auth-inp"
                    />
                    <input
                        type="password"
                        placeholder="password"
                        onChange={updateuser}
                        name="password"
                        className="auth-inp"
                    />
                </div>

                <div className={showstatus}>
                    <p>{statusmessage}</p>
                </div>

                <div className={showbtn}>
                    <button className="auth-bwd-btn">Back</button>
                    <button className="auth-fwd-btn" onClick={()=>{login_user()}}>Login</button>
                </div>
            </div>
        </section>
    )
}