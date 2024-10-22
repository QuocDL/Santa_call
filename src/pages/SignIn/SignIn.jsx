import { zodResolver } from "@hookform/resolvers/zod";
import NProgress from "nprogress";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import MailIocon from "../../assets/MailIcon.png";
import LockIcon from "../../assets/LockIcon.png";

import BgAuth from "../../assets/nen2-100.png";
import { doLogin } from "../../redux/action/userAction";
import { signIn } from "../../services/auth.service";
import { loginSchema } from "../../Validator/AuthValidate";
import GoogleLogo from "../../assets/LogoGoogle.svg";
function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email_or_username: "",
      password: "",
    },
  });

  const submitData = async (data) => {
    console.log(data);
    const formData = new FormData();
    formData.append("email_or_username", data.email_or_username);
    formData.append("password", data.password);

    try {
      NProgress.start();
      const response = await signIn(formData);
      if (response.status === 200) {
        NProgress.done();
        if (response.data.status !== 200) {
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
            <div className="flex flex-col p-5 py-12 bg-white rounded-xl">
              <h1 className="text-2xl text-[#CF3736] text-center font-semibold mt-2">
                Sign In
              </h1>
              <form
                onSubmit={handleSubmit(submitData)}
                className="xl:w-[35vw] w-full mt-6"
              >
                <div className="mx-4 mt-6 max-md:mx-2.5">
                  <div className="flex rounded-lg  border border-gray-400 border-solid overflow-hidden">
                    <div className="bg-[#000000] px-2 flex items-center">
                      <img src={MailIocon} alt="" />
                    </div>
                    <input
                      {...register("email_or_username")}
                      type="text"
                      placeholder="Email@gmail.com"
                      className=" py-4 pl-5 pr-5 w-full text-base font-light text-gray-500 outline-none"
                    />
                  </div>
                  <div className="h-[18px] mt-2">
                    {errors.email_or_username && (
                      <p className="text-red-500 text-xs">
                        {errors.email_or_username.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mx-4 mt-4 max-md:mx-2.5">
                  <div className="flex rounded-lg  border border-gray-400 border-solid overflow-hidden">
                    <div className="bg-[#000000] px-2 flex items-center">
                      <img src={LockIcon} alt="" />
                    </div>
                    <input
                      {...register("password")}
                      type="password"
                      placeholder="*********"
                      className=" py-4 pl-5 pr-5 w-full text-base font-light text-gray-500 outline-none"
                    />
                  </div>
                  <div className="h-[18px] mt-2">
                    {errors.password && (
                      <p className="text-red-500 text-xs">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mx-4  flex flex-wrap items-center justify-between gap-5  ">
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
                    className="text-base font-medium text-[#00B746]"
                  >
                    Forgot your password?
                  </Link>
                </div>

                <div className="mx-4 mt-4">
                  <button
                    type="submit"
                    className="text-rose-100 text-xl text-center font-semibold bg-[#CF3736] px-16  py-5 rounded-xl w-full"
                  >
                    Sign in
                  </button>
                  <p className="mt-2">
                    Don&apos;t have an account?{" "}
                    <Link className="text-[#CF3736]" to={"/signup"}>
                      Sign up
                    </Link>
                  </p>
                </div>
                <div className="mt-6 mx-4 flex flex-col lg:flex-row items-center justify-between gap-5">
                  <button className="px-2 w-full border-[#00403E] border-[1px] py-4 flex items-center gap-5 rounded-md">
                    <img src={GoogleLogo} alt="" />
                    <span className="text-sm  whitespace-nowrap">
                      Sign in with Google
                    </span>
                  </button>
                  <button className="px-2 w-full bg-[#4776D0] py-4 flex items-center gap-5 rounded-md">
                    <img src={GoogleLogo} alt="" />
                    <span className="text-sm whitespace-nowrap">
                      Sign in with FaceBook
                    </span>
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
