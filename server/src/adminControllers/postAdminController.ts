import { type Request, type Response, type NextFunction } from "express";
import _ from "lodash";
import { validationResult, matchedData, body, param } from "express-validator";
import adminQueries from "../models/adminQueries";
import { AppError } from "../ultility/error";

interface UpdatePost {
  title?: string;
  content?: string;
  published?: boolean;
}

const postIdValidator = [
  param("postId")
    .trim()
    .isNumeric()
    .withMessage("post id param is not numeric"),
];

const updatePostPayloadValidator = [
  body("title")
    .optional({ nullable: true })
    .isString()
    .withMessage("Title must be a text string"),
  body("content")
    .optional({ nullable: true })
    .isString()
    .withMessage("Content must be a text string"),
  body("published")
    .optional({ nullable: true })
    .isBoolean()
    .withMessage("Published state can either be true or false"),
];

const newPostPayloadValidator = [
  body("title").notEmpty().withMessage("Title cannot be Empty"),
  body("content").notEmpty().withMessage("Content cannot be empty"),
  body("published")
    .notEmpty()
    .withMessage(
      "You need to specify if the post is draft or ready to be published",
    )
    .isBoolean()
    .withMessage("Published state can either be true or false"),
];

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
const getAdminPost = [
  ...postIdValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return next(new AppError(JSON.stringify(errors), 400));

    const { postId } = matchedData(req);
    console.log(postId);
    const intPostId = _.toInteger(postId);
    const response = await adminQueries.getPost(intPostId);
    if (!response.ok)
      return res.status(404).json({ message: "Post Not Found!" });
    return res.status(200).json({ message: "Post Found", post: response.post });
  },
];

const createPostController = [
  ...postIdValidator,
  ...newPostPayloadValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return next(new AppError(JSON.stringify(errors), 400));

    const { title, content, published } = matchedData(req);
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
  },
];

const updatePost = [
  ...updatePostPayloadValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    //validatae the incoming payload later
    // send there is nothing to change if all undefined
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return next(new AppError(JSON.stringify(errors), 400));
    const { postId, title, content, published } = matchedData(req);

    const intPostId = _.parseInt(postId);
    const updatePayload: UpdatePost = {
      title: title,
      content: content,
      published: published,
    };
    const response = await adminQueries.updatePost(
      updatePayload,
      intPostId,
      req.user!.id,
    );
    if (!response.ok)
      return next(new AppError("Unable to update the post ", 500));

    return res.status(200).json({ message: "Successfully updated the post" });
  },
];
export {
  getAdminPost,
  createPostController,
  getAdminPostsController,
  updatePost,
};
