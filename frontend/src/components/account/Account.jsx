// """Creating Account Page"""

import { useState } from "react";
import { useNavigate } from 'react-router-dom';

import "../../scss/account.css"

function Account(props) {

    const [account_type, setAccountType] = useState("mom");
    const [health_info, setHealthInfoType] = useState("");
    
    const navigateTo = useNavigate();
    
    function navigate_to_features() {
        "Redirect to features page"
        navigateTo('/features')
    }
    function accountTypeChange(event) {
        setAccountType(event.target.value)
    }

    function healthInfoChange(event) {
        setHealthInfoType(event.target.value)
    }

    function creatingaccount(event){
        event.preventDefault();

      
        fetch("/api/account",{
            method: "POST",
            mode: "cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                account_type: account_type,
                health_info: health_info,
                username: props.sessionUsername,
                family_id: props.sessionFamilyId,
            }),  
        })
            .then((response) => response.json())
            .then((data) => {
                
                console.log("Redirecting to features page")
                props.setsessionAccountType(account_type)
                props.setSessionHealthInfo(health_info)
                navigate_to_features()
            })
    }

    return(
        <form onSubmit={creatingaccount} className="login-box">
            <h1 className="fontStyle">Creating individual account</h1>
            <p>Hi, {props.sessionUsername}</p>
            <label>
                <p class="health">Is this my,</p>
                <input type="radio" name="account_type" value="mom" onChange={accountTypeChange}/> <span style={{paddingRight: "10px"}}>Mom</span>
                <input type="radio" name="account_type" value="dad" onChange={accountTypeChange}/> Dad
            </label>
            
            <div>
            <br/>
            <label>
                <p className="health">Do You Need Health-Info In Your Account</p>
                <input type="radio" name="health_info" value="True" onChange={healthInfoChange}/> <span style={{paddingRight: "10px"}}>Yes</span>
                <input type="radio" name="health_info" value="False" onChange={healthInfoChange}/> No
            </label>
            </div>
            <br/>
            <label>
                <button type="submit"> submit</button>
            </label>
        </form>
    );
}

export default Account