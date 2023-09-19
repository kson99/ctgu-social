import React, { useContext, useEffect, useState } from "react";
import { AvatarCard, FollowingListCard, PostCard } from "../componts";
import { useNavigate, useParams } from "react-router-dom";
import { appContext, url } from "../grobal/context";
import axios from "axios";
import { BeatLoader } from "react-spinners";
import IonIcon from "@reacticons/ionicons";

const Profile = () => {
  const { user, users, posts, reflesh, setReflesh } = useContext(appContext);
  const { _username } = useParams();
  const navigate = useNavigate();

  const [person, setPerson] = useState({});
  const [showFollowing, setShowFollowing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingImg, setLoadingImg] = useState(false);

  const following = eval(person?.following) || [];
  const followers = eval(person?.followers) || [];

  const getPosts = () => {
    let array = [];

    posts.map((post) => {
      if (post.username === person?.username) {
        array.push(post);
      }
    });

    return array;
  };

  const amIFollowing = () => {
    let isfollowing = false;
    let meFollowing = eval(user?.following) || [];

    if (meFollowing.includes(person?.username)) {
      isfollowing = true;
    }

    return isfollowing;
  };

  const addOrRemoveFollow = async () => {
    setLoading(true);

    if (!amIFollowing()) {
      await axios
        .post(url + "/follow", {
          me: user.username,
          person: person.username,
        })
        .then((res) => {
          setReflesh(reflesh + 1);
        });
    } else {
      await axios
        .post(url + "/unfollow", {
          me: user.username,
          person: person.username,
        })
        .then((res) => {
          setReflesh(reflesh + 1);
        });
    }

    setLoading(false);
  };

  const uploadProPic = async (e) => {
    setLoadingImg(true);
    let image = e.target.files[0];

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "vkmpeofq");

    await axios
      .post("https://api.cloudinary.com/v1_1/kson/image/upload", formData)
      .then((response) => {
        const filename = response.data.public_id;

        axios
          .post(url + "/upload/proPic", {
            image: filename,
            username: user.username,
          })
          .then(() => {
            setReflesh(reflesh + 1);
          });
      });

    setLoadingImg(false);
  };

  useEffect(() => {
    if (users) {
      setPerson(users.find(({ username }) => username === _username));
    }
  }, [users]);

  return (
    <div>
      <div className="max-width">
        <div className="flex flex-row py-[30px] flex-wrap gap-[30px] justify-around">
          {/* Profile Card */}
          <div className="flex-1 relative flex flex-col gap-[20px]">
            <div className="md:sticky top-[30px] flex w-full flex-col p-[30px] bg-primary h-fit rounded-[10px] gap-[20px]">
              <div className="flex flex-row justify-between w-full gap-[30px] items-center">
                <div>
                  <AvatarCard image={person?.profilePicture} size={80} />
                </div>

                <div className="w-full flex flex-row gap-[20px] justify-around">
                  {[
                    { count: getPosts(), name: "Posts" },
                    {
                      count: followers,
                      name: "Followers",
                    },
                    {
                      count: following,
                      name: "Following",
                    },
                  ].map((item) => (
                    <div
                      key={item.name}
                      className="text-center"
                      // onClick={() => {
                      //   if (item.name.includes("Follow")) {
                      //     navigate(`/user/${_username}/follows`);
                      //   }
                      // }}
                    >
                      <b className="text-[18px]">{item.count.length}</b>
                      <p className="font-[100] text-[14px]">{item.name}</p>
                    </div>
                  ))}
                </div>
              </div>

              <p className="font-[700] tracking-[2px]">
                {person?.username}
                <span className="font-[100]">{" - " + person?.stNumber}</span>
              </p>

              <div>
                {[
                  {
                    name: "Course",
                    value: person?.course,
                  },
                  {
                    name: "College",
                    value: person?.college,
                  },
                  {
                    name: "Nationality",
                    value: person?.nationality,
                  },
                ].map((item, _i) => (
                  <div key={_i} className="flex flex-row gap-[10px]">
                    <p className="font-[100]">{item.name}: </p>
                    <p>{item.value || "-"}</p>
                  </div>
                ))}
              </div>

              {user?.username === person?.username ? (
                // My profile

                <div className="flex flex-row flex-wrap justify-around items-center gap-[20px]">
                  <button
                    className="px-[20px] py-[7px] bg-tertial rounded-[10px]"
                    onClick={() => {
                      localStorage.clear();
                      window.location.reload();
                      navigate("/");
                    }}
                  >
                    Logout
                  </button>

                  <button
                    onClick={() => setShowFollowing(!showFollowing)}
                    className="px-[20px] py-[7px] bg-tertial rounded-[10px]"
                  >
                    Following {showFollowing ? "▼" : "▶︎"}
                  </button>

                  <label htmlFor="imageUp">
                    <input
                      type="file"
                      accept="image/*"
                      name="image"
                      id="imageUp"
                      onChange={uploadProPic}
                      className="hidden"
                    />
                    <span className="px-[20px] py-[7px] bg-tertial rounded-[10px] cursor-pointer whitespace-nowrap">
                      {loadingImg ? (
                        <BeatLoader color="white" size={16} />
                      ) : (
                        "Change Profile Picture"
                      )}
                    </span>
                  </label>
                </div>
              ) : (
                // Other Users Profile
                <div className="flex flex-row justify-around">
                  <button
                    className="px-[20px] py-[7px] bg-tertial rounded-[10px]"
                    onClick={addOrRemoveFollow}
                  >
                    {loading ? (
                      <BeatLoader color="white" size={10} />
                    ) : amIFollowing() ? (
                      "Unfollow"
                    ) : (
                      "Follow"
                    )}
                  </button>

                  <button
                    className="px-[20px] py-[7px] bg-tertial rounded-[10px]"
                    onClick={() => {
                      navigate("/chats", { state: { _user: person } });
                    }}
                  >
                    Message
                  </button>
                </div>
              )}
            </div>

            {user?.username === person?.username && showFollowing && (
              <div className="md:sticky flex flex-col rounded-[10px] p-[15px] bg-primary gap-y-[20px]">
                <div className="flex flex-row justify-between items-center ">
                  <p>Following</p>
                </div>

                <div className="h-[2px] w-full bg-tertial" />

                <div className="flex flex-col gap-y-[5px]">
                  {following?.length > 0 &&
                    following.map((username) => (
                      <FollowingListCard _username={username} key={username} />
                    ))}
                </div>
              </div>
            )}
          </div>

          {/*User Posts */}
          <div className="flex-1 flex flex-col gap-y-[30px]">
            {getPosts().length > 0 ? (
              getPosts().map((post) => <PostCard post={post} key={post.id} />)
            ) : (
              <p className="font-[800] tracking-[5px] text-[grey] text-center mt-[30px]">
                No posts found
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
