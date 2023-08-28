var express = require("express");
var router = express.Router();
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "pothfolio",
});


/ GET users listing. /
router.get("/", function (req, res, next) {
  con.connect(function (err) {
    con.query("SELECT * FROM contacts", function (err, result, fields) {
      console.log(result);
      // res.writeHead(200, headers);
      res.write(JSON.stringify(result));
      return res.end();
    });
  });
  // res.send("contactlist");
});


router.post("/add", function (req, res, next) {
  res.send("respond with a contact add");
});


router.put("/edit", function (req, res, next) {
  res.send("respond with a contact edit");
});

router.put("/view", function (req, res, next) {
  res.send("respond with a contact view");
});
// localhost:3000/books/delete
router.delete("/delete", function (req, res, next) {
  res.send("respond with a contact delete");
});

module.exports = router;
