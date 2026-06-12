import { Router } from "express";
import { postDetail , ratePost , createComment } from "../controllers/postDetailController.js";


const postRouter = Router();

postRouter.get("/:id", postDetail)

postRouter.post("/:id/rating", ratePost);

postRouter.post("/:id/comment", createComment);

export default postRouter;
