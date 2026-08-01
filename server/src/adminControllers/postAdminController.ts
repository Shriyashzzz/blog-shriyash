import {
  type Request,
  type Response,
  type NextFunction,
  response,
} from "express";
import queries from "../models/queries";
import _ from "lodash";
import adminRoutes from "../adminRoutes/rootAdminRouter";
import adminQueries from "../models/adminQueries";
import { AppError } from "../ultility/error";

const getAdminPost = async (req: Request, res: Response) => {
  const { postId } = req.params;
  const intPostId = _.toInteger(postId);
  const response = await queries.getPost(intPostId);
  if (!response.found)
    return res.status(404).json({ message: "Post Not Found!" });
  return res.status(200).json({ message: "Post Found", post: response.post });
};

const createPostController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  //make cure to validate the incoming payload later
  const { title, content, published } = req.body;
  const { user } = req;

  const response = await adminQueries.createNewPost(
    title,
    content,
    published,
    user!.id,
  );

  if (!response.ok)
    return next(new AppError("Unable to create a new Post", 500));
  return res.status(200).json({
    message: "Successfuly created a anew Post",
    newPost: response.newPost,
  });
};
export { getAdminPost, createPostController };
