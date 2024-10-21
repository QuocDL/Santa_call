import SearchIcon from "../../assets/searchIcon.png";
import { useState } from "react";
import MenuBarBlock from "../SideBar/_components/MenuIcon";
import notificationIcon from "../../assets/NotificationIcon.svg";
import { useSelector } from "react-redux";
import coinIcon from "../../assets/image 2.png";
import increaseIcon from "../../assets/increaseIcon.png";
export default function MenuBar() {
  const [searchKey, setSearchKey] = useState("");
  const handleSearch = () => {
    console.log(searchKey);
  };
  let avatarUrl = useSelector((state) => state.user.account.link_avatar);
  if (avatarUrl == "") avatarUrl = "/blank-profile-picture.png";
  return (
    <div className="flex justify-between items-center mt-4">
      <div className="searchBar flex items-center  gap-2 sm:gap-4">
        <MenuBarBlock />
        <div className=" items-center hidden sm:flex bg-[#CF3736] mr-6 px-1.5 py-1 gap-2 rounded-md">
          <span className="text-lg font-semibold text-white">10</span>
          <img src={coinIcon} className="w-8" alt="" />
          <button className="border-l-1 ">
            <img src={increaseIcon} alt="" className="w-4" />
          </button>
        </div>
        <div className="search relative">
          <img
            src={SearchIcon}
            alt="Search"
            className="absolute border-r-[1px] border-[#CF3736] top-1 w-8 left-1 cursor-pointer"
            onClick={() => handleSearch()}
          />
          <input
            type="text"
            placeholder="Search or type"
            value={searchKey}
            className="placeholder-gray-400 placeholder-opacity-75 text-xs sm:text-sm w-[40vw] h-[40px] pl-[45px] pt-[3px] pb-[3px] text-red-400 rounded-lg outline-none"
            onChange={(event) => setSearchKey(event.target.value)}
          />
        </div>
        <div className="lg:ml-16 ml-4">
          <img
            src={notificationIcon}
            className="cursor-pointer h-[25px] w-[25px] sm:h-[30px] sm:w-[30px] mr-3 sm:mr-5"
          />
        </div>
      </div>
      <div className="flex items-center">
        <div className="user-img">
          <img
            src={avatarUrl}
            className="cursor-pointer rounded-full overflow-hidden h-[40px] w-[40px] sm:h-[50px] sm:w-[50px]"
          />
        </div>
      </div>
    </div>
  );
}
