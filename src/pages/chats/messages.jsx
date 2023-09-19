import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { appContext, url } from "../../grobal/context";
import { Image } from "cloudinary-react";
import IonIcon from "@reacticons/ionicons";
import ReactScrollableFeed from "react-scrollable-feed";
import { BeatLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

const Messages = ({ chatActive, chatProf, setChatActive, setActiveIndex }) => {
  const { user } = useContext(appContext);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const getMessages = async () => {
    await axios
      .get(url + "/message", {
        params: {
          foo: user.username,
        },
      })
      .then((res) => {
        setMessages(res.data);
      });
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    setLoading(true);

    await axios
      .post(url + "/chat", {
        sender: user.username,
        receiver: chatProf.username,
      })
      .then(async () => {
        await axios
          .post(url + "/message", {
            sender: user.username,
            receiver: chatProf.username,
            message: message,
          })
          .then((response) => {
            setMessage("");
          });
      });

    setLoading(false);
  };

  useEffect(() => {
    getMessages();
  }, [message]);

  return (
    <div className="w-full">
      {/* chats data */}
      {chatActive ? (
        <div>
          <div className="px-[20px] h-[70px] flex flex-row items-center md:justify-center border-b-background border-b-[2px] gap-x-[20px]">
            <div className="block md:hidden">
              <IonIcon
                name="arrow-back"
                size="large"
                className="cursor-pointer"
                onClick={() => {
                  setChatActive(false);
                  setActiveIndex(-1);
                }}
              />
            </div>

            <div
              className="flex flex-row items-center gap-x-[10px] cursor-pointer"
              onClick={() => navigate(`/user/${chatProf.username}`)}
            >
              {chatProf.profilePicture ? (
                <Image
                  cloudName="kson"
                  publicId={chatProf.profilePicture}
                  className="h-[40px] w-[40px] rounded-full object-cover"
                />
              ) : (
                <img
                  src="./avatar.png"
                  alt=""
                  className="h-[40px] w-[40px] rounded-full object-cover"
                />
              )}

              <p className="">{chatProf.username}</p>
            </div>
          </div>

          <div className="bg-background h-[calc(100vh-170px)] w-full relative">
            <ReactScrollableFeed className="flex flex-col px-[10px] pb-[70px]">
              {messages.length > 0 &&
                messages.map((message) => (
                  <div key={message.id}>
                    {message.sender === chatProf.username && (
                      <div className="p-[10px] w-fit max-w-[80%] bg-primary rounded-[15px] rounded-tl-none mt-[15px]">
                        {message.message}
                      </div>
                    )}
                    {message.receiver === chatProf.username && (
                      <div className="p-[10px] w-fit max-w-[80%] float-right bg-blue-600 rounded-[15px] rounded-tr-none mt-[15px]">
                        {message.message}
                      </div>
                    )}
                  </div>
                ))}
            </ReactScrollableFeed>

            {/* text input box */}
            <form
              onSubmit={sendMessage}
              className=" bg-primary absolute left-0 bottom-0 w-full h-[60px] flex flex-row items-center py-[3px]"
            >
              <textarea
                name="message"
                cols="30"
                rows="10"
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="message here..."
                className="bg-background resize-none outline-none border-none h-full w-full p-[10px] ml-[3px] rounded-[5px]"
              ></textarea>

              <div className=" h-full ml-[4px] px-[4px] flex items-center justify-center">
                <button
                  type="submit"
                  className="w-fit px-[10px] min-w-[65px] py-[7px] bg-tertial rounded-[10px]"
                >
                  {loading ? <BeatLoader color="white" size={5} /> : "Send"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="min-h-[78vh] w-full flex items-center justify-center text-[grey]">
          <div className="flex flex-col items-center gap-y-[10px]">
            <div className="w-[80px] h-[80px] rounded-full border-[grey] border-[1px] flex justify-center items-center">
              <IonIcon name="paper-plane-outline" className="text-[40px]" />
            </div>

            <h1 className="text-[20px] font-[600]">Your Messages</h1>

            <p className="text-[11px] mt-[-10px]">
              Send private photos and messages to a friend
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;
