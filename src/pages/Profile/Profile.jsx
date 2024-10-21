import {  useId, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import NProgress from "nprogress";

import { doUpdateAvatar } from "../../redux/action/userAction";
import { uploadImg } from "../../services/swap.service";
import { changeAvatar } from "../../services/user.service";
import EditProfile from "./EditProfile";
import Library from "./Library";
import NameInforIcon from "../../assets/NameInforIcon.svg";
import BirthdayInforIcon from "../../assets/BirthdayInforIcon.svg";
import AddressInforIcon from "../../assets/AddressInforIcon.svg";
import PhoneInforIcon from "../../assets/PhoneInforIcon.svg";

const MAX_FILE_SIZE = 10485760;

function Profile() {
  const dispatch = useDispatch();

  const account = useSelector((state) => state.user.account);



  const [editProfile, setEditProfile] = useState(false);
  const [avatarHover, setAvatarHover] = useState(false);

  const labelRef = useRef();
  const inputId = useId();

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

  return (
    <div>
      <label htmlFor={inputId} ref={labelRef} className="d-none" />
      <input
        id={inputId}
        type="file"
        className="hidden"
        multiple
        accept="image/*"
        onChange={handleAvatarChange}
      />
    

      <div className="w-full px-4 sm:px-0 flex flex-col-reverse xl:flex-row items-center xl:items-start gap-10">
        {editProfile ? <EditProfile account={account} /> : <Library />}

        <div className="flex flex-col mt-10">
          <div className=" bg-red-400 p-3 rounded-t-lg">
            <span className="text-[18px] font-medium text-white">Profile</span>
          </div>
          <div className="px-16 md:px-28 py-12 flex flex-col justify-evenly items-center rounded-b-lg bg-white">
            <div
              className="relative w-[100px] h-[100px] rounded-full overflow-hidden hover:bg-neutral-800 cursor-pointer mb-[20px]"
              onClick={() => labelRef.current?.click()}
              onMouseEnter={() => setAvatarHover(true)}
              onMouseLeave={() => setAvatarHover(false)}
            >
              <img
                src={account.link_avatar}
                alt="Avatar"
                className="w-full h-full hover:opacity-55"
              />
              <div className="absolute opacity-70 bottom-0 left-0 flex justify-center items-center w-full bg-neutral-600 text-white">
                Edit
              </div>
            </div>

            {avatarHover && (
              <div className="relative">
                <div
                  className="bg-slate-50 absolute top-full right-[-20px] w-[40px] h-[40px]"
                  style={{ clipPath: "polygon(50% 0%, 0 100%, 100% 100%)" }}
                ></div>
                <div className="bg-slate-50 absolute top-[40px] right-[-100px] md:right-[-25px] text-[20px] text-red-400 rounded-lg flex flex-col gap-4 px-[10px] px-8 min-w-[300px] py-4 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.4)]">
                  <div className="flex items-center gap-2 w-[fit-content]">
                    <img
                      src={NameInforIcon}
                      alt="Name"
                      className="w-[32px] h-[32px]"
                    />
                    <span className="truncate">
                      {account.user_name || "Unknown"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 w-[fit-content]">
                    <img
                      src={BirthdayInforIcon}
                      alt="Name"
                      className="w-[32px] h-[32px]"
                    />
                    <span>{account.birthday || "Unknown"}</span>
                  </div>
                  <div className="flex items-center gap-2 w-[fit-content]">
                    <img
                      src={AddressInforIcon}
                      alt="Name"
                      className="w-[32px] h-[32px]"
                    />
                    <span>{account.address || "Unknown"}</span>
                  </div>
                  <div className="flex items-center gap-2 w-[fit-content]">
                    <img
                      src={PhoneInforIcon}
                      alt="Name"
                      className="w-[32px] h-[32px]"
                    />
                    <span>{account.phone || "Unknown"}</span>
                  </div>
                </div>
              </div>
            )}
            <span className="text-[22px] font-semibold text-green-800">
              {account.user_name}
            </span>
            <span className="text-gray-400 mb-[20px]">Personal Account</span>
            <button
              className="capitalize bg-red-400 px-2 py-3 w-[100px] xl:w-[150px] rounded-lg text-white text-[14px] xl:text-[16px]"
              onClick={() => setEditProfile(!editProfile)}
            >
              {editProfile ? "Library" : "Edit Profile"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
