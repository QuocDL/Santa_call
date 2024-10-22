import { useEffect, useId, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { deviceDetect } from "react-device-detect";
import { saveAs } from "file-saver";
import { toast } from "react-toastify";
import NProgress from "nprogress";
import coinIcon from "../../assets/image 2.png";
import axios from "axios";

import TransferIcon from "../../assets/TransferIcon.svg";
import UploadImageIcon from "../../assets/UploadImageIcon.svg";
import DirectLeftIcon from "../../assets/DirectLeftIcon.svg";

const MAX_FILE_SIZE = 10485760;

function SwapVideo() {
  const account = useSelector((state) => state.user.account);
  const [ipAddress, setIpAddress] = useState("");
  const [deviceRegister, setDeviceRegister] = useState("");
  const [file, setFile] = useState(null);
  const [originalImg, setOriginalImg] = useState(null);
  const [uploadImgSrc, setUploadImgSrc] = useState(null);
  const [originalVideo, setOriginalVideo] = useState(null);
  const [transferedVideo, setTransferedVideo] = useState(null);


  const navigate = useNavigate();
  const location = useLocation();
  const labelRef = useRef();
  const inputId = useId();

  const { id } = useParams();
  const searchParams = new URLSearchParams(location.search);
  const album_id = searchParams.get("album_id");

  const handleInputChange = (e) => {
    try {
      const fileUploaded = e.target.files[0];

      if (fileUploaded.size > MAX_FILE_SIZE)
        throw new Error("Max file size is 10MB");

      setFile(fileUploaded);
      setUploadImgSrc(URL.createObjectURL(fileUploaded));
    } catch (error) {
      toast.error("Error: " + error.message);
    }
  };

  const handleUploadAndSwap = async () => {
    try {
      if (!file) throw new Error("Not found file upload");

      const formData = new FormData();
      formData.append("src_img", file);

      NProgress.start();
      const uploadResponse = await axios.post(
        "https://databaseswap.mangasocial.online/upload-gensk/200?type=src_vid",
        formData
      );

      if (!uploadResponse) throw new Error("Upload image fail");

      const imgUploadSrc = uploadResponse.data;
      console.log('imgUploadSrc', imgUploadSrc);


      const swapResponse = await axios.get(
        `https://video.funface.online/getdata/genvideo?id_video=${originalVideo?.id}&device_them_su_kien=${deviceRegister}&ip_them_su_kien=${ipAddress}&id_user=${account.id_user}&image=${imgUploadSrc}&ten_video=${originalVideo?.noidung}`,
        { headers: { Authorization: `Bearer ${account.token}` } }
      );

      if (!swapResponse || swapResponse.status !== 200)
        throw new Error("Swap face fail");

      const data = swapResponse.data.sukien_video;

      setOriginalImg(
        data.linkimg?.replace(
          "/var/www/build_futurelove/",
          "https://photo.gachmen.org/"
        )
      );

      setTransferedVideo(data.link_vid_swap);
    } catch (error) {
      toast.error("Fail: " + error.message);
      console.log({ err: error.message });
    }
    NProgress.done();
  };

  const getBaseVid = async () => {
    try {
      const response = await axios.get(
        `https://api.funface.online/get/list_video/id_santa?id_video_santa=${id}`
      );

      if (!response) {
        navigate("/swap-video");
        return;
      }

      const videos = response.data.list_sukien_video[0];
      setOriginalVideo(videos);

    } catch (error) {
      toast.error("Can't find video to swap");
      navigate("/swap-video");
      console.log({ err: error.message });
    }
  };

  const fetchIpAddress = async () => {
    const res = await axios.get("https://api.ipify.org", {
      params: {
        format: "json",
      },
    });
    setIpAddress(res.data.ip);
  };

  const fetchDeviceDetect = async () => {
    const res = await deviceDetect();
    if (res.isMobile) {
      setDeviceRegister("Mobile");
    } else {
      setDeviceRegister("Desktop");
    }
  };

  useEffect(() => {
    NProgress.start();

    getBaseVid();
    fetchIpAddress();
    fetchDeviceDetect();

    NProgress.done();
  }, []);

  const handleDownloadVideo = async () => {
    try {
      const fileName = transferedVideo.split("/").pop();

      await saveAs(transferedVideo, fileName);
    } catch (error) {
      toast.error("Error: " + error.message);
      console.log({ err: error.message });
    }
  };

  return (
    <div className="mt-6">
      <label htmlFor={inputId} ref={labelRef} className="d-none" />
      <input
        id={inputId}
        className="hidden"
        type="file"
        multiple
        accept="image/*"
        onChange={handleInputChange}
      />
      <div className="flex justify-center w-[85%] items-center gap-5 ">
        <div>
          {uploadImgSrc ? (
            <div className="flex flex-col items-center relative group">
              <img
                src={uploadImgSrc}
                alt="Face Image"
                height={320}
                className="min-h-[320px] max-h-[320px] max-w-[250px] min-w-[250px] object-cover bg-white rounded-lg"
              />
              <button
                className="bg-white opacity-0 group-hover:opacity-100 duration-300 border absolute bottom-3 border-red-400 py-2 w-[100px] rounded-lg text-red-400"
                onClick={() => labelRef.current?.click()}
              >
                Change
              </button>
            </div>
          ) : (
            <div
              className="flex flex-col justify-center items-center h-[320px] rounded-lg w-[250px] px-5 xl:px-20 py-10 bg-white gap-5 cursor-pointer"
              onClick={() => labelRef.current?.click()}
            >
              <img src={UploadImageIcon} alt="Upload" className="w-[50px]" />

            </div>
          )}
          <div className="h-[40px] mt-2 flex">
            <input type="text" placeholder="Enter file name..." className="w-full border-[1px] border-[#CF3736] px-4" />
          </div>
        </div>
        <div>
          <button className="bg-[#CF3736] text-white flex items-center rounded-md px-2 gap-2 py-1.5" onClick={handleUploadAndSwap}>Swap -1 <img src={coinIcon} className="w-4" alt="" /></button>
        </div>
        <div>
          <div className="flex flex-col items-center ">

            {transferedVideo ? (
              <video
                key={transferedVideo}
                className="min-h-[320px] max-h-[320px] max-w-[250px] min-w-[250px]"
                controls
              >
                <source src={transferedVideo} type="video/mp4" /> Your browser
                does not support the video tag.
              </video>
            ) : originalVideo ? (
              <video
                key={originalVideo.id}
                className="min-h-[320px] max-h-[320px] max-w-[250px] min-w-[250px]"
                controls
              >
                <source src={originalVideo.linkgoc} type="video/mp4" /> Your
                browser does not support the video tag.
              </video>
            ) : (
              <span className="text-gray-300">No Video</span>
            )}
          </div>
          <div className="h-[40px] mt-2 flex justify-center">
            <button className=" bg-[#CF3736] flex items-center px-4 text-white font-semibold rounded-md">Download</button>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <div className="flex items-center justify-between">
          <Link to={'/swap-video'} className="bg-[#00403E] flex items-center rounded-md shadow-xl  px-2 py-1.5 gap-5">
            <h3 className=" shadow-2xl rounded-md text-[#CF3736]  text-xl font-bold ">Suggestions for you</h3>
          </Link>
        </div>
        <div className="mb-12">
          {/* <Swiper
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
        </Swiper> */}
        </div>
      </div>
    </div>
  );
}

export default SwapVideo;
