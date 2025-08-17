import React, { useState } from "react";
import logo from "../assets/logo.jpg";
import google from "../assets/google.jpg";
import { IoEyeOutline } from "react-icons/io5";
import { IoEye } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
// import { signInWithPopup } from "firebase/auth";
// import { auth, provider } from "../utils/firebase";
import { FaArrowLeftLong } from "react-icons/fa6";
function Login() {
  const [show, setShow] = useState(false);
  const [data,setData] = useState({
    email:"",
    password:""
  })
  const [loading ,setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]:e.target.value });
  };

  const handleLogin = async()=>
  {
    setLoading(true);
     try{
        const result = await axios.post(serverUrl + "/api/auth/login",{
        email:data.email,
        password:data.password
      },
    {withCredentials:true})
    toast.success("Login successfully");
    dispatch(setUserData(result.data))
    navigate('/')
    setLoading(false);
  }
  catch(error)
  {
    dispatch(setUserData(null))
    toast.error(error.response.data.message)
    setLoading(false);
    
  }
  }

  //  const googleLogin = async () => {
  //    try {
  //      const response = await signInWithPopup(auth, provider);
  //      console.log(response);
  //      let user = response.user;
  //      let name = user.displayname;
  //      let email = user.email;
  //      let role=""
  //      const result = await axios.post(
  //        serverUrl + "/api/auth/googleauth",
  //        {
  //          name,
  //          email,
  //          role,
  //        },
  //        { withCredentials: true }
  //      );
  //      dispatch(setUserData(result.data));
  //      navigate("/");
  //      toast.success("Login Successfully");
  //    } catch (error) {
  //      console.log(error);
  //      toast.error(error.response.data.message);
  //    }
  //  };


  return (
    <div className="bg-[rgb(221,219,219)] w-[100vw] h-[100vh] flex items-center justify-center ">
      <form className="w-[90%] md:w-200 h-150 bg-[white] shadow-xl rounded-2xl flex relative"
        onSubmit={(e) => {e.preventDefault();}}>
        {/* left div */}
         <FaArrowLeftLong className='absolute top-[16%] md:top-[6%] left-[5%]
               w-[22px] h-[22px] cursor-pointer' onClick={()=>navigate("/")}/>
        <div className="md:w-[50%] w-[100%] flex flex-col items-center justify-center gap-3">
          <div>
            <h1 className="font-semibold text-black text-2xl">Welcome back</h1>
            <h2 className="text-[#999797] text-[18px]">Login your account</h2>
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
              type={show ? "text" : "password"}
              id="password"
              name="password"
              onChange={handleChange}
              value={data.password}
              className="border-1 w-[100%] h-[35px] 
            border-[#e7e6e6] text-[15px] px-[20px]"
              placeholder="Your Password"
            />
            {!show ? (
              <IoEyeOutline
                className="absolute w-[20px] h-[20px] cursor-pointer right-[5%] bottom-[10%]"
                onClick={() => setShow((prev) => !prev)}/>
            ) : (
              <IoEye
                className="absolute w-[20px] h-[20px] cursor-pointer right-[5%] bottom-[10%]"
                onClick={() => setShow((prev) => !prev)}/>
            )}
          </div>

          <button
            className="w-[80%] h-[40px] bg-black text-white cursor-pointer flex items-center justify-center rounded-[5px]"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? <ClipLoader size={30} color="white" /> : "Login"}
          </button>
          <span className="text-[13px] cursor-pointer text-[#6f6f6f]" onClick={()=>navigate('/forget')}>
            Forget your password ?
          </span>
          <div className="w-[80%] flex items-center gap-2">
            <div className="w-[30%] h-[2px] bg-[#c4c4c4]"></div>
            <div className="w-[50%] text-[15px] text-[#6f6f6f] flex item-center justify-center">
              Or Continue
            </div>
            <div className="w-[30%] h-[2px] bg-[#c4c4c4]"></div>
          </div>

          <div className="w-[80%] h-[40px] border-1 border-[black]
           rounded-[5px] flex items-center justify-center">
           {/* rounded-[5px] flex items-center justify-center" onClick={googleLogin}> */}
            <img src={google} alt="" className="w-[25px]" />
            <span className="text-[18px] text-gray-500">oogle</span>
          </div>

          <div className="text-[#6f6f6f]"> 
              Create new account
             <span className="underline underline-offset-1 text-black"
              onClick={() => navigate("/signup")}> SingUp </span>
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

export default Login;
