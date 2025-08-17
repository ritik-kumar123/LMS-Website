import React, { useEffect } from 'react'
import axios from 'axios'
import { serverUrl } from '../App'
import { useDispatch } from 'react-redux'
import { setCourseData } from '../redux/courseSlice'
const GetPublishedCourse = () => {
const dispatch = useDispatch();

    useEffect(()=>
    {
      const getcourseData = async ()=>
      {
        try 
        {
         const result = await axios.get(serverUrl+"/api/course/getpublished",{withCredentials:true});
         dispatch(setCourseData(result.data));
         console.log(result.data)
        }
        catch (error)
        {
          console.log(error);
        }
      }
      getcourseData();
    })
}

export default GetPublishedCourse