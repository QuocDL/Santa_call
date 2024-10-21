import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import HomeIcon from '../../assets/HomeIconNew.png';
import HomeIconActive from '../../assets/HomeIconActiveNew.png';
import MenuIconActive from "../../assets/MenuBarIconNew.png";
import TemplateIcon from '../../assets/TemplateIcon.png';
import TemplateIconActive from '../../assets/TemplateIconActive.png';
import SwapFaceIcon from '../../assets/SwapIcon.png';
import SwapFaceIconActive from '../../assets/SwapIconActive.png';
import SwapVideoIcon from '../../assets/SwapVideoIcon.png';
import SwapVideoIconActive from '../../assets/SwapVideoIconActive.png';
import SettingIcon from '../../assets/ic_round-settings.png';
import SettingIconActive from '../../assets/ic_round-settings_active.png';

import NavLink from './_components/NavLink';

export default function SideBar() {
  const location = useLocation();
  const currentPath = location.pathname;
  const [isOpen, setOpen] = useState(false);
  const sidebarRef = useRef(null);

  const onClickMenu = () => {
    setOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target) && isOpen) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <aside ref={sidebarRef} className={`bg-[#00403EEB] fixed z-[50] duration-300 min-h-screen flex justify-start py-6 ${isOpen ? 'w-[20vw]' : 'w-[5vw]'}`}>
      <div className={`relative w-full ${isOpen ? '' : 'px-4'}`}>
        <button onClick={onClickMenu} className={`duration-300 absolute ${isOpen ? ' right-4' : 'left-[50%] -translate-x-[50%]'}`}>
          <img src={MenuIconActive} alt="" className='hover:invert w-9' />
        </button>
        <div className={`mt-14 flex flex-col ${!isOpen ? 'items-center' : 'ml-4'} duration-300 gap-6`}>
          <NavLink
            defaultIcon={HomeIcon}
            name={'Home'}
            activeIcon={HomeIconActive}
            isOpen={isOpen}
            to={'/'}
            isActive={currentPath === '/'}
          />
          <NavLink
            defaultIcon={TemplateIcon}
            name={'Template'}
            activeIcon={TemplateIconActive}
            isOpen={isOpen}
            to={'/template'}
            isActive={!!currentPath.includes("/template")}
          />
          <NavLink
            defaultIcon={SwapFaceIcon}
            name={'Swap Face'}
            activeIcon={SwapFaceIconActive}
            isOpen={isOpen}
            to={'/swap-face'}
            isActive={!!currentPath.includes("/swap-face")}
          />
          <NavLink
            defaultIcon={SwapVideoIcon}
            name={'Swap Video'}
            activeIcon={SwapVideoIconActive}
            isOpen={isOpen}
            to={'/swap-video'}
            isActive={!!currentPath.includes("/swap-video")}
          />
          <NavLink
            defaultIcon={SettingIcon}
            name={'Setting'}
            activeIcon={SettingIconActive}
            isOpen={isOpen}
            to={'/settings'}
            isActive={!!currentPath.includes("/settings")}
          />
        </div>
      </div>
    </aside>
  );
}
