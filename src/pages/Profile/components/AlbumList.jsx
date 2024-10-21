import axios from "axios";
import { useEffect, useState } from "react";
import { saveAs } from "file-saver";
import { toast } from "react-toastify";

import EditAvatarIcon from "../../../assets/EditAvatarIcon.svg";
import DeleteIcon from "../../../assets/DeleteIcon.svg";
import DownloadIcon from "../../../assets/DownloadIcon.svg";
import OptionIcon from "../../../assets/OptionIcon.svg";

function AlbumList() {
  const [images, setImages] = useState([]);
  const [imageHover, setImageHover] = useState(null);

  const handleDownload = async (item) => {
    try {
      const link = item.image;
      const fileName = link.split("/").pop();

      await saveAs(link, fileName);
    } catch (error) {
      toast.error("Error: " + error.message);
      console.log({ err: error.message });
    }
  };

  const getSwappedImgs = async () => {
    try {
      let response = await axios.get(
        "https://thinkdiff.us/get/list_image/1?album=1"
      );
      if (response) {
        setImages(response.data?.list_sukien_video);
      } else {
        console.log("no response");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSwappedImgs();
  }, []);

  return (
    <div className="max h-[70vh] overflow-y-scroll overflow-x-hidden rounded-lg flex flex-wrap gap-[20px] box-border pr-3">
      {images.map((item, index) => {
        return (
          <div
            key={index}
            className="relative rounded-2xl w-[calc(100%/2-10px)] sm:w-[calc(100%/3-(20px*2/3))]  md:w-[calc(100%/4-(20px*3/4))] xl:w-[calc(100%/5-(20px*4/5))]"
            onMouseLeave={() => setImageHover(null)}
          >
            <img
              src={item.image}
              alt="Image template"
              loading="lazy"
              className="w-full h-full object-cover"
            />
            <div
              className="absolute top-4 right-4 rounded-full cursor-pointer p-2 bg-white "
              onMouseEnter={() => setImageHover(item.id)}
            >
              <img
                src={OptionIcon}
                alt="Option"
                className="w-[30px] h-auto rounded-full"
              />
              {imageHover === item.id ? (
                <>
                  <div
                    className="absolute top-full right-[10px] bg-white w-[30px] h-[30px]"
                    style={{ clipPath: "polygon(50% 0%, 0 100%, 100% 100%)" }}
                  ></div>
                  <div className="absolute top-[calc(100%+20px)] right-0 rounded-lg bg-white flex flex-col w-[100px] xl:w-[160px] overflow-hidden z-10">
                    <button className="hover:bg-gray-100 flex items-center text-red-400 text-[12px] xl:text-[14px] gap-2 px-2 py-2">
                      <img
                        src={EditAvatarIcon}
                        alt="Direct"
                        className="w-[20px] h-[20px]"
                      />
                      <span className="truncate">Edit avatar</span>
                    </button>
                    <button className="hover:bg-gray-100 flex items-center text-red-400 text-[12px] xl:text-[14px] gap-2 px-2 py-2">
                      <img
                        src={DeleteIcon}
                        alt="Direct"
                        className="w-[20px] h-[20px]"
                      />
                      <span>Delete</span>
                    </button>
                    <button
                      className="hover:bg-gray-100 flex items-center text-red-400 text-[12px] xl:text-[14px] gap-2 px-2 py-2"
                      onClick={() => handleDownload(item)}
                    >
                      <img
                        src={DownloadIcon}
                        alt="Direct"
                        className="w-[20px] h-[20px]"
                      />
                      <span>Download</span>
                    </button>
                  </div>
                </>
              ) : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default AlbumList;
