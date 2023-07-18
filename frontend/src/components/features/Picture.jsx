import { useState } from "react";
import { useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';




function Picture(props) {
    
    const cloudinaryRef = useRef();
    const widgetRef = useRef();

    // const [showImage, setShowImage] = useState("");
    // const [imageUrls, setImageUrls] = useState([]);
    // const [messageAndUrl, setMessageAndUrl] = useState({});
    const [showUnsavePics, setShowUnsavePics] = useState(false);
    //     key: url
    // value: message
    // console.log(props.picMessageAndUrl)
    useEffect(cloudinaryValue, [])


    useEffect( () => {
        console.log("updated prop value")
        setShowUnsavePics(false);
    }, [props.picMessageAndUrl]); 

    function cloudinaryValue(props) {
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: 'journalpictures',
            uploadPreset: 'k2hycxis'
        }, function (error, result) {
            // console.log(result);
            const url = result.info.url;
            // console.log(url);
            if (url) {
                let displayDiv = document.getElementById("image-display");
                displayDiv.innerHTML += 
                `<div>
                    <br/>
                    <img src=${url} style="width: 250px; border: solid; marginBottom: 10px" />
                    <br/>
                    <br/>
                    <input name="imageUrl" data-url=${url} type="text" class="font"/>
                    <br/>
                </div>`
                
                // setImageUrls(imageUrls => [...imageUrls, url])
                // setImageUrls(prevUrls => [...prevUrls, url]);
                // setImageUrls((prevUrls) => { return [...prevUrls, url] });
                // setImageUrls(preurls);
                // console.log(showImage)
            };
            
        });

    }


    function displayImage() {
        setShowUnsavePics(true);
        widgetRef.current.open()
    }

    function dict_update(event) {
        let message = event.target.value;
        let image_url = event.target.getAttribute("data-url");
        updateURLStates(image_url, message);
    };

    function updateURLStates(image_url, message) {
        // messageAndUrl[image_url] = message;
        // // let newDictionary = {
        //     ...messageAndUrl 
        // }

        // console.log("newDictionary before add");
        // console.log(newDictionary);
        // console.log("new Url:"+ image_url);
        // newDictionary[image_url] = message;
        // console.log("newDictionary after add");
        // console.log(newDictionary);
        // props.setSharedUrl(messageAndUrl);
        // console.log(messageAndUrl)
        // setMessageAndUrl()
        props.pictureMessageAndUrl(message,image_url)

    }
    

    return (
        <div>
            <button className="border border-5" onClick={displayImage}>Upload</button>
            <div style={{ marginLeft: "50px", marginTop: "50px" }} />
            
            {Object.entries(props.picMessageAndUrl).map(([url, message]) => (
                <div>
                    {/* <input type="text" onChange={(event) => {dic_update_v2(event, url)}} /> */}
                    <br/>
                    <img src={url} style={{ width: "250px", border: "solid", marginBottom: "10px" }} />
                    <br/>
                    <br/>
                    <input name="imageUrl" data-url={url} type="text" value={message} data-messgae={message} readOnly={true} className="font"/>
                    <br/>
                </div>
            ))}
            {showUnsavePics ?  <div id="image-display"></div> : null}
        </div>
    )

}

export default Picture

