import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import useAuthuser from "../hooks/useAuthuser"

export default function SignupPage(){
    // this state stores input field data
    const [user, setuser] = useState({
        email:"", firstname:"", middlename:"", lastname:"", password:"", conpassword: ""
    })
    // This state check if password and pasword confirmation is correct, True it is a match and 
    // false means it's not a match lastly null indicates password confirmation is empty
    const [pass_match, set_pass_match] = useState(null)
    // a custom hooks that sends request to the server to log users in
    const [response, setresponse] = useAuthuser()
    const redirect = useNavigate()
    
    // we use this variable to manipulate the styling of confirm password input field
    let con_classname = "auth-inp"
    // the variable is the classname of the sign-up button depending on the status of the response it is 
    // either hidden shown
    let showbtn = ""
    // after user logs in we input the status of the response in this variable
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
        statusmessage = ""
        showbtn = "fwd-bwd"
    }else if (response.status === 201) {
        statusmessage = response.message
        showbtn = "hide"
        setTimeout(() => {
            redirect("/auth/login")
        }, 2000);
    }else if (response.status === 409) {
        statusmessage = response.message
        showbtn = "fwd-bwd"
    }else if (response.status === 500) {
        statusmessage = response.message
        showbtn = "fwd-bwd"
    }


    if (pass_match === true || pass_match === null) {
        con_classname = "auth-inp"
        console.log(pass_match)
    }else{
        con_classname = "error"
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
                        type="firstname"
                        placeholder="firstname"
                        onChange={updateuser}
                        name="firstname"
                        className="auth-inp"
                    />
                    <input
                        type="middlename"
                        placeholder="middlename"
                        onChange={updateuser}
                        name="middlename"
                        className="auth-inp"
                    />
                    <input
                        type="lastname"
                        placeholder="lastname"
                        onChange={updateuser}
                        name="lastname"
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
                        className={con_classname}
                    />
                </div>
                <div>
                    <p>{statusmessage}</p>
                </div>

                <div className={showbtn}>
                    <button className="auth-bwd-btn">Back</button>
                    <button className="auth-fwd-btn" onClick={()=>{setresponse(user, 'POST', 201, 'http://localhost:80/sign-up')}}>Create</button>
                </div>
            </div>
        </section>
    )
}