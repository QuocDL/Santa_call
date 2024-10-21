/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link } from "react-router-dom";

function SidebarLink({ to, activeIcon, defaultIcon, label, isActive }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      to={to}
      className={`flex flex-col mt-4 pl-4 pr-6 lg:pr-10 py-2.5 rounded-lg whitespace-nowrap ${
        isActive || isHovered
          ? "bg-red-400 text-rose-100"
          : "bg-white text-red-400"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex gap-2">
        <img
          loading="lazy"
          src={isActive || isHovered ? activeIcon : defaultIcon}
        />
        <div className="text-sm lg:text-base font-semibold grow">{label}</div>
      </div>
    </Link>
  );
}

export default SidebarLink;
