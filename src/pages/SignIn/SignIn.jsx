import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SantaClaus from "../../assets/santa-claus.png";
import GoogleLogo from "../../assets/LogoGoogle.svg";
import BgAuth from "../../assets/bg-auth.png";
import EyeIcon from "../../assets/EyeIcon.svg";
import NProgress from "nprogress";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

import { signIn } from "../../services/auth.service";
import { doLogin } from "../../redux/action/userAction";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (!email) {
    //   toast.error("Email are required!");
    //   return;
    // } else if (!password) {
    //   toast.error("Password are required!");
    //   return;
    // }
    //   else if (password.length < 6) {
    //   toast.warn("Password must have at least 6 characters");
    //   return;
    // } else if (password.length > 32) {
    //   toast.warn("Password can not more than 32 characters");
    //   return;
    // }

    const formData = new FormData();
    formData.append("email_or_username", email);
    formData.append("password", password);    

    try {
      NProgress.start();
      const response = await signIn(formData);
      if (response.status === 200) {
        NProgress.done();
        if (response.data.message === "Invalid Password!!") {
          toast.warn(response.data.message);
          return;
        }
        const account = response.data;
        dispatch(
          doLogin({
            ...account,
            link_avatar: account.link_avatar.replace(
              "/var/www/build_futurelove/",
              "https://futurelove.online/"
            ),
          })
        );
        toast.success("Login success");
        localStorage.setItem("accessToken", response.data.token);
        navigate("/");
      }
    } catch (error) {
      NProgress.done();
      console.log(error);
      toast.error("Login fail");
    }
  };

  const handleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <img
          loading="lazy"
          srcSet={BgAuth}
          className="absolute top-0 object-contain object-top w-full h-full sm:object-cover"
          alt=""
        />
        <div className="relative flex items-center max-md:flex-col">
          <div>
            <img loading="lazy" srcSet={SantaClaus} alt="" />
          </div>
          <div>
            <div className="flex flex-col p-5 bg-white rounded-xl">
              <div className="text-3xl font-semibold text-gray-900">
                Get’s started.
              </div>
              <div className="mt-4 text-lg font-medium">
                <span className="text-gray-500 ">
                  Don’t have an account? &nbsp;
                </span>
                <Link to={"/signup"} className="font-medium text-lime-800">
                  Sign up
                </Link>
              </div>
              
              <div className="flex gap-3.5 mt-6 max-md:justify-center">
                <div className="bg-gray-200 flex lg:w-[230px] h-px my-auto" />
                <div className="text-lg text-gray-500"></div>
                <div className="bg-gray-200 flex lg:w-[230px] h-px my-auto" />
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mx-5 mt-6 max-md:mx-2.5">
                  <div className="mb-2 text-base font-medium text-gray-900">
                    Email
                  </div>
                  <input
                    type="text"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Email@gmail.com"
                    className="w-full py-4 pl-5 pr-12 text-base font-light text-gray-500 border border-gray-400 border-solid rounded-xl"
                  />
                </div>

                <div className="mx-5 mt-6 max-md:mx-2.5">
                  <div className="mb-2 text-base font-medium text-gray-900">
                    Password
                  </div>
                  <div className="relative">
                    {isShowPassword == false ? (
                      <>
                        <input
                          type="password"
                          value={password}
                          onChange={(event) => setPassword(event.target.value)}
                          placeholder="**********"
                          className="w-full py-4 pl-5 pr-12 text-base font-light text-gray-500 border border-gray-400 border-solid rounded-xl"
                        />
                        <img
                          loading="lazy"
                          src={EyeIcon}
                          className="absolute translate-y-1/2 right-4 bottom-1/2"
                          alt=""
                          onClick={() => handleShowPassword()}
                        />
                      </>
                    ) : (
                      <>
                        <input
                          type="text"
                          value={password}
                          onChange={(event) => setPassword(event.target.value)}
                          placeholder="**********"
                          className="w-full py-4 pl-5 pr-12 text-base font-light text-gray-500 border border-gray-400 border-solid rounded-xl"
                        />
                        <img
                          loading="lazy"
                          src={EyeIcon}
                          className="absolute translate-y-1/2 right-4 bottom-1/2"
                          alt=""
                          onClick={() => handleShowPassword()}
                        />
                      </>
                    )}
                  </div>
                </div>

                <div className="mx-2.5 flex items-center justify-between gap-5 mt-11 max-md:flex-wrap max-md:mt-10">
                  <div className="flex justify-between gap-3.5">
                    <input
                      type="checkbox"
                      className="rounded border-[color:var(--4,#B1B5C3)] flex w-4 h-4 my-auto"
                    />
                    <div className="text-base font-medium text-gray-500">
                      Remember me
                    </div>
                  </div>
                  <Link
                    to={"/forgot-password"}
                    className="text-base font-medium text-lime-800"
                  >
                    Forgot your password?
                  </Link>
                </div>

                <div className="mx-5 max-md:mx-2.5">
                  <button
                    type="submit"
                    className="text-rose-100 text-xl text-center font-semibold bg-red-400 mt-[30px] px-16 py-5 rounded-xl w-full"
                  >
                    Sign in
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignIn;
