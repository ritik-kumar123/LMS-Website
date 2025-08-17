import express from "express";
import isAuth from "../middlewares/isAuth.js";
import { createReview, getReviews } from "../controllers/reviewController.js";
const reviewRoute = express.Router();

reviewRoute.post("/createreview",isAuth,createReview);
reviewRoute.get("/getreview",isAuth,getReviews);

export default reviewRoute;