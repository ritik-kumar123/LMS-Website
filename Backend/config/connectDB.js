import mongoose from "mongoose";

const connectDB = async(req,res)=>
{
    try
    {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("DB Connected");
        
    }
    catch(error)
    {
        console.log(error);
        
    }
}
export default connectDB