const express = require("express");
const router = express.Router();

const employeeController = require("../controller/EmployeeController");

//get all employees
router.get("/", employeeController.getEmployeeList);

//get employee by ID
router.get("/:id", employeeController.getEmployeeByID);

//create new employee
router.post("/", employeeController.createNewEmployee);

//update the employee
router.put("/:id", employeeController.updateEmployee);

//delete the employee
router.delete("/:id", employeeController.deleteEmployee);

//to access this outside we have to export the module
module.exports = router;
