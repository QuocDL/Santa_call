import Notification from "./components/Notification/Notification";
import { Outlet } from "react-router-dom";
import SideBar from "./components/SideBar/SideBar";

function App() {
  return (
    <>
      <div className="max-w-screen min-h-screen bg-app  bg-cover">
        <div className="flex justify-center lg:justify-start w-full gap-10 ">
          <div className="hidden lg:block">
            <SideBar />
          </div>
          <div className="w-[80vw] md:w-[70vw] lg:w-[65vw] ml-16 xl:w-[75vw]">
            <Outlet />
          </div>
          <Notification />
        </div>
      </div>
    </>
  );
}

export default App;
