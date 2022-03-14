require("dotenv").config();
const mysql = require("mysql");
var bcrypt = require("bcrypt");
const URL = require("url").URL;
const DB = require("./constants").DB;

const sendError = (res, status, message) => {
  res.status(status).send({ success: false, message: message });
};

const sendResponse = (res, status, data = null) => {
  if (status == 204) {
    res.status(status).send();
    return;
  }
  if (data) {
    res.status(status).send({ success: true, data: data });
  } else {
    res.status(status).send({ success: true });
  }
};

const getConnection = () => {
  return mysql.createPool({
    host: DB.DB_HOST,
    user: DB.DB_USER,
    password: DB.DB_PASSWORD,
    port: DB.DB_PORT,
    database: DB.DB_DATABASE,
    connectionLimit: 10,
  });
};

const pool = getConnection();

const cryptPassword = function (password, callback) {
  bcrypt.genSalt(10, function (err, salt) {
    if (err) return callback(err);

    bcrypt.hash(password, salt, function (err, hash) {
      return callback(err, hash);
    });
  });
};

const comparePassword = function (plainPass, hashword, callback) {
  bcrypt.compare(plainPass, hashword, function (err, isPasswordMatch) {
    return err == null ? callback(null, isPasswordMatch) : callback(err);
  });
};

// const isValidUrl = (url) => {
//   try {
//     new URL(url);
//     return true;
//   } catch (err) {
//     return false;
//   }
// };

module.exports = {
  sendError,
  sendResponse,
  pool,
  cryptPassword,
  comparePassword,
//   isValidUrl,
};