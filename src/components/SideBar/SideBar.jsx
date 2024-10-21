import  { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import HomeIconActive from '../../assets/HomeIconActiveNew.png';
import HomeIcon from '../../assets/HomeIconNew.png';
import MenuIconActive from "../../assets/MenuBarIconNew.png";
import SwapFaceIcon from '../../assets/SwapIcon.png';
import SwapFaceIconActive from '../../assets/SwapIconActive.png';
import SwapVideoIcon from '../../assets/SwapVideoIcon.png';
import SwapVideoIconActive from '../../assets/SwapVideoIconActive.png';
import TemplateIcon from '../../assets/TemplateIcon.png';
import TemplateIconActive from '../../assets/TemplateIconActive.png';
import SettingIcon from '../../assets/ic_round-settings.png';
import SettingIconActive from '../../assets/ic_round-settings_active.png';

import NavLink from './_components/NavLink';
import { useDispatch, useSelector } from 'react-redux';
import { setOpen } from '../../redux/slice/sideBarSlice';

export default function SideBar() {
  const location = useLocation();
  const currentPath = location.pathname;
  const isOpen = useSelector(state => state.sideBar.isOpen)
  const sidebarRef = useRef(null);
  const dispatch = useDispatch()
  const onClickMenu = () => {
    dispatch(setOpen(!isOpen));
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target) && isOpen) {
      dispatch(setOpen(!isOpen));
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <aside ref={sidebarRef} className={`-translate-x-[100%] lg:translate-x-0 bg-[#00403EEB] fixed z-[50] duration-300 min-h-screen flex justify-start py-6 ${isOpen ? 'w-[350px] translate-x-0' : 'w-[75px]'}`}>
      <div className={` w-full ${isOpen ? '' : 'px-4'}`}>
       <div className={`duration-300 flex  ${isOpen ? 'justify-end mr-6' : 'justify-center'}`}>
        <button onClick={onClickMenu} >
            <img src={MenuIconActive} alt="" className='hover:invert w-9' />
          </button>
       </div>
        <div className={`mt-4 flex flex-col ${!isOpen ? 'items-center' : 'ml-4'} duration-300 gap-6`}>
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
