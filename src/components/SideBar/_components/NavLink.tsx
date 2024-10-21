import React from 'react'
import { Link } from 'react-router-dom'

export default function NavLink({ isOpen, defaultIcon, activeIcon, to, isActive, name }) {
   return (
      <>
         <Link to={to} className={`flex items-center gap-5  w-[72%] py-1.5 group ${isActive && isOpen
          ? "bg-[#CF3736] text-rose-100 rounded-md"
          : ''}`}>
            <img src={isActive ? activeIcon : defaultIcon} className={`${!isActive && 'group-hover:invert'} ${isOpen && 'ml-2'}  w-8`} alt="" />
            {isOpen &&
               <span className={`${isActive ? 'text-white' : 'text-[#CF3736]'} font-semibold text-[18px] whitespace-nowrap ${!isActive && 'group-hover:invert'}`}>{name}</span>}
         </Link>
      </>
   )
}
