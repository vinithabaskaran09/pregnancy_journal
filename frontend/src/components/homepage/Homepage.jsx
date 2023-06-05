// import { useHistory } from "react-router-dom";

// use navigate instead of history fo rreact version 6
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

    return(
        <form>
            <h1>Welcome to Pregancy Journal App</h1>
        <div>
            <button type= "button" onClick={navigate_to_login} >LogIn</button>
        </div>
        <div>
            <button type= "button" onClick={navigate_to_signup} >SignUp</button>
        </div>
    </form>
    )
}


export default Homepage