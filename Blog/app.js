const express = require("express");
const bodyParser = require("body-parser");

//import blog routes
const blogRoutes = require("./src/routes/blogRoutes");

//express app
const app = express();

//register view engine
app.set("view engine", "ejs");

//all ejs files must be in 'views' folder.

//listen for requests
app.listen(5000);

// pass request data content type application/x-www-form-ruleencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse request data content type application/json
app.use(bodyParser.json());

//create blog routes
app.use("/api/blogs", blogRoutes);

// middleware & static files (setting them public)
app.use(express.static("public")); //this makes folder called public as public

const {
  create,
  getBlogById,
  getBlogs,
  updateBlog,
  deleteBlog,
} = require("./src/models/blog");

app.get("/", (req, res) => {
  getBlogs((err, results) => {
    if (err) {
      console.log(err);
    } else {
      // console.log("blogs = ", results);
      res.render("index", { title: "Home", blogs: results });
    }
  });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

//redirects
app.get("/about-us", (req, res) => {
  res.redirect("/about");
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create a New Blog" });
});

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
