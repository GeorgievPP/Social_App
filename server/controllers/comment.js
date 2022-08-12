import Comment from "../models/comment.js";

// GET ALL COMMENTS
export const getAllComments = async (req, res) => {
  try {
    // console.log(req.body)
    const { postId } = req.body;
    // console.log(postId)
    const comments = await (await Comment.find({ post: postId })).reverse();
    res.status(200).json(comments);
  } catch (error) {
    console.log(error.message);
    res.status(400).send(error.message);
  }
};

// CREATE
export const createComment = async (req, res) => {
  try {
    const { description, author, jimHelper, avatar, post } = req.body;
    console.log("tyka");
    const comment = await Comment.create({
      description,
      author,
      jimHelper,
      avatar,
      post,
    });
    res.status(200).json(comment);
  } catch (error) {
    console.log(error.message);
    res.status(400).send(error.message);
  }
};

// DELETE
export const deleteComment = async (req, res) => {
  try {
    console.log(req.params);
    const { commentId } = req.params;
    console.log(commentId);
    await Comment.findByIdAndDelete(commentId);
    console.log("tyka");
    res.status(200).json({ message: "DELETED!" });
  } catch (error) {
    console.log(error.message);
    res.status(400).send(error.message);
  }
};
