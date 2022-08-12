import express from "express"
// import {editUser, login, register} from "../controllers/user.js";
import { getAllComments, createComment, deleteComment } from "../controllers/comment.js";

const router = express.Router();

router.post("/all", getAllComments);
router.post("/create", createComment);
router.delete("/:commentId", deleteComment);

export default router;