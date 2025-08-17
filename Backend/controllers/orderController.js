import razorpay from 'razorpay'
import dotenv from "dotenv";
import { Course } from '../models/courseModel.js';
import { User } from '../models/userModel.js';
dotenv.config();

const RazorPayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

export const RazorPayOrder = async (req,res)=>
{
  try{
      const {courseId} = req.body
      const course = await Course.findById(courseId)
      if(!course)
      {
        return res.status(404).json({message:"Course is not Found"});
      }
      const options = {
        amount:course.price*100,
        currency:"INR",
        receipt:`${courseId}.toString()`
      }

      const order = await RazorPayInstance.orders.create(options)
      res.status(200).json(order);
     }catch (error)
     {
    res.status(500).json({message:`failed to create Razorpay Order ${error}`})
  }
}

export const verifyPayment = async(req,res)=>
{
    try{
        const {courseId,userId,razorpay_order_id} = req.body;
        const orderInfo =  await RazorPayInstance.orders.fetch(razorpay_order_id)
        if(orderInfo.status === 'paid')
        {
          const user = await User.findById(userId)
          if(!user.enrolledCoureses.includes(courseId))
          {
            await user.enrolledCoureses.push(courseId);
            await user.save();
          }
          const course = await Course.findById(courseId).populate("lectures");
          if(!course.enrollledStudents.includes(user))
          {
            await course.enrollledStudents.push(userId);
            await course.save();
          }
          return res.status(200).json({message:"payment verified and enrollment successful"})
        }
        else
        {
          return res.status(400).json({message:"payment failed "})

        }
    } catch (error)
     {
       return res.status(500).json({message:`Internal server error during payment verification ${error}`}) 
    }
}