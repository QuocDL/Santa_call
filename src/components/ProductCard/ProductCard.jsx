import React from 'react'
import { Link } from 'react-router-dom'

export default function ProductCard({image, title, link}) {
  return (
   <div className="relative ">
   <img
     src={image}
     alt="Image"
     className=" object-cover h-[250px]"
   />
   <div className="absolute bottom-0 px-2.5 py-1 bg-[#ffffff] w-full bg-opacity-75 text-[#00403E]">
     <h3 className="font-semibold text-lg">{title}</h3>
     <span>More than 50 images</span>
     <span className="block">Download: 230</span>
   </div>
   <Link to={link} className="absolute bottom-6 right-6 bg-[#CF3736] text-white py-1 px-3 rounded-md font-medium">Use</Link>
 </div>
  )
}
