import { useNavigate } from "react-router-dom";

import DirectLeftIcon from "../../assets/DirectLeftIcon.svg";
import AlbumList from "./components/AlbumList";

function Album() {
  const navigate = useNavigate();

  return (
    <div>
     

      <div className="flex justify-between text-[22px] font-semibold text-red-400 mb-[20px]">
        <span className="text-[16px] xl:text-[20px]">Swapped Images</span>
        <button
          className="flex items-center text-red-400 text-[16px] xl:text-[20px] gap-2"
          onClick={() => navigate("/profile")}
        >
          <span>Go to library</span>
          <img src={DirectLeftIcon} alt="Direct" />
        </button>
      </div>

      <AlbumList />
    </div>
  );
}

export default Album;
