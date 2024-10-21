import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { useSelector } from "react-redux";

function Home() {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const user = useSelector((state) => state.user.account);
  console.log(user);
  const breakpoints = {
    1024: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    1280: {
      slidesPerView: 4,
      spaceBetween: 40,
    },
    1536: {
      slidesPerView: 4,
      spaceBetween: 50,
    },
  };

  const getSwapEvent = async () => {
    try {
      const imagesResponse = await axios.get(
        `https://api.funface.online/get/id_image/id_user?id_user=${user.id_user}`
      );
      const videosResponse = await axios.get(
        "https://databaseswap.mangasocial.online/lovehistory/video/1"
      );
      if (imagesResponse && videosResponse) {
        setImages(imagesResponse.data?.list_sukien[7].sukien);
        setVideos(videosResponse.data?.list_sukien_video);
      } else {
        console.log("no response");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSwapEvent();
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-[20px] mt-12 mb-5">
        <div className="image-swap">
          <div className="flex flex-col mb-[10px]">
            <span className="text-[22px] font-semibold text-red-400">
              Images
            </span>
            <div className="flex justify-between text-green-600">
              <span className="font-normal">Swap Image</span>
              <span
                className="cursor-pointer hover:underline"
                onClick={() => navigate("/template")}
              >
                View...
              </span>
            </div>
          </div>
          <Swiper
            slidesPerView={2}
            spaceBetween={20}
            pagination={{
              clickable: true,
            }}
            breakpoints={breakpoints}
          >
            {images.slice(-4).map((item, index) => {
              return (
                <SwiperSlide key={index} className="cursor-pointer">
                  <img
                    src={item.link_da_swap}
                    alt="Image"
                    className="h-[200px] object-cover"
                  />
                  <div className="flex flex-col gap-1 px-4 py-2">
                    <span className="truncate text-sm uppercase font-extralight text-green-600">
                      {item.ten_su_kien}
                    </span>
                    <span className="truncate text-base font-normal text-green-600">
                      {item.noi_dung_su_kien}
                    </span>
                    <span className="text-xs font-extralight text-gray-400">
                      18 images
                    </span>
                    <div className="absolute bottom-4 right-4 w-4 h-4 rounded-full bg-green-800"></div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

        <div className="video-swap">
          <div className="flex flex-col mb-[10px]">
            <span className="text-[22px] font-semibold text-red-400">
              Videos
            </span>
            <div className="flex justify-between text-green-600">
              <span className="font-normal">Swap Video</span>
              <span
                className="cursor-pointer hover:underline"
                onClick={() => navigate("/template")}
              >
                View...
              </span>
            </div>
          </div>
          <Swiper
            slidesPerView={2}
            spaceBetween={20}
            pagination={{
              clickable: true,
            }}
            breakpoints={breakpoints}
          >
            {videos.map((item, index) => (
              <SwiperSlide key={index} className="cursor-pointer">
                <video type="video/mp4" className="w-full h-full" controls>
                  <source src={item.sukien_video[0].link_vid_swap} />
                </video>
                <div className="flex flex-col gap-1 px-4 py-2">
                  <span className="truncate text-sm uppercase font-extralight text-green-600">
                    {item.sukien_video[0].ten_su_kien}
                  </span>
                  <span className="truncate text-base font-normal text-green-600">
                    {item.sukien_video[0].noi_dung_su_kien}
                  </span>
                  <span className="truncate text-base font-normal text-green-600">
                    {item.sukien_video[0].thoigian_taosk}
                  </span>
                  <div className="absolute bottom-4 right-4 w-4 h-4 rounded-full bg-green-800"></div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default Home;
