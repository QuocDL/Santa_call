import { useEffect, useId, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import NProgress from "nprogress";
import axios from "axios";
import { uploadImg, swapAlbumImages } from "../../services/swap.service";
import UploadImageIcon from "../../assets/UploadImageIcon.svg";
import coinIcon from "../../assets/image 2.png";
import { SwiperSlide, Swiper } from "swiper/react";
import { useSelector } from "react-redux";
import ProductCard from "../../components/ProductCard/ProductCard";

const MAX_FILE_SIZE = 10485760;

function SwapFace() {
  const [file, setFile] = useState(null);
  const [idEvent, setIdEvent] = useState(null);
  const [uploadImgSrc, setUploadImgSrc] = useState(null);
  const [transferedImgSrc, setTransferedImgSrc] = useState(null);
  const [baseName, setBaseName] = useState("Loading...");
  const [listImages, setImages] = useState(null);
  const navigate = useNavigate();
  const labelRef = useRef();
  const inputId = useId();
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

  const { id } = useParams();
  const searchParams = new URLSearchParams(location.search);
  const album_id = searchParams.get("album_id");
  const fetchImages = async () => {
    const convertNumberAlbum = Number(album_id);
    const { data } = await axios.get(
      `https://api.funface.online/get/list_image/1?album=${
        convertNumberAlbum === 23 ? convertNumberAlbum : convertNumberAlbum + 1
      }`
    );
    setImages(data.list_sukien_video);
    console.log(data);
  };
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

      const swapResponse = await swapAlbumImages(
        album_id,
        imgUploadSrc,
        idUser
      );

      if (!swapResponse) throw new Error("Swap face fail");

      const data = swapResponse.data;

      setTransferedImgSrc(data.sukien_2_image.link_da_swap);
      setIdEvent(data.sukien_2_image.id_all_sk);
    } catch (error) {
      toast.error("Fail: " + error.message);
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

      console.log(response);
      const images = response.data.list_sukien_video;
      console.log("images", images);

      const baseImg = images.find((item) => {
        return item.id === Number(id);
      })?.image;
      const baseName = images.find((item) => {
        return item.id === Number(id);
      })?.thongtin;
      if (!baseImg) throw new Error("Base image not found");
      if (!baseName) throw new Error("Base image not found");
      setBaseName(baseName);
      setTransferedImgSrc(baseImg);
    } catch (error) {
      toast.error("Can't find album to swap");
      console.error("Error fetching base image:", error.message);
      navigate("/swap-face");
    }
  };

  const handleClickViewAlbum = () => {
    if (idEvent) {
      navigate(`/event/${idEvent}`);
    } else {
      toast.warning("You need swap image first!");
    }
  };
  useEffect(() => {
    getBaseImg();
    fetchImages();
  }, [id]);

  return (
    <div className="mt-6">
      <div className="flex mb-4">
        <div className="bg-[#00403E] py-1.5 px-3 rounded-md">
          <h3 className="text-[#CF3736] font-semibold text-xl">
            Swap Image &gt; {baseName}
          </h3>
        </div>
      </div>
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
            <input
              type="text"
              placeholder="Enter file name..."
              className="w-full border-[1px] border-[#CF3736] px-4"
            />
          </div>
        </div>
        <div>
          <button
            className="bg-[#CF3736] text-white flex items-center rounded-md px-2 gap-2 py-1.5"
            onClick={handleUploadAndSwap}
          >
            Swap -1 <img src={coinIcon} className="w-4" alt="" />
          </button>
        </div>
        <div>
          <div className="flex flex-col items-center ">
            <img
              src={transferedImgSrc}
              alt="Face Image"
              height={320}
              className="min-h-[320px] max-h-[320px] max-w-[250px] min-w-[250px]  object-cover bg-white rounded-lg"
            />
          </div>
          <div className="h-[40px] mt-2 flex justify-center">
            <button
              onClick={handleClickViewAlbum}
              className=" bg-[#CF3736] flex items-center px-4 text-white font-semibold rounded-md"
            >
              View Album
            </button>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <div className="flex items-center justify-between">
          <Link
            to={"/swap-video"}
            className="bg-[#00403E] flex items-center rounded-md shadow-xl  px-2 py-1.5 gap-5"
          >
            <h3 className=" shadow-2xl rounded-md text-[#CF3736]  text-xl font-bold ">
              Suggestions for you
            </h3>
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
            {listImages ? (
              listImages.map((item, index) => {
                return (
                  <SwiperSlide key={index} className="cursor-pointer">
                    <ProductCard
                      image={item.image}
                      title={item.thongtin}
                      link={`/swap-face/${item.id}?album_id=${item.IDCategories}`}
                    />
                  </SwiperSlide>
                );
              })
            ) : (
              <>
                <div className="h-[220px] flex justify-center items-center">
                  <p className="text-center text-xl text-[#CF3736]">
                    Not found data
                  </p>
                </div>
              </>
            )}
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default SwapFace;
