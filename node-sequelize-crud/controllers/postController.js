const { Op } = require("sequelize");
const Post = require("../models/Post");

const indexController = (req, res) => {
  res.json({ message: "Welcome API Home" });
};

exports.indexController = indexController;

// Create and Save Post
exports.createPost = async (req, res) => {
  // Validate Fields
  if (!req.body.title) {
    res.json({ message: "Please add a title" });
  }
  if (!req.body.description) {
    res.json({ message: "Please add some Description" });
  }

  try {
    //Insert Data
    const createPostData = await Post.create({
      title: req.body.title,
      description: req.body.description,
      published: req.body.published ? req.body.published : false,
    });
    return res.status(200).json(createPostData);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Post.",
    });
  }
};

// Retrieve all Post from the database.
exports.findAllPost = async (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;
  try {
    const findAllPostData = await Post.findAll({ where: condition });
    return res.json(findAllPostData);
  } catch (err) {
    res.status(500).send({
      message: "Some Error Occured While Fetch Data From DB",
    });
  }
};

// Find a single Post with an id
exports.findSinglePost = async (req, res) => {
  const id = req.params.id;

  try {
    const findSinglePostData = await Post.findByPk(id);
    if (!findSinglePostData)
      return res.status(404).send({ message: "Post not Found" });
    return res.status(200).json(findSinglePostData);
  } catch (err) {
    res.status(500).send({ message: "Error retrieving Post with id=" + id });
  }
};

// Update a Post by the id in the request
exports.updatePost = async (req, res) => {
  const id = req.params.id;

  try {
    const findSinglePostData = await Post.findByPk(id);
    if (!findSinglePostData)
      return res.status(404).send({ message: "Post not Found" });
    await Post.update(req.body, {
      where: { id: findSinglePostData.id },
    });
    const updatePostData = await Post.findByPk(id);
    return res.status(201).json(updatePostData);
  } catch (err) {
    res.status(500).send({
      message: err.message || `Error Update Post with id=${id}`,
    });
  }
};

// Delete a Post with the specified id in the request
exports.deletePost = async (req, res) => {
  const id = req.params.id;

  try {
    const findSinglePostData = await Post.findByPk(id);
    if (!findSinglePostData)
      return res.status(404).send({ message: "Post not Found" });
    const deletePostData = await Post.destroy({
      where: { id: findSinglePostData.id },
    });
    return res.send({ message: "Post Deleted with Id= " + id });
  } catch (err) {
    res.status(500).send({
      message: `Could Not delete Post with Id ${id}`,
    });
  }
};

// Delete all Post from the database.
exports.deleteAllPost = async (req, res) => {
  try {
    const deleteAllPostData = await Post.destroy({
      where: {},
      truncate: false,
    });
    return res.send({ message: "All Post Deleted Successfully" });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some Error Occur while Removing All Post.",
    });
  }
};

// Find all published Posts
exports.findAllPublishedPost = (req, res) => {
  Post.findAll({ where: { published: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Post.",
      });
    });
};
