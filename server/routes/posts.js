// DEPENDENCIES
import express from "express";

import {
  getPostsBySearch,
  getPosts,
  getPost,
  getPostsByEmail,
  createPost,
  updatePost,
  deletePost,
  likePost,
  // commentPost,
} from "../controllers/post.js";

// GUARD
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/search", getPostsBySearch);
router.get("/", getPosts);
router.get("/:id", getPost);

router.post("/creator",auth, getPostsByEmail);
router.post("/", auth, createPost);
router.patch("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);
router.patch("/:id/likePost", auth, likePost);
// router.post("/:id/commentPost", auth, commentPost);

export default router;
