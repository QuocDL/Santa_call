import { useState } from "react";
import { toast } from "react-toastify";

import { resetPassword } from "../../services/auth.service";
import SantaClaus from "../../assets/santa-claus.png";
import BgAuth from "../../assets/bg-auth.png";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleResetPassword = async () => {
    try {
      if (!checkEmail()) throw new Error("Invalid email input");

      const formData = new FormData();
      formData.append("email", email);

      const response = await resetPassword(formData);

      if (response.status === 200) {
        toast.success("Password reset successfully and sent to your email!");
        navigate("/signin");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const checkEmail = () => {
    if (
      !email ||
      !email.trim() ||
      !/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)
    )
      return false;
    return true;
  };

  return (
    <>
      <div className="flex min-h-screen justify-center items-center">
        <img
          loading="lazy"
          srcSet={BgAuth}
          className="absolute h-full w-full object-contain sm:object-cover top-0 object-top"
        />
        <div className="relative flex items-center max-md:flex-col">
          <div>
            <img loading="lazy" srcSet={SantaClaus} />
          </div>
          <div>
            <div className="bg-white flex flex-col p-5 rounded-xl">
              <div className="text-gray-900 text-3xl font-semibold">
                Forgot password
              </div>
              <div className="text-lg font-medium mt-4">
                <span className=" text-gray-500">
                  Enter your email account to reset your password
                </span>
              </div>

              <div className="mt-6">
                <div className="text-gray-900 text-base font-medium mb-2">
                  Email
                </div>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email@gmail.com"
                  className="text-gray-500 text-base font-light border w-full pl-5 pr-12 py-4 rounded-xl border-solid border-gray-400"
                />
              </div>

              <button
                onClick={() => handleResetPassword()}
                className="text-rose-100 text-xl text-center font-semibold bg-red-400 justify-center items-center mt-[30px] px-16 py-5 rounded-xl"
              >
                Reset Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
