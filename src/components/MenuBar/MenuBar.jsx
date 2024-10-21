import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import MenuBarIcon from "../../assets/MenuBarIcon.png";
import MenuBarIconActive from "../../assets/MenuBarIconActive.png";
import { setOpen } from "../../redux/slice/sideBarSlice";

function MenuBar() {
  const [hovered, setHovered] = useState(false);
  const isOpen = useSelector(state=> state.sideBar.isOpen)
  const dispatch = useDispatch()
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
        onClick={() => dispatch(setOpen(!isOpen))}
      >
        <img
          src={hovered ? MenuBarIconActive : MenuBarIcon}
          alt="Menu"
          className="w-[24px] h-[24px]"
        />
      </div>
    </>
  );
}

export default MenuBar;
