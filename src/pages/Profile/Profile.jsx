import NProgress from "nprogress";
import { useId, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import BirthDayIcon from "../../assets/BirthdayIcon.png";
import MailIcon from "../../assets/MailIconProfile.png";
import PhoneIcon from "../../assets/PhoneIcon.png";
import UserIcon from "../../assets/UserIconProfile.png";
import LogOutIcon from "../../assets/mdi_logout.png";
import FilterIcon from "../../assets/mi_filter.png";
import CameraIcon from "../../assets/tabler_camera-filled.png";
import { doLogout, doUpdateAvatar } from "../../redux/action/userAction";
import { uploadImg } from "../../services/swap.service";
import { changeAvatar } from "../../services/user.service";
import VideoList from "./components/VideoList";
import ImagesList from "./components/ImagesList";

const MAX_FILE_SIZE = 10485760;

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [select, setSelect] = useState("images");

  const account = useSelector((state) => state.user.account);
  const labelRef = useRef();
  const inputId = useId();
  const handleLogout = () => {
    NProgress.start();
    try {
      dispatch(doLogout());
      navigate("/");
    } catch (error) {
      toast.error("Logout Fail");
    }
    NProgress.done();
  };
  const handleAvatarChange = async (e) => {
    NProgress.start();
    try {
      const file = e.target.files[0];

      if (!file) throw new Error("Avatar not found");

      if (file.size > MAX_FILE_SIZE) throw new Error("Max file size is 10MB");

      const formData = new FormData();
      formData.append("src_img", file);

      const uploadResponse = await uploadImg(formData);

      const imgUploadSrc = uploadResponse.data;
      if (imgUploadSrc?.message) throw new Error(imgUploadSrc.message);

      formData.append("link_img", imgUploadSrc);
      formData.append("check_img", "upload");

      const response = await changeAvatar(account.id_user, formData);

      if (!response) throw new Error("Change avatar fail");

      const avatarUrl = response.data.link_img;

      dispatch(
        doUpdateAvatar(
          avatarUrl.replace(
            "/var/www/build_futurelove/",
            "https://futurelove.online/"
          )
        )
      );

      toast.success("Update avatar success");
    } catch (error) {
      toast.error("Error: " + error.message);
    }
    NProgress.done();
  };

  const demoHandleFilter = () => {
    if (select === "images") {
      setSelect("videos");
    } else {
      setSelect("images");
    }
  };

  return (
    <div className="flex gap-5 flex-col lg:flex-row mt-6">
      <div className="flex flex-col gap-5 w-full  lg:w-[30vw] ">
        <label htmlFor={inputId} ref={labelRef} className="d-none hidden" />
        <input
          id={inputId}
          type="file"
          className="hidden"
          multiple
          accept="image/*"
          onChange={handleAvatarChange}
        />
        <div className=" rounded-lg overflow-hidden">
          <div className="bg-[#CF3736] px-2 py-1.5">
            <div
              onClick={() => labelRef.current?.click()}
              className="cursor-pointer relative inline-block"
            >
              <img
                src={account.link_avatar}
                className="w-24 cursor-pointer h-24 rounded-full overflow-hidden border-[1px] border-black"
                alt=""
              />
              <div className="bg-white inline-block absolute bottom-0 right-0 rounded-full p-1 border-[1px] border-black">
                <img src={CameraIcon} alt="" />
              </div>
            </div>
          </div>
          <div className="text-[#CF3736] font-medium bg-white">
            <ul className="flex flex-col gap-5 p-6">
              <li className="flex items-center gap-2">
                <img src={UserIcon} alt="" />
                <span>{account.user_name}</span>
              </li>
              <li className="flex items-center gap-2">
                <img src={MailIcon} alt="" />
                <span>{account.email}</span>
              </li>
              <li className="flex items-center gap-2">
                <img src={BirthDayIcon} alt="" />
                <span>{account.birthday || "06/08/2002"}</span>
              </li>
              <li className="flex items-center gap-2">
                <img src={PhoneIcon} alt="" />
                <span>{account.phone || "0324567891"}</span>
              </li>
            </ul>
            <div className="w-full flex justify-center pb-8">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 justify-center bg-[#CF3736] shadow-md px-3 py-1.5 rounded-md text-white font-semibold"
              >
                <img src={LogOutIcon} alt="" />
                <span>Log out</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-5 w-full">
        <div className="rounded-md overflow-hidden">
          <div className="bg-[#CF3736] px-2 py-1.5">
            <h3 className="text-xl font-medium text-white">Update Profile</h3>
          </div>
          <form className=" font-medium bg-white p-6 flex flex-col gap-3">
            <div className="border-[1px] border-[#00403E] rounded-md px-4 py-1 flex flex-col gap-2">
              <label htmlFor="" className="text-[#777777]">
                Name
              </label>
              <input
                type="text"
                className=" outline-none font-bold text-black"
                defaultValue={account.user_name}
              />
            </div>
            <div className="border-[1px] border-[#00403E] rounded-md px-4 py-1 flex flex-col gap-2">
              <label htmlFor="" className="text-[#777777]">
                Email
              </label>
              <input
                type="text"
                className=" outline-none font-bold text-black"
                defaultValue={account.email}
              />
            </div>
            <div className="border-[1px] border-[#00403E] rounded-md px-4 py-1 flex flex-col gap-2">
              <label htmlFor="" className="text-[#777777]">
                Birthday
              </label>
              <input
                type="text"
                className=" outline-none font-bold text-black"
                defaultValue={account.birthday || "06-08-2002"}
              />
            </div>
            <div className="border-[1px] border-[#00403E] rounded-md px-4 py-1 flex flex-col gap-2">
              <label htmlFor="" className="text-[#777777]">
                Birthday
              </label>
              <input
                type="text"
                className=" outline-none font-bold text-black"
                defaultValue={account.phone || "0324567891"}
              />
            </div>
            <div className="w-full flex justify-end gap-5 items-center">
              <button className="flex items-center justify-center bg-black shadow-md px-8 py-1.5 rounded-md text-white font-semibold">
                <span>Cancel</span>
              </button>{" "}
              <button className="flex items-center justify-center bg-[#CF3736] shadow-md px-8 py-1.5 rounded-md text-white font-semibold">
                <span>Update</span>
              </button>
            </div>
          </form>
        </div>
        <div className="rounded-md overflow-hidden">
          <div className="bg-[#CF3736] ">
            <div className=" py-2 flex justify-between items-center px-6 text-white">
              <h3 className="text-xl font-medium ">Products</h3>
              <button onClick={demoHandleFilter}>
                {" "}
                <img src={FilterIcon} alt="" />
              </button>
            </div>
            <div className=" bg-white pt-3 px-4">
              <h3 className="mb-3 text-xl font-bold">All {select}</h3>
              {select === "images" ? (
                <>
                  <ImagesList/>
                </>
              ) : (
                <>
                  <VideoList />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
