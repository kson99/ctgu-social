import { Image } from "cloudinary-react";
import React, { useContext } from "react";
import { appContext } from "../../grobal/context";
import IonIcon from "@reacticons/ionicons";
import AvatarCard from "./avatarCard";
import { useNavigate } from "react-router-dom";

const ProfileCard = () => {
  const { user } = useContext(appContext);
  const followers = user.followers ? JSON.parse(user.followers) : null;
  const following = user.following ? JSON.parse(user.following) : null;
  const navigate = useNavigate();

  return (
    <div className="bg-primary px-[15px] py-[20px] rounded-[10px] flex flex-col gap-y-[20px]">
      <div className="flex flex-row gap-x-[20px] justify-between">
        <div className="flex flex-row gap-x-[20px]">
          <div>
            <AvatarCard image={user.profilePicture} size={50} />
          </div>

          <div>
            <p>{user.username}</p>
            <p className="text-[grey] text-[12px] pt-[5px]">{user.stNumber}</p>
          </div>
        </div>

        <div
          className="w-[45px] h-[45px] flex justify-center items-center bg-[#252535] rounded-full cursor-pointer"
          onClick={() => navigate(`/user/${user.username}`)}
        >
          <IonIcon name="settings-outline" />
        </div>
      </div>

      <div className="h-[2px] w-full bg-tertial" />

      <div className="flex flex-col gap-y-[15px]">
        <div className="flex flex-row gap-x-[20px] items-center">
          <IonIcon name="flag-outline" />
          <p className="text-[grey] text-[14px]">{user.nationality}</p>
        </div>

        <div className="flex flex-row gap-x-[20px] items-center">
          <IonIcon name="briefcase-outline" />
          <p className="text-[grey] text-[14px]">{user.course}</p>
        </div>
      </div>

      <div className="h-[2px] w-full bg-tertial" />

      <div className="flex flex-col gap-y-[5px] text-[darkgray] text-[10px]">
        <div className="flex flex-row justify-between text-[14px] items-center gap-y-[15px]">
          <p>Followers</p>
          <p className="text-[cornflowerblue]">
            {followers ? followers.length : 0}
          </p>
        </div>

        <div className="flex flex-row justify-between text-[14px] items-center">
          <p>Following</p>
          <p className="text-[cornflowerblue]">
            {following ? following.length : 0}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
