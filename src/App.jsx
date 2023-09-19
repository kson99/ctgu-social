import { useEffect, useState } from "react";
import { Navbar } from "./componts";
import Context from "./grobal/context";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import Chats from "./pages/chats/chats";
import Profile from "./pages/profile";
import Follows from "./pages/follows";
import Search from "./pages/search";

function App() {
  const [token, setToken] = useState("");

  useEffect(() => {
    setToken(
      localStorage.getItem("token") != undefined
        ? localStorage.getItem("token")
        : ""
    );
  }, []);

  return (
    <Context token={token} setToken={setToken}>
      <Navbar />
      <Routes>
        {token === "" ? (
          <Route path="/">
            <Route index element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
        ) : (
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="chats" element={<Chats />} />
            <Route path="user/:_username" element={<Profile />} />
            {/* <Route path="user/:_username/follows" element={<Follows />} /> */}
            <Route path="search/:search" element={<Search />} />
          </Route>
        )}
      </Routes>
    </Context>
  );
}

export default App;
