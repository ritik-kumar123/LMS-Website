import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import { serverUrl } from '../App';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';

function ForgetPassword() {
    const [step,setStep]= useState(1);
    const navigate = useNavigate();
    const [data,setData]=useState({
      email:"",
      otp:"",
      newpassword:"",
      conpassword:"",
    })
    const changeHandler = (e)=>
    {
      setData({...data,[e.target.name]:e.target.value})
    }
    const [loading,setLoading] = useState(false);

    //! for step 1 sendotp
    const sendOtp = async ()=>
    {
      setLoading(true)
      try {
         const result = await axios.post(serverUrl + "/api/auth/sendotp",
          {email:data.email},
          {withCredentials:true}
         )
         console.log(result.data);
         setStep(2)
         setLoading(false);
         toast.success(result.data.message);
      } catch (error) 
      {
        setLoading(false);
        toast.error(error.response.data.message);
        console.log(error)
      }
    }

    //! step 2 verifyotp

    const verifyOTP = async () => {
      setLoading(true);
      try {
        const result = await axios.post(
          serverUrl + "/api/auth/verifyotp",
          { email: data.email ,
            otp:data.otp
          },
          { withCredentials: true }
        );
        console.log(result.data);
        setStep(3);
        setLoading(false);
        toast.success(result.data.message);
      } catch (error) {
        setLoading(false);
        toast.error(error.response.data.message);
        console.log(error);
      }
    };

    //! step 3 reset password
    const resetPassword = async () => {
      setLoading(true);
      try {
        if(data.newpassword !== data.conpassword)
        { 
          return toast.error("Password is not matched")
        }
        const result = await axios.post(
          serverUrl + "/api/auth/resetpassword",
          { email: data.email,
            password: data.newpassword },
          { withCredentials: true }
        );
        console.log(result.data);
        navigate("/login")
        setLoading(false);
        toast.success(result.data.message);
      } catch (error) {
        setLoading(false);
        toast.error(error.response.data.message);
        console.log(error);
      }
    };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      {/* step1 */}
      {step == 1 && <div className='bg-white shadow-md rounded-xl p-8 max-w-md w-full'>
        <h2 className='text-2xl font-bold mb-6 text-center text-gray-800'>Forget Your Password</h2>
        <form className='space -y-4' onSubmit={(e)=>e.preventDefault()}>
            <div>
                <label htmlFor="email" className='block text-sm font-medium text-gray-700'>Enter your email address</label>
                <input id='email' type="text" name='email' className='mt-1 w-full px-4 py-2 border border-gray-300 
                rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black'
                 placeholder='you@example.com' required onChange={changeHandler}/>
            </div>
            <button className='w-full bg-black hover:bg-[#4b4b4b]
             text-white mt-3 py-2 px-4 rounded-md font-medium cursor-pointer' disabled={loading} onClick={sendOtp}>{loading?<ClipLoader size={30} color='white'/>:"SEND OTP"}</button>
        </form>
        <div className='text-sm text-center mt-4' onClick={()=>navigate("/login")}>Back To Login</div>
        </div>}

      {/* step2 */}
      {step == 2 && <div className='bg-white shadow-md rounded-xl p-8 max-w-md w-full'>
        <h2 className='text-2xl font-bold mb-6 text-center text-gray-800'>Enter OTP</h2>
        <form className='space -y-4' onSubmit={(e)=>e.preventDefault()}>
            <div>
                <label htmlFor="otp" className='block text-sm font-medium text-gray-700'>Please Enter the 4-digit
                    code sent to your email.
                </label>
                <input id='otp' name='otp' onChange={changeHandler} type="text" className='mt-1 w-full px-4 py-2 border border-gray-300 
                rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black'
                 placeholder='* * * *' required />
            </div>
            <button className='w-full bg-black hover:bg-[#4b4b4b]
             text-white mt-3 py-2 px-4 rounded-md font-medium cursor-pointer' disabled={loading} onClick={verifyOTP}>{loading?<ClipLoader size={30} color='white'/>:"Verify OTP"}</button>

        </form>
        <div className='text-sm text-center mt-4' onClick={()=>navigate("/login")}>Back To Login</div>
        </div>}

      {/* step3 */}
      {step == 3 && <div className='bg-white shadow-md rounded-xl p-8 max-w-md w-full'>
        <h2 className='text-2xl font-bold mb-6 text-center text-gray-800'>Reset Your Password</h2>
        <p className='text-sm text-gray-500 text-center mb-6'>Enter a new password below to regin access to your account. </p>
        <form className='space -y-4' onSubmit={(e)=>e.preventDefault()}>
            <div>
                <label htmlFor="newpassword" className='block text-sm font-medium text-gray-700'>New Password
                </label>
                <input id='newpassword' name='newpassword' onChange={changeHandler} type="text" className='mt-1 mb-3 w-full px-4 py-2 border border-gray-300 
                rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black'
                 placeholder='**********' required />
            </div>
            <div>
                <label htmlFor="conpassword" className='block text-sm font-medium text-gray-700'>Confirm Password
                </label>
                <input id='conpassword' name='conpassword' onChange={changeHandler} type="text" className='mt-1 w-full px-4 py-2 border border-gray-300 
                rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black'
                 placeholder='**********' required />
            </div>
            <button className='w-full bg-black hover:bg-[#4b4b4b]
             text-white mt-3 py-2 px-4 rounded-md font-medium cursor-pointer' disabled={loading} onClick={resetPassword}>{loading?<ClipLoader size={30} color='white'/>:"RESET PASSWORD"}</button>

        </form>
        <div className='text-sm text-center mt-4' onClick={()=>navigate("/login")}>Back To Login</div>
        </div>}
    </div>
  );
}

export default ForgetPassword
