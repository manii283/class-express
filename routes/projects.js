var express = require("express");
var router = express.Router();
var mysql = require("mysql");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "pothfolio",
});

/ GET users listing. /;
router.get("/", function (req, res, next) {
  con.connect(function (err) {
    con.query("SELECT * FROM projects", function (err, result, fields) {
      console.log(result);
      res.write(JSON.stringify(result));
      return res.end();
    });
  });
});

router.post("/add", function (req, res, next) {
  req.on("data", (chunk) => {
    console.log(chunk.toString());
    const requstBody = JSON.parse(chunk.toString());
    con.connect(function (err) {
      con.query(
        "INSERT INTO projects (title,url,detail) VALUES ('" +
          requstBody.title +
          "','" +
          requstBody.url +
          "','" +
          requstBody.detail +
          "')",
        function (err, result, fields) {
          console.log(result);
          res.write(JSON.stringify({ message: "data inserted successfully" }));
          return res.end();
        }
      );
    });
  });
});

router.post("/edit", function (req, res, next) {
  // console.log("manisha >>", req.body);
  con.connect(function (err) {
    con.query(
      "update projects set title='" +
        req.body.title +
        "', url='" +
        req.body.url +
        "', detail='" +
        req.body.detail +
        "' where id=" +
        req.body.id,
      function (err, result, fields) {
        console.log(result);
        console.log(err);
        res.send(JSON.stringify({}));
      }
    );
  });
});

router.get("/view/:id", function (req, res, next) {
  console.log(req.params.id);
  con.connect(function (err) {
    con.query(
      "SELECT * FROM projects where id=" + req.params.id,
      function (err, result, fields) {
        console.log(result);
        res.send(JSON.stringify(result[0]));
      }
    );
  });
});
router.delete("/delete/:id", function (req, res, next) {
  con.connect(function (err) {
    con.query(
      "DELETE FROM projects WHERE id=" + req.params.id,
      function (err, result, fields) {
        console.log("delete");
        res.write(JSON.stringify(result));
        return res.end();
      }
    );
  });
  res.send("respond with a project delete");
});

module.exports = router;
