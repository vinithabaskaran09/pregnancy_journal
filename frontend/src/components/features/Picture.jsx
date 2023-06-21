import { useState } from "react";
import { useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';




function Picture(props){
   const cloudinaryRef = useRef();
   const widgetRef = useRef();
//    let uploadedUrl;

   const [showImage, setShowImage] = useState("");
   const [imageUrls, setImageUrls] = useState([]);

   useEffect(cloudinaryValue, [])

   function cloudinaryValue(){
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
        cloudName:'journalpictures',
        uploadPreset:'k2hycxis'
        }, function(error,result) {
                // console.log(result);
                const url = result.info.url;
                console.log(url);
                if (url) {
                    setShowImage(url);
                    // uploadedUrl = url;
                    // setstageparameters(previousstatevalue)
                    setImageUrls(imageUrls => [...imageUrls, url])
                    // setImageUrls(prevUrls => [...prevUrls, url]);
                    // setImageUrls((prevUrls) => { return [...prevUrls, url] });
                    // setImageUrls(preurls);
                    console.log(showImage)};
                
        });
    }
  
    // function preurls(urls){

    //     return [...urls, uploadedUrl];
    // }
    function displayImage(){
            widgetRef.current.open()
        }

    return(
        <div>
            <p>This is where you will upload pictures</p>
            {/* <input type="file" name="file"/> */}
            {/* <input type="text"/> */}
            {/* <button onClick={onButtonClick}></button> */}
            {/* <button type="submit">Upload</button> */}
            <button onClick={displayImage}>Cloudinary</button>
            <div style={{ marginLeft: "50px", marginTop: "50px"}}/>
            {imageUrls.map((url, index) => (
                <div key={index}>
                     <input type="text" />
               
                <img key={index} src={url} style={{width: "250px "}} />
                </div>
                
            ))}
        </div>
    )

}

export default Picture

