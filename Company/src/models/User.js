const { pool } = require("../../config/db.config");

module.exports = {
  create: (data, callback) => {
    pool.query(
      `INSERT INTO USER(firstName, lastName, gender, email, password, number)
                VALUES(?,?,?,?,?,?)`,
      [
        data.firstName,
        data.lastName,
        data.gender,
        data.email,
        data.password,
        data.number,
      ],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
  getUserByUserEmail: (email, callBack) => {
    pool.query(
      `SELECT * FROM USER WHERE email = ?`,
      [email],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  getUsers: (callback) => {
    pool.query(
      `SELECT id, firstName, lastName, gender, email, number FROM USER`,
      [],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
  getUserById: (id, callback) => {
    pool.query(
      `SELECT id, firstName, lastName, gender, email, number FROM USER WHERE id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results[0]); //to get only one result
      }
    );
  },
  updateUser: (data, callBack) => {
    pool.query(
      `UPDATE USER SET firstName=?, lastName=?, gender=?, email=?, password=?, number=? where id = ?`,
      [
        data.firstName,
        data.lastName,
        data.gender,
        data.email,
        data.password,
        data.number,
        data.id,
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  deleteUser: (data, callBack) => {
    pool.query(
      `DELETE FROM USER WHERE id = ?`,
      [data.id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
};
