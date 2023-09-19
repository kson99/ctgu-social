import { Image } from "cloudinary-react";
import React from "react";

const AvatarCard = ({ image, size }) => {
  return (
    <div
      style={{
        width: size,
        height: size,
        minWidth: size,
      }}
    >
      {image ? (
        <Image
          cloudName="kson"
          publicId={image}
          className="h-full w-full rounded-full object-cover"
        />
      ) : (
        <img
          src="/avatar.png"
          alt=""
          className="h-full w-full rounded-full object-cover"
        />
      )}
    </div>
  );
};

export default AvatarCard;
