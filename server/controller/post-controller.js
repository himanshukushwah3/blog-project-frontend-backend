import Post from "../models/post.js";

export const createPost = async (req, res) => {
  try {
    const post = await new Post(req.body);
    post.save();

    res.status(200).json("Post saved successfully");
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getAllPosts = async (request, response) => {
  let category = request.query.category;
  let posts;
  try {
    if (category) {
      posts = await Post.find({ categories: category });
    } else {
      posts = await Post.find({});
    }
    response.status(200).json(posts);
  } catch (error) {
    response.status(500).json({ msg: error.message });
  }
};

export const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    return res.status(200).json(post);
  } catch (error) {
    response.status(500).json({ msg: error.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    await Post.findByIdAndUpdate(req.params.id, { $set: req.body });
    return res.status(200).json({ msg: "Post updated Successfully" });
  } catch (error) {
    response.status(500).json({ msg: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    let post = await Post.findByIdAndDelete(req.params.id);
    return res
      .status(200)
      .json({ msg: "Post Deleted Successfully", data: post });
  } catch (error) {
    response.status(500).json({ msg: error.message });
  }
};
