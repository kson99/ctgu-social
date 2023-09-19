import { Image } from "cloudinary-react";
import React from "react";

const ChatListCard = ({ profile, active, index }) => {
  return (
    <div
      className={`${
        active === index ? "bg-tertial" : "bg-[transparent]"
      } h-[60px] pl-[30px] flex flex-row items-center gap-x-[10px]`}
    >
      {profile?.profilePicture ? (
        <Image
          cloudName="kson"
          publicId={profile.profilePicture}
          className="h-[40px] w-[40px] rounded-full object-cover"
        />
      ) : (
        <img
          src="./avatar.png"
          alt=""
          className="h-[40px] w-[40px] rounded-full object-cover"
        />
      )}

      <p className="tracking-[1px]">{profile?.username}</p>
    </div>
  );
};

export default ChatListCard;
