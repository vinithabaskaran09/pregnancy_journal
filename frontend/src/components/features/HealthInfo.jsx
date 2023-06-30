import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { useNavigate } from 'react-router-dom';


function HealthInfo(){


return (
    <div>
        <h1>hi</h1>
        <p>This is health Info page:</p>
        {/* <textarea name="textValue" id="textcontent" row={10} cols={10} style={{ minHeight: 10, height: 10 }} /> How is your mood today? */}

        <h2>Q1.How is your mood today?</h2>
        <textarea name="textValue" id="textcontent" rows={10} cols={10} style={{minHeight: 10, height: 10}} />
        <h2>Q2. General questions for next visit?</h2>
        <textarea name="textValue" id="textcontent" rows={10} cols={10} style={{minHeight: 10, height: 10}} />
        <h3>Q3. General message to your partner?</h3>
        <textarea name="textValue" id="textcontent" rows={10} cols={10} style={{minHeight: 10, height: 10}} />
        <button type="submit">Submit</button>

    </div>

)

}


export default HealthInfo