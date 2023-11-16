import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import useAuthuser from "../hooks/useAuthuser"

export default function SignupPage(){
    const [user, setuser] = useState({email:"", password:"", conpassword: ""})
    const [pass_match, set_pass_match] = useState(null)
    const [response, setresponse] = useAuthuser()
    const redirect = useNavigate()
    
    let classname = ""
    let showstatus = ""
    let showbtn = ""
    let statusmessage = ""

    function updateuser(e) {
        setuser((prev)=>{
            return(
                {
                    ...prev,
                    [e.target.name]: e.target.value
                }
            )
        })

        // validating password when confirm password input box is clicked  
        if (e.target.name === "conpassword") {
            if (e.target.value === user.password && user.password !== "") {
                set_pass_match(true)
            }else if (e.target.value === ""){
                set_pass_match(null)
            }else if (user.password === "" && e.target.value !== ""){
                set_pass_match(false)
            }else if (user.password !== e.target.value ){
                set_pass_match(false)
            }
        }

        // validating password when password input box is clicked 
        if (e.target.name === "password" && user.conpassword !== ""){
            if (e.target.value === user.conpassword) {
                set_pass_match(true)
            }else if (e.target.value === ""){
                set_pass_match(false)
            }else if (e.target.value !== user.conpassword){
                set_pass_match(false)
            }
        }
    }

    if (response.status === null) {
        showstatus = "hide"
        statusmessage = ""
        showbtn = "fwd-bwd"
    }else if (response.status === 201) {
        showstatus = "status"
        statusmessage = response.message
        showbtn = "hide"
        setTimeout(() => {
            redirect("/auth/login")
        }, 2000);
    }else if (response.status === 409) {
        showstatus = "status"
        statusmessage = response.message
        showbtn = "fwd-bwd"
    }else if (response.status === 500) {
        showstatus = "status"
        statusmessage = response.message
        showbtn = "fwd-bwd"
    }


    if (pass_match === true || pass_match === null) {
        classname = "auth-inp"
        console.log(pass_match)
    }else{
        classname = "error"
        console.log(pass_match)
    }

    
    return (
        <section id="auth-page">
            <div id="Auth-sect">
                <h2 className="auth-sect1">Let's Get Started</h2>
                <p className="auth-sect2">enter email and password and create account</p>
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
                    <input
                        type="password"
                        placeholder="confirm password"
                        onChange={updateuser}
                        name="conpassword"
                        className={ classname }
                    />
                </div>
                <div className={showstatus}>
                    <p>{statusmessage}</p>
                </div>

                <div className={showbtn}>
                    <button className="auth-bwd-btn">Back</button>
                    <button className="auth-fwd-btn" onClick={()=>{setresponse({email: user.email, password: user.password}, 'POST', 201, 'http://localhost:80/sign-up')}}>Create</button>
                </div>
            </div>
        </section>
    )
}