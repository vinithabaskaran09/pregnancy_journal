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

    function navigate_to_login() {
        "Redirect to login page"
        navigateTo('/login')
    }


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
            <ul class="nav nav-fill">
                <li class="nav-item">
                    <button type="submit" onClick={navigate_to_features} class="nav-link active" aria-current="page" href="#"> Menu</button>
                </li>
                <li class="nav-item">
                    <button type="submit" onClick={navigate_to_login} class="nav-link active" aria-current="page" href="#"> LogIn</button>

                </li>
            </ul>
            <p className="fontFormat">Welcome To Health Info Page:</p>
            <div className="journal-navigationButton">
                <div style={{ float: "left" }} >
                    <button type="submit" className="buttonColor" onClick={previous_date}>&#8592;</button>
                </div>
                <div style={{ display: "inline-block", margin: "0 10px" }}></div>
                <p style={{ float: "left",marginLeft: '10px', marginRight: '10px',textAlign: 'center' }} >{date}</p>
                <div style={{ float: "left" }} >
                    <button type="submit" className="buttonColor" onClick={next_date} disabled={disableNextButton}>&#8594;</button>
                </div>
            </div>
            <br/>
            <br/>
            {Object.entries(questions).map(([question_id, question]) => (
                <div id={question_id}>
                    <h3 style={{fontStyle:"oblique"}}>{question}</h3>
                    <textarea
                        name="textValue"
                        id={`textarea-${question_id}`}
                        className="journal-textarea"
                        rows={10}
                        cols={10}
                        style={{ minHeight: 20, height: 40, textAlign:"left"}}
                        onChange={questionAnswers}
                        data-question_id={question_id}
                        value={questionAnswer[question_id] || ""}
                        placeholder={questionAnswer[question_id] || ""}
                    />
                </div>
            ))}
            <br/>
            <button type="submit" onClick={handleSubmit} className="buttonBorder">Submit</button>
        </div>

    )

}


export default HealthInfo