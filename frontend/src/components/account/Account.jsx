// """Creating Account Page"""

import { useState } from "react";
import { useNavigate } from 'react-router-dom';


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
        <form onSubmit={creatingaccount}>
            <h1>Creating individual account</h1>
            <p>Hi {props.sessionUsername}</p>
            <label>
                <p>Who is this</p>
                <input type="radio" name="account_type" value="mom" onChange={accountTypeChange} /> Mom
                <input type="radio" name="account_type" value="dad" onChange={accountTypeChange}/> Dad
            </label>
            <div>
            <label>
                <p>Do You Need Health-Info In Your Account</p>
                <input type="radio" name="health_info" value="True" onChange={healthInfoChange}/> Yes
                <input type="radio" name="health_info" value="False" onChange={healthInfoChange}/> No
            </label>
            </div>
            <label>
                <button type="submit"> submit</button>
            </label>
        </form>
    );
}

export default Account