import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import Banner_1 from "../../../assets/Banner_1.png";
import Banner_1Child from "../../../assets/Banner_1Child.png";
import Banner_2 from "../../../assets/Banner_2.png";
import Banner_3 from "../../../assets/Banner_3.png";
import CheckIcon from "../../../assets/CheckGreen.png";
import coinIcon from "../../../assets/image 2.png";
import Video2 from "../../../assets/video2.mp4";
import Video1 from "../../../assets/videoFile.mp4";
import { SwiperButtonNext } from "./ControllerBanner";
export default function Banner() {
  return (
    <div className="md:flex justify-center hidden">
      <Swiper
        className="xl:w-[67%] 2xl:w-[55%] md:w-[95%] lg:w-[85%]"
        spaceBetween={20}
        pagination={{
          clickable: true,
        }}
      >
        <SwiperButtonNext position={"right"}></SwiperButtonNext>
        <SwiperButtonNext position={"left"}></SwiperButtonNext>
        <SwiperSlide>
          <div className="flex items-center relative">
            <div className="w-[425px] shrink-0 h-[373px] ">
              <img src={Banner_1} className="object-fill" alt="" />
            </div>
            <div className="bg-[#CF3736] min-h-[100%] right-0 absolute w-[55%] lg:w-[62%] xl:w-[57%] p-5 text-white">
              <img
                src={Banner_1Child}
                className="max-w-[138px] absolute z-10 bottom-0 -left-[4.5rem]"
                alt=""
              />
              <h3 className="font-semibold text-2xl">Swap face</h3>
              <p className="mt-4">
                Our face changer to effortlessly swap faces in photos. Try it
                today! Face swapping is a fun photo trend that lets you switch
                faces with others. With us, you can easily swap your face with
                friends, celebrities, or even famous historical figures.
              </p>
              <Link
                to={"/swap-face"}
                className="absolute right-12 bg-[#ffffff] text-xl font-medium py-1.5 px-6 rounded-lg text-[#CF3736] bottom-6"
              >
                Try now!
              </Link>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="grid grid-cols-2 gap-2 relative max-h-[373px] min-w-[100%] bg-[#CF3736] px-3 py-1">
            <div>
              <div className="flex">
                <div>
                  <img src={Banner_1Child} className="max-w-[138px] " alt="" />
                </div>
                <div className="text-white flex flex-col">
                  <h3 className="font-semibold text-2xl">Swap Video </h3>
                  <Link
                    to={"/swap-video"}
                    className=" mt-4 ml-6 bg-[#ffffff] text-xl whitespace-nowrap font-medium py-1.5 px-6 rounded-lg text-[#CF3736]"
                  >
                    Try now!
                  </Link>
                </div>
              </div>
              <div className=" ">
                <video width="400" className="rounded-md overflow-hidden" autoPlay muted loop>
                  <source src={Video1} type="video/mp4" />
                  Trình duyệt của bạn không hỗ trợ video.
                </video>
              </div>
            </div>
            <div>
              <div className="flex flex-col gap-5 items-center">
              <video width="400" className="rounded-md overflow-hidden" autoPlay muted loop>
                  <source src={Video2} type="video/mp4" />
                  Trình duyệt của bạn không hỗ trợ video.
                </video>
                <p className="text-white">
                  You can seamlessly swap faces in videos for a variety of
                  applications, such as creating social media content, GIF face
                  swaps, film and TV production, memes, and advertising.
                </p>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="min-h-[373px] gap-5 flex items-center min-w-[100%] bg-[#CF3736]">
            <div className="relative flex items-center shrink-0 ml-2">
              <div>
                <img src={Banner_2} className="max-w-[340px]" alt="" />
                <img
                  src={Banner_3}
                  className="max-w-[340px] -translate-y-1"
                  alt=""
                />
              </div>
              <div className="absolute z-10 top-[50%] -translate-y-[50%] -right-8">
                <img src={Banner_1Child} className="max-w-[138px] " alt="" />
              </div>
            </div>
            <div className="flex flex-col items-center shrink-0 lg:w-[50%] xl:w-[70%]">
              <div className="">
                <div className="text-white whitespace-nowrap text-4xl font-bold flex gap-2 items-center">
                  <h3>100</h3>
                  <img src={coinIcon} className="max-w-[40px]" alt="" />
                  <h3>= $3</h3>
                </div>
                <ul className="mt-6 mb-2 ml-8 flex flex-col gap-5">
                  <li className="flex gap-2 items-center">
                    <img src={CheckIcon} className="max-w-[20px]" alt="" />
                    <span className="text-xl text-white font-medium">
                      No ads
                    </span>
                  </li>
                  <li className="flex gap-2 items-center">
                    <img src={CheckIcon} className="max-w-[20px]" alt="" />
                    <span className="text-xl text-white font-medium">
                      No mask
                    </span>
                  </li>
                  <li className="flex gap-2 items-center">
                    <img src={CheckIcon} className="max-w-[20px]" alt="" />
                    <span className="text-xl text-white font-medium">
                      Only 1 coin
                    </span>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col gap-5 items-center">
                <p className="text-white  whitespace-nowrap">
                  *Each photo or video swap will be -1 coin.
                </p>
                <Link
                  to={"/"}
                  className=" bg-[#ffffff] text-xl whitespace-nowrap font-medium py-1.5 px-6 rounded-lg text-[#CF3736]"
                >
                  Buy coins & try
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
