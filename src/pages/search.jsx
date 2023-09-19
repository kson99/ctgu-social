import React, { useContext } from "react";
import { useLocation, useParams } from "react-router-dom";
import { appContext } from "../grobal/context";
import { FollowingListCard } from "../componts";

const Search = () => {
  const { users } = useContext(appContext);
  const { search } = useParams();

  const results = () => {
    let array = [];

    users.map((_user) => {
      if ((_user?.username).toLowerCase().includes(search.toLowerCase())) {
        array.push(_user);
      }
    });

    return array;
  };

  return (
    <div>
      <div className="max-width">
        <div className="py-[10px] md:py-[30px]">
          <p className="text-[25px] text-[grey] font-[300]">
            Results for:{" "}
            <span className="text-white font-[600] tracking-[2px]">
              {search}
            </span>
          </p>

          <div>
            {results().map((user) => (
              <FollowingListCard _username={user.username} key={user.id} />
            ))}
            {results().length === 0 && (
              <p className="font-[800] tracking-[5px] text-[grey] text-center mt-[30px]">
                User Not found
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
