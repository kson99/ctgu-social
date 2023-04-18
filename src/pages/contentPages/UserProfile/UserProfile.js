import Axios from "axios";
import { Image } from "cloudinary-react";
import React, { useEffect, useState } from "react";
import SendMessage from "./SendMessage/SendMessage";
import "./UserProfile.css";

function UserProfile() {
  const [theirPosts, setTheirPosts] = useState([]);
  const [messageTrigger, setMessageTrigger] = useState(false);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const prof = JSON.parse(localStorage.getItem("passUser"));

  useEffect(() => {
    getAccountInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    var data = following.filter(
      (val) => val.follower === localStorage.getItem("username")
    );
    if (data.length === 1) {
      setIsFollowing(true);
    }
  }, [following]);

  const getAccountInfo = () => {
    // get posts
    Axios.get(
      `https://ctgu-social-serv-production.up.railway.app/upload/${prof.username}`
    ).then((response) => {
      setTheirPosts(response.data);
    });

    // get following information
    Axios.get(
      "https://ctgu-social-serv-production.up.railway.app/follows/followers",
      {
        params: {
          foo: prof.username,
        },
      }
    ).then((response) => {
      setFollowers(response.data);
      Axios.get(
        "https://ctgu-social-serv-production.up.railway.app/follows/following",
        {
          params: {
            foo: prof.username,
          },
        }
      ).then((response1) => {
        setFollowing(response1.data);
      });
    });
  };

  const followUser = () => {
    Axios.post("https://ctgu-social-serv-production.up.railway.app/follows", {
      follower: localStorage.getItem("username"),
      following: prof.username,
    });
  };

  return (
    <div className="UserProfile">
      <div className="ProfileInfo">
        <div className="ProPic">
          <div className="Pic"></div>
        </div>
        <div className="ProDetails">
          <div className="Interactions">
            <div>{prof.username}</div>
            <button onClick={() => setMessageTrigger(true)}>Message</button>
            <SendMessage
              trigger={messageTrigger}
              setTrigger={setMessageTrigger}
              username={prof.username}
            />
            <button onClick={followUser}>
              {isFollowing ? "Following" : "Follow"}
            </button>
          </div>
          <div className="Stats">
            <div className="PostsNo">
              <div>{theirPosts.length}</div>
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
          <div>College: {prof.college}</div>
          <div>Course: {prof.course}</div>
          <div>StudentNo: {prof.stNumber}</div>
        </div>
      </div>
      <div className="Seperator"> </div>
      <h2>POSTS</h2>
      <div className="TheirPosts">
        {theirPosts.map((val, index) => {
          return (
            <div key={index} className="Photo">
              <Image cloudName="kson" publicId={val.image} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default UserProfile;
