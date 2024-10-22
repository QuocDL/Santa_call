import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";

function SwapVideoDetail() {
  const [response, setResponse] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch data
  const fetchImages = async () => {
    const { data } = await axios.get(`https://api.funface.online/get/list_video/all_santa/12?page=${currentPage}`);
    if (data) {
      setResponse(data);
    }
  };

  useEffect(() => {
    fetchImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  // Dynamic pagination display function
  const getDisplayedPages = () => {
    const totalPages = response.totalPage;
    const displayedPages = [];
    displayedPages.push(1);
    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);
    if (startPage > 2) {
      displayedPages.push('...'); 
    }
    for (let i = startPage; i <= endPage; i++) {
      displayedPages.push(i);
    }
    if (totalPages > 1 && !displayedPages.includes(totalPages)) {
      displayedPages.push(totalPages);
    }
    return displayedPages;
  };

  const handlePageChange = (page) => {
    if (page === '...') {
      setCurrentPage(currentPage);
    } else {
      setCurrentPage(page);
    }
  };

  return (
    <div className="my-8">
        <div className="flex items-center">
          <div className="bg-[#00403E] flex items-center rounded-md shadow-xl px-2 py-1.5 gap-5">
            <h3 className="shadow-2xl rounded-md text-[#CF3736] text-xl font-bold">Swap Image</h3>
            <span className="text-[#CF3736] text-2xl">&gt;</span>
          </div>
        </div>
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 justify-center px-5 mt-6">
            {response && response.list_sukien_video.map(item => (
              <ProductCard key={item.id} image={item.IDCategories} link={`/swap-video/${item.id}`} title={item.noidung} videoUrl={item.linkgoc} />
            ))}
          </div>
          {response && response.totalPage > 1 && (
            <div className='flex justify-center w-full mt-4'>
              <button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className='w-10 h-10 rounded-full bg-white text-[#00403E] text-xl'
              >
                &lt;
              </button>
              {getDisplayedPages().map((page, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(page)}
                  className={`w-10 text-[#00403E] ${currentPage === page ? 'bg-[#CF3736]' : 'bg-white'} mx-1 font-medium text-xl rounded-full`}
                >
                  {page}
                </button>
              ))}
              <button
                disabled={currentPage === response.totalPage}
                onClick={() => handlePageChange(currentPage + 1)}
                className='w-10 h-10 rounded-full bg-white text-[#00403E] text-xl'
              >
                &gt;
              </button>
            </div>
          )}
        </div>
    </div>
  );
}

export default SwapVideoDetail;


