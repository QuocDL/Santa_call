import BinIcon from "../../../assets/mdi_bin.png";
import DownloadIcon from "../../../assets/material-symbols_download.png";
import PlayIcon from "../../../assets/PlayIcon.png";
import { useEffect, useState } from "react";
import { saveAs } from "file-saver";
import { toast } from "react-toastify";
import { apiAuth } from "../../../utils/axiosConfig";
import { useSelector } from "react-redux";
import VideoModal from "./VideoModal";
function paginateData(data, page, itemsPerPage) {
  const reversedData = data.reverse();
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = reversedData.slice(startIndex, endIndex);

  return {
    currentPage: page,
    totalPages: Math.ceil(reversedData.length / itemsPerPage),
    items: paginatedData,
  };
}
export default function VideoList() {
  const [openVideoModal, setOpenVideoModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [videos, setVideos] = useState();
  const [currentVideo, setCurrentVideo] = useState(null);
  const account = useSelector((state) => state.user.account);
  const itemsPerPage = 15;
  const getMedias = async () => {
    try {
      const { data: videoRes } = await apiAuth.get(
        `get/id_video/id_user?id_user=${account.id_user}`
      );
      if (videoRes) {
        const resultVideo = await paginateData(
          videoRes.list_sukien_video,
          currentPage,
          itemsPerPage
        );
        setVideos(resultVideo);
      } else {
        console.log("no response");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleViewVideo = (item) => {
    setOpenVideoModal(true);
    setCurrentVideo(() => item);
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const downloadVideo = async () => {
    if (!currentVideo) return;

    try {
      const link = currentVideo.link_da_swap;
      const fileName = link.split("/").pop();
      await saveAs(link, fileName);
    } catch (error) {
      toast.error("Error: " + error.message);
      console.log({ err: error.message });
    }
  };
  const getDisplayedPages = () => {
    const totalPages = videos.totalPages;
    const displayedPages = [];
    displayedPages.push(1);
    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);
    if (startPage > 2) {
      displayedPages.push("...");
    }
    for (let i = startPage; i <= endPage; i++) {
      displayedPages.push(i);
    }
    if (totalPages > 1 && !displayedPages.includes(totalPages)) {
      displayedPages.push(totalPages);
    }
    return displayedPages;
  };
  const setNextVideo = () => {
    if (!currentVideo) return;

    const previousVideo = videos.items.find(
      (item, index) =>
        index - 1 ===
        videos.items.indexOf(videos.items.find((item) => item.id_saved === currentVideo.id_saved))
    );
    setCurrentVideo(previousVideo);
  };

  const setPreviousVideo = () => {
    if (!currentVideo) return;

    const previousVideo = videos.items.find(
      (item, index) =>
        index + 1 ===
        videos.items.indexOf(videos.items.find((item) => item.id_saved === currentVideo.id_saved))
    );
    setCurrentVideo(previousVideo);
  };
  useEffect(() => {
    getMedias();
  }, [currentPage])
  return (
    <>
      <div className="flex flex-wrap justify-around gap-5 w-full ">
        {videos ?
          videos.items.map((item) => (
            <div key={item.id_saved} className="relative ">
              <img
                src={item.link_image}
                className="max-w-[230px] rounded-md overflow-hidden min-w-[230px] min-h-[220px] max-h-[220px] object-cover"
                alt=""
              />
              <div className="bg-white bg-opacity-75 absolute bottom-0 px-4 py-1.5 w-full flex ">
                <div className="flex flex-col">
                  <span>{item.id_saved}</span>
                  <span>{item.ten_su_kien}</span>
                </div>
                <button
                  className="absolute bottom-3 right-2"
                  onClick={() => downloadVideo(item)}
                >
                  <img src={DownloadIcon} alt="" />
                </button>
              </div>
              <button className="absolute top-3 right-2">
                <img src={BinIcon} alt="" />
              </button>
              <button
                className="absolute -translate-y-[50%] top-[50%] right-[50%] translate-x-[50%]"
                onClick={() => handleViewVideo(item)}
              >
                <img src={PlayIcon} alt="" />
              </button>
            </div>
          )) : <>
            <div className="flex justify-center w-full h-full">
              <p className="text-red-500 text-xl font-medium">Not found data</p>
            </div></>}
      </div>
      {videos && videos.totalPages > 1 && (
        <div className="flex justify-center w-full mt-4">
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className="w-10 h-10 rounded-full bg-white text-[#00403E] text-xl"
          >
            &lt;
          </button>
          {getDisplayedPages().map((page, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(page)}
              className={`w-10 text-[#00403E] ${currentPage === page ? "bg-[#CF3736]" : "bg-white"
                } mx-1 font-medium text-xl rounded-full`}
            >
              {page}
            </button>
          ))}
          <button
            disabled={currentPage === videos.totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className="w-10 h-10 rounded-full bg-white text-[#00403E] text-xl"
          >
            &gt;
          </button>
        </div>
      )}
      <VideoModal
        openVideoModal={openVideoModal}
        setOpenVideoModal={setOpenVideoModal}
        currentVideo={currentVideo}
        setCurrentVideo={setCurrentVideo}
        setNextVideo={setNextVideo}
        setPreviousVideo={setPreviousVideo}
        downloadVideo={downloadVideo}
      />
    </>
  );
}
