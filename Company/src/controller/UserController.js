const {
  create,
  getUserById,
  getUsers,
  updateUser,
  deleteUser,
  getUserByUserEmail,
} = require("../models/User");

const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const Validator = require("fastest-validator");

//define validation schema
const schema = {
  firstName: { type: "string", optional: false, max: "20", min: "2" },
  lastName: { type: "string", optional: false, max: "20", min: "2" },
  gender: { type: "enum", values: ["male", "female"], optional: false },
  email: { type: "email", optional: false },
  password: { type: "string", optional: false, min: "6" },
  number: { type: "string", optional: false, length: "10" },
};

module.exports = {
  createUser: (req, res) => {
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

    //to store encrypted password in db
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    create(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database Connection Error",
        });
      }
      return res.status(200).json({ success: 1, data: results });
    });
  },
  login: (req, res) => {
    //user will pass email and password in req body
    const body = req.body;
    getUserByUserEmail(body.email, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          data: "Invalid email or password",
        });
      }
      const result = compareSync(body.password, results.password);
      if (result) {
        //here we don't want to send the password in jwt.Therefore it is set to undefined
        results.password = undefined;
        const jsontoken = sign({ result: results }, process.env.JWT_KEY, {
          //JWT_KEY is the key to encrypt
          expiresIn: "1h",
        });
        return res.json({
          success: 1,
          message: "login successfully",
          token: jsontoken,
        });
      } else {
        return res.json({
          success: 0,
          data: "Invalid email or password",
        });
      }
    });
  },
  getUserByUserId: (req, res) => {
    const id = req.params.id;
    getUserById(id, (err, results) => {
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
      results.password = undefined;
      return res.json({
        success: 1,
        data: results,
      });
    });
  },
  getUsers: (req, res) => {
    getUsers((err, results) => {
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
  updateUsers: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt); //encrypt the password
    updateUser(body, (err, results) => {
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
  deleteUser: (req, res) => {
    const data = req.body;
    deleteUser(data, (err, results) => {
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
        message: "user deleted successfully",
      });
    });
  },
};
