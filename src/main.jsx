import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App.jsx";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import SignIn from "./pages/SignIn/SignIn.jsx";
import SignUp from "./pages/SignUp/SignUp.jsx";
import SwapFaceDetail from "./pages/SwapDetail/SwapFaceDetail.jsx";
import SwapVideoDetail from "./pages/SwapDetail/SwapVideoDetail.jsx";
import SwapFace from "./pages/SwapFace/SwapFace.jsx";
import SwapVideo from "./pages/SwapVideo/SwapVideo.jsx";
import Template from "./pages/Template/Template.jsx";

import NProgress from "nprogress";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./redux/store";

import "nprogress/nprogress.css";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import ListImageDetail from "./pages/Events/ListImageDetail.jsx";
import Home from "./pages/Home/Home.jsx";
import PrivateRoute from "./routes/PrivateRoute.jsx";

NProgress.configure({
  showSpinner: false,
  trickleSpeed: 100,
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <React.Fragment>
        <BrowserRouter>
          <Routes>
            {/* Route home and others */}
            <Route path="/" element={<App />}>
                <Route index element={<Home/>} />
                <Route path="/template" element={<Template />} />
                <Route path="/swap-face" element={<PrivateRoute><SwapFaceDetail /></PrivateRoute>} />
                <Route path="/swap-video" element={<PrivateRoute><SwapVideoDetail /></PrivateRoute>} />
                <Route path="/event/:eventId" element={<ListImageDetail />} />
                <Route path="/swap-face/:id" element={<PrivateRoute><SwapFace /></PrivateRoute>} />
                <Route path="/swap-video/:id" element={<PrivateRoute><SwapVideo /></PrivateRoute>} />
                <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            </Route>

            {/* Route sign in */}
            <Route path="/signin" element={<SignIn />} />

            {/* Route sign up */}
            <Route path="/signup" element={<SignUp />} />

            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* Route not found */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </BrowserRouter>
      </React.Fragment>
    </PersistGate>
  </Provider>
);
