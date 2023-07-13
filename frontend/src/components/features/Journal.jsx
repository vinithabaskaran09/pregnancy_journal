import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { useNavigate } from 'react-router-dom';
import Picture from "./Picture";

import "../../scss/journal.css"


function Journal(props) {
    useEffect(effect, [])

    function effect() {
        // date_function()
        display_journal(current_date)
    }

    // const [sharedUrl, setSharedUrl] = useState({});
    // const [sharedMessage, setSharedMessage] = useState("");

    // function setSharedUrl(props){
    //     setSharedUrl(props);
    // };



    let current_date_notstring = new Date();
    let current_date = current_date_notstring.toDateString();

    const [journal_message, setJournalMessage] = useState("");
    const [picture_url, setPictureUrl] = useState("");
    const [picture_message, setPictureMessage] = useState("");
    const [date, setDate] = useState(current_date);
    const [newMessage, setnewMessage] = useState("");
    const [disableNextButton, setdisableNextButton] = useState(true);

    const [picMessageAndUrl, setPicMessageAndUrl] = useState({});



    const navigateTo = useNavigate();

    function navigate_to_login() {
        "Redirect to login page"
        navigateTo('/login')
    }

    function navigate_to_features() {
        "Redirect to features page"
        navigateTo('/features')
    }

    function pictureMessageAndUrl(messageAndUrl) {
        setPicMessageAndUrl(messageAndUrl)
        // console.log(picMessageAndUrl)
    };

    //For picture component//
    const [pictureUpload, setPictureUpload] = useState(true);

    function showpictureupload(event) {
        setPictureUpload(true)
    }

    function previous_date(event) {
        event.preventDefault();
        current_date_notstring = new Date(date);
        current_date_notstring.setDate(current_date_notstring.getDate() - 1);
        let previous_dateString = current_date_notstring.toDateString();
        setdisableNextButton(false)
        setDate(previous_dateString)
        display_journal(previous_dateString)
    }

    function next_date(event) {
        event.preventDefault();
        current_date_notstring = new Date(date);
        // example: June 15
        // console.log(current_date_notstring)
        current_date_notstring.setDate(current_date_notstring.getDate() + 1);
        let next_dateString = current_date_notstring.toDateString();
        // example: June 16
        // console.log(next_dateString)
        // if next_dateString > current_date_notstring:
        let today = new Date();
        today.setHours(0, 0, 0, 0);
        if (current_date_notstring >= today) {
            setdisableNextButton(true)
        }
        if (current_date_notstring > today) {
            return
        }
        setDate(next_dateString)
        display_journal(next_dateString)
    }

    function display_journal(current_date) {
        // event.preventDefault();

        fetch("/api/journal", {
            method: "POST",
            mode: "cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: props.sessionUsername,
                family_id: props.sessionFamilyId,
                account_type: props.sessionAccountType,
                date: current_date
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                // console.log(data)
                let journal_message = data.journal_message
                // let picture_url = data.pic_message_url;
                // let [[picture_url, picture_message]]= Object.entries(data.pic_message_url);
                // // let picture_message = Object.entries(data.pic_message_url)[1];
                // console.log(picture_url)
                // console.log(picture_message)
                // console.log(picture_message)
                let length = Object.keys(data.pic_message_url).length;
                console.log(length)
                if (length != 0) {
                    setPictureUpload(true)
                } else {
                    setPictureUpload(false)
                };
                // console.log(data.pic_message_url)
                setJournalMessage(journal_message)
                setPicMessageAndUrl(data.pic_message_url)


            })
    }

    function onchange_message(event) {
        setJournalMessage(event.target.value)
    }

    function journal_creation(event) {
        event.preventDefault();
        fetch("/api/journal_creation", {
            method: "POST",
            mode: "cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: props.sessionUsername,
                family_id: props.sessionFamilyId,
                account_type: props.sessionAccountType,
                message: event.target.textValue.value,
                date: date,
                picMessageAndUrl: picMessageAndUrl
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                // console.log(data);

            })

    }


    return (
        // <h2>HI</h2>
        <div>
            <ul class="nav nav-fill">
                <li class="nav-item">
                    <button type="submit" onClick={navigate_to_features} class="nav-link active" aria-current="page" href="#"> Menu</button>
                </li>
                <li class="nav-item">
                    <button type="submit" onClick={navigate_to_login} class="nav-link active" aria-current="page" href="#"> LogIn</button>

                </li>
            </ul>
            <br />
            <div className="journal-navigationButton">
                <div style={{ float: "left" }} >
                    <button type="submit" className="buttonColor" onClick={previous_date}>&#8592;</button>
                    {/* <button type="button" onClick={previous_date}>&#8592;</button> */}
                </div>
                <div style={{ display: "inline-block", margin: "0 10px" }}></div>
                <p style={{ float: "left" }} >{date}</p>
                <div style={{ float: "left" }} >
                    <button type="submit" className="buttonColor" onClick={next_date} disabled={disableNextButton}>&#8594;</button>
                </div>
            </div>
            <br />
            <form onSubmit={journal_creation}>
                <div>Journal message box:</div>
                <textarea name="textValue" id="textcontent" className="journal-textarea" row={1000} cols={50} value={journal_message} placeholder={journal_message} onChange={onchange_message} />
                <br />
                <button type="submit" >Submit</button>
                {/* 
                <button type="submit" onClick={navigate_to_features}> Features Page </button>
                <button type="submit" onClick={navigate_to_login}>Login Page</button> */}
            </form>
            <br />
            <div>
                {pictureUpload ? (
                    <Picture
                        pictureMessageAndUrl={pictureMessageAndUrl}
                        picMessageAndUrl={picMessageAndUrl} />
                ) : (
                    <button type="submit" onClick={showpictureupload}>Upload</button>
                )}
            </div>
            <div style={{ textAlign: 'right', position: 'absolute', top: 0, right: 0 }}>
                <button type="submit" onClick={navigate_to_login}>Logout</button>

            </div>
        </div>

    )
}

export default Journal