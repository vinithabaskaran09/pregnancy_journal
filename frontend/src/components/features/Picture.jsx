import { useState } from "react";
import { useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';




function Picture(props) {
    const cloudinaryRef = useRef();
    const widgetRef = useRef();
    //    let uploadedUrl;

    // const [showImage, setShowImage] = useState("");
    // const [imageUrls, setImageUrls] = useState([]);
    const [messageAndUrl, setMessageAndUrl] = useState(props.picMessageAndUrl);
    //     key: url
    // value: message
    // console.log(props.picMessageAndUrl)
    useEffect(cloudinaryValue, [])

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
                // setShowImage(url);
                // uploadedUrl = url;
                // setstageparameters(previousstatevalue)
                // Additionally, when a new image URL is added to the imageUrls state, the dict_update function is called with an empty value for the input and the corresponding URL using 
                updateURLStates(url, "");
                // setImageUrls(imageUrls => [...imageUrls, url])
                // setImageUrls(prevUrls => [...prevUrls, url]);
                // setImageUrls((prevUrls) => { return [...prevUrls, url] });
                // setImageUrls(preurls);
                // console.log(showImage)
            };

        });
    }

    // function preurls(urls){

    //     return [...urls, uploadedUrl];
    // }
    function displayImage() {
        widgetRef.current.open()
    }

    function dict_update(event) {
        let message = event.target.value;
        // console.log(message);
        // console.log(event.target.getAttribute("data-url"));
        let image_url = event.target.getAttribute("data-url");
        // messageAndUrl.push({key: message, value:image_url});
        updateURLStates(image_url, message);
    };

    function updateURLStates(image_url, message) {
        // messageAndUrl[image_url] = message;
        let newDictionary = {
            ...messageAndUrl 
        }
        console.log("newDictionary before add");
        console.log(newDictionary);
        console.log("new Url:"+ image_url);
        newDictionary[image_url] = message;
        console.log("newDictionary after add");
        console.log(newDictionary);
        // props.setSharedUrl(messageAndUrl);
        // console.log(messageAndUrl)
        setMessageAndUrl(newDictionary)
        props.pictureMessageAndUrl(newDictionary)
    }
    

    
    // function dic_update_v2(event, url) {
    //     let message = event.target.value;
    //     console.log(message);
    //     console.log(url);
    // };

    return (
        <div>
            {/* <p>This is where you will upload pictures</p> */}
            {/* <input type="file" name="file"/> */}
            {/* <input type="text"/> */}
            {/* <button onClick={onButtonClick}></button> */}
            {/* <button type="submit">Upload</button> */}
            <button className="border border-5" onClick={displayImage}>Upload</button>
            <div style={{ marginLeft: "50px", marginTop: "50px" }} />
            {Object.entries(props.picMessageAndUrl).map(([url, message]) => (
                <div>
                    {/* <input type="text" onChange={(event) => {dic_update_v2(event, url)}} /> */}
                    <br/>
                    <img src={url} style={{ width: "250px", border: "solid", marginBottom: "10px" }} />
                    <br/>
                    <br/>
                    <input data-url={url} type="text" onChange={dict_update} value={message} data-messgae={message} className="font"/>
                    <br/>
                </div>
            ))}
        </div>
    )

}

export default Picture

