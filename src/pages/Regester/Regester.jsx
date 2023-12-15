import { useContext, useEffect, useState } from "react";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import { AuthContex } from "../../AuthProvider/AuthProvider";
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Regester = () => {
  const axiosPublic = useAxiosPublic() // Heare i use some issu . I face tjhe problem . 
  const navigate = useNavigate();
  const { createUserWithEmailAndpass } = useContext(AuthContex);
  // console.log(loginWithEmail);
  const [disabled, setDisabled] = useState(true);
  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    createUserWithEmailAndpass(email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        const userInfo = {
          name: e.target.name.value, 
          email: e.target.email.value,
        };
        
        axiosPublic.post("/users", userInfo)
        .then((res) => {
          if (res.data.insertedId) {
            console.log("user added to the database");

            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "User created successfully.",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate("/");
          }
        });
        navigate("/");
        console.log(user);
        // ...
      })
      .catch((error) => {
        //   const errorCode = error.code;
        //   const errorMessage = error.message;
        console.log(error);
      });
    console.log(email, password);
  };

  const handleValodtedCaptcha = (e) => {
    const user_captcha_value = e.target.value;
    console.log(user_captcha_value);
    if (validateCaptcha(user_captcha_value)) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };
  return (
    <div className="bg-white rounded-lg shadow sm:max-w-md sm:w-full sm:mx-auto sm:overflow-hidden mt-14">
      <h3 className="text-center text-5xl font-bold text-orange-500">
        {" "}
        Regester{" "}
      </h3>
      <div className="px-4 py-8 sm:px-10">
        <div className="relative mt-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm leading-5">
            <span className="px-2 text-gray-500 bg-white">Search criteria</span>
          </div>
        </div>
        <div className="mt-6">
          <form onSubmit={handleLogin}>
            <div className="w-full space-y-6">
              <div className="w-full">
                <div className=" relative">
                  <input
                    type="text"
                    name="name"
                    className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="Your email"
                  />
                </div>
              </div>
              <div className="w-full">
                <div className=" relative">
                  <input
                    type="email"
                    name="email"
                    className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="Your email"
                  />
                </div>
              </div>
              <div className="w-full">
                <div className=" relative">
                  <input
                    type="password"
                    name="password"
                    id="search-form-location"
                    className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="Your password"
                  />
                </div>
              </div>
              <div className="w-full">
                <div className=" relative">
                  <label className="lable">
                    <LoadCanvasTemplate />
                  </label>
                  <input
                    onBlur={handleValodtedCaptcha}
                    // ref={captchaRef}
                    type="text"
                    name="captcha"
                    id="search-form-name"
                    className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="Your name"
                  />
                </div>
              </div>
              <div>
                <span className="block w-full rounded-md shadow-sm">
                  <div className="form-control mt-6">
                    {/* TODO: apply disabled for re captcha */}
                    <input
                      disabled={disabled}
                      className="btn btn-primary"
                      type="submit"
                      value="Login"
                    />
                  </div>
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="px-4 py-6 border-t-2 border-gray-200 bg-gray-50 sm:px-10">
        <p className="text-xs leading-5 text-gray-500">
          This data is displayed for information and can change
        </p>
      </div>
    </div>
  );
};

export default Regester;
