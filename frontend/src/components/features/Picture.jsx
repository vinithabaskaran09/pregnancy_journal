import { useState } from "react";
import { useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';




function Picture(props) {
    const cloudinaryRef = useRef();
    const widgetRef = useRef();
    //    let uploadedUrl;

    const [showImage, setShowImage] = useState("");
    const [imageUrls, setImageUrls] = useState([]);
    const [messageAndUrl, setMessageAndUrl] = useState({});
    //     key: url
    // value: message
    useEffect(cloudinaryValue, [])

    function cloudinaryValue(props) {
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: 'journalpictures',
            uploadPreset: 'k2hycxis'
        }, function (error, result) {
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
                console.log(showImage)
            };

        });
    }

    // function preurls(urls){

    //     return [...urls, uploadedUrl];
    // }
    function displayImage() {
        widgetRef.current.open()
    }

    function dic_update(event) {
        let message = event.target.value;
        // console.log(message);
        // console.log(event.target.getAttribute("data-url"));
        let image_url = event.target.getAttribute("data-url");
        // messageAndUrl.push({key: message, value:image_url});
        messageAndUrl[image_url] = message;
        setMessageAndUrl(messageAndUrl);
        console.log(messageAndUrl)
    };
    

    
    // function dic_update_v2(event, url) {
    //     let message = event.target.value;
    //     console.log(message);
    //     console.log(url);
    // };

    return (
        <div>
            <p>This is where you will upload pictures</p>
            {/* <input type="file" name="file"/> */}
            {/* <input type="text"/> */}
            {/* <button onClick={onButtonClick}></button> */}
            {/* <button type="submit">Upload</button> */}
            <button onClick={displayImage}>Cloudinary</button>
            <div style={{ marginLeft: "50px", marginTop: "50px" }} />
            {imageUrls.map((url, index) => (
                <div key={index}>
                    <input data-url={url} type="text" onChange={dic_update} />
                    {/* <input type="text" onChange={(event) => {dic_update_v2(event, url)}} /> */}

                    <img key={index} src={url} style={{ width: "250px " }} />
                </div>
            ))}
        </div>
    )

}

export default Picture

