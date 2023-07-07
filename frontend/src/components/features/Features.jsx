import { useState } from "react";
import { useNavigate } from 'react-router-dom';


function Features(props) {
    
    console.log(props.sessionHealthInfo)
    const navigateTo = useNavigate();
    
    function navigate_to_journalpage() {
        "Redirect to login page"
        navigateTo('/journal')
    }

    function navigate_to_healthinfopage(){
        "Redirect to healthinfopage"
        navigateTo('/healthinfo')
    }
    return(
        <form>
            <h1>We have the following features</h1>
            <label>
                <input type="radio" name="features" value="journal" onChange={navigate_to_journalpage} /> Journal
                {props.sessionHealthInfo === "True" && (
                    <label>
                        <input type="radio" name="features" value="health_info" onChange={navigate_to_healthinfopage} /> 
                        HealthInfo
                    </label>
                )}
            </label>

        </form>
    )
}

export default Features