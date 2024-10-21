import { useState } from "react";

import MenuBarModal from "./MenuBarModal";
import MenuBarIcon from "../../assets/MenuBarIcon.png";
import MenuBarIconActive from "../../assets/MenuBarIconActive.png";

function MenuBar() {
  const [openMenu, setOpenMenu] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <>
      <div
        className="w-[fit-content] flex lg:hidden p-2 hover:bg-red-400 rounded cursor-pointer"
        onMouseEnter={() => {
          setHovered(true);
        }}
        onMouseLeave={() => {
          setHovered(false);
        }}
        onClick={() => setOpenMenu(true)}
      >
        <img
          src={hovered ? MenuBarIconActive : MenuBarIcon}
          alt="Menu"
          className="w-[24px] h-[24px]"
        />
      </div>
      <MenuBarModal openMenu={openMenu} setOpenMenu={setOpenMenu} />
    </>
  );
}

export default MenuBar;
