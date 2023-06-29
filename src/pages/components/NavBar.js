import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";
import UploadPopup from "../contentPages/Upload/UploadPopup";
import logo from "../../images/logo.png";
import SearchIcon from "@material-ui/icons/Search";
import SearchPopup from "./SearchPopup/SearchPopup";
import IonIcon from "@reacticons/ionicons";

function NavBar() {
  const [popupTrigger, setPopupTrigger] = useState(false);
  const [searchPopupTrigger, setSearchPopupTrigger] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selected, setSelected] = useState("");
  const navigate = useNavigate();

  ["click", "load"].forEach((event) => {
    window.addEventListener(event, (e) => {
      iconHighlighter();
    });
  });

  const iconHighlighter = () => {
    const pathname = window.location.pathname;

    if (pathname === "/") {
      setSelected("Home");
    } else if (pathname === "/chats") {
      setSelected("Chats");
    } else if (pathname === "/profile") {
      setSelected("Profile");
    } else {
      setSelected("");
    }

    if (popupTrigger) {
      setSelected("Upload");
    }
  };

  return (
    <div className="NavBar">
      <div className="max-width">
        <Link to="/">
          <img src={logo} alt="" />
          &nbsp;Social
        </Link>

        <div className="SearchBar">
          <IonIcon id="SearchIcon" name="search-outline" />
          <input
            type="text"
            placeholder="Search"
            id="search-input"
            onChange={(event) => {
              setSearchText(event.target.value);
            }}
            onClick={() => setSearchPopupTrigger(true)}
          />
          <IonIcon
            name="close"
            id="close"
            onClick={() => {
              document.getElementById("search-input").value = "";
              setSearchText("");
            }}
          />
        </div>

        <SearchPopup
          trigger={searchPopupTrigger}
          search={searchText}
          setTrigger={setSearchPopupTrigger}
        ></SearchPopup>

        <div className="Tabs">
          <Link to="/">
            <IonIcon
              name={selected == "Home" ? "home" : "home-outline"}
              className="Icon"
              id="Home"
            />
          </Link>
          <Link to="/chats">
            <IonIcon
              className="Icon"
              id="Chats"
              name={selected == "Chats" ? "mail" : "mail-outline"}
            />
          </Link>
          <Link>
            <IonIcon
              name={selected == "Upload" ? "duplicate" : "duplicate-outline"}
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
            <IonIcon
              name={selected == "Profile" ? "person" : "person-outline"}
              className="Icon"
              id="Profile"
            />
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
