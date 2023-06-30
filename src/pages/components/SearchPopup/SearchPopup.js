import React, { useEffect, useState } from "react";
import "./SearchPopup.css";
import Axios from "axios";
import { Image } from "cloudinary-react";
import { useNavigate } from "react-router-dom";
import IonIcon from "@reacticons/ionicons";

function SearchPopup(props) {
  const [searchUsers, setSearchUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    Axios.get(
      "https://ctgu-social-serv-production.up.railway.app/user/search",
      {
        params: {
          foo: props.search,
        },
      }
    ).then((response) => {
      setSearchUsers(response.data);
    });
  }, [props.search]);

  const goToProfile = (val) => {
    navigate("/userProfile");
    localStorage.setItem("passUser", JSON.stringify(val));
    props.setTrigger(false);
    window.location.reload();
  };

  return props.trigger ? (
    <div className="Search">
      <div className="SearchResults">
        <div className="Close" onClick={() => props.setTrigger(false)}>
          <IonIcon name="close" className="icon" />
        </div>
        <div className="Users">
          <div className="Tile">
            Searching for: <b>{props.search}</b>
            {searchUsers.length > 0 &&
              searchUsers.map((val, index) => {
                return (
                  <div key={index}>
                    {val.username !== localStorage.getItem("username") ? (
                      <div className="User" onClick={() => goToProfile(val)}>
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
                        <div className="Details">
                          <div className="Name"> {val.username} </div>
                          <div className="College"> {val.college} </div>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}

export default SearchPopup;
