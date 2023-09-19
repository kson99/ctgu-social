import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { appContext } from "../grobal/context";
import { FollowingListCard } from "../componts";

const Follows = () => {
  const { users } = useContext(appContext);

  const [person, setPerson] = useState({});
  const tabs = ["Mutual", "Following", "Followers"];
  const [activeTab, setActiveTab] = useState(tabs[1]);
  const { pathname } = useLocation();
  const _username = pathname.split("/")[2];

  const tabSwitch = () => {
    switch (activeTab) {
      case tabs[0]:
        break;
      case tabs[1]:
        return eval(person?.following)?.map((username) => (
          <FollowingListCard _username={username} key={username} />
        ));
        break;
      case tabs[2]:
        break;
      default:
    }
  };

  useEffect(() => {
    if (users) {
      setPerson(users.find(({ username }) => username === _username));
    }
  }, [users]);

  return (
    <div>
      <div className="max-width">
        <div className="py-[10px] md:py-[30px]">
          {/* Tabs */}
          <div className="flex flex-row justify-center gap-[10px] border-b-[1px] border-b-primary">
            {tabs.map((tab) => (
              <p
                className={`${
                  activeTab === tab
                    ? "font-[900] border-b-tertial border-b-[3px]"
                    : "text-white"
                } p-[10px] tracking-[2px] cursor-pointer font-[200]`}
                key={tab}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </p>
            ))}
          </div>

          <div className=" p-[20px]">{tabSwitch()}</div>
        </div>
      </div>
    </div>
  );
};

export default Follows;
