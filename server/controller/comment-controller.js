import Comment from "../models/comment.js";

export const newComment = async (req, res) => {
  try {
    const comment = new Comment(req.body);
    await comment.save();

    return res.status(200).json({ msg: "Comment added successfully" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const getComments = async (req, res) => {
  try {
    let comments = await Comment.find({ postId: req.params.id });
    return res.status(200).json(comments);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);

    return res
      .status(200)
      .json({ msg: "Comment deleted successfully", data: comment });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
