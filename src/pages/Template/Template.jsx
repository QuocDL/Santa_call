import axios from "axios";
import "swiper/css";
import "swiper/css/pagination";
import { useEffect, useState } from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import { Link } from "react-router-dom";
import ProductCard from "../../components/ProductCard/ProductCard";

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
  const fetchVideo = async () => {
    const { data } = await axios.get(`https://api.funface.online/get/list_video/all_santa/15?page=4`)
    if (data.list_sukien_video && data.list_sukien_video.length > 0) {
      const filteredVideos = data.list_sukien_video.filter(item => item.IDCategories);
      if (filteredVideos.length > 0) {
        setListVideo(filteredVideos);
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
                  <ProductCard image={item.image} title={item.thongtin} link={`/swap-face/${item.id}?album_id=${item.IDCategories}`} />
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
            {listVideo ? listVideo.map((item, index) => {
              return (
                <SwiperSlide key={index} className="cursor-pointer">
                  <ProductCard image={item.IDCategories} title={item.noidung} link={`/swap-video/${item.id}`} />
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
