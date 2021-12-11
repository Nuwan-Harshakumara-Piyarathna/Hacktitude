const { pool } = require("../../config/db.config");

module.exports = {
  create: (data, callback) => {
    pool.query(
      `INSERT INTO BLOG(title, snippet, body)
                VALUES(?,?,?)`,
      [data.title, data.snippet, data.body],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
  getBlogs: (callback) => {
    pool.query(
      `SELECT id, title, snippet, body FROM BLOG`,
      [],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
  getBlogById: (id, callback) => {
    pool.query(
      `SELECT id, title, snippet, body FROM BLOG WHERE id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results[0]); //to get only one result
      }
    );
  },
  updateBlog: (data, callBack) => {
    pool.query(
      `UPDATE BLOG SET title=?, snippet=?, body=? WHERE id = ?`,
      [data.title, data.snippet, data.body, data.id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  deleteBlog: (id, callBack) => {
    pool.query(
      `DELETE FROM BLOG WHERE id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
};
