import React, { useEffect } from 'react'
import { serverUrl } from '../App'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setReviewData } from '../redux/reviewSlice'

function GetAllReview() {
    const dispatch = useDispatch()
 useEffect(()=>
{
   const allReview = async ()=>{
    try{
        const result = await axios.get(serverUrl+"/api/reviewgetreview",
        {withCredentials:true})
        dispatch(setReviewData(result.data))
        console.log(result.data)
    }catch(error)
   {
    console.log(error)
     }}
     allReview()
},[])
}

export default GetAllReview
