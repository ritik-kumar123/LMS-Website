import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import { ToastContainer } from 'react-toastify'
import GetCurrentUser from './customHooks/GetCurrentUser'
import { useSelector } from 'react-redux'
import Profile from './pages/Profile'
import ForgetPassword from './pages/ForgetPassword'
import EditProfile from './pages/EditProfile'
import Dashboard from './pages/Educator/Dashboard'
import Courses from './pages/Educator/Courses'
import CreateCourses from './pages/Educator/CreateCourses'
import EditCourse from './pages/Educator/EditCourse'
import GetCreatorCourse from './customHooks/getCreatorCourse'
import GetPublishedCourse from './customHooks/GetPublishedCourse'
import AllCourses from './pages/AllCourses'
import CreateLecture from './pages/Educator/CreateLecture'
import EditLecture from './pages/Educator/EditLecture'
import ViewCourse from './pages/ViewCourse'
import ScrollToTop from './components/ScrollToTop'
import ViewLecture from './pages/ViewLecture'
import MyEnrollledCourses from './pages/MyEnrollledCourses'
import GetAllReview from './customHooks/GetAllReview'
import SearchWithAi from './pages/SearchWithAi'
export const serverUrl = "http://localhost:3000";
function App() {
  GetCurrentUser()
  GetCreatorCourse()
  GetPublishedCourse()
  GetAllReview()
  const {userData}= useSelector(state=>state.user)
  return (
    <>
    <ToastContainer/>
    <ScrollToTop/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={!userData?<Signup/>:<Navigate to={"/"}/>}/>
        <Route path='/login' element={!userData?<Login/>:<Navigate to={"/"}/>}/>
        <Route path='/profile' element={userData?<Profile/>:<Navigate to={"/signup"}/>}/>
        <Route path='/forget' element={!userData?<ForgetPassword/>:<Navigate to={"/"}/>}/>
        <Route path='/editprofile' element={userData?<EditProfile/>:<Navigate to={"/signup"}/>}/>
        <Route path='/allcourses' element={userData?<AllCourses/>:<Navigate to={"/signup"}/>}/>
        <Route path='/dashboard' element={userData?.role ==="educator"?<Dashboard/>:<Navigate to={"/signup"}/>}/>
        <Route path='/courses' element={userData?.role ==="educator"?<Courses/>:<Navigate to={"/signup"}/>}/>
        <Route path='/createcourse' element={userData?.role ==="educator"?<CreateCourses/>:<Navigate to={"/signup"}/>}/>
        <Route path='/editcourse/:courseId' element={userData?.role ==="educator"?<EditCourse/>:<Navigate to={"/signup"}/>}/>
        <Route path='/createlecture/:courseId' element={userData?.role ==="educator"?<CreateLecture/>:<Navigate to={"/signup"}/>}/>
        <Route path='/editlecture/:courseId/:lectureId' element={userData?.role ==="educator"?<EditLecture/>:<Navigate to={"/signup"}/>}/>
        <Route path='/viewcourse/:courseId' element={userData?<ViewCourse/>:<Navigate to={"/signup"}/>}/>
        <Route path='/viewlecture/:courseId' element={userData?<ViewLecture/>:<Navigate to={"/signup"}/>}/>
        <Route path='/mycourses' element={userData?<MyEnrollledCourses/>:<Navigate to={"/signup"}/>}/>
        <Route path='/search' element={userData?<SearchWithAi/>:<Navigate to={"/signup"}/>}/>
      </Routes>
    </>
  )
}

export default App
