const express = require("express");
const bodyParser = require("body-parser");
// create express app
const app = express();

// set up the server port
const port = process.env.PORT || 5000;

// pass request data content type application/x-www-form-ruleencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse request data content type application/json
app.use(bodyParser.json());

// import employee routes
const employeeRoutes = require("./src/routes/EmployeeRoute");

// create employee  routes
app.use("/api/v1/employees", employeeRoutes);

// define root route
app.get("/", (req, res) => {
  res.send("Hello World !");
});

// listen to the port
app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
