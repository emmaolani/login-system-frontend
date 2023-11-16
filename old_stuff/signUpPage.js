import { useState } from "react";

export default function SignUp() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNo: "",
        password: ""
    })
    const [responseText, setResponseText] = useState("")

    function changeForm(e) {
        setFormData(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    function makeRequest () {
        return new Promise(function (resolve, reject) {
          let xhr = new XMLHttpRequest();
          xhr.open('POST', 'http://localhost:80/sign-up', true)
          xhr.setRequestHeader('Content-type', 'application/json')
          xhr.onload = function () {
            if (this.status === 201) {
              resolve(JSON.parse(xhr.responseText))
            }else {
              reject({
                status: this.status,
                statusText:  xhr.statusText
              })
            }
          }
  
          xhr.send(JSON.stringify(formData))
        })
      }
    
      async function submitForm(e) {
        e.preventDefault()
        try { 
          let req = await makeRequest()
          setResponseText(req)
          
        } catch (error) {
          console.log('something went wrong')
        }
      }

    console.log(responseText)
    return (
        <form>
            <input
                type="text"
                placeholder="first name"
                name="firstName"
                onChange={ changeForm }
            />
             <input
                type="text"
                placeholder="last name"
                name="lastName"
                onChange={ changeForm }
            />
             <input
                type="text"
                placeholder="email"
                name="email"
                onChange={ changeForm }
            />
            <input
                type="text"
                placeholder="phone .No"
                name="phoneNo"
                onChange={ changeForm }
            />
            <input
                type= "password"
                placeholder="password"
                name="password"
                onChange={ changeForm }
            />
            <input className="sign-button"
                type="button"
                value="sign up"
                onClick={ submitForm }
            />
        </form>
    )
}