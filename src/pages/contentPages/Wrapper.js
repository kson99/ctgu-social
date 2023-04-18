import React from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "../components/NavBar";
import SearchPopup from "../components/SearchPopup/SearchPopup";
import Chats from "./Chats/Chats";
import Home from "./Home/Home";
import Profile from "./Profile/Profile";
import UserProfile from "./UserProfile/UserProfile";

function Wrapper() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/chats" element={<Chats />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/searchPopup" element={<SearchPopup />} />
        <Route path="/userProfile" element={<UserProfile />} />
      </Routes>
    </div>
  );
}

export default Wrapper;
