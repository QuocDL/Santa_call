import { useState } from "react";

import videoIconActive from "../../assets/videoIconActive.svg";
import videoIcon from "../../assets/videoIcon.svg";
import galaryIconActive from "../../assets/galleryIconActive.svg";
import galaryIcon from "../../assets/galleryIcon.svg";

const TabBar = ({ tabItem, setTabItem }) => {
  const [hoveredtabItem, setHoveredtabItem] = useState(null);

  return (
    <div className="flex gap-4 mt-12">
      <div
        className={`flex items-center gap-2 p-3 sm:p-4 rounded-lg ${
          tabItem === "images" || hoveredtabItem === "images"
            ? "bg-red-400 text-rose-100"
            : "bg-white text-red-400"
        }`}
      >
        <img
          src={
            tabItem === "images" || hoveredtabItem === "images"
              ? galaryIconActive
              : galaryIcon
          }
          alt="Images"
          className="w-[24px] h-[24px]"
        />
        <button
          className="text-sm sm:text-base"
          onClick={() => setTabItem("images")}
          onMouseEnter={() => setHoveredtabItem("images")}
          onMouseLeave={() => setHoveredtabItem(null)}
        >
          Images
        </button>
      </div>
      <div
        className={`flex items-center gap-2 p-3 sm:p-4 rounded-lg ${
          tabItem === "videos" || hoveredtabItem === "videos"
            ? "bg-red-400 text-rose-100"
            : "bg-white text-red-400"
        }`}
      >
        <img
          src={
            tabItem === "videos" || hoveredtabItem === "videos"
              ? videoIconActive
              : videoIcon
          }
          alt="Videos"
          className="w-[24px] h-[24px]"
        />
        <button
          className="text-sm sm:text-base"
          onClick={() => setTabItem("videos")}
          onMouseEnter={() => setHoveredtabItem("videos")}
          onMouseLeave={() => setHoveredtabItem(null)}
        >
          Videos
        </button>
      </div>
    </div>
  );
};

export default TabBar;
