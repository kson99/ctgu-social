import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const appContext = createContext();
export const url = "https://perfect-cuff-links-lamb.cyclic.cloud/ctgu-social";
// export const url = "http://192.168.8.101:3001/ctgu-social";

const Context = ({ children, token, setToken }) => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});
  const [users, setUsers] = useState([]);
  const [reflesh, setReflesh] = useState(0);

  const getPosts = async () => {
    await axios.get(url + "/upload").then((res) => {
      setPosts(res.data);
    });
  };

  const getUsers = async () => {
    await axios.get(url + "/user").then(async (res) => {
      let data = [];

      setUsers(res.data);
      data.push(...res.data);
      let _user = {};

      let _data = localStorage.getItem("user");
      if (_data) {
        _user = { ...JSON.parse(_data) };
      }

      let newUser = data.find(({ userId }) => userId === _user.userId);
      if (newUser) {
        setUser(newUser);
        localStorage.setItem("user", JSON.stringify(newUser));
      }
    });
  };

  useEffect(() => {
    getPosts();
    getUsers();
  }, [reflesh]);

  return (
    <appContext.Provider
      value={{
        posts,
        reflesh,
        setReflesh,
        user,
        setUser,
        token,
        setToken,
        users,
      }}
    >
      {children}
    </appContext.Provider>
  );
};

export default Context;
