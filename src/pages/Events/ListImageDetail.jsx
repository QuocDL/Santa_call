import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { apiAuth } from '../../utils/axiosConfig'
import NProgress from "nprogress";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { toast } from "react-toastify";
import JSZipUtils from "jszip-utils";
export default function ListImageDetail() {
   const user = useSelector(state => state.user.account)
   const { eventId } = useParams()
  const zip = new JSZip();
   const [eventList, setEventList] = useState(null)
   const [currentPage, setCurrentPage] = useState(1)
   const [currentList, setCurrentList] = useState(null)
   const itemsPerPage = 10;
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
        if (currentList < 1)
          throw new Error("No swapped image found");
  
        let count = 0;
        let zipFileName = "images.zip";
        for (const img of currentList) {
          const fileName = img.link_da_swap.split("/").pop();
  
          const file = await JSZipUtils.getBinaryContent(img);
          zip.file(fileName, file, { binary: true });
          count++;
          if (count === currentList.length) {
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
   function paginateData(data, page, itemsPerPage) {
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const paginatedData = data.slice(startIndex, endIndex);

      return {
         currentPage: page,
         totalPages: Math.ceil(data.length / itemsPerPage),
         items: paginatedData
      };
   }
   const fetchDetailEvent = async () => {
      try {
         const { data } = await apiAuth.get(`/get/list_2_image/id_image_swap_all_id_sk?id_user=${user.id_user}&id_sk=${eventId}`)
         if (data) {
            const result = await paginateData(data.id_su_kien_swap_image, currentPage, itemsPerPage);
            setEventList(result)
            setCurrentList(data.id_su_kien_swap_image)
         }
      } catch (error) {
         console.log(error)
      }
   }

   useEffect(() => {
      fetchDetailEvent()
   }, [eventId, currentPage])
   const handlePageChange = (page) => {
      setCurrentPage(page);
   }
   const getDisplayedPages = () => {
      const totalPages = eventList.totalPages;
      const displayedPages = [];

      let startPage = Math.max(1, currentPage - 1);
      let endPage = Math.min(totalPages, currentPage + 1);

      // Nếu currentPage gần với tổng số trang, điều chỉnh startPage
      if (currentPage === totalPages) {
         startPage = Math.max(1, totalPages - 2);
      } else if (currentPage === 1) {
         endPage = Math.min(3, totalPages);
      }

      for (let i = startPage; i <= endPage; i++) {
         displayedPages.push(i);
      }
      
      return displayedPages;
   };
   return (
      <> 
        <div className='flex gap-4'>
        <button className="bg-[#CF3736] text-white flex items-center rounded-md px-2 gap-2 py-1.5 mt-6" onClick={handleDownloadAllImages}>Download all</button>
        <Link to={'/swap-face'} className="bg-[#CF3736] text-white flex items-center rounded-md px-2 gap-2 py-1.5 mt-6" >Swap more</Link>
        </div>
      
       <div className='flex flex-wrap gap-5 mb-8 mt-4'>
         {eventList && eventList.items.map((item, index) => {
            return (
                  <div key={item.id_saved} className='relative group'>
                     <img src={item.link_da_swap} className='max-w-[220px] rounded-md overflow-hidden min-w-[220px] min-h-[320px] max-h-[320px] object-cover' alt="" />
                     <button className="bg-[#CF3736] group-hover:opacity-100 duration-500 opacity-0 absolute bottom-2 left-1 text-white flex items-center rounded-md px-2 gap-2 py-1.5 mt-6" onClick={()=> handleDownloadImage(item.link_da_swap)}>Download</button>

                  </div>
            )
         })}
         {eventList && eventList.totalPages > 1 && (
            <div className='flex justify-center w-full mt-4'>
               <button
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                  className='w-10 h-10 rounded-full bg-white text-[#00403E] text-xl'
               >
                  &lt;
               </button>
               {getDisplayedPages().map(page => (
                  <button
                     key={page}
                     onClick={() => handlePageChange(page)}
                     className={`w-10 text-[#00403E] ${currentPage === page ? 'bg-[#CF3736]' : 'bg-white'} mx-1 font-medium text-xl rounded-full`}
                  >
                     {page}
                  </button>
               ))}
               <button
                  disabled={currentPage === eventList.totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                  className='w-10 h-10 rounded-full bg-white text-[#00403E] text-xl'

               >
                  &gt;
               </button>
            </div>
         )}
      </div></>
   )
}
