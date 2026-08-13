import { type Request, type Response, type NextFunction } from "express";
import queries from "../models/queries";
import _ from "lodash";
import adminQueries from "../models/adminQueries";
import { AppError } from "../ultility/error";

interface UpdatePost {
  title?: string;
  content?: string;
  published?: boolean;
}

// get's all posts from db
const getAdminPostsController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const response = await adminQueries.getPostsForAdmin();
  if (!response.ok)
    return next(new AppError("Error fetching Posts form the database.", 500));

  return res.status(200).json({ posts: response.posts });
};

// get's one post
const getAdminPost = async (req: Request, res: Response) => {
  //ensure and validate the incoming query
  const { postId } = req.params;
  console.log(postId);
  const intPostId = _.toInteger(postId);
  const response = await adminQueries.getPost(intPostId);
  if (!response.ok) return res.status(404).json({ message: "Post Not Found!" });
  return res.status(200).json({ message: "Post Found", post: response.post });
};

const createPostController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  //make sure to validate the incoming payload later
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
    message: "Successfuly created a new Post",
    newPost: response.newPost,
  });
};

const updatePost = async (req: Request, res: Response, next: NextFunction) => {
  //validatae the incoming payload later
  // send there is nothing to change if all undefined
  const { postId } = req.params;
  if (typeof postId !== "string")
    return next(
      new AppError("Incoming post Id stirng is not a valid type", 400),
    );
  const intPostId = _.parseInt(postId);

  const updatePayload: UpdatePost = {
    title: req.body.title,
    content: req.body.content,
    published: req.body.published,
  };
  const response = await adminQueries.updatePost(
    updatePayload,
    intPostId,
    req.user!.id,
  );
  if (!response.ok)
    return next(new AppError("Unable to update the post ", 500));

  return res.status(200).json({ message: "Successfully updated the post" });
};
export {
  getAdminPost,
  createPostController,
  getAdminPostsController,
  updatePost,
};
