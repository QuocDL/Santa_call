import axios from "axios";
import NProgress from "nprogress";
import { useEffect, useState } from "react";
import { deviceDetect } from "react-device-detect";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import UserIcon from "../../assets/UserIcon.png";
import MailIocon from "../../assets/MailIcon.png";
import LockIcon from "../../assets/LockIcon.png";
import BgAuth from "../../assets/nen2-100.png";
import { signUp } from "../../services/auth.service";
import GoogleLogo from "../../assets/LogoGoogle.svg";
import AvatarIcon from "../../assets/AvatarChooseIcon.png";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../../Validator/AuthValidate";
function SignUp() {
  const [ipAddress, setIpAddress] = useState(null);
  const [deviceRegister, setDeviceRegister] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [imageName, setImageName] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      user_name: "",
      password: "",
      email: "",
      confirmPassword: "",
      acp: false,
    },
  });
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
  useEffect(() => {
    NProgress.start();
    fetchIpAddress();
    fetchDeviceDetect();
    NProgress.done();
  }, []);
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

  const submitData = async (data) => {
    if (!imageSrc) {
      toast.warn("Image is required");
      return;
    }
    const formData = new FormData();
    await uploadImg();
    formData.append("user_name", data.user_name);
    formData.append("email", data.email);
    formData.append("password", data.password);
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
          <div className="flex flex-col p-5 bg-white rounded-xl">
            <h1 className="text-2xl text-[#CF3736] text-center font-semibold mt-2">
              Sign Up
            </h1>

            <form
              onSubmit={handleSubmit(submitData)}
              className="xl:w-[35vw] mt-6"
            >
              <div className="mx-4 mt-6 max-md:mx-2.5">
                <div className="flex rounded-lg  border border-gray-400 border-solid overflow-hidden">
                  <div className="bg-[#000000] px-2 flex items-center">
                    <img src={UserIcon} alt="" />
                  </div>
                  <input
                    type="text"
                    {...register("user_name")}
                    placeholder="UserName"
                    className=" py-4 pl-5 pr-5 w-full text-base font-light text-gray-500 outline-none"
                  />
                </div>
                <div className="h-[18px] mt-2">
                  {errors.user_name && (
                    <p className="text-red-500 text-xs">
                      {errors.user_name.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="mx-4 mt-2 max-md:mx-2.5">
                <div className="flex rounded-lg  border border-gray-400 border-solid overflow-hidden">
                  <div className="bg-[#000000] px-2 flex items-center">
                    <img src={MailIocon} alt="" />
                  </div>
                  <input
                    {...register("email")}
                    type="text"
                    placeholder="Email@gmail.com"
                    className=" py-4 pl-5 pr-5 w-full text-base font-light text-gray-500 outline-none"
                  />
                </div>
                <div className="h-[18px] mt-2">
                  {errors.email && (
                    <p className="text-red-500 text-xs">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="mx-4 5 mt-2 max-md:mx-2.5">
                <div className="flex rounded-lg  border border-gray-400 border-solid overflow-hidden">
                  <div className="bg-[#000000] px-2 flex items-center">
                    <img src={LockIcon} alt="" />
                  </div>
                  <input
                    {...register("password")}
                    type="password"
                    placeholder="Password"
                    className=" py-4 pl-5 pr-5 w-full text-base font-light text-gray-500 outline-none"
                  />
                </div>
                <div className="h-[18px] mt-2">
                  {errors.password && (
                    <p className="text-red-500 text-xs">
                      {errors.password.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="mx-4  mt-2 max-md:mx-2.5">
                <div className="flex rounded-lg  border border-gray-400 border-solid overflow-hidden">
                  <div className="bg-[#000000] px-2 flex items-center">
                    <img src={LockIcon} alt="" />
                  </div>
                  <input
                    {...register("confirmPassword")}
                    type="text"
                    placeholder="Confirm Password"
                    className=" py-4 pl-5 pr-5 w-full text-base font-light text-gray-500 outline-none"
                  />
                </div>
                <div className="h-[18px] mt-2">
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-xs">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="mx-4  mt-2 max-md:mx-2.5">
                <div className="flex rounded-lg  border border-gray-400 border-solid overflow-hidden">
                  <div className="bg-[#000000] px-2 flex items-center">
                    <img src={AvatarIcon} width={40} alt="" />
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImage}
                    className="w-full py-4 pl-5 pr-12 text-base font-light text-gray-500 outline-none rounded-xl"
                  />
                </div>
                <div className="h-[18px] mt-2">
                  {errors.avatar && (
                    <p className="text-red-500 text-xs">
                      {errors.avatar.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="mx-4  mt-2 flex flex-wrap items-center  ">
                <div className="flex justify-between gap-3.5">
                  <input
                    type="checkbox"
                    {...register("acp")}
                    className="rounded border-[color:var(--4,#B1B5C3)] flex w-4 h-4 my-auto"
                  />
                  <div className="text-base font-medium  text-gray-500">
                    Accept terms and services
                  </div>
                </div>
                <div className="h-[18px] ">
                  {errors.acp && (
                    <p className="text-red-500 text-xs">{errors.acp.message}</p>
                  )}
                </div>
              </div>
              <div className="mx-4 max-md:mx-2.5 mt-4">
                <button
                  type="submit"
                  className="text-rose-100 text-xl text-center font-semibold w-full bg-red-400  px-16 py-5 rounded-xl"
                >
                  Sign up
                </button>
                <p className="mt-2">
                  You have an account?{" "}
                  <Link className="text-[#CF3736]" to={"/signin"}>
                    Sign In
                  </Link>
                </p>
              </div>
              <div className="mt-4 mx-4 flex flex-col lg:flex-row items-center justify-between gap-5">
                <button className="px-2 w-full border-[#00403E] border-[1px] py-4 flex items-center gap-5 rounded-md">
                  <img src={GoogleLogo} alt="" />
                  <span className="text-sm  whitespace-nowrap">
                    Sign in with Google
                  </span>
                </button>
                <button className="px-2 w-full bg-[#4776D0] py-4 flex items-center gap-5 rounded-md">
                  <img src={GoogleLogo} alt="" />
                  <span className="text-sm whitespace-nowrap">
                    Sign in with FaceBook
                  </span>
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
