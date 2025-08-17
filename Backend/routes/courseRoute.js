import express from "express"
import { createCourse, createLecture, editCourse, editLecture, getCourseById, getCourseLecture, getCreatorById, getCreatorCourses, getPublishedCourses, removeCourse, removeLecture } from "../controllers/courseController.js";
import isAuth from "../middlewares/isAuth.js";
import upload from "../middlewares/multer.js";
import { serchWithAi } from "../controllers/searchController.js";
const courseRouter = express.Router();

courseRouter.post("/create",isAuth,createCourse);
courseRouter.get("/getpublished",getPublishedCourses);
courseRouter.get("/getcreator",isAuth,getCreatorCourses);
courseRouter.put("/editcourse/:courseId",isAuth,upload.single("thumbnail"),editCourse);
courseRouter.get("/getcourse/:courseId",isAuth,getCourseById)
courseRouter.get("/remove/:courseId",isAuth,removeCourse)

//!for Lectures
courseRouter.post("/createlecture/:courseId",isAuth,createLecture);
courseRouter.get("/courselecture/:courseId",isAuth,getCourseLecture)
courseRouter.put("/editlecture/:lectureId",isAuth,upload.single("videoUrl"),editLecture);
courseRouter.delete("/removelecture/:lectureId",isAuth,removeLecture);
courseRouter.post("/creator",isAuth,getCreatorById)

//!for search
courseRouter.post("/search",serchWithAi)




export default courseRouter;