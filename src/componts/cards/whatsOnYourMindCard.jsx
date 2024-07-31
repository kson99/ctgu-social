import IonIcon from "@reacticons/ionicons";
import { Image } from "cloudinary-react";
import React, { useContext, useState } from "react";
import { appContext, url } from "../../grobal/context";
import axios from "axios";
import { BeatLoader } from "react-spinners";
import AvatarCard from "./avatarCard";

const WhatsOnYourMindCard = () => {
  const { user, reflesh, setReflesh } = useContext(appContext);
  const [image, setImage] = useState([]);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);

  const upload = async (e) => {
    e.preventDefault();

    if (caption.trim() !== "") {
      setLoading(true);

      if (image.length === 0) {
        const filename = "";

        await axios
          .post(url + "/upload", {
            caption: caption,
            image: filename,
            username: user.username,
          })
          .then(() => {
            window.location.reload();
          });
      } else {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "iat5gtdf");

        await axios
          .post("https://api.cloudinary.com/v1_1/kson/image/upload", formData)
          .then(async (response) => {
            const filename = response.data.public_id;

            await axios
              .post(url + "/upload", {
                caption: caption,
                image: filename,
                username: user.username,
              })
              .then(() => {
                setReflesh(reflesh + 1);
              });
          });
      }
    }

    setCaption("");
    setImage([]);
    setLoading(false);
  };

  return (
    <form
      onSubmit={upload}
      className="w-full rounded-[10px] px-[15px] py-[20px] bg-primary flex flex-col gap-y-[20px]"
    >
      <div className="flex flex-row gap-x-[20px]">
        <AvatarCard image={user.profilePicture} size={50} />

        <div className="w-full bg-tertial rounded-[25px] px-[20px] flex items-center justify-center">
          <textarea
            type="text"
            name="post"
            rows={1}
            className="w-full bg-transparent outline-none border-none resize-none"
            placeholder="Whats on your mind..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            required
          />
        </div>
      </div>

      {image.length != 0 && (
        <div className="relative">
          <img
            src={URL.createObjectURL(image)}
            alt=""
            className="rounded-[10px] w-full h-auto"
          />
          <IonIcon
            name="close-circle"
            className="text-[red] text-[25px] absolute right-[-10px] top-[-10px]"
            onClick={() => setImage([])}
          />
        </div>
      )}

      <div className="h-[2px] w-full bg-tertial" />

      <div className="flex flex-row items-center justify-between mt-[-5px]">
        <label
          htmlFor="imageUp"
          className="flex flex-row items-center gap-x-[5px]"
        >
          <IonIcon name="image-outline" className="text-[30px]" />
          <p>Image</p>
          <input
            type="file"
            accept="image/*"
            name="image"
            id="imageUp"
            onChange={(e) => setImage(e.target.files[0])}
            className="hidden"
          />
        </label>

        <button
          type="submit"
          className="px-[20px] py-[5px] bg-tertial rounded-[25px]"
        >
          {loading ? <BeatLoader color="white" /> : "Post"}
        </button>
      </div>
    </form>
  );
};

export default WhatsOnYourMindCard;
