import React, { useEffect, useState } from "react";
import { Image } from "cloudinary-react";
import Axios from "axios";
import "./Home.css";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { useNavigate } from "react-router-dom";

function Home() {
  const [uploads, setUploads] = useState([]);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  window.addEventListener("scroll", (e) => {
    if (window.location.pathname === "/") {
      scrollHandler();
    }
  });

  const scrollHandler = () => {
    var others = document.getElementById("Others");

    if (window.scrollY > 600) {
      others.style.display = "none";
    } else {
      others.style.display = "flex";
    }
  };

  useEffect(() => {
    Axios.get("https://ctgu-social-serv-production.up.railway.app/upload").then(
      (response) => {
        setUploads(response.data);
      }
    );
  }, []);

  useEffect(() => {
    Axios.get(
      `https://ctgu-social-serv-production.up.railway.app/user/exclude/${localStorage.getItem(
        "username"
      )}`
    ).then((response) => {
      setUsers(response.data);
    });
  }, []);

  const goToProfile = (val) => {
    navigate("/userProfile");

    localStorage.setItem("passUser", JSON.stringify(val));
  };

  const likePost = (id) => {
    Axios.post(
      "https://ctgu-social-serv-production.up.railway.app/upload/like",
      {
        postId: id,
        userLiking: localStorage.getItem("username"),
      }
    );
  };

  return (
    <div className="Home" id="Home">
      <div className="Posts">
        {uploads.length === 0 ? (
          <div className="NoPosts">
            <p>No Posts Found</p>
          </div>
        ) : (
          <>
            {uploads.map((val, index) => {
              return (
                <div key={index} className="Post">
                  <div className="Top">
                    {val.profilePicture === null ? (
                      <div className="TopAvatar"></div>
                    ) : (
                      <div key={index} className="TopProPic">
                        <Image cloudName="kson" publicId={val.profilePicture} />
                      </div>
                    )}
                    <div className="Username">
                      <p>{val.username}</p>
                    </div>
                  </div>
                  <div className="Image">
                    <Image cloudName="kson" publicId={val.image} />
                  </div>
                  <div className="PostInfo">
                    <div className="Reactions">
                      <div className="ReactionButtons">
                        <FavoriteBorderIcon
                          id="LikeButton"
                          onClick={() => likePost(val.id)}
                        />
                      </div>
                    </div>
                    <div className="Likes">
                      <div id="count">{val.likesNo} Likes</div>
                    </div>
                    <div className="Caption">
                      <div id="username">{val.username}</div>
                      <div id="caption">{val.caption}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
      <div className="Others" id="Others">
        <div className="Users">
          <div className="Title">Newest users</div>
          <div className="Tile">
            {users.map((val, index) => {
              return (
                <div
                  key={index}
                  className="User"
                  onClick={() => goToProfile(val)}
                >
                  {val.profilePicture === null ? (
                    <div className="Avatar"></div>
                  ) : (
                    <div key={index} className="ProPic">
                      <Image cloudName="kson" publicId={val.profilePicture} />
                    </div>
                  )}
                  <div className="Details">
                    <div className="Name"> {val.username} </div>
                    <div className="College"> {val.college} </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
