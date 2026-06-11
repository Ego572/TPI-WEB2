import { Router } from "express";
import { postDetail , ratePost , createComment } from "../controllers/postDetailController";


const postRouter = Router();

postRouter.get("/:id", postDetail)

postRouter.post("/:id/rating", ratePost);

postRouter.post("/:id/comment", createComment);

export default postRouter;
