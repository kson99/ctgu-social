import React, { useEffect, useState } from "react";
import "./Chats.css";
import { Image } from "cloudinary-react";
import CommentOutlinedIcon from "@material-ui/icons/CommentOutlined";
import Axios from "axios";
import ReactScrollableFeed from "react-scrollable-feed";

function Chats() {
  const [chatClicked, setChatCliked] = useState(false);
  const [chats, setChats] = useState([]);
  const [chatsProf, setChatsProf] = useState();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState([]);
  var chatNames = [];

  useEffect(() => {
    Axios.get("https://ctgu-social-serv-production.up.railway.app/chat", {
      params: {
        foo: localStorage.getItem("username"),
      },
    }).then((response) => {
      setChats(response.data);
    });
  }, [messages]);

  useEffect(() => {
    Axios.get("https://ctgu-social-serv-production.up.railway.app/message", {
      params: {
        foo: localStorage.getItem("username"),
      },
    }).then((response) => {
      setMessages(response.data);
    });
  }, [messages]);

  useEffect(() => {
    Axios.get("https://ctgu-social-serv-production.up.railway.app/user").then(
      (response) => {
        setUser(response.data);
      }
    );
  }, []);

  const onSendMessage = (theReceiver) => {
    document.getElementById("messagearea").value = "";

    Axios.post("https://ctgu-social-serv-production.up.railway.app/chat", {
      sender: localStorage.getItem("username"),
      receiver: theReceiver,
    }).then(() => {
      Axios.post("https://ctgu-social-serv-production.up.railway.app/message", {
        sender: localStorage.getItem("username"),
        receiver: theReceiver,
        message: message,
      }).then((response) => {
        // console.log(response);
      });
    });
  };

  const getChatNames = () => {
    chats.map((chat) => {
      if (chat.sender === localStorage.getItem("username")) {
        if (chatNames.indexOf(chat.receiver) === -1) {
          chatNames.push(chat.receiver);
        }
      } else if (chat.receiver === localStorage.getItem("username")) {
        if (chatNames.indexOf(chat.sender) === -1) {
          chatNames.push(chat.sender);
        }
      }
    });
  };

  return (
    <div className="Chats">
      <div className="ChatArea">
        <div className="MyChats">
          <div className="ChatsHeader">
            {user.map((val, index) => {
              return (
                <div key={index} className="p-picture">
                  {val.username === localStorage.getItem("username") ? (
                    <>
                      {val.profilePicture === null ? (
                        <div className="Avatar"></div>
                      ) : (
                        <div key={index} className="ProPic">
                          <Image
                            cloudName="kson"
                            publicId={val.profilePicture}
                          />
                        </div>
                      )}
                    </>
                  ) : (
                    ""
                  )}
                </div>
              );
            })}
            <div className="myName">{localStorage.getItem("username")}</div>
          </div>
          <div className="ChatsList">
            {getChatNames()}
            {chatNames.map((chatName, index) => {
              return (
                <div
                  className="Tile"
                  id={"Tile-" + chatName.replaceAll(" ", "_")}
                  key={index}
                  onClick={() => {
                    setChatCliked(true);
                    setChatsProf(chatName);

                    document
                      .getElementById("Tile-" + chatName.replaceAll(" ", "_"))
                      .classList.add("activeTile");

                    document
                      .querySelectorAll(
                        `.Tile:not(#${"Tile-" + chatName.replaceAll(" ", "_")})`
                      )
                      .forEach((n) => {
                        n.classList.remove("activeTile");
                      });
                  }}
                >
                  <div className="Content">
                    {user.map((usr, i) => {
                      return (
                        <div className="p-picture" index={i}>
                          {usr.username === chatName ? (
                            <>
                              {usr.profilePicture === null ? (
                                <div className="Avatar"></div>
                              ) : (
                                <div key={i} className="ProPic">
                                  <Image
                                    cloudName="kson"
                                    publicId={usr.profilePicture}
                                  />
                                </div>
                              )}
                            </>
                          ) : (
                            ""
                          )}
                        </div>
                      );
                    })}
                    <div className="ChatName">{chatName}</div>
                  </div>
                </div>
              );
            })}
            {/* {
              chats.map((val, index) => {
              return (
                <div
                  className="Tile"
                  key={index}
                  id={"Tile" + val.id}
                  onClick={() => {
                    setChatCliked(true);
                    setChatsProf(val);

                    document
                      .getElementById("Tile" + val.id)
                      .classList.add("activeTile");

                    document
                      .querySelectorAll(`.Tile:not(#${"Tile" + val.id})`)
                      .forEach((n) => {
                        n.classList.remove("activeTile");
                      });
                  }}
                >
                  {val.sender === localStorage.getItem("username") ? (
                    ""
                  ) : (
                    <div className="Content">
                      {user.map((val1, index1) => {
                        return (
                          <>
                            {val1.username === val.sender ? (
                              <>
                                {val1.profilePicture === null ? (
                                  <div className="Avatar"></div>
                                ) : (
                                  <div key={index1} className="ProPic">
                                    <Image
                                      cloudName="kson"
                                      publicId={val1.profilePicture}
                                    />
                                  </div>
                                )}
                              </>
                            ) : (
                              ""
                            )}
                          </>
                        );
                      })}
                      <div className="ChatName">{val.sender}</div>
                    </div>
                  )}
                </div>
              );
            })} */}
          </div>
        </div>
        <div className="Messaging">
          {chatClicked ? (
            <>
              <div className="MessagingHeader">{chatsProf}</div>
              <ReactScrollableFeed className="MessagesBox">
                {messages.map((val, index) => {
                  return (
                    <div key={index}>
                      {val.sender === chatsProf ? (
                        <>
                          <div className="HisMessages">{val.message}</div>
                        </>
                      ) : (
                        ""
                      )}
                      {val.receiver === chatsProf ? (
                        <>
                          <div className="MyMessages">{val.message}</div>
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                  );
                })}
              </ReactScrollableFeed>
              <div className="SendingMessage">
                <textarea
                  id="messagearea"
                  placeholder="Message"
                  onChange={(event) => {
                    setMessage(event.target.value);
                  }}
                ></textarea>
                <button onClick={() => onSendMessage(chatsProf)}>Send</button>
              </div>
            </>
          ) : (
            <div className="MessagesPlaceholder">
              <CommentOutlinedIcon id="MessIcon" />
              <h2>Your Messages</h2>
              <p>Send private photos and messages to a friend</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Chats;
