import { type Request, type Response } from "express";
import queries from "../models/queries";
import _ from "lodash";

const getPost = async (req: Request, res: Response) => {
  const { postId } = req.params;
  const intPostId = _.toInteger(postId);
  const response = await queries.getPost(intPostId);
  if (!response.found)
    return res.status(401).json({ message: "Post Not Found!" });
  if (!response.published) {
    return res
      .status(418)
      .json({ message: "You snoopy ahh, this post is still under works ;)" });
  }
  return res.status(200).json({ message: "Post Found", post: response.post });
};

export { getPost };
