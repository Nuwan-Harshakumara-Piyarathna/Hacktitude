const {
  create,
  getBlogById,
  getBlogs,
  updateBlog,
  deleteBlog,
} = require("../models/Blog");

const Validator = require("fastest-validator");

//define validation schema
const schema = {
  title: { type: "string", optional: false, max: "255", min: "5" },
  snippet: { type: "string", optional: false, max: "250", min: "5" },
  body: { type: "string", optional: false, max: "250", min: "5" },
};

module.exports = {
  createBlog: (req, res) => {
    const body = req.body;

    //create a new instance of validation class
    const v = new Validator();
    const validationResponse = v.validate(body, schema);
    //if validation is passed sbove method will return true.otherwise it will returns a set of errors

    if (validationResponse !== true) {
      return res.status(400).json({
        message: "Validation Failed",
        errors: validationResponse,
      });
    }

    create(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database Connection Error",
        });
      }
      res.render("create", { title: "Create a New Blog" });
      // return res.status(200).json({ success: 1, data: results });
    });
  },
  getBlogByBlogId: (req, res) => {
    const id = req.params.id;
    getBlogById(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Record not Found",
        });
      }
      // return res.json({
      //   success: 1,
      //   data: results,
      // });
      // console.log("results = ", results);
      res.render("details", { title: "Blog details", blog: results });
    });
  },
  getBlogs: (req, res) => {
    getBlogs((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },
  updateBlogs: (req, res) => {
    const body = req.body;
    updateBlog(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        message: "updated successfully",
      });
    });
  },
  deleteBlogs: (req, res) => {
    const id = req.params.id;
    deleteBlog(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Record Not Found",
        });
      }
      return res.json({
        success: 1,
        message: "blog deleted successfully",
      });
    });
  },
};
