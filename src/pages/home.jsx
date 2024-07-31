import React, { useContext } from "react";
import { appContext } from "../grobal/context";
import {
  FollowingListCard,
  PostCard,
  ProfileCard,
  WhatsOnYourMindCard,
} from "../componts";

const Home = () => {
  const { posts, user } = useContext(appContext);
  const following = user.following ? JSON.parse(user.following) : null;

  return (
    <div>
      <div className="max-width">
        <div className="home-cont flex flex-row flex-wrap justify-around gap-[40px] py-[30px]">
          <div className="flex-[0.3] hidden sm:flex flex-col gap-y-[30px]">
            {/* Profile card */}
            <ProfileCard />

            {/* Friends List */}
            <div className="flex flex-col rounded-[10px] p-[15px] bg-primary gap-y-[20px]">
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
          </div>

          {/* Posts */}
          <div className="posts flex-1 sm:flex-[0.7] lg:flex-[0.4] w-full flex flex-col gap-y-[40px]">
            <WhatsOnYourMindCard />

            <div className="flex flex-col gap-y-[30px]">
              {posts.length > 0 &&
                posts.map((post) => <PostCard post={post} key={post.id} />)}
            </div>
          </div>

          {/* Others */}
          <div className="hidden lg:flex flex-col gap-[30px] others flex-[0.3] ">
            <div className="bg-primary p-[15px] rounded-[10px] flex flex-col gap-y-[20px]">
              <div className="flex flex-row justify-between items-center">
                <h2>Sponsored</h2>
                <p>create Ad</p>
              </div>

              <img src="/ad-sec.jpeg" alt="" className="rounded-[5px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
