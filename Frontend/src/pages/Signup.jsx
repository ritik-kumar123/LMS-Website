import React, { useState } from "react";
import logo from "../assets/logo.jpg";
import google from "../assets/google.jpg";
import { IoEyeOutline } from "react-icons/io5";
import { IoEye } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { serverUrl } from "../App";
import {ClipLoader} from "react-spinners"
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
// import {signInWithPopup} from "firebase/auth";
// import { auth, provider } from "../utils/firebase";
function Signup() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [role, setRole] = useState("student");
  const [loading,setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    setLoading(true)
    try 
    {
      const result = await axios.post(
        serverUrl + "/api/auth/signup",
        {
        name:data.name,
        email:data.email,
        password:data.password,
        role,
        },
        { withCredentials: true }
      );
      dispatch(setUserData(result.data));
      setLoading(false)
      navigate("/")
      toast.success("Signup successfully")
    }
    catch (error) 
    {
      dispatch(setUserData(null));
        console.log(error)
        setLoading(false)
      toast.error(error.response.data.message);
    }
  };


  // const googleSignup = async()=>
  // {
  //   try{
  //       const response = await signInWithPopup(auth,provider);
  //       console.log(response)
  //       let user = response.user
  //       let name = user.displayName
  //       let email = user.email
  //       const result = await axios.post(serverUrl+"/api/auth/googleauth",
  //         {
  //           name,
  //           email,
  //           role
  //         },
  //         {withCredentials:true})
  //          dispatch(setUserData(result.data));
  //          navigate("/");
  //          toast.success("Signup successfully");
  //   }
  //   catch(error)
  //   {
  //       console.log(error)
  //     toast.error(error.response.data.message);

  //   }
  // }


  return (
    <div className="bg-[rgb(221,219,219)] w-[100vw] h-[100vh] flex items-center justify-center">
      <form className="w-[90%] md:w-200 h-150 bg-[white] shadow-xl rounded-2xl flex" onSubmit={(e)=>{e.preventDefault()}}>
        {/* left div */}

        <div className="md:w-[50%] w-[100%] flex flex-col items-center justify-center gap-3">
          <div>
            <h1 className="font-semibold text-black text-2xl">
              Let's get started
            </h1>
            <h2 className="text-[#999797] text-[18px]">Create your account</h2>
          </div>
          <div className=" flex flex-col gap-1 w-[80%] items-start justify content px-3">
            <label htmlFor="name" className="font-semibold">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={handleChange}
              value={data.name}
              className="border-1 w-[100%] h-[35px] 
            border-[#e7e6e6] text-[15px] px-[20px]"
              placeholder="Your Name"
            />
          </div>
          <div className=" flex flex-col gap-1 w-[80%] items-start justify content px-3">
            <label htmlFor="email" className="font-semibold">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleChange}
              value={data.email}
              className="border-1 w-[100%] h-[35px] 
            border-[#e7e6e6] text-[15px] px-[20px]"
              placeholder="Your Email"
            />
          </div>
          <div className=" flex flex-col gap-1 w-[80%] items-start justify content px-3 relative">
            <label htmlFor="password" className="font-semibold">
              Password
            </label>
            <input
              name="password"
              onChange={handleChange}
              value={data.password}
              type={show ? "text" : "password"}
              id="password"
              className="border-1 w-[100%] h-[35px] 
            border-[#e7e6e6] text-[15px] px-[20px]"
              placeholder="Your Password"
            />
            {!show ? (
              <IoEyeOutline
                className="absolute w-[20px] h-[20px] cursor-pointer right-[5%] bottom-[10%]"
                onClick={() => setShow((prev) => !prev)}
              />
            ) : (
              <IoEye
                className="absolute w-[20px] h-[20px] cursor-pointer right-[5%] bottom-[10%]"
                onClick={() => setShow((prev) => !prev)}
              />
            )}
          </div>
          <div className="flex md:w-[50%] w-[70%] items-center justify-between">
            <span
              className={`px-[10px] py-[5px] border-[2px] border-[#e7e6e6] rounded-xl cursor-pointer hover:border-black ${
                role === "student" ? "border-black" : "border-[#646464]"
              }`}
              onClick={() => setRole("student")}
            >
              Student
            </span>
            <span
              className={`px-[10px] py-[5px] border-[2px] border-[#e7e6e6] rounded-xl cursor-pointer hover:border-black ${
                role === "educator" ? "border-black" : "border-[#646464]"
              }`}
              onClick={() => setRole("educator")}
            >
              Educator
            </span>
          </div>
          <button className="w-[80%] h-[40px] bg-black text-white cursor-pointer flex items-center justify-center rounded-[5px]" onClick={handleSignup} disabled={loading}>
            {loading?<ClipLoader size={30} color="white"/>:"Signup"}
          </button>
          <div className="w-[80%] flex items-center gap-2">
            <div className="w-[30%] h-[2px] bg-[#c4c4c4]"></div>
            <div className="w-[50%] text-[15px] text-[#6f6f6f] flex item-center justify-center">
              Or Continue
            </div>
            <div className="w-[30%] h-[2px] bg-[#c4c4c4]"></div>
          </div>
          <div className="w-[80%] h-[40px] border-1 border-[black] rounded-[5px]
           flex items-center justify-center ">
           {/* flex items-center justify-center " onClick={googleSignup}> */}
            <img src={google} alt="" className="w-[25px]" />
            <span className="text-[18px] text-gray-500">oogle</span>
          </div>
          <div className="text-[#6f6f6f]">
            already have an account?
            <span
              className="underline underline-offset-1 text-black"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </div>
        </div>

        {/* right div */}

        <div className="w-[50%] h-[100%] rounded-r-2xl bg-[black] md:flex items-center justify-center flex-col hidden">
          <img src={logo} alt="logo" className=" w-30 shadow-2xl" />
          <span className="md:text-2xl text-white text-xs text-center">
            VIRTUAL COURSES
          </span>
        </div>
      </form>
    </div>
  );
}

export default Signup;
