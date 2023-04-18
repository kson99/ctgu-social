import React, { useState } from "react";
import "./SignUp.css";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";

function SignUp() {
  const [username, setUsername] = useState("");
  const [stNumber, setStNumber] = useState("");
  const [college, setCollege] = useState("");
  const [course, setCourse] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const userId = uuid();

  const register = () => {
    Axios.post(
      "https://ctgu-social-serv-production.up.railway.app/user/register",
      {
        username: username,
        stNumber: stNumber,
        college: college,
        course: course,
        password: password,
        userId: userId,
      }
    ).then((response) => {
      // console.log(response);
      navigate("/");
    });
  };

  return (
    <div className="SignUp">
      <div className="Form">
        <h1>Register for CTGU Social</h1>
        <input
          type="text"
          placeholder="Username"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Student Number"
          onChange={(event) => {
            setStNumber(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="College"
          onChange={(event) => {
            setCollege(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Course"
          onChange={(event) => {
            setCourse(event.target.value);
          }}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <button onClick={register}>Register</button>
      </div>
    </div>
  );
}

export default SignUp;
