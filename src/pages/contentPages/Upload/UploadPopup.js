import Axios from "axios";
import { useState } from "react";
import React from "react";
import "./UploadPopup.css";

function UploadPopup(props) {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState([]);

  const uploadPost = () => {
    const formData = new FormData();
    formData.append("file", image[0]);
    formData.append("upload_preset", "iat5gtdf");

    Axios.post(
      "https://api.cloudinary.com/v1_1/kson/image/upload",
      formData
    ).then((response) => {
      const filename = response.data.public_id;

      Axios.post("https://ctgu-social-serv-production.up.railway.app/upload", {
        caption: caption,
        image: filename,
        username: localStorage.getItem("username"),
      }).then(() => {
        props.setTrigger(false);
        window.location.reload();
      });
    });
  };

  return props.trigger ? (
    <div className="Popup">
      <div className="PopupInner">
        <p onClick={() => props.setTrigger(false)}>X</p>
        <div className="Upload">
          <h1>Create a Post</h1>
          <div className="Form">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                setImage(e.target.files);
              }}
            />
            <input
              type="text"
              placeholder="Write a caption"
              onChange={(event) => {
                setCaption(event.target.value);
              }}
            />
            <button onClick={uploadPost}>Upload Post</button>
          </div>
        </div>
        {props.children}
      </div>
    </div>
  ) : (
    ""
  );
}

export default UploadPopup;
