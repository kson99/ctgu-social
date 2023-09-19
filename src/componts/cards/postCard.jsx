import IonIcon from "@reacticons/ionicons";
import { Image } from "cloudinary-react";
import React, { useContext, useState } from "react";
import { appContext, url } from "../../grobal/context";
import axios from "axios";
import { BeatLoader, BounceLoader } from "react-spinners";
import AvatarCard from "./avatarCard";
import { useNavigate } from "react-router-dom";

const PostCard = ({ post }) => {
  const { user, reflesh, setReflesh } = useContext(appContext);
  const following = user.following ? eval(user.following) : null;
  const liking = post.likes ? eval(post.likes) : null;
  const [loading, setLoading] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);
  const [isdelete, setIsDelete] = useState(false);
  const [comments, setComments] = useState(false);
  const [comment, setComment] = useState("");
  const [commentLoading, setCommentLoading] = useState(false);
  const navigate = useNavigate();

  const amIFollowing = () => {
    let isfollowing = false;

    if (following?.includes(post.username)) {
      isfollowing = true;
    }

    return isfollowing;
  };

  const didILike = () => {
    let isLike = false;

    if (liking?.includes(user?.username)) {
      isLike = true;
    }

    return isLike;
  };

  const addOrRemoveFollow = async () => {
    setLoading(true);

    if (!amIFollowing()) {
      await axios
        .post(url + "/follow", {
          me: user.username,
          person: post.username,
        })
        .then((res) => {
          setReflesh(reflesh + 1);
        });
    } else {
      await axios
        .post(url + "/unfollow", {
          me: user.username,
          person: post.username,
        })
        .then((res) => {
          setReflesh(reflesh + 1);
        });
    }

    setLoading(false);
  };

  const addOrRemoveLike = async () => {
    setLikeLoading(true);

    if (didILike()) {
      await axios
        .post(url + "/upload/unlike", {
          person: user.username,
          postId: post.id,
        })
        .then((res) => {
          setReflesh(reflesh + 1);
        });
    } else {
      await axios
        .post(url + "/upload/like", {
          person: user.username,
          postId: post.id,
        })
        .then((res) => {
          setReflesh(reflesh + 1);
        });
    }

    setLikeLoading(false);
  };

  const deletePost = async () => {
    setIsDelete(false);
    setLoading(true);

    await axios
      .post(url + "/upload/delete", { postId: post.id })
      .then((res) => {
        setReflesh(reflesh + 1);
      });

    setLoading(false);
  };

  const submitComment = async (e) => {
    e.preventDefault();
    setCommentLoading(true);

    await axios
      .post(url + "/upload/comment", {
        person: user.username,
        comment,
        postId: post.id,
      })
      .then((res) => {
        setReflesh(reflesh + 1);
        setComment("");
      });

    setCommentLoading(false);
  };

  return (
    <div className="min-w-[300px] bg-primary flex flex-col gap-y-[10px] p-[15px] rounded-[10px] relative overflow-hidden">
      <div className="w-full flex flex-row items-center justify-between">
        {/* Header */}
        <div
          className="flex flex-row gap-x-[10px] items-center hover:cursor-pointer"
          onClick={() => navigate(`/user/${post.username}`)}
        >
          <AvatarCard image={post.profilePicture} size={50} />

          <p>{post.username}</p>
        </div>

        {/* Befirend */}
        {post.username != user.username ? (
          <div
            className="w-[45px] h-[45px] flex items-center justify-center bg-[#252535] rounded-full cursor-pointer overflow-hidden hover:bg-[rgba(255,0,255,.15)]"
            onClick={addOrRemoveFollow}
          >
            {loading ? (
              <BounceLoader color="white" size={40} />
            ) : (
              <IonIcon
                name={
                  amIFollowing()
                    ? "person-remove-outline"
                    : "person-add-outline"
                }
              />
            )}
          </div>
        ) : (
          // Deleting post
          <div
            className="w-[45px] h-[45px] flex items-center justify-center bg-[#252535] rounded-full cursor-pointer"
            onClick={() => setIsDelete(true)}
          >
            {loading ? (
              <BounceLoader color="white" size={40} />
            ) : (
              <IonIcon name="trash-outline" className="" />
            )}
          </div>
        )}
      </div>

      {/* Caption */}
      <p className="whitespace-pre-wrap">{post.caption}</p>

      {/* Post image */}
      {post.image != "" && (
        <Image
          cloudName="kson"
          publicId={post.image}
          className="w-full h-auto object-contain rounded-[5px]"
        />
      )}

      {/* Interactions // Like //Comment */}
      <div className=" flex flex-row gap-x-[15px] items-center">
        {/* Liking */}
        {likeLoading ? (
          <BounceLoader color="white" size={15} />
        ) : (
          <div className="flex flex-row gap-x-[5px] items-center">
            <IonIcon
              name={didILike() ? "heart" : "heart-outline"}
              className="text-[20px]"
              onClick={addOrRemoveLike}
            />
            <p className="text-[12px]">{eval(post.likes)?.length || 0}</p>
          </div>
        )}

        {/* Comment */}
        <div className="flex flex-row gap-x-[5px] items-center">
          <IonIcon
            name={comments ? "chatbox" : "chatbox-outline"}
            className="text-[20px]"
            onClick={() => setComments(!comments)}
          />
          <p className="text-[12px]">{eval(post.comments)?.length || 0}</p>
        </div>
      </div>

      {/* Commentas display */}
      {comments && (
        <div>
          {eval(post.comments)?.map((comment, _i) => (
            <div className="flex flex-row gap-x-[7px] px-[10px]" key={_i}>
              <p className="font-[600] text-[13px] text-[grey]">
                {comment.username}:
              </p>
              <p className="text-[13px] font-[200] tracking-[1px]">
                {comment.comment}
              </p>
            </div>
          ))}
        </div>
      )}

      <form
        onSubmit={submitComment}
        className="flex flex-row items-center gap-[10px]"
      >
        <AvatarCard image={user.profilePicture} size={30} />

        {commentLoading ? (
          <BeatLoader color="white" size={10} />
        ) : (
          <input
            name="comment"
            required
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
            className="w-full py-[5px] px-[10px] rounded-[10px] bg-transparent outline-none"
          />
        )}
      </form>

      {/* Cornfirm delete post */}
      {isdelete && (
        <div className="absolute w-full h-full top-0 left-0 bg-primary flex flex-col items-center justify-center gap-y-[20px]">
          <h2>Are you sure you want to delete this post?</h2>
          <div className="flex flex-row gap-x-[20px]">
            <button
              onClick={() => setIsDelete(false)}
              className="px-[10px] py-[7px] bg-tertial rounded-[10px] font-[600]"
            >
              Cancel
            </button>
            <button
              onClick={deletePost}
              className="px-[10px] py-[7px] bg-red-500 rounded-[10px] font-[600]"
            >
              Yes, delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;
