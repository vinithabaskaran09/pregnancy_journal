import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

function Journal(props) {

    useEffect(journal_creation,[])

    function journal_creation(){
        alert("testing");
        fetch("/api/journal", {
            method: "POST",
            mode: "cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
               username: props.sessionUsername,
               family_id: props.sessionFamilyId,
               account_type: props.sessionAccountType,
               
            }),
        })
    }
    return(
       console.log("Welcome to journal page")
    )
}

export default Journal