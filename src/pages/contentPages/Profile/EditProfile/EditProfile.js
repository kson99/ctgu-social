import Axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import "./EditProfile.css";

function EditProfile(props) {
  const inputFile = useRef(null);
  const [image, setImage] = useState([]);

  useEffect(() => {
    const formData = new FormData();
    formData.append("file", image[0]);
    formData.append("upload_preset", "vkmpeofq");

    Axios.post(
      "https://api.cloudinary.com/v1_1/kson/image/upload",
      formData
    ).then((response) => {
      const filename = response.data.public_id;

      Axios.post(
        "https://ctgu-social-serv-production.up.railway.app/upload/proPic",
        {
          image: filename,
          username: props.prof.username,
        }
      ).then(() => {
        props.setTrigger(false);
        window.location.reload();
      });
    });
  }, [image]);

  return props.trigger ? (
    <div className="EditProfile">
      <div className="ProfPicture">
        <h3>Change Profile Picture</h3>

        <div className="Seperator"></div>
        <p style={{ color: "green" }} onClick={() => inputFile.current.click()}>
          Upload Profile Picture
        </p>

        <div className="Seperator"></div>
        <p style={{ color: "red" }}>Remove Profile Picture</p>

        <div className="Seperator"></div>
        <p onClick={() => props.setTrigger(false)}>Cancel</p>

        <input
          accept="image/*"
          type="file"
          id="file"
          ref={inputFile}
          style={{ display: "none" }}
          onChange={(event) => {
            setImage(event.target.files);
          }}
        />
      </div>
    </div>
  ) : (
    ""
  );
}

export default EditProfile;
