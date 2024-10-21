import { useEffect, useId, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import NProgress from "nprogress";
import JSZip from "jszip";
import JSZipUtils from "jszip-utils";
import { saveAs } from "file-saver";
import axios from "axios";
import { uploadImg, swapAlbumImages } from "../../services/swap.service";
import UploadImageIcon from "../../assets/UploadImageIcon.svg";
import TransferIcon from "../../assets/TransferIcon.svg";
import DirectLeftIcon from "../../assets/DirectLeftIcon.svg";
import { useSelector } from "react-redux";

const MAX_FILE_SIZE = 10485760;

function SwapFace() {
  const [file, setFile] = useState(null);
  const [originalImg, setOriginalImg] = useState(null);
  const [uploadImgSrc, setUploadImgSrc] = useState(null);
  const [transferedImgSrc, setTransferedImgSrc] = useState(null);
  const [listSrcTransfered, setListSrcTransfered] = useState([]);
  const navigate = useNavigate();
  const labelRef = useRef();
  const inputId = useId();
  const zip = new JSZip();

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
  const idUser = useSelector((state) => state.user.account.id_user);
  const handleUploadAndSwap = async () => {
    try {
      if (!file) throw new Error("File upload not found");

      const formData = new FormData();
      formData.append("src_img", file);

      NProgress.start();
      const uploadResponse = await uploadImg(formData);

      if (!uploadResponse) throw new Error("Upload image fail");

      const imgUploadSrc = uploadResponse.data;

      const swapResponse = await swapAlbumImages(album_id, imgUploadSrc, idUser);

      if (!swapResponse) throw new Error("Swap face fail");

      const data = swapResponse.data;

      setOriginalImg(
        data.sukien_2_image.link_src_goc.replace(
          "/var/www/build_futurelove/",
          "https://futurelove.online/"
        )
      );
      setListSrcTransfered(data["link anh da swap"]);
      setTransferedImgSrc(data.sukien_2_image.link_da_swap);
    } catch (error) {
      toast.error("Fail: " + error.message);
      console.log({ err: error.message });
    }
    NProgress.done();
  };

  const handleDownloadImage = async (img) => {
    try {
      const fileName = img.split("/").pop();

      await saveAs(img, fileName);
    } catch (error) {
      toast.error("Error: " + error.message);
      console.log({ err: error.message });
    }
  };

  const handleDownloadAllImages = async () => {
    NProgress.start();
    try {
      if (listSrcTransfered.length < 1)
        throw new Error("No swapped image found");

      let count = 0;
      let zipFileName = "images.zip";
      for (const img of listSrcTransfered) {
        const fileName = img.split("/").pop();

        const file = await JSZipUtils.getBinaryContent(img);
        console.log(1);
        zip.file(fileName, file, { binary: true });
        count++;
        if (count === listSrcTransfered.length) {
          zip.generateAsync({ type: "blob" }).then((content) => {
            saveAs(content, zipFileName);
          });
        }
      }
    } catch (error) {
      toast.error("Error: " + error.message);
      console.log({ err: error.message });
    }
    NProgress.done();
  };

  const getBaseImg = async () => {
    try {
      if (!id) throw new Error("No ID provided");
  
      const response = await axios.get(
        `https://api.funface.online/get/list_image/1?album=${album_id}`
      );
  
    
      console.log(response)
      const images = response.data.list_sukien_video;
  console.log('images',images);
  
    const baseImg = images.find(
      (item) => {
        return item.id === Number(id);
      }
    )?.image;
    
    console.log('baseImg', baseImg);
      if (!baseImg) throw new Error("Base image not found");
  
      setTransferedImgSrc(baseImg);
    } catch (error) {
      toast.error("Can't find album to swap");
      console.error("Error fetching base image:", error.message);
      // navigate("/swap-face");
    }
  };

  useEffect(() => {
    getBaseImg();
  }, []);

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
     
      <div className="flex flex-col">
        <div className="text-[22px] font-semibold text-red-400 mb-[20px]">
          <span>Upload your face</span>
        </div>

        {listSrcTransfered?.length > 0 ? (
          <div className="max-h-[40vh] flex flex-wrap gap-[20px] box-border pr-4 py-10 rounded-lg overflow-y-scroll">
            {listSrcTransfered.map((item, index) => (
              <div
                key={index}
                className="rounded-2xl overflow-hidden cursor-pointer w-[calc(100%/2-10px)] sm:w-[calc(100%/3-(20px*2/3))]  md:w-[calc(100%/4-(20px*3/4))] xl:w-[calc(100%/5-(20px*4/5))]"
                onClick={() => handleDownloadImage(item)}
              >
                <img
                  src={item}
                  alt="Image swapped"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col xl:flex-row justify-center items-center bg-white w-full px-10 sm:px-4 py-10 rounded-lg gap-5 xl:gap-20">
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
                <span className="text-[22] text-red-400 text-center">
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
            {transferedImgSrc ? (
              <img
                src={transferedImgSrc}
                alt="Image"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-300">No Image</span>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center mt-10">
          <button
            className="bg-red-400 py-3 xl:py-4 w-[150px] xl:w-[200px] rounded-lg text-white text-[16px] xl:text-[20px]"
            onClick={handleDownloadAllImages}
          >
            Download
          </button>

          <button
            className="flex items-center text-red-400 text-[16px] xl:text-[20px] gap-2"
            onClick={() => navigate("/swap-face")}
          >
            <span>Go to detail</span>
            <img src={DirectLeftIcon} alt="Direct" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default SwapFace;
