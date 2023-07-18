// """Creating Login Page"""

import { useState } from "react";
import { useNavigate } from 'react-router-dom';

import "../../scss/login.css"

function Login(props) {
    // """Defining state for username and password to store the values"""
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoginSuccess, setisLoginSuccess] = useState("");

    const navigateTo = useNavigate();
    
    function navigate_to_account() {
        "Redirect to login page"
        navigateTo('/account')
    }
    // function to handle form submit 
    function login_submit(event) {
        event.preventDefault();
        // alert(username);
        console.log(username)
        console.log(event.target.username.value)
        console.log(event.target.password.value)
        fetch("/api/login", {
            method: "POST",
            mode: "cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                let message = data.message;
                // alert(message)
                let family_id = data.family_id
                if (message === true) {
                    // To do login succeed
                    console.log("login success")
                    setisLoginSuccess("Login successfully")
                    props.setSessionUsername(username)
                    props.setSessionFamilyId(family_id)
                    navigate_to_account()
                } else {
                    // login failed
                    console.log("login fail")
                    setisLoginSuccess("Login Failed!!Try again")
                }
            })
            
    }

    // async function login_submit_async(event) {
    //     event.preventDefault();
    //     let response = await fetch("http://localhost:5000/login", {
    //         method: "POST",
    //         mode: "cors",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify({
    //             username: username,
    //             password: password,
    //         }),
    //     });
    //     let data = await response.json();
    //     let message = data.message;
    //     if (message === true) {
    //         // To do login succeed
    //         setisLoginSuccess("Login successfully")
            
    //     } else {
    //         // login failed
    //         setisLoginSuccess("Login Failed!!Try again")
    //     }
    // }

    function onUsernameChange(event) {
        setUsername(event.target.value)
        // let length = event.target.value.length;
        // console.log(event.target.value[length-1])
        // let x = event.target.value[length-1]
        // if (x=="."){
        //     event.preventDefault();
        //     alert("Invalid Character")
        // }
        // alert(event.target.value)
        // alert(username)
    }
    function onPasswordChange(event) {
        setPassword(event.target.value)
    }

    return (
        <form onSubmit={login_submit} className="form-container login-box">
            
            <h3 className="fontStyle">Log Into Journal</h3><br/>
            <div class="form-floating mb-3 inputText">
                <input type="text" class="form-control" id="username" value={username} onChange={onUsernameChange} />
                <label for="username">Username</label>
            </div>
            <div class="form-floating inputText">
                <input type="password" class="form-control" id="password" value={password} onChange={onPasswordChange}/> 
                <label for="password">Password</label>
            </div>
            <br/>
            <label>
                <div>
                    <button type="submit" class="btn btn-primary">Log In</button>
                </div>
                <p class="alertColour">{isLoginSuccess}</p>
            </label>

        </form>
    );
}

export default Login
