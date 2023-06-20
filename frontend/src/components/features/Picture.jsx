import { useState } from "react";
import { useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';


function Picture(props){
   const cloudinaryRef = useRef();
   const widgetRef = useRef();

   useEffect(cloudinaryValue, [])

   function cloudinaryValue(){
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
        cloudName:'journalpictures',
        uploadPreset:'k2hycxis'
        }, function(error,result) {
                console.log(result);
        });
   }
    function displayImage(){
            widgetRef.current.open()
        }

    return(
        <div>
            <p>This is where you will upload pictures</p>
            <input type="file" name="file"/>
            {/* <button onClick={onButtonClick}></button> */}
            <button type="submit">Upload</button>
            <button onClick={displayImage}/>Cloudinary
        </div>
    )

}

export default Picture

