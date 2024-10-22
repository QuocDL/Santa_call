import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import NProgress from "nprogress";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import coinIcon from "../../assets/image 2.png";
import increaseIcon from "../../assets/increaseIcon.png";
import notificationIcon from "../../assets/NotificationIcon.svg";
import SearchIcon from "../../assets/searchIcon.png";
import { doLogout } from "../../redux/action/userAction";
import MenuBarBlock from "../SideBar/_components/MenuIcon";

export default function MenuBar() {
  const [searchKey, setSearchKey] = useState("");
  const location = useLocation()

  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const handleSearch = () => {
    console.log(searchKey);
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
  let avatarUrl = useSelector((state) => state.user.account.link_avatar);
  if (avatarUrl == "") avatarUrl = "/blank-profile-picture.png";
  return (
    <div className={`flex justify-between items-center ${location.pathname.includes('/profile') ? 'mt-8' : 'mt-4'}`}>
      {location.pathname.includes('profile') ? <>
        <div className="flex items-center">
          <MenuBarBlock />
          <div className="bg-[#00403E] py-1.5 px-4 rounded-md">
              <h3 className="text-[#CF3736] text-xl font-bold">Edit Profile</h3>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <div className="lg:ml-16 ml-4">
            <img
              src={notificationIcon}
              className="cursor-pointer h-[25px] w-[25px] sm:h-[30px] sm:w-[30px] mr-3 sm:mr-5"
            />
          </div>
          <div className=" items-center hidden sm:flex bg-[#CF3736] px-1.5 py-1 gap-2 rounded-md">
            <span className="text-lg font-semibold text-white">10</span>
            <img src={coinIcon} className="w-8" alt="" />
            <button className="border-l-1 ">
              <img src={increaseIcon} alt="" className="w-4" />
            </button>
          </div>
        </div>
      </> : <> <div className="searchBar flex items-center  gap-2 sm:gap-4">
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
        <div className="flex items-center lg:mr-16">
          <div className="user-img">
            {isAuthenticated ? (
              <Menu>
                <MenuHandler>
                  <img
                    src={avatarUrl}
                    className="cursor-pointer rounded-full overflow-hidden h-[40px] w-[40px] sm:h-[50px] sm:w-[50px]"
                  />
                </MenuHandler>
                <MenuList className="flex flex-col gap-2 items-center w-[150px] z-50">
                    <Link to={"/profile"}>Profile</Link>
                    <button onClick={handleLogout}>Log out</button>
                </MenuList>
              </Menu>
            ) : (
              <div className="text-white bg-[#00403EEB] py-1 px-2 rounded-md">
                <Link to={"/signin"} className="whitespace-nowrap">
                  Sign In
                </Link>
              </div>
            )}
          </div>
        </div></>}
    </div>
  );
}
