import { Router } from "express";
import type { Request, Response, NextFunction } from "express";
import { getPost } from "../controllers/postController";

const postRouter = Router({ mergeParams: true });

postRouter.get("/:postId", getPost);

export default postRouter;
