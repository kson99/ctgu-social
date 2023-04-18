import React, { useEffect, useState } from "react";
import "./Profile.css";
import Axios from "axios";
import { Image } from "cloudinary-react";
import { useNavigate } from "react-router-dom";
import EditProfile from "./EditProfile/EditProfile";

function Profile() {
  const [myUploads, setMyUploads] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const navigate = useNavigate();
  const [editIsClicked, setEditIsClicked] = useState(false);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    Axios.get(
      `https://ctgu-social-serv-production.up.railway.app/user/byUser/${localStorage.getItem(
        "username"
      )}`
    ).then((response) => {
      setUserInfo(response.data);
    });
  }, []);

  useEffect(() => {
    Axios.get(
      `https://ctgu-social-serv-production.up.railway.app/upload/byUser/${localStorage.getItem(
        "username"
      )}`
    ).then((response) => {
      setMyUploads(response.data);
    });
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  useEffect(() => {
    Axios.get(
      "https://ctgu-social-serv-production.up.railway.app/follows/followers",
      {
        params: {
          foo: localStorage.getItem("username"),
        },
      }
    ).then((response) => {
      setFollowers(response.data);
      Axios.get(
        "https://ctgu-social-serv-production.up.railway.app/follows/following",
        {
          params: {
            foo: localStorage.getItem("username"),
          },
        }
      ).then((response1) => {
        setFollowing(response1.data);
      });
    });
  }, []);

  return (
    <div className="Profile">
      {userInfo.map((val, index) => {
        return (
          <div key={index} className="ProfInfo">
            <div className="Avatarp">
              {val.profilePicture === null ? (
                <div></div>
              ) : (
                <div key={index} className="ProPic">
                  <Image cloudName="kson" publicId={val.profilePicture} />
                </div>
              )}
            </div>
            <div className="MyInfo">
              <div className="Interactions">
                <div>{val.username}</div>
                <button onClick={() => setEditIsClicked(true)}>
                  Edit profile
                </button>

                <EditProfile
                  trigger={editIsClicked}
                  setTrigger={setEditIsClicked}
                  prof={val}
                ></EditProfile>

                <button onClick={logout}>Logout</button>
              </div>
              <div className="Stats">
                <div className="PostsNo">
                  <div>{myUploads.length}</div>
                  <div>Posts</div>
                </div>
                <div className="FollowersNo">
                  <div>{following.length}</div>
                  <div>Followers</div>
                </div>
                <div className="FollowingNo">
                  <div>{followers.length}</div>
                  <div>Following</div>
                </div>
              </div>
              <div className="College">College: {val.college}</div>
              <div className="Course">Course name: {val.course}</div>
              <div className="StudoneNo">Student No: {val.stNumber}</div>
            </div>
          </div>
        );
      })}
      <div className="Seperator"> </div>
      <h2>POSTS</h2>
      {myUploads.length === 0 ? (
        <div className="NoPosts">
          <p>No Posts Found</p>
        </div>
      ) : (
        <div className="Posts">
          {myUploads.map((val, index) => {
            return (
              <div key={index} className="Image">
                <Image cloudName="kson" publicId={val.image} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Profile;
