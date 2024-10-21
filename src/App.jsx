import { Outlet } from "react-router-dom";
import SideBar from "./components/SideBar/SideBar";
import MenuBar from "./components/MenuTopBar/MenuBar";

function App() {
  return (
    <>
      <div className="max-w-screen min-h-screen bg-app  bg-cover">
        <div className="flex justify-center lg:justify-start w-full ">
          <div className="w-0">
            <SideBar />
          </div>
          <div className="w-[100%] mx-4 lg:ml-[6.5rem] overflow-hidden">
            <MenuBar/>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
