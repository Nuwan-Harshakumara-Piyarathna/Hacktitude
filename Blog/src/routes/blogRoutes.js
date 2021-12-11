const {
  createBlog,
  getBlogByBlogId,
  getBlogs,
  updateBlogs,
  deleteBlogs,
} = require("../controllers/blogController");

const router = require("express").Router();

router.post("/add", createBlog);
router.get("/", getBlogs);
router.get("/:id", getBlogByBlogId);
router.patch("/", updateBlogs);
router.delete("/:id", deleteBlogs);
module.exports = router;
