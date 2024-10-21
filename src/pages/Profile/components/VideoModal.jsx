import ArrowLeftIcon from "../../../assets/ArrowLeftIcon.svg";
import ArrowRightIcon from "../../../assets/ArrowRightIcon.svg";

function VideoModal({
  openVideoModal,
  setOpenVideoModal,
  currentVideo,
  setCurrentVideo,
  setPreviousVideo,
  setNextVideo,
  downloadVideo,
}) {
  if (!openVideoModal || !currentVideo) return null;

  return (
    <div
      className="fixed w-screen h-screen top-0 left-0 flex justify-evenly items-center bg-black bg-opacity-70 z-20"
      onClick={() => {
        setOpenVideoModal(false);
        setCurrentVideo(null);
      }}
    >
      <img
        src={ArrowLeftIcon}
        alt="Previous"
        className="hidden sm:block cursor-pointer hover:opacity-50"
        onClick={(e) => {
          e.stopPropagation();
          setPreviousVideo();
        }}
      />
      <div className="flex flex-col gap-5">
        <div
          className="bg-gray-500 rounded-xl w-[80vw] sm:w-[50vw] lg:w-[40vw] xl:w-[30vw] h-[60vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <video
            key={currentVideo.id}
            className="rounded-xl w-full h-full"
            controls
          >
            <source src={currentVideo.link_video} type="video/mp4" /> Your
            browser does not support the video tag.
          </video>
        </div>
        <div className="flex justify-between">
          <button
            className="bg-red-400 text-white px-14 py-3 rounded-lg"
            onClick={() => downloadVideo()}
          >
            Download video
          </button>
        </div>
      </div>
      <img
        src={ArrowRightIcon}
        alt="Next"
        className="hidden sm:block cursor-pointer hover:opacity-50"
        onClick={(e) => {
          e.stopPropagation();
          setNextVideo();
        }}
      />
    </div>
  );
}

export default VideoModal;
