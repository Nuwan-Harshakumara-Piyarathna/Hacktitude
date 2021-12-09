let dbConn = require("../../config/db.config");

let Employee = function (employee) {
  this.first_name = employee.first_name;
  this.last_name = employee.last_name;
  this.email = employee.email;
  this.phone = employee.phone;
  this.organization = employee.organization;
  this.designation = employee.designation;
  this.salary = employee.salary;
  this.status = employee.status ? employee.status : 1;
  this.created_at = new Date();
  this.updated_at = new Date();
};

//get all employees
Employee.getAllEmployees = (result) => {
  dbConn.query("SELECT * FROM EMPLOYEES", (err, res) => {
    if (err) {
      console.log("Error while fetching Employees", err);
      result(null, err);
    } else {
      console.log("Employee fetched successfully");
      result(null, res);
    }
  });
};

//get employee by ID from DB
Employee.getEmployeeByID = (id, result) => {
  dbConn.query("SELECT * FROM EMPLOYEES WHERE id=?", id, (err, res) => {
    if (err) {
      console.log("Error while fetching Employee by ID");
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

//create new employee
Employee.createEmployee = (employeeReqData, result) => {
  dbConn.query("INSERT INTO EMPLOYEES SET ? ", employeeReqData, (err, res) => {
    if (err) {
      console.log("Error while inserting data");
      result(null, {
        status: false,
        message: err,
      });
    } else {
      console.log("Employee created successfully");
      result(null, res);
    }
  });
};

//update employee
Employee.updateEmployee = (id, employeeReqData, result) => {
  dbConn.query(
    "UPDATE EMPLOYEES SET first_name=?,last_name=?,email=?,phone=?,organization=?,designation=?,salary=? WHERE id = ?",
    [
      employeeReqData.first_name,
      employeeReqData.last_name,
      employeeReqData.email,
      employeeReqData.phone,
      employeeReqData.organization,
      employeeReqData.designation,
      employeeReqData.salary,
      id,
    ],
    (err, res) => {
      if (err) {
        console.log("Error while updating the record");
        result(null, err);
      } else {
        console.log("Employee Updated Successfully");
        result(null, res);
      }
    }
  );
};

//delete employee
Employee.deleteEmployee = (id, result) => {
  //hard delete(actual delete)
  dbConn.query("DELETE FROM EMPLOYEES WHERE id=?", id, (err, res) => {
    if (err) {
      console.log("Error while deleteing Employee");
      result(null, err);
    } else {
      console.log("Employee Deleted Successfully");
      result(null, res);
    }
  });

  //soft delete (not actual deleting,just set id_deleted attribute from to 1)
  // dbConn.query(
  //   "UPDATE EMPLOYEES SET is_deleted=? WHERE id=?",
  //   [1, id],
  //   (err, res) => {
  //     if (err) {
  //       console.log("Error while deleteing Employee");
  //       result(null, err);
  //     } else {
  //       console.log("Employee Deleted Successfully");
  //       result(null, res);
  //     }
  //   }
  // );
};

module.exports = Employee;
