const Employee = require("../models/Employee");

//get all employees list
exports.getEmployeeList = (req, res) => {
  Employee.getAllEmployees((err, employees) => {
    if (err) {
      res.send(err);
    } else {
      res.send(employees);
    }
  });
};

//get employee by ID
exports.getEmployeeByID = (req, res) => {
  Employee.getEmployeeByID(req.params.id, (err, employee) => {
    if (err) {
      res.send(err);
    } else {
      res.send(employee);
    }
  });
};

//create new employee
exports.createNewEmployee = (req, res) => {
  const employeeReqData = new Employee(req.body);
  console.log("employee = ", employeeReqData);
  //check null
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.send(400).send({ success: false, message: "Please fill all fields" });
  } else {
    Employee.createEmployee(employeeReqData, (err, employee) => {
      if (err) {
        res.send(err);
      } else {
        res.json({
          status: true,
          message: "Employee Created Successfully",
          data: employee.insertId,
        });
      }
    });
  }
};

//update employee
exports.updateEmployee = (req, res) => {
  const employeeReqData = new Employee(req.body);
  console.log("employee update= ", employeeReqData);
  //check null
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.send(400).send({ success: false, message: "Please fill all fields" });
  } else {
    Employee.updateEmployee(req.params.id, employeeReqData, (err, employee) => {
      if (err) {
        res.send(err);
      } else {
        res.json({
          status: true,
          message: "Employee updated Successfully",
          data: employee.insertId,
        });
      }
    });
  }
};

//delete employee
exports.deleteEmployee = (req, res) => {
  Employee.deleteEmployee(req.params.id, (err, employee) => {
    if (err) {
      res.send(err);
    } else {
      res.json({ success: true, message: "Employee Deleted Successfully!" });
    }
  });
};
