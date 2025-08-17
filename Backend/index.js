import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/connectDB.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/authRoute.js";
import userRouter from "./routes/userRoute.js";
import courseRouter from "./routes/courseRoute.js";
import paymentRouter from "./routes/paymentRoute.js";
import reviewRoute from "./routes/reviewRoute.js";
dotenv.config()

const PORT = process.env.PORT;
const app = express();

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use('/api/auth',authRouter);
app.use('/api/user',userRouter);
app.use('/api/course',courseRouter);
app.use("/api/order",paymentRouter);
app.use("/api/review",reviewRoute)



// app.use('/',(req,res)=>{

//  res.json("hello")    
// })
app.listen(PORT,()=>
{
    console.log("Server is running on "+PORT);
    connectDB();
})

