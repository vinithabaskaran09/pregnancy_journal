import { useState } from "react";
import { useNavigate } from 'react-router-dom';

import "../../scss/features.css"
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
            <h2 className="font">We have the following features</h2>
            <br/>
            <label>
                <div>
                <button type="button" className="inputText loginButton button" name="features" value="journal" onClick={navigate_to_journalpage}> Journal </button>
                {props.sessionHealthInfo === "True" && (
                    <label>
                        <button type="button" class="inputText loginButton button"  name="features" value="health_info" onClick={navigate_to_healthinfopage}> HealthInfo </button>
                    </label>
                )}
                </div>
            </label>

        </form>
    )
}

export default Features