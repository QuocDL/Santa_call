const LibraryList = ({ type, medias, handleView }) => {
  return (
    <div className="flex flex-col rounded-lg p-10 bg-white gap-10 max-h-[70vh] overflow-y-scroll">
      {medias.map((item, index) => (
        <div
          key={index}
          className="flex flex-col items-center md:flex-row gap-8 md:gap-12"
        >
          <div className="w-full h-[auto] md:w-[50%] md:h-[50%] rounded-lg overflow-hidden">
            {
              type=="image"?
              (<img
              src={item.link_da_swap}
              alt={type}
              className="w-full h-full object-cover"
              />)
              :
              (<video controls>
                <source src={item.link_da_swap}  type="video/mp4"></source>
              </video>)
            }
          </div>

          <div className="truncate capitalize flex flex-col justify-center w-[fit-content] gap-2">
            <span className="text-[16px] text-gray-400">Christmas Day</span>
            <span className="truncate-2 capitalize text-[20px] text-red-400 font-normal">
              Your Image Need To Move...
            </span>
            <span className="truncate-2 capitalize text-[20px] font-medium text-green-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio
              sapiente ipsam molestiae perferendis fugit, officia quo, obcaecati
              quae ut reiciendis quos odit distinctio, beatae commodi nihil
              iste? Explicabo, commodi repellat.
            </span>
            <button
              className="capitalize bg-red-400 px-2 py-3 w-[100px] xl:w-[150px] rounded-lg text-white text-[14px] xl:text-[16px]"
              onClick={() => handleView(item)}
            >
              View
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LibraryList;
