import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deviceDetect } from "react-device-detect";
import { toast } from "react-toastify";
import axios from "axios";
import NProgress from "nprogress";

import { signUp } from "../../services/auth.service";
import SantaClaus from "../../assets/santa-claus.png";
import GoogleLogo from "../../assets/LogoGoogle.svg";
import BgAuth from "../../assets/bg-auth.png";
import EyeIcon from "../../assets/EyeIcon.svg";

function SignUp() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cfPassword, setCfPassword] = useState("");
  const [ipAddress, setIpAddress] = useState(null);
  const [deviceRegister, setDeviceRegister] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [imageName, setImageName] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowCfPassword, setIsShowCfPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    NProgress.start();

    fetchIpAddress();
    fetchDeviceDetect();

    NProgress.done();
  }, []);

  const fetchIpAddress = async () => {
    const res = await axios.get("https://api.ipify.org", {
      params: {
        format: "json",
      },
    });
    setIpAddress(res.data.ip);
  };

  const fetchDeviceDetect = async () => {
    const res = await deviceDetect();
    if (res.isMobile) {
      setDeviceRegister("Mobile");
    } else {
      setDeviceRegister("Desktop");
    }
  };

  const uploadImg = async () => {
    try {
      const formData = new FormData();
      formData.append("image", imageSrc);
      const apiKey = "dc602cd2409c2f9f06d21dc9f6b26502";
      const body = new FormData();
      body.set("key", apiKey);
      body.append("image", imageSrc);

      await axios({
        method: "post",
        url: "https://api.imgbb.com/1/upload",
        data: body,
      });
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleImage = (e) => {
    setImageSrc(e.target.files[0]);
    setImageName(e.target.files[0].name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userName) {
      toast.warn("User name is required");
      return;
    } else if (!email) {
      toast.warn("Email is required");
      return;
    } else if (!password) {
      toast.warn("Password is required");
      return;
    } else if (password.length < 6) {
      toast.warn("Password must have at least 6 characters");
      return;
    } else if (password.length > 32) {
      toast.warn("Password can not more than 32 characters");
      return;
    } else if (!cfPassword) {
    toast.warn("Password is required");
    return;
    } else if (cfPassword.length < 6) {
    toast.warn("Password must have at least 6 characters");
    return;
    } else if (cfPassword.length > 32) {
    toast.warn("Password can not more than 32 characters");
    return;
    } else if (cfPassword != password) {
      toast.warn("Confirm password no match!");
      return;
    } else if (!imageSrc) {
      toast.warn("Image is required");
      return;
    }

    const formData = new FormData();
    await uploadImg();
    formData.append("user_name", userName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("ip_register", ipAddress);
    formData.append("device_register", deviceRegister);
    formData.append("link_avatar", `https://i.ibb.co/vjVvZL5/${imageName}`);

    try {
      NProgress.start();
      const response = await signUp(formData);
      if (response.status === 200) {
        NProgress.done();
        if (response.data.message === "Account already exists!") {
          toast.warn(response.data.message);
          return;
        }
        toast.success(response.data.message);
        navigate("/signin");
      }
    } catch (error) {
      NProgress.done();
      console.log(error);
      toast.error("Register fail");
    }
  };

  const handleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };
  const handleShowCfPassword = () => {
    setIsShowCfPassword(!isShowCfPassword);
  };
  return (
    <div className="flex min-h-screen justify-center sm:relative">
      <img
        loading="lazy"
        srcSet={BgAuth}
        className="absolute object-cover object-top w-full sm:h-full"
        alt=""
      />
      <div className="relative flex items-center max-md:flex-col">
        <div>
          <img loading="lazy" srcSet={SantaClaus} alt="" />
        </div>
        <div>
          <div className="flex flex-col p-5 bg-white rounded-xl">
            <div className="text-3xl font-semibold text-gray-900">
              Get’s started.
            </div>
            <div className="mt-4 text-lg font-medium">
              <span className="text-gray-500 ">
                Already have an account? &nbsp;
              </span>
              <Link to={"/signin"} className="font-medium text-lime-800">
                Sign in
              </Link>
            </div>
           

            <div className="flex gap-3.5 mt-6 max-md:justify-center">
              <div className="bg-gray-200 flex lg:w-[230px] h-px my-auto" />
              <div className="text-lg text-gray-500"></div>
              <div className="bg-gray-200 flex lg:w-[230px] h-px my-auto" />
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mx-5 mt-6 max-md:mx-2.5">
                <label className="mb-2 text-base font-medium text-gray-900">
                  User Name
                </label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="User Name"
                  className="w-full py-4 pl-5 pr-12 text-base font-light text-gray-500 border border-gray-400 border-solid rounded-xl"
                />
              </div>

              <div className="mx-5 mt-6 max-md:mx-2.5">
                <label className="mb-2 text-base font-medium text-gray-900">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email@gmail.com"
                  className="w-full py-4 pl-5 pr-12 text-base font-light text-gray-500 border border-gray-400 border-solid rounded-xl"
                />
              </div>

              <div className="mx-5 mt-6 max-md:mx-2.5">
                <label className="mb-2 text-base font-medium text-gray-900">
                  Password
                </label>
                <div className="relative">
                  {isShowPassword == false ? (
                    <>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="**********"
                        className="w-full py-4 pl-5 pr-12 text-base font-light text-gray-500 border border-gray-400 border-solid rounded-xl"
                      />
                      <img
                        loading="lazy"
                        src={EyeIcon}
                        className="absolute translate-y-1/2 right-4 bottom-1/2"
                        alt=""
                        onClick={() => handleShowPassword()}
                      />
                    </>
                  ) : (
                    <>
                      <input
                        type="text"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="**********"
                        className="w-full py-4 pl-5 pr-12 text-base font-light text-gray-500 border border-gray-400 border-solid rounded-xl"
                      />
                      <img
                        loading="lazy"
                        src={EyeIcon}
                        className="absolute translate-y-1/2 right-4 bottom-1/2"
                        alt=""
                        onClick={() => handleShowPassword()}
                      />
                    </>
                  )}
                </div>
              </div>
              <div className="mx-5 mt-6 max-md:mx-2.5">
                <label className="mb-2 text-base font-medium text-gray-900">
                  Confirm Password
                </label>
                <div className="relative">
                  {isShowCfPassword == false ? (
                    <>
                      <input
                        type="password"
                        value={cfPassword}
                        onChange={(e) => setCfPassword(e.target.value)}
                        placeholder="**********"
                        className="w-full py-4 pl-5 pr-12 text-base font-light text-gray-500 border border-gray-400 border-solid rounded-xl"
                      />
                      <img
                        loading="lazy"
                        src={EyeIcon}
                        className="absolute translate-y-1/2 right-4 bottom-1/2"
                        alt=""
                        onClick={() => handleShowCfPassword()}
                      />
                    </>
                  ) : (
                    <>
                      <input
                        type="text"
                        value={cfPassword}
                        onChange={(e) => setCfPassword(e.target.value)}
                        placeholder="**********"
                        className="w-full py-4 pl-5 pr-12 text-base font-light text-gray-500 border border-gray-400 border-solid rounded-xl"
                      />
                      <img
                        loading="lazy"
                        src={EyeIcon}
                        className="absolute translate-y-1/2 right-4 bottom-1/2"
                        alt=""
                        onClick={() => handleShowCfPassword()}
                      />
                    </>
                  )}
                </div>
              </div>
              <div className="mx-5 mt-6 max-md:mx-2.5">
                <label className="mb-2 text-base font-medium text-gray-900">
                  Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImage}
                  className="w-full py-4 pl-5 pr-12 text-base font-light text-gray-500 border border-gray-400 border-solid rounded-xl"
                />
              </div>

              <div className="mx-5 max-md:mx-2.5">
                <button
                  type="submit"
                  className="text-rose-100 text-xl text-center font-semibold w-full bg-red-400 mt-[30px] px-16 py-5 rounded-xl"
                >
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
