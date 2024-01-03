import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import useAuthuser from "../hooks/useRequest"

export default function SignupPage(){
    const [userFields, setUserFields] = useState({
        email:"", firstname:"", middlename:"", lastname:"", password:"", conpassword: ""
    })
    const [doesPasswordFieldAndConfirmPasswordMatch, setEqualityOfPasswordAndConfrimPasswordState] = useState(null)
    const [response, authenticateUser] = useAuthuser()
    const redirect = useNavigate()
    let ConfirmPasswordFieldClassname = "auth-inp"
    let signUpButtonClassname = ""
    let responseMessage = ""

    function updateSignUpDetailsOnKeyStroke(inputField) {
        setUserFields((prev)=>{
            return(
                {
                    ...prev,
                    [inputField.target.name]: inputField.target.value
                }
            )
        })
         
        if (inputField.target.name === "conpassword") {
            if (inputField.target.value === userFields.password && userFields.password !== "") {
                setEqualityOfPasswordAndConfrimPasswordState(true)
            }else if (inputField.target.value === ""){
                setEqualityOfPasswordAndConfrimPasswordState(null)
            }else if (userFields.password === "" && inputField.target.value !== ""){
                setEqualityOfPasswordAndConfrimPasswordState(false)   
            }else if (userFields.password !== inputField.target.value ){
                setEqualityOfPasswordAndConfrimPasswordState(false)
            }
        }

        if (inputField.target.name === "password" && userFields.conpassword !== ""){
            if (inputField.target.value === userFields.conpassword) {
                setEqualityOfPasswordAndConfrimPasswordState(true)
            }else if (inputField.target.value === ""){
                setEqualityOfPasswordAndConfrimPasswordState(false)
            }else if (inputField.target.value !== userFields.conpassword){
                setEqualityOfPasswordAndConfrimPasswordState(false)
            }
        }
    }
    
    if (response.status === null) {
        responseMessage = ""
        signUpButtonClassname = "fwd-bwd"
    }else if (response.status === 201) {
        responseMessage = response.message
        signUpButtonClassname = "hide"
        setTimeout(() => {
            redirect("/auth/login")
        }, 2000);
    }else{
        responseMessage = response.message
        signUpButtonClassname = "fwd-bwd"
    }
    
    if (doesPasswordFieldAndConfirmPasswordMatch === true || doesPasswordFieldAndConfirmPasswordMatch === null) {
        ConfirmPasswordFieldClassname = "auth-inp"
    }else if(doesPasswordFieldAndConfirmPasswordMatch === false){
        ConfirmPasswordFieldClassname = "error"
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
                        onChange={updateSignUpDetailsOnKeyStroke}
                        name="email"
                        className="auth-inp"
                    />
                     <input
                        type="firstname"
                        placeholder="firstname"
                        onChange={updateSignUpDetailsOnKeyStroke}
                        name="firstname"
                        className="auth-inp"
                    />
                    <input
                        type="middlename"
                        placeholder="middlename"
                        onChange={updateSignUpDetailsOnKeyStroke}
                        name="middlename"
                        className="auth-inp"
                    />
                    <input
                        type="lastname"
                        placeholder="lastname"
                        onChange={updateSignUpDetailsOnKeyStroke}
                        name="lastname"
                        className="auth-inp"
                    />
                    <input
                        type="password"
                        placeholder="password"
                        onChange={updateSignUpDetailsOnKeyStroke}
                        name="password"
                        className="auth-inp"
                    />
                    <input
                        type="password"
                        placeholder="confirm password"
                        onChange={updateSignUpDetailsOnKeyStroke}
                        name="conpassword"
                        className={ConfirmPasswordFieldClassname}
                    />
                </div>
                <div>
                    <p>{responseMessage}</p>
                </div>

                <div className={signUpButtonClassname}>
                    <button className="auth-bwd-btn">Back</button>
                    <button className="auth-fwd-btn" onClick={()=>{authenticateUser(userFields, 'POST', 201, 'http://localhost:80/sign-up')}}>Create</button>
                </div>
            </div>
        </section>
    )
}