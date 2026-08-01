import { Router } from "express";
import { deleteCommentAdmin } from "../adminControllers/adminCommentController";
import checkIfUserAdmin from "../middlewares/checkAdmin";

const commentAdminRouter = Router({ mergeParams: true });

commentAdminRouter.delete("/:commentId", checkIfUserAdmin, deleteCommentAdmin);

export default commentAdminRouter;
