import axios from "axios";
import "swiper/css";
import "swiper/css/pagination";
import { useEffect, useState } from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import { Link } from "react-router-dom";

function Template() {
  const [listImages, setImages] = useState(null)
  const [listVideo, setListVideo] = useState(null)
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
  const fetchImages = async () => {
    const randomAlbum = Math.floor(Math.random() * 23) + 1;
    const { data } = await axios.get(`https://api.funface.online/get/list_image/1?album=${randomAlbum}`)
    setImages(data.list_sukien_video)
  }
  const fetchVideo = async ()=>{
    const {data} = await axios.get(`https://api.funface.online/get/list_video/all_santa`)
    if (data.list_sukien_video && data.list_sukien_video.length > 0) {
      const filteredVideos = data.list_sukien_video.filter(item => item.IDCategories);
      if (filteredVideos.length > 0) {
        setListVideo(filteredVideos.slice(0, 20));
        console.log(filteredVideos);
      }
    }
  }
  useEffect(() => {
    fetchImages()
    fetchVideo()
  }, [])
  return (
    <div className="mt-8">
      <div className="mt-8">
        <div className="flex items-center justify-between">
          <Link to={'/swap-face'} className="bg-[#00403E] flex items-center rounded-md shadow-xl  px-2 py-1.5 gap-5">
            <h3 className=" shadow-2xl rounded-md text-[#CF3736]  text-xl font-bold ">Swap Image</h3>
            <span className="text-[#CF3736]  text-2xl ">&gt;</span>
          </Link>
        </div>
        <div>
        <Swiper
            className="mt-6"
            slidesPerView={1}
            spaceBetween={20}
            pagination={{
              clickable: true,
            }}
            breakpoints={breakpoints}
          >
            {listImages ? listImages.map((item, index) => {
              return (
                <SwiperSlide key={index} className="cursor-pointer">
                  <div className="relative ">
                    <img
                      src={item.image}
                      alt="Image"
                      className=" object-cover h-[250px]"
                    />
                    <div className="absolute bottom-0 px-2.5 py-1 bg-[#ffffff] w-full bg-opacity-75 text-[#00403E]">
                      <h3 className="font-semibold text-lg">{item.thongtin}</h3>
                      <span>More than 50 images</span>
                      <span className="block">Download: 230</span>
                    </div>
                    <Link to={`/swap-face/${item.id}?album_id=${item.IDCategories}`} className="absolute bottom-6 right-6 bg-[#CF3736] text-white py-1 px-3 rounded-md font-medium">Use</Link>
                  </div>
                </SwiperSlide>
              );
            }) : <>
              <div className="h-[220px] flex justify-center items-center">
                <p className="text-center text-xl text-[#CF3736]">Not found data</p>
              </div>
            </>}
          </Swiper>
        </div>
      </div>
      <div className="mt-8">
        <div className="flex items-center justify-between">
          <Link to={'/swap-video'} className="bg-[#00403E] flex items-center rounded-md shadow-xl  px-2 py-1.5 gap-5">
            <h3 className=" shadow-2xl rounded-md text-[#CF3736]  text-xl font-bold ">Swap Video</h3>
            <span className="text-[#CF3736]  text-2xl ">&gt;</span>
          </Link>
        </div>
        <div className="mb-12">
          <Swiper
            className="mt-6"
            slidesPerView={1}
            spaceBetween={20}
            pagination={{
              clickable: true,
            }}
            breakpoints={breakpoints}
          >
            {listVideo ?  listVideo.map((item, index) =>  {
              return (
                <SwiperSlide key={index} className="cursor-pointer">
                  <div className="relative ">
                    <img
                      src={item.IDCategories}
                      alt="Image"
                      className=" object-cover h-[250px]"
                    />
                    <div className="absolute bottom-0 px-2.5 py-1 bg-[#ffffff] w-full bg-opacity-75 text-[#00403E]">
                      <h3 className="font-semibold text-lg">{item.noidung}</h3>
                      <span>More than 50 images</span>
                      <span className="block">Download: 230</span>
                    </div>
                    <Link to={`/swap-video/${item.id}`} className="absolute bottom-6 right-6 bg-[#CF3736] text-white py-1 px-3 rounded-md font-medium">Use</Link>
                  </div>
                </SwiperSlide>
              );
            }) : <>
              <div className="h-[220px] flex justify-center items-center">
                <p className="text-center text-xl text-[#CF3736]">Not found data</p>
              </div>
            </>}
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default Template;
