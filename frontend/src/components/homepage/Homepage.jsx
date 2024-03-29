// import { useHistory } from "react-router-dom";

// use navigate instead of history fo rreact version 6
import "../../scss/homepage.css"

import backgroundImage from "../../assets/test.jpg";


import { useNavigate } from 'react-router-dom';
function Homepage() {
    const navigateTo = useNavigate();

    function navigate_to_login() {
        "Redirect to login page"
        navigateTo('/login')
    }

    function navigate_to_signup() {
        "redirect to signup page"
        navigateTo('/signup')

    }

    const divStyle = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
    }

    return (
            <div className="wholePage" style={divStyle}>
                <form className="formPadding">
                    <h1 className="font">Welcome to Pregancy Journal App</h1>
                    <br />
                    <div>
                        <button type="button" className="btn btn-primary inputText" onClick={navigate_to_login}>LogIn</button>
                    </div>
                    <br />
                    <div>
                        <button type="button" className="btn btn-primary inputText" onClick={navigate_to_signup}>SignUp</button>
                    </div>
                </form>
            </div>
    )
}


export default Homepage