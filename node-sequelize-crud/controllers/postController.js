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
exports.findAllPost = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;
  Post.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          // err.message ||
          "Some Error Occured While Fetch Data From DB",
      });
    });
};

// Find a single Post with an id
exports.findSinglePost = (req, res) => {
  const id = req.params.id;

  Post.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Post with id=" + id,
      });
    });
};

// Update a Post by the id in the request
exports.updatePost = (req, res) => {
  const id = req.params.id;
  Post.update(req.body, { where: { id: id } })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Post was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Post with id=${id}. Maybe Post was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error Update Post with id=${id}`,
      });
    });
};

// Delete a Post with the specified id in the request
exports.deletePost = (req, res) => {
  const id = req.params.id;
  Post.destroy({
    where: { id: id },
  })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot Delete Post with id ${id} , Maybe Post Id is Wrong`,
        });
      } else {
        res.send({ message: `Delete Post Successfully with id ${id}` });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Could Not delete Post with Id ${id}`,
      });
    });
};

// Delete all Post from the database.
exports.deleteAllPost = (req, res) => {
  Post.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Posts are deleted Succesfully` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some Error Occur while Removing All Post.",
      });
    });
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
