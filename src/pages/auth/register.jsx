import axios from "axios";
import React, { useState } from "react";
import { BeatLoader } from "react-spinners";
import { v4 as uuid } from "uuid";
import { url } from "../../grobal/context";
import { useNavigate } from "react-router-dom";
import { countries } from "../../constants";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    stNumber: "",
    college: "",
    course: "",
    nationality: "",
    password: "",
  });

  const navigate = useNavigate();
  const userId = uuid();

  const register = (e) => {
    e.preventDefault();
    setLoading(true);

    axios
      .post(url + "/user/register", {
        ...formData,
        userId,
      })
      .then((res) => {
        setFormData({
          username: "",
          stNumber: "",
          college: "",
          course: "",
          nationality: "",
          password: "",
        });

        navigate("/");
      });

    setLoading(false);
  };

  const fieldChangeHandler = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="relative bg-[url(/CTGU1.jpeg)] bg-no-repeat bg-cover bg-center after:absolute after:left-0 after:top-0 after:content-[''] after:bg-[rgba(0,0,0,0.7)] after:w-full after:h-full">
      <div className="max-width flex justify-center items-center min-h-[calc(100vh-80px)]">
        <form
          onSubmit={register}
          className="flex flex-col p-[30px] bg-primary min-w-[300px] mt-[-80px] rounded-[10px] items-center gap-y-[20px] z-[1]"
        >
          <h1 className="text-[22px] tracking-[2px] font-[700]">
            Sign Up for CTGU Social
          </h1>

          <input
            type="text"
            name="username"
            placeholder="Username"
            required
            value={formData.username}
            onChange={fieldChangeHandler}
            className="w-[250px] bg-[rgba(255,255,255,0.05)] px-[15px] py-[10px] rounded-[10px] outline-none border-none "
          />

          <input
            type="number"
            name="stNumber"
            placeholder="Student Number"
            required
            value={formData.stNumber}
            onChange={fieldChangeHandler}
            className="w-[250px] bg-[rgba(255,255,255,0.05)] px-[15px] py-[10px] rounded-[10px] outline-none border-none "
          />

          <input
            type="text"
            name="college"
            placeholder="College"
            required
            value={formData.college}
            onChange={fieldChangeHandler}
            className="w-[250px] bg-[rgba(255,255,255,0.05)] px-[15px] py-[10px] rounded-[10px] outline-none border-none "
          />

          <input
            type="text"
            name="course"
            placeholder="Course"
            required
            value={formData.course}
            onChange={fieldChangeHandler}
            className="w-[250px] bg-[rgba(255,255,255,0.05)] px-[15px] py-[10px] rounded-[10px] outline-none border-none "
          />

          <select
            name="nationality"
            className="w-[250px] bg-[rgba(255,255,255,0.05)] px-[15px] py-[10px] rounded-[10px] outline-none border-none appearance-none"
            value={formData.nationality}
            onChange={fieldChangeHandler}
          >
            <option value="">Select Country</option>
            {countries.map((country) => (
              <option key={country.Code} value={country.Name}>
                {country.Name}
              </option>
            ))}
          </select>

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={fieldChangeHandler}
            className="w-[250px] bg-[rgba(255,255,255,0.05)] px-[15px] py-[10px] rounded-[10px] outline-none border-none "
          />

          <button
            type="submin"
            className="bg-tertial rounded-[15px] w-fit px-[20px] py-[7px] "
          >
            {loading ? <BeatLoader color="white" /> : "Register"}
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

export default Register;
