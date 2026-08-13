import { Router } from "express";
import { deleteCommentAdmin } from "../adminControllers/auth/adminCommentController.js";
import checkIfUserAdmin from "../middlewares/checkAdmin.js";

const commentAdminRouter = Router({ mergeParams: true });

commentAdminRouter.delete("/:commentId", checkIfUserAdmin, deleteCommentAdmin);

export default commentAdminRouter;
