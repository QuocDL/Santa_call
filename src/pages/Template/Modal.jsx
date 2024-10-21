import { useNavigate } from "react-router-dom";

import ArrowLeftIcon from "../../assets/ArrowLeftIcon.svg";
import ArrowRightIcon from "../../assets/ArrowRightIcon.svg";

function Modal({
  openModal,
  setOpenModal,
  currentMedia,
  setCurrentMedia,
  setPreviousMedia,
  setNextMedia,
}) {
  const navigate = useNavigate();

  if (!openModal || !currentMedia) return null;

  return (
    <div
      className="fixed w-screen h-screen top-0 left-0 flex justify-evenly items-center bg-black bg-opacity-70 z-20"
      onClick={() => {
        setOpenModal(false);
        setCurrentMedia(null);
      }}
    >
      <img
        src={ArrowLeftIcon}
        alt="Previous"
        className="hidden sm:block cursor-pointer hover:opacity-50"
        onClick={(e) => {
          e.stopPropagation();
          setPreviousMedia();
        }}
      />
      <div className="flex flex-col gap-5">
        <div
          className="bg-gray-500 rounded-xl w-[80vw] sm:w-[50vw] lg:w-[40vw] xl:w-[30vw] h-[60vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {currentMedia?.type === "face" ? (
            <img
              src={currentMedia.thumpImage}
              alt="Image"
              className="w-full h-full"
            />
          ) : (
            <video
              key={currentMedia.id}
              className="rounded-xl w-full h-full"
              controls
            >
              <source src={currentMedia.link_video} type="video/mp4" /> Your
              browser does not support the video tag.
            </video>
          )}
        </div>
        <div className="flex justify-between">
          <button
            className="bg-red-400 text-white px-14 py-3 rounded-lg"
            onClick={(e) => {
              e.stopPropagation();
              navigate(
                currentMedia.type === "face"
                  ? `/swap-face/${currentMedia.id_album}`
                  : `/swap-video/${currentMedia.id}?album_id=${1}`
              );
            }}
          >
            Swap {currentMedia.type}
          </button>
        </div>
      </div>
      <img
        src={ArrowRightIcon}
        alt="Next"
        className="hidden sm:block cursor-pointer hover:opacity-50"
        onClick={(e) => {
          e.stopPropagation();
          setNextMedia();
        }}
      />
    </div>
  );
}

export default Modal;
