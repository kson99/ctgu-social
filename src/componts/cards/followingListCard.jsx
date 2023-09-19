import React, { useContext, useEffect, useState } from "react";
import { appContext, url } from "../../grobal/context";
import { Image } from "cloudinary-react";
import { BounceLoader } from "react-spinners";
import IonIcon from "@reacticons/ionicons";
import axios from "axios";
import AvatarCard from "./avatarCard";
import { useNavigate } from "react-router-dom";

const FollowingListCard = ({ _username }) => {
  const { user, users, reflesh, setReflesh } = useContext(appContext);
  const following = user.following ? eval(user.following) : null;
  const [loading, setLoading] = useState(false);
  const [person, setPerson] = useState({});
  const navigate = useNavigate();

  const amIFollowing = () => {
    let isfollowing = false;

    if (following?.includes(_username)) {
      isfollowing = true;
    }

    return isfollowing;
  };

  const addOrRemoveFollow = async (e) => {
    e.stopPropagation();
    setLoading(true);

    if (!amIFollowing()) {
      await axios
        .post(url + "/follow", {
          me: user.username,
          person: _username,
        })
        .then((res) => {
          setReflesh(reflesh + 1);
        });
    } else {
      await axios
        .post(url + "/unfollow", {
          me: user.username,
          person: _username,
        })
        .then((res) => {
          setReflesh(reflesh + 1);
        });
    }

    setLoading(false);
  };

  useEffect(() => {
    if (users) {
      setPerson(users.find(({ username }) => username === _username));
    }
  }, [users]);

  return (
    <div
      className="flex flex-row gap-x-[20px] justify-between cursor-pointer hover:bg-[rgba(255,255,255,.01)] py-[10px] rounded-[10px]"
      onClick={() => navigate(`/user/${person.username}`)}
    >
      <div className="flex flex-row gap-x-[20px]">
        <AvatarCard image={person.profilePicture} size={50} />

        <div>
          <p>{person.username}</p>
          <p className="text-[grey] text-[12px] pt-[5px]">{person.course}</p>
        </div>
      </div>

      <div
        className="w-[45px] h-[45px] flex items-center justify-center bg-[#252535] rounded-full cursor-pointer overflow-hidden hover:bg-[rgba(255,0,255,.15)]"
        onClick={addOrRemoveFollow}
      >
        {loading ? (
          <BounceLoader color="white" size={40} />
        ) : (
          <IonIcon
            name={
              amIFollowing() ? "person-remove-outline" : "person-add-outline"
            }
          />
        )}
      </div>
    </div>
  );
};

export default FollowingListCard;
