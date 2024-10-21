import MenuBar from "../MenuBar/MenuBar";
import SearchIcon from "../../assets/SearchIcon.svg";

function SearchBar({ searchKey, setSearchKey, handleSearch }) {
  return (
    <div className="searchBar flex items-center mt-5 gap-2 sm:gap-4">
      <MenuBar />
      <div className="search relative">
        <img
          src={SearchIcon}
          alt="Search"
          className="absolute top-[10px] left-3 cursor-pointer"
          onClick={() => handleSearch()}
        />
        <input
          type="text"
          placeholder="Search or type"
          value={searchKey}
          className="placeholder-gray-400 placeholder-opacity-75 text-xs sm:text-sm w-[40vw] h-[40px] pl-[45px] pt-[3px] pb-[3px] text-red-400 rounded-lg outline-none"
          onChange={(event) => setSearchKey(event.target.value)}
        />
      </div>
    </div>
  );
}

export default SearchBar;
