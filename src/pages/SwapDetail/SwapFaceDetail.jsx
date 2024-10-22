import axios from "axios";
import { useEffect, useState } from "react";

import Detail from "./Detail";
import { Link } from "react-router-dom";

function SwapFaceDetail() {
  const [images, setImages] = useState(null)

  const fetchImages = async()=>{
    const {data} = await axios.get(`https://api.funface.online/get/list_image/all_santa/1`)
    setImages(data.list_sukien_video)
    console.log(images)
  }
  useEffect(()=>{
    fetchImages()
  },[])
  return (
    <div>
      <div className="flex flex-col rounded-lg pr-[5px] md:pr-[20px] mt-[30px]">
        <div className="flex items-center">
          <Link to={'/swap-video'} className="bg-[#00403E] flex items-center rounded-md shadow-xl  px-2 py-1.5 gap-5">
            <h3 className=" shadow-2xl rounded-md text-[#CF3736]  text-xl font-bold ">Swap Video</h3>
            <span className="text-[#CF3736]  text-2xl ">&gt;</span>
          </Link>
        </div>
        {/* <Detail swap="face" type={"images"} medias={images} /> */}
      </div>
    </div>
  );
}

export default SwapFaceDetail;
