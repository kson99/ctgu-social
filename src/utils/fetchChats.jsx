import { useContext, useEffect, useState } from "react";
import { appContext, url } from "../grobal/context";
import axios from "axios";

const fetchChats = () => {
  const { user, users } = useContext(appContext);
  const [chatProfiles, setChatProfiles] = useState([]);

  const getChats = async () => {
    await axios
      .get(url + "/chat", {
        params: {
          foo: user.username,
        },
      })
      .then((res) => {
        let chats = res.data;
        let chatNames = [];
        let _chatProfiles = [];

        chats.map((chat) => {
          if (chat.sender === user.username) {
            if (chatNames.indexOf(chat.receiver) === -1) {
              chatNames.push(chat.receiver);
            }
          } else if (chat.receiver === user.username) {
            if (chatNames.indexOf(chat.sender) === -1) {
              chatNames.push(chat.sender);
            }
          }
        });

        chatNames.map((chatName) => {
          _chatProfiles.push(
            users.find(({ username }) => username === chatName)
          );
        });

        setChatProfiles(_chatProfiles);
      });
  };

  useEffect(() => {
    getChats();
  }, [user]);

  return { chatProfiles };
};

export default fetchChats;
