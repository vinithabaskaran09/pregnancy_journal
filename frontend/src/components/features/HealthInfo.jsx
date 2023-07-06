import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { useNavigate } from 'react-router-dom';


function HealthInfo(props) {

    useEffect(effect, [])
    // function effect() {
    //     // date_function()
    //     health_info(current_date)
    // }

    let current_date_notstring = new Date();
    let current_date = current_date_notstring.toDateString();


    const [questions, setQuestions] = useState({});
    const [questionAnswer, setQuestionAnswer] = useState({});
    const [date, setDate] = useState(current_date);
    const [disableNextButton, setdisableNextButton] = useState(true);

    const navigateTo = useNavigate();


    function navigate_to_features() {
        "Redirect to features page"
        navigateTo('/features')
    }


    function effect() {
        // date_function()
        health_info(current_date)
    }

    function handleSubmit(event) {
        event.preventDefault();
        console.log(questionAnswer);
        health_answer();
    }

    function previous_date(event) {
        event.preventDefault();
        current_date_notstring = new Date(date);
        current_date_notstring.setDate(current_date_notstring.getDate() - 1);
        let previous_dateString = current_date_notstring.toDateString();
        setdisableNextButton(false)
        setDate(previous_dateString)
        alert(previous_dateString)
        health_info(previous_dateString)
    }

    function next_date(event) {
        event.preventDefault();
        current_date_notstring = new Date(date);
        current_date_notstring.setDate(current_date_notstring.getDate() + 1);
        let next_dateString = current_date_notstring.toDateString();
        let today = new Date();
        today.setHours(0, 0, 0, 0);
        if (current_date_notstring >= today) {
            setdisableNextButton(true)
        }
        if (current_date_notstring > today) {
            return
        }
        alert(next_dateString)
        setDate(next_dateString)
        health_info(next_dateString)
    }


    function questionAnswers(event) {
        let answer = event.target.value;
        console.log(answer);
        let question_id = event.target.getAttribute("data-question_id");
        console.log(question_id);
        updateURLStates(question_id, answer)

    };

    function updateURLStates(question_id, answer) {
        // messageAndUrl[image_url] = message;
        let newDictionary = {
            ...questionAnswer
        }
        newDictionary[question_id] = answer;
        setQuestionAnswer(newDictionary)
        // props.setSharedUrl(messageAndUrl);
        // console.log(messageAndUrl)
        console.log(questionAnswer)
    }


    function health_info(current_date) {
        // event.preventDefault();
        alert("check");
        fetch("/api/healthinfo", {
            method: "POST",
            mode: "cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                questionAnswer: questionAnswer,
                username: props.sessionUsername,
                family_id: props.sessionFamilyId,
                account_type: props.sessionAccountType,
                date: current_date
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setQuestionAnswer(data.answer)
                setQuestions(data.questions)
            })
    }

    function health_answer() {
        // event.preventDefault();
        alert(date);
        fetch("/api/healthanswer", {
            method: "POST",
            mode: "cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                questionAnswer: questionAnswer,
                username: props.sessionUsername,
                family_id: props.sessionFamilyId,
                date: date,
                account_type: props.sessionAccountType,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)

            })
    }


    return (
        <div>
            <h1>hi</h1>
            <p>This is health Info page:</p>
            <h1>{date}</h1>
            <div style={{ textAlign: 'left', position: 'absolute', top: 0, left: 0 }}>
                <button type="submit" onClick={previous_date}>Previous Page</button>
            </div>
            <div style={{ textAlign: 'right', position: 'absolute', top: 0, right: 0 }}>
                <button type="submit" onClick={next_date} disabled={disableNextButton}>Next Page</button>
            </div>
            {/* <textarea name="textValue" id="textcontent" row={10} cols={10} style={{ minHeight: 10, height: 10 }} /> How is your mood today? */}
            {Object.entries(questions).map(([question_id, question]) => (
                <div id={question_id}>
                    <h2>{question}</h2>
                    <textarea
                        name="textValue"
                        id={`textarea-${question_id}`}
                        rows={10}
                        cols={10}
                        style={{ minHeight: 10, height: 10 }}
                        onChange={questionAnswers}
                        data-question_id={question_id}
                        value={questionAnswer[question_id] || ""}
                    />
                </div>
            ))}
            <button type="submit" onClick={handleSubmit}>Submit</button>
            <button type="submit" onClick={navigate_to_features}> Features Page </button>

        </div>

    )

}


export default HealthInfo