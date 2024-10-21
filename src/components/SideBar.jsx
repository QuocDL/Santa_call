import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import NProgress from "nprogress";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { doLogout } from "../redux/action/userAction";

import SidebarLink from "./SidebarLink";
import HomeIcon from "../assets/HomeIcon.svg";
import MenuIcon from "../assets/MenuIcon.svg";
import GalleryIcon from "../assets/GalleryIcon.svg";
import VideoIcon from "../assets/VideoIcon.svg";
import ProfileIcon from "../assets/ProfileIcon.svg";
import LogOutIcon from "../assets/LogOutIcon.svg";
import HomeIconActive from "../assets/HomeIconActive.svg";
import MenuIconActive from "../assets/MenuIconActive.svg";
import GalleryIconActive from "../assets/GalleryIconActive.svg";
import VideoIconActive from "../assets/VideoIconActive.svg";
import ProfileIconActive from "../assets/ProfileIconActive.svg";
import LogOutIconActive from "../assets/LogOutIconActive.svg";

function SideBar() {
  const location = useLocation();
  const currentPath = location.pathname;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLogOutHovered, setIsLogOutHovered] = useState(false);

  function handleLogOut() {
    NProgress.start();
    try {
      dispatch(doLogout());
      navigate("/");
    } catch (err) {
      toast.error("Logout fail");
    }
    NProgress.done();
  }
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated)
  console.log(isAuthenticated)
  return (
    <>
      <div className="h-[80vh] flex flex-col justify-between bg-white rounded-xl">
        <div className="flex flex-col m-5">
          <SidebarLink
            to="/"
            activeIcon={HomeIconActive}
            defaultIcon={HomeIcon}
            label="Home"
            isActive={currentPath === "/"}
          />
          <SidebarLink
            to="/template"
            activeIcon={MenuIconActive}
            defaultIcon={MenuIcon}
            label="Template"
            isActive={!!currentPath.includes("/template")}
          />
          <SidebarLink
            to="/swap-face"
            activeIcon={GalleryIconActive}
            defaultIcon={GalleryIcon}
            label="Swap Face"
            isActive={!!currentPath.includes("/swap-face")}
          />
          <SidebarLink
            to="/swap-video"
            activeIcon={VideoIconActive}
            defaultIcon={VideoIcon}
            label="Swap Video"
            isActive={!!currentPath.includes("/swap-video")}
          />
        </div>
        {
          isAuthenticated? 
          <div className="flex flex-col m-5">
          <SidebarLink
            to="/profile"
            activeIcon={ProfileIconActive}
            defaultIcon={ProfileIcon}
            label="Profile"
            isActive={!!currentPath.includes("/profile")}
          />

          <div
            className={`flex flex-col mt-4 pl-4 pr-11 py-2.5 rounded-lg whitespace-nowrap cursor-pointer ${
              isLogOutHovered
                ? "bg-red-400 text-rose-100"
                : "text-red-400 bg-white"
            }`}
            onMouseEnter={() => setIsLogOutHovered(true)}
            onMouseLeave={() => setIsLogOutHovered(false)}
            onClick={handleLogOut}
          >
            <div className="flex justify-between gap-2">
              <img
                loading="lazy"
                src={isLogOutHovered ? LogOutIconActive : LogOutIcon}
              />
              <div className="font-semibold grow">Log out</div>
            </div>
          </div>
        </div>
        :
        <div className="flex flex-col m-5">
          <SidebarLink
            to="/signin"
            activeIcon={ProfileIconActive}
            defaultIcon={ProfileIcon}
            label="Sign In"
            isActive={!!currentPath.includes("/signin")}
          />
        </div>
        }
        
      </div>
    </>
  );
}

export default SideBar;
