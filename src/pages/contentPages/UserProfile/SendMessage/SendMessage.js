import Axios from "axios";
import React, { useState } from "react";
import "./SendMessage.css";

function SendMessage(props) {
  const [message, setMessage] = useState("");

  const onSendMessage = () => {
    Axios.post("https://ctgu-social-serv-production.up.railway.app/chat", {
      sender: localStorage.getItem("username"),
      receiver: props.username,
    }).then(() => {
      Axios.post("https://ctgu-social-serv-production.up.railway.app/message", {
        sender: localStorage.getItem("username"),
        receiver: props.username,
        message: message,
      }).then(() => {
        props.setTrigger(false);
      });
    });
  };

  return props.trigger ? (
    <div className="SendMessage">
      <div className="MessageBox">
        <p id="close" onClick={() => props.setTrigger(false)}>
          x
        </p>
        <p>Message to: {props.username}</p>
        <div className="Holder">
          <textarea
            placeholder="message"
            onChange={(event) => {
              setMessage(event.target.value);
            }}
          ></textarea>
          <button onClick={onSendMessage}>Send</button>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}

export default SendMessage;
