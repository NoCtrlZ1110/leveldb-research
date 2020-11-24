var level = require("level");
var path = require("path");
var dbPath = process.env.DB_PATH || path.join(__dirname, "database");
var options = {
  keyEncoding: "binary",
  valueEncoding: "json",
};
var db = level(dbPath, options);
module.exports = db;
