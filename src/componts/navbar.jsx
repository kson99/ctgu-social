import IonIcon from "@reacticons/ionicons";
import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { appContext } from "../grobal/context";
import { menuOptions } from "../constants";
import AvatarCard from "./cards/avatarCard";

const Navbar = () => {
  const { token, user } = useContext(appContext);
  const [active, setActive] = useState(false);
  const [isMenu, setIsMenu] = useState(false);
  const [searchText, setSearchText] = useState("");
  const { pathname } = useLocation();
  const navigate = useNavigate();

  window.addEventListener("click", () => {
    setActive(false);
  });

  const searchSubmit = (e) => {
    e.preventDefault();

    if (searchText.trim() != "") {
      navigate(`/search/${searchText}`);
      setSearchText("");
    }
  };

  useEffect(() => {
    setIsMenu(false);
  }, [pathname]);

  return (
    <div className="bg-primary relative">
      <div className="max-width">
        {token != "" ? (
          <div className="nav h-[80px] flex flex-row justify-between items-center">
            <Link
              to="/"
              className="logo flex flex-row gap-x-[10px] items-center"
            >
              <img src="/logo.png" alt="" className="w-[55px] h-[55px]" />
              <p className="font-[700] tracking-[2px]">Social</p>
            </Link>

            <form
              onSubmit={searchSubmit}
              className="hidden search md:flex flex-row items-center bg-tertial py-[10px] px-[20px] rounded-[10px]"
            >
              <input
                type="text"
                name="search"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                required
                placeholder="search..."
                className="bg-[transparent] outline-none border-none"
              />
              <IonIcon name="search" />
            </form>

            <ul className="hidden  md:flex flex-row gap-x-[20px] items-center">
              {/* <div>
                <IonIcon
                  name="moon"
                  className="text-[20px] pt-[5px] px-[5px]"
                />
              </div> */}

              {menuOptions.map((menu) => (
                <Link key={menu.name} to={`/${menu.name}`}>
                  <IonIcon
                    name={menu.dark}
                    className="text-[20px] pt-[5px] px-[5px]"
                  />
                </Link>
              ))}

              <div
                className="relative bg-tertial py-[10px] px-[20px] rounded-[10px] flex flex-row items-center gap-x-[5px] cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setActive(!active);
                }}
              >
                <p>{user.username}</p>
                <IonIcon name="caret-down" />

                {active && (
                  <div
                    className="absolute right-0  bottom-0 mb-[-20px] px-[30px] pt-[20px] bg-tertial rounded-[10px] translate-y-[100%] flex flex-col items-center z-[9999999]"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <AvatarCard image={user.profilePicture} size={60} />

                    <div className="h-[1px] w-full bg-[#404040] mt-[20px]" />

                    <div
                      className="w-full py-[10px] flex flex-row items-center cursor-pointer hover:text-[cornflowerblue]"
                      onClick={() => {
                        localStorage.clear();
                        window.location.reload();
                        navigate("/");
                      }}
                    >
                      <IonIcon name="log-out-outline" className="text-[20px]" />
                      <p>Logout</p>
                    </div>
                  </div>
                )}
              </div>
            </ul>

            <div className="relative block md:hidden">
              <IonIcon
                name={isMenu ? "close" : "menu"}
                className="text-[40px]"
                onClick={() => setIsMenu(!isMenu)}
              />

              {isMenu && (
                <div className="px-[30px] py-[20px] bg-primary rounded-[10px] absolute bottom-0 right-0 translate-y-[100%] mb-[-10px] z-[99999999] flex flex-col gap-[15px] whitespace-nowrap border-[2px] border-tertial">
                  <form
                    onSubmit={searchSubmit}
                    className="flex flex-row items-center bg-tertial py-[10px] px-[20px] rounded-[10px]"
                  >
                    <input
                      type="text"
                      name="search"
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                      required
                      placeholder="Search..."
                      className="bg-[transparent] outline-none border-none"
                    />
                    <IonIcon name="search" />
                  </form>

                  <Link
                    to={`/user/${user.username}`}
                    className="flex flex-row "
                  >
                    <AvatarCard image={user.profilePicture} size={30} />

                    <button className="px-[20px] py-[5px] rounded-[10px]">
                      {user.username}
                    </button>
                  </Link>

                  <div className="h-[2px] w-full bg-tertial rounded-[5px]" />

                  <Link
                    to="/chats"
                    className="flex flex-row items-center gap-[10px]"
                  >
                    <IonIcon name="chatbox-ellipses" className="text-[30px]" />
                    <p>Messages</p>
                  </Link>

                  <div className="h-[2px] w-full bg-tertial rounded-[5px]" />

                  <button
                    className="flex flex-row items-center gap-[10px]"
                    onClick={() => {
                      localStorage.clear();
                      window.location.reload();
                      navigate("/");
                    }}
                  >
                    <IonIcon name="log-out-outline" className="text-[30px]" />
                    <p>Logout</p>
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="h-[80px] flex flex-row justify-center items-center gap-x-[30px]">
            <Link
              to="/"
              className={pathname === "/" ? "text-[cornflowerblue]" : "white"}
            >
              Login
            </Link>

            <Link
              to="/register"
              className={
                pathname === "/register" ? "text-[cornflowerblue]" : "white"
              }
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
