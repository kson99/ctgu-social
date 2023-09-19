import React, { useContext, useEffect, useState } from "react";
import { appContext } from "../../grobal/context";
import { Image } from "cloudinary-react";
import { ChatListCard } from "../../componts";
import fetchChats from "../../utils/fetchChats";
import Messages from "./messages";
import { useLocation } from "react-router-dom";
import IonIcon from "@reacticons/ionicons";

const Chats = () => {
  const { user, users } = useContext(appContext);
  const [chatActive, setChatActive] = useState(false);
  const [chatExists, setChatExists] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [chatProf, setChatProf] = useState({});
  const { chatProfiles } = fetchChats();
  const { state } = useLocation();
  const messageUser = state?._user;

  useEffect(() => {
    if (messageUser) {
      setChatActive(true);
      setChatProf(messageUser);

      chatProfiles.map((chat, i) => {
        if (chat.username === messageUser.username) {
          setChatExists(true);
          setActiveIndex(i);
        }
      });
    }
  }, [messageUser, chatProfiles]);

  return (
    <div className="h-full">
      <div className="max-width">
        <div className="min-h-[calc(100vh-80px)] h-fit py-[10px] md:py-[30px]">
          <div className="w-full h-[calc(100vh-100px)] md:h-auto md:w-[90%] bg-primary mx-auto rounded-[10px] flex flex-row overflow-hidden">
            <div
              className={`flex-1 md:flex-[0.35] ${
                chatActive ? "max-md:hidden" : "flex"
              } flex-col`}
            >
              {/* Chats List Header */}
              <div className="h-[70px] px-[20px] flex flex-row items-center justify-center border-b-background border-b-[2px]">
                <div className="flex flex-row items-center gap-x-[10px]">
                  {user.profilePicture ? (
                    <Image
                      cloudName="kson"
                      publicId={user.profilePicture}
                      className="h-[40px] w-[40px] rounded-full object-cover"
                    />
                  ) : (
                    <img
                      src="./avatar.png"
                      alt=""
                      className="h-[40px] w-[40px] rounded-full object-cover"
                    />
                  )}

                  <p className="tracking-[1px]">{user.username}</p>
                </div>
              </div>

              {/* Chatslist body */}
              <div className="h-[calc(100vh-170px)] overflow-auto">
                {messageUser && !chatExists && (
                  <div
                    key={messageUser.id}
                    onClick={() => {
                      setChatActive(true);
                    }}
                    className="hover:bg-tertial cursor-pointer mx-[5px] my-[2px] rounded-[5px] overflow-hidden"
                  >
                    <ChatListCard
                      profile={messageUser}
                      active={-1}
                      index={-1}
                    />
                  </div>
                )}

                {chatProfiles.map((chat, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setChatActive(true);
                      setChatProf(chat);
                      setActiveIndex(index);
                    }}
                    className="hover:bg-tertial cursor-pointer mx-[5px] my-[2px] rounded-[5px] overflow-hidden"
                  >
                    <ChatListCard
                      profile={chat}
                      active={activeIndex}
                      index={index}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden md:block md:flex-[0.65] border-l-background border-l-[2px] pr-[3px]">
              <Messages chatActive={chatActive} chatProf={chatProf} />
            </div>

            <div
              className={`${
                chatActive ? "max-md:flex" : "hidden"
              } md:hidden flex-1 md:flex-[0.65] border-l-primary md:border-l-background border-l-[3px] pr-[3px]`}
            >
              <Messages
                chatActive={chatActive}
                chatProf={chatProf}
                setChatActive={setChatActive}
                setActiveIndex={setActiveIndex}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chats;
