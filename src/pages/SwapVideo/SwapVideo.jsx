import { useEffect, useId, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { deviceDetect } from "react-device-detect";
import { saveAs } from "file-saver";
import { toast } from "react-toastify";
import NProgress from "nprogress";
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
      console.log('imgUploadSrc',imgUploadSrc);
      

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
    <div>
      <label htmlFor={inputId} ref={labelRef} className="d-none" />
      <input
        id={inputId}
        className="hidden"
        type="file"
        multiple
        accept="image/*"
        onChange={handleInputChange}
      />
    
      <div className="flex flex-col mt-12">
        <div className="text-[22px] font-semibold text-red-400 mb-[20px]">
          <span>Swap videos</span>
        </div>

        {!transferedVideo && (
          <div className="flex flex-col xl:flex-row justify-center items-center bg-white w-full py-10 rounded-lg gap-5 xl:gap-20">
            {uploadImgSrc ? (
              <div className="flex flex-col items-center w-[400px] gap-5">
                <img
                  src={uploadImgSrc}
                  alt="Face Image"
                  className="max-w-full max-h-[400px] object-cover rounded-lg"
                />

                <button
                  className="bg-white border border-red-400 py-2 w-[100px] rounded-lg text-red-400"
                  onClick={() => labelRef.current?.click()}
                >
                  Change
                </button>
              </div>
            ) : (
              <div
                className="flex flex-col justify-center items-center rounded-lg w-[fit-content] px-5 xl:px-20 py-10 border-4 border-gray-300 border-dashed gap-5 cursor-pointer"
                onClick={() => labelRef.current?.click()}
              >
                <img src={UploadImageIcon} alt="Upload" className="w-[50px]" />
                <span className="text-[22] text-red-400">
                  Upload image fit PNG, JPG, JPEG, ...
                </span>
              </div>
            )}

            <div className="flex flex-col justify-between items-center xl:items-start gap-10 xl:gap-20">
              <div className="flex flex-col items-center xl:items-start">
                <span className="uppercase text-gray-400">Download image</span>
                <span className="text-red-400 font-semibold text-[20px]">
                  Your Image Need To Move...
                </span>
              </div>

              <button
                className="bg-red-400 py-4 w-[200px] rounded-lg text-white"
                onClick={handleUploadAndSwap}
              >
                Upload & Swap
              </button>
            </div>
          </div>
        )}

        <div className="flex flex-col lg:flex-row items-center lg:justify-between mt-10 gap-5">
          <div className="flex justify-center items-center w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] xl:w-[550px] xl:h-[550px] bg-gray-500 rounded-lg overflow-hidden">
            {originalImg ? (
              <img
                src={originalImg}
                alt="Image"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-300">No Image</span>
            )}
          </div>
          <img
            src={TransferIcon}
            alt="Transfer"
            className="w-[50px] h-[50px] rotate-90 lg:rotate-0"
          />

          <div className="flex justify-center items-center w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] xl:w-[550px] xl:h-[550px] bg-gray-500 rounded-lg overflow-hidden">
            {transferedVideo ? (
              <video
                key={transferedVideo}
                className="rounded-xl w-full h-full"
                controls
              >
                <source src={transferedVideo} type="video/mp4" /> Your browser
                does not support the video tag.
              </video>
            ) : originalVideo ? (
              <video
                key={originalVideo.id}
                className="rounded-xl w-full h-full"
                controls
              >
                <source src={originalVideo.linkgoc} type="video/mp4" /> Your
                browser does not support the video tag.
              </video>
            ) : (
              <span className="text-gray-300">No Video</span>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center mt-10">
          <button
            className="bg-red-400 py-3 xl:py-4 w-[150px] xl:w-[200px] rounded-lg text-white text-[16px] xl:text-[20px]"
            onClick={handleDownloadVideo}
          >
            Download
          </button>

          <button
            className="flex items-center text-red-400 text-[16px] xl:text-[20px] gap-2"
            onClick={() => navigate("/swap-video")}
          >
            <span>Go to detail</span>
            <img src={DirectLeftIcon} alt="Direct" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default SwapVideo;
