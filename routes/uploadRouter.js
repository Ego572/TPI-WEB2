import { Router } from "express";
import { uploadForm, createPost } from "../controllers/uploadController.js";



const uploadCont = Router()


uploadCont.get("/", uploadForm);
uploadCont.post("/", createPost);

export default uploadCont