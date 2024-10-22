import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { apiAuth } from "../../../utils/axiosConfig";
import { toast } from "react-toastify";
import { saveAs } from "file-saver";
import DownloadIcon from "../../../assets/material-symbols_download.png";
import BinIcon from "../../../assets/mdi_bin.png";
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
export default function ImagesList() {
    const [currentPage, setCurrentPage] = useState(1);
  const account = useSelector((state) => state.user.account);
    const itemsPerPage = 15;
    const [images, setImages] = useState();
    const getMedias = async () => {
        try {
          const { data: imagesRes } = await apiAuth.get(
            `/get/id_image/id_user?id_user=${account.id_user}`
          );
          if (imagesRes) {
            const resultImages = await paginateData(
              imagesRes.list_sukien_video,
              currentPage,
              itemsPerPage
            );
            setImages(resultImages);
          } else {
            console.log("no response");
          }
        } catch (error) {
          console.log(error);
        }
      };
      const getDisplayedPages = () => {
        const totalPages = images.totalPages;
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
    
      useEffect(() => {
        getMedias();
      }, [currentPage]);
      const handlePageChange = (page) => {
        setCurrentPage(page);
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
  return (
    <>
      <div className="flex flex-wrap justify-around gap-5 w-full ">
                    {images &&
                      images.items.map((item) => (
                        <div key={item.id_saved} className="relative ">
                          <img
                            src={item.link_da_swap}
                            className="max-w-[230px] rounded-md overflow-hidden min-w-[230px] min-h-[220px] max-h-[220px] object-cover"
                            alt=""
                          />
                          <div className="bg-white bg-opacity-75 absolute bottom-0 px-4 py-1.5 w-full flex ">
                            <div className="flex flex-col">
                              <span>{item.id_saved}</span>
                              <span>My first photo</span>
                            </div>
                            <button
                              className="absolute bottom-3 right-2"
                              onClick={() =>
                                handleDownloadImage(item.link_da_swap)
                              }
                            >
                              <img src={DownloadIcon} alt="" />
                            </button>
                          </div>
                          <button className="absolute top-3 right-2">
                            <img src={BinIcon} alt="" />
                          </button>
                        </div>
                      ))}
                  </div>
                  {images && images.totalPages > 1 && (
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
                          className={`w-10 text-[#00403E] ${
                            currentPage === page ? "bg-[#CF3736]" : "bg-white"
                          } mx-1 font-medium text-xl rounded-full`}
                        >
                          {page}
                        </button>
                      ))}
                      <button
                        disabled={currentPage === images.totalPages}
                        onClick={() => handlePageChange(currentPage + 1)}
                        className="w-10 h-10 rounded-full bg-white text-[#00403E] text-xl"
                      >
                        &gt;
                      </button>
                    </div>
                  )}
    </>
  )
}
