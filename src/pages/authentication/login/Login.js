import Axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [stNumber, setStNumber] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrMessage] = useState("");

  const navigate = useNavigate();

  const login = () => {
    Axios.post(
      "https://ctgu-social-serv-production.up.railway.app/user/login",
      {
        stNumber: stNumber,
        password: password,
      }
    ).then((response) => {
      if (response.data.loggedIn) {
        localStorage.setItem("loggedIn", true);
        localStorage.setItem("username", response.data.username);
        localStorage.setItem("stNumber", response.data.stNumber);
        localStorage.setItem("userId", response.data.userId);
        localStorage.setItem("college", response.data.college);
        navigate("/");
        window.location.reload();
      } else {
        setErrMessage(response.data.message);
      }
    });
  };

  return (
    <div className="LogIn">
      <div className="Form">
        <h1>Log into CTGU Social</h1>
        <input
          type="number"
          placeholder="Student Number"
          onChange={(event) => {
            setStNumber(event.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <button onClick={login}>Login</button>
        <p style={{ color: "red", fontSize: "19px" }}>{errMessage}</p>
      </div>
    </div>
  );
}

export default Login;
