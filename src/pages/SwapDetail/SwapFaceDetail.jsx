import axios from "axios";
import { useEffect, useState } from "react";

import Detail from "./Detail";

function SwapFaceDetail() {
  const [images, setImages] = useState([]);

  const getMedias = async () => {
    try {
      let response = await axios.get(
        "https://api.funface.online/get/list_image/1?album=1"
      );
      if (response) setImages(response.data?.list_sukien_video);
      else {
        console.log("no response");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMedias();
  }, []);

  return (
    <div>
      <div className="flex flex-col rounded-lg pr-[5px] md:pr-[20px] mt-[30px]">
        <div className="text-[22px] font-semibold text-red-400 mb-[20px]">
          <span>All Details</span>
        </div>
        <Detail swap="face" type={"images"} medias={images} />
      </div>
    </div>
  );
}

export default SwapFaceDetail;
