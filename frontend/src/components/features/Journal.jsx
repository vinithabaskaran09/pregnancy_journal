import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

function Journal(props) {
    useEffect(effect, [])

    function effect() {
        // date_function()
        display_journal(current_date)
    }

    let current_date_notstring = new Date();
    let current_date = current_date_notstring.toDateString();

    const [journal_message, setJournalMessage] = useState("");
    const [date, setDate] = useState(current_date);
    const [newMessage, setnewMessage] = useState("");


    // function date_function(){
    //     // console.log(current_date_notstring)
    //     const current_date_notstring = new Date();
    //     const current_date=current_date_notstring.toDateString();
    //     setDate(current_date)

    //     let previous_date_not_string = new Date();
    //     previous_date_not_string.setDate(current_date_notstring.getDate() + 1);
    //     let previous_date = previous_date_not_string.toDateString();
    //     setPreviousDate(previous_date)


    //     let next_date_not_string = new Date();
    //     next_date_not_string.setDate(current_date_notstring.getDate() - 1);
    //     let next_date = next_date_not_string.toDateString();
    //     setNextDate(next_date)
    // }
    function previous_date(event) {
        event.preventDefault();
        current_date_notstring = new Date(date);
        current_date_notstring.setDate(current_date_notstring.getDate() - 1);
        let previous_dateString = current_date_notstring.toDateString();
        
        setDate(previous_dateString)
        display_journal(previous_dateString)
    }

    function next_date(event) {
        event.preventDefault();
        current_date_notstring = new Date(date);
        current_date_notstring.setDate(current_date_notstring.getDate() + 1);
        let next_dateString = current_date_notstring.toDateString();
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
                console.log(data)
                let journal_message = data.journal_message
                console.log(journal_message)
                setJournalMessage(journal_message)
            })
    }

    function onchange_message(event){
        setJournalMessage(event.target.value)
    }

    function journal_creation(event) {
        event.preventDefault();
        console.log(event.target.textValue.value)
        fetch("/api/journal_creation", {
            method: "POST",
            mode: "cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: props.sessionUsername,
                family_id: props.sessionFamilyId,
                account_type: props.sessionAccountType,
                message: event.target.textValue.value,
                date: date
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);

            })

    }


    return (
        // <h2>HI</h2>
        <div>
            <h1>hi</h1>
            <p>This is your journal message:</p>
            <p>{date}</p>
            {/* <label>
                <p>{date}</p>
                <p>{previousDate}</p>
                <p>{nextDate}</p>
            </label> */}
            <div style={{ textAlign: 'left', position: 'absolute', top: 0, left: 0 }}>
                <button type="submit" onClick={previous_date}>Previous Page</button>
            </div>
            <div style={{ textAlign: 'right', position: 'absolute', top: 0, right: 0 }}>
                <button type="submit" onClick={next_date}>Next Page</button>
            </div>
            <form onSubmit={journal_creation}>
                <label>Journal message box:</label>
                <textarea name="textValue" id="textcontent" row={1000} cols={50} style={{ minHeight: 50, height: 100 }} value={journal_message} onChange={onchange_message} />
                <button type="submit" >Submit</button>
            </form>

        </div>

    )
}

export default Journal