import { useState } from "react";
import { useNavigate } from 'react-router-dom';


function Features(props) {
    

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
                <input type="radio" name="features" value="health_info" onChange={navigate_to_healthinfopage}/> Health-Info
                <input type="radio" name="features" value="playlist"/> Playlist
            </label>

        </form>
    )
}

export default Features