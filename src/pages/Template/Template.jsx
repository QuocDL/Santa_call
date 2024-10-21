import { useEffect, useState } from "react";
import axios from "axios";

import SearchBar from "../../components/SearchBar/SearchBar";
import Modal from "./Modal";
import videoIconActive from "../../assets/videoIconActive.svg";
import videoIcon from "../../assets/videoIcon.svg";
import galaryIconActive from "../../assets/galleryIconActive.svg";
import galaryIcon from "../../assets/galleryIcon.svg";
import ListTemplates from "./ListTemplates";

function Template() {
  const [searchKey, setSearchKey] = useState("");
  const [videos, setVideos] = useState([]);
  const [images, setImages] = useState([]);
  const [tabItem, setTabItem] = useState("images");
  const [hoveredtabItem, setHoveredtabItem] = useState(null);
  const [currentMedia, setCurrentMedia] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const handleSearch = () => {
    console.log(searchKey);
  };

  const handleClickTemplate = (item) => {
    const type = tabItem === "images" ? "face" : "video";
    setOpenModal(true);
    console.log(item)
    setCurrentMedia({ type, ...item });
  };

  const setPreviousMedia = () => {
    if (!currentMedia) return;

    const previousMedia =
      tabItem === "images"
        ? images.find(
            (item, index) =>
              index + 1 ===
              images.indexOf(
                images.find((item) => item["id "] === currentMedia["id "])
              )
          )
        : videos.find(
            (item, index) =>
              index + 1 ===
              videos.indexOf(videos.find((item) => item.id === currentMedia.id))
          );

    setCurrentMedia(
      previousMedia ? { type: currentMedia.type, ...previousMedia } : null
    );
  };

  const setNextMedia = () => {
    if (!currentMedia) return;

    const nextMedia =
      tabItem === "images"
        ? images.find((item, index) => {
            if (currentMedia["id "] === images[index - 1]?.["id "]) return item;
          })
        : videos.find((item, index) => {
            if (currentMedia.id === videos[index - 1]?.id) return item;
          });

    setCurrentMedia(
      nextMedia ? { type: currentMedia.type, ...nextMedia } : null
    );
  };

  const getMedias = async () => {
    try {
      let response = await axios.get(
        tabItem === "images"
          ? "https://api.funface.online/get/list_album?server=santa"
          : "https://databaseswap.mangasocial.online/lovehistory/listvideo/santa/1?category=3"
      );
      if (response) {
        tabItem === "images"
          ? setImages(response.data?.list_sukien_video)
          : setVideos(response.data?.list_sukien_video);
      } else {
        console.log("no response");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMedias();
  }, [tabItem]);

  return (
    <div>
      <SearchBar
        searchKey={searchKey}
        setSearchKey={setSearchKey}
        handleSearch={handleSearch}
      />

      <div className="flex gap-4 mt-12">
        <div
          className={`flex items-center gap-2 p-3 sm:p-4 rounded-lg ${
            tabItem === "images" || hoveredtabItem === "images"
              ? "bg-red-400 text-rose-100"
              : "bg-white text-red-400"
          }`}
        >
          <img
            src={
              tabItem === "images" || hoveredtabItem === "images"
                ? galaryIconActive
                : galaryIcon
            }
            alt="Images"
            className="w-[24px] h-[24px]"
          />
          <button
            className="text-sm sm:text-base"
            onClick={() => setTabItem("images")}
            onMouseEnter={() => setHoveredtabItem("images")}
            onMouseLeave={() => setHoveredtabItem(null)}
          >
            Images
          </button>
        </div>
        <div
          className={`flex items-center gap-2 p-3 sm:p-4 rounded-lg ${
            tabItem === "videos" || hoveredtabItem === "videos"
              ? "bg-red-400 text-rose-100"
              : "bg-white text-red-400"
          }`}
        >
          <img
            src={
              tabItem === "videos" || hoveredtabItem === "videos"
                ? videoIconActive
                : videoIcon
            }
            alt="Videos"
            className="w-[24px] h-[24px]"
          />
          <button
            className="text-sm sm:text-base"
            onClick={() => setTabItem("videos")}
            onMouseEnter={() => setHoveredtabItem("videos")}
            onMouseLeave={() => setHoveredtabItem(null)}
          >
            Videos
          </button>
        </div>
      </div>
      <div className="pr-[20px] mt-[30px] max-h-[80vh]">
        <ListTemplates
          tabItem={tabItem}
          medias={tabItem === "images" ? images : videos}
          handleClickTemplate={handleClickTemplate}
        />
      </div>
      <Modal
        openModal={openModal}
        setOpenModal={setOpenModal}
        currentMedia={currentMedia}
        setCurrentMedia={setCurrentMedia}
        setPreviousMedia={setPreviousMedia}
        setNextMedia={setNextMedia}
      />
    </div>
  );
}

export default Template;
