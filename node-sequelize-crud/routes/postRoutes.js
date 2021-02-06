const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

router.get("/", postController.indexController);

//API
router.post("/api/posts", postController.createPost);
router.get("/api/posts", postController.findAllPost);
router.get("/api/posts/published", postController.findAllPublishedPost);
router.get("/api/posts/:id", postController.findSinglePost);
router.put("/api/posts/:id", postController.updatePost);
router.delete("/api/posts/:id", postController.deletePost);
router.delete("/api/posts", postController.deleteAllPost);

module.exports = router;
