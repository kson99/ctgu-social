import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";
import UploadPopup from "../contentPages/Upload/UploadPopup";
import logo from "../../images/CTGU-logo.png";
import SearchIcon from "@material-ui/icons/Search";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import TextsmsOutlinedIcon from "@material-ui/icons/TextsmsOutlined";
import AddBoxOutlinedIcon from "@material-ui/icons/AddBoxOutlined";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import SearchPopup from "./SearchPopup/SearchPopup";

function NavBar() {
  const [popupTrigger, setPopupTrigger] = useState(false);
  const [searchPopupTrigger, setSearchPopupTrigger] = useState(false);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  ["click", "load"].forEach((event) => {
    window.addEventListener(event, (e) => {
      iconHighlighter();
    });
  });

  const iconHighlighter = () => {
    const pathname = window.location.pathname;

    if (pathname === "/") {
      document.getElementById("Chats").style.color = "green";
      document.getElementById("Profile").style.color = "green";
      document.getElementById("Upload").style.color = "green";

      document.getElementById("Home").style.color = "cornflowerblue";
    } else if (pathname === "/chats") {
      document.getElementById("Home").style.color = "green";
      document.getElementById("Profile").style.color = "green";
      document.getElementById("Upload").style.color = "green";

      document.getElementById("Chats").style.color = "cornflowerblue";
    } else if (pathname === "/profile") {
      document.getElementById("Upload").style.color = "green";
      document.getElementById("Home").style.color = "green";
      document.getElementById("Chats").style.color = "green";

      document.getElementById("Profile").style.color = "cornflowerblue";
    }

    if (popupTrigger) {
      document.getElementById("Home").style.color = "green";
      document.getElementById("Profile").style.color = "green";
      document.getElementById("Chats").style.color = "green";

      document.getElementById("Upload").style.color = "cornflowerblue";
    }

    if (pathname === "/userProfile") {
      document.getElementById("Home").style.color = "green";
      document.getElementById("Profile").style.color = "green";
      document.getElementById("Chats").style.color = "green";
      document.getElementById("Upload").style.color = "green";
    }
  };

  return (
    <div className="NavBar">
      <div className="max-width">
        <Link to="/">
          <img src={logo} alt="" /> Social
        </Link>

        <div className="SearchBar">
          <SearchIcon id="SearchIcon" />
          <input
            type="text"
            placeholder="Search"
            onChange={(event) => {
              setSearchText(event.target.value);
            }}
            onClick={() => setSearchPopupTrigger(true)}
          />
        </div>

        <SearchPopup
          trigger={searchPopupTrigger}
          search={searchText}
          setTrigger={setSearchPopupTrigger}
        ></SearchPopup>

        <div className="Tabs">
          <Link to="/">
            <HomeOutlinedIcon className="Icon" id="Home" />
          </Link>
          <Link to="/chats">
            <TextsmsOutlinedIcon className="Icon" id="Chats" />
          </Link>
          <Link>
            <AddBoxOutlinedIcon
              className="Icon"
              id="Upload"
              onClick={() => {
                if (window.location.pathname === "/userProfile") {
                  navigate("/");
                  setPopupTrigger(true);
                } else {
                  setPopupTrigger(true);
                }
              }}
            />
          </Link>
          <Link to="/profile">
            <AccountCircleOutlinedIcon className="Icon" id="Profile" />
          </Link>
        </div>

        <UploadPopup
          trigger={popupTrigger}
          setTrigger={setPopupTrigger}
        ></UploadPopup>
      </div>
    </div>
  );
}

export default NavBar;
