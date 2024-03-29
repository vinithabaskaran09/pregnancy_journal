import { useState } from "react";
import { useNavigate } from 'react-router-dom';

import "../../scss/signup.css"

function Signup() {
    const [LogInMessage, setLogInMessage] = useState("");
    const [usernameCheck, setUsernameCheck] = useState("");
    const [emailidCheck, setEmailidCheck] = useState("");
    const [passwordCheck,setPasswordCheck] = useState("");

    const navigateTo = useNavigate();

    function navigate_to_login() {
        "Redirect to login page"
        navigateTo('/login')
    }

    function username_check(event) {
        event.preventDefault();
        fetch("/api/username", {
            method: "POST",
            mode: "cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: event.target.value,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                let available = data.available;
                if (available === true) {
                    setUsernameCheck("Username is available")
                } else {
                    setUsernameCheck("Username already taken!!Try different username")
                }
            })
    }
    function passwordValidation(event) {
        event.preventDefault();
        
        let password = event.target.value;
            console.log(password.length)
            if (password.length < 8) {
                setPasswordCheck("Password should have atleast 8 letters");
            }
            else if (!/[A-Z]/.test(password)){
                setPasswordCheck("Password Should contain atleast one uppercase letter");
            }
            else if(!/\d/.test(password)) {
                setPasswordCheck("Password should contain atleast one digit")
            }
            else {
                setPasswordCheck("Is Strong Password");
            }
    }

    function email_check(event) {
        event.preventDefault();
        fetch("/api/email", {
            method: "POST",
            mode: "cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: event.target.value,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                let available = data.available;
                if (available === False) {
                    setEmailidCheck("Email available")
                } else {
                    setEmailidCheck("Email already used!!Try different email")
                }
            })
    }



    function signup_submit(event) {
        event.preventDefault();
        // alert(username);
        // console.log(username)
        // console.log(event.target.username.value)
        // console.log(event.target.password.value)
        // console.log(event.target.email.value)
        fetch("/api/signup", {
            method: "POST",
            mode: "cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: event.target.username.value,
                password: event.target.password.value,
                email: event.target.email.value,
            }),
        })

            .then((response) => response.json())
            .then((data) => setLogInMessage(data.message))
        navigate_to_login()

    }

    return (
        <div className="wholePageSignup">
            <form onSubmit={signup_submit} className="form-container login-box">
                <h1>{LogInMessage}</h1>
                <h1 className="fontStyle">Please enter the following details</h1>
                <br/>
                <div class="form-floating mb-3">
                    <input type="username" class="form-control" id="username" onChange={username_check} />
                    <label for="username">Username</label>
                    <p>{usernameCheck}</p>
                </div>

                <div class="form-floating mb-3" >
                    <input type="password" class="form-control" id="password" onChange={passwordValidation} style={{ maxWidth: "200px"}}/>
                    <label for="password">Password</label>                    
                    <p style={{ maxWidth: "200px"}}>{passwordCheck}</p>
                </div>
                <div class="form-floating mb-3">
                    <input type="email" class="form-control" id="email" onChange={email_check} />
                    <label for="email">Email</label>
                    <p>{emailidCheck}</p>
                </div>

                {/* <label>
                <p>Username</p>
                <input type="text" id="username" onChange={username_check} />
                <p>{usernameCheck}</p>
            </label>
            <label>
                <p>Password</p>
                <input type="text" id="password" />
            </label>
            <label>
                <p>Email</p>
                <input type="text" id="email" onChange={email_check} />
                <p>{emailidCheck}</p>
            </label>
            <label> */}
                <div>
                    <button type="submit" className="btn btn-primary" >Signup</button>
                    <p>Already have an account? <button onClick={navigate_to_login} className="border border-5">LogIn</button></p>

                </div>
                {/* </label> */}
            </form>
            {/* <p>Already have an account? <button onClick={navigate_to_login} className="border border-5">Login</button></p> */}
        </div>
    );
}

export default Signup