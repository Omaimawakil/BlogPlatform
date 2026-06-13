const Comment = require("../models/Comment");

const createComment = async (req, res) => {
  try {
    const { text, post, user } = req.body;

    const comment = await Comment.create({
      text,
      post,
      user,
    });

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({
      post: req.params.postId,
    })
      .populate("post")
      .populate("user");

    res.json(comments);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createComment,
  getComments,
};