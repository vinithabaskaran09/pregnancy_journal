import { useState } from "react";
import { useNavigate } from 'react-router-dom';

function Signup() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
 
    const navigateTo = useNavigate();
    function navigate_to_login() {
        "Redirect to login page"
        navigateTo('/login')
    }

    function signup_submit(event) {
        event.preventDefault();
        // alert(username);
        console.log(username)
        console.log(event.target.username.value)
        console.log(event.target.password.value)
        console.log(event.target.email.value)
        fetch("/api/signup", {
            method: "POST",
            mode: "cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: username,
                password: password,
                email: email,
            }),
        })

        .then((response) => response.json())
        .then((data) => console.log(data.username))

    }
    function onUsernameChange(event) {
        setUsername(event.target.value)
    }

    function onPasswordChange(event) {
        setPassword(event.target.value)
    }
    function onEmailChange(event) {
        setEmail(event.target.value)
    }

    return (
        <form onSubmit={signup_submit}>
            <h1>Please enter the following details</h1>
            <label>
                <p>Username</p>
                <input type="text" id="username" value={username} onChange={onUsernameChange} />
            </label>
            <label>
                <p>Password</p>
                <input type="text" id="password" value={password} onChange={onPasswordChange} />
            </label>
            <label>
                <p>Email</p>
                <input type="text" id="email" value={email} onChange={onEmailChange} />
            </label>
            <label>
                <div>
                    <button type="submit" >Signup</button>
                </div>
            </label>

        </form>
    );
    }

export default Signup