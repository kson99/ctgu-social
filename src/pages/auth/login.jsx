import axios from "axios";
import React, { useContext, useState } from "react";
import { appContext, url } from "../../grobal/context";
import { BeatLoader } from "react-spinners";

const Login = () => {
  const { setToken, setUser } = useContext(appContext);

  const [loading, setLoading] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [formData, setFormData] = useState({
    stNumber: "",
    password: "",
  });

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);

    await axios
      .post(url + "/user/login", {
        stNumber: formData.stNumber,
        password: formData.password,
      })
      .then((res) => {
        if (res.data.token) {
          setToken(res.data.token);
          setUser(res.data.user);

          localStorage.setItem("loggedIn", true);
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.user));

          setFormData({
            stNumber: "",
            password: "",
          });

          window.location.reload();
        } else {
          setErrMessage(res.data.message);
        }
      });

    setLoading(false);
  };

  const fieldChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="relative bg-[url(/CTGU.jpeg)] bg-no-repeat bg-cover bg-center after:absolute after:left-0 after:top-0 after:content-[''] after:bg-[rgba(0,0,0,0.7)] after:w-full after:h-full">
      <div className="max-width flex justify-center items-center h-[calc(100vh-80px)]">
        <form
          onSubmit={login}
          className="flex flex-col p-[30px] bg-primary min-w-[300px] mt-[-80px] rounded-[10px] items-center gap-y-[20px] z-[1]"
        >
          <h1 className="text-[22px] tracking-[2px] font-[700]">
            Log Into CTGU Social
          </h1>

          <input
            type="number"
            name="stNumber"
            placeholder="Student Number"
            required
            value={formData.stNumber}
            onChange={fieldChangeHandler}
            className="bg-[rgba(255,255,255,0.05)] px-[15px] py-[10px] rounded-[10px] outline-none border-none "
          />

          <input
            type="password"
            name="password"
            placeholder="password"
            required
            value={formData.password}
            onChange={fieldChangeHandler}
            className="bg-[rgba(255,255,255,0.05)] px-[15px] py-[10px] rounded-[10px] outline-none border-none"
          />

          <button
            type="submin"
            className="bg-tertial rounded-[15px] w-fit px-[20px] py-[7px] "
          >
            {loading ? <BeatLoader color="white" /> : "Login"}
          </button>

          <p
            className={`${
              errMessage.length === 0 ? "hidden" : "block"
            } text-red-500 text-[16px]`}
          >
            {errMessage}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
