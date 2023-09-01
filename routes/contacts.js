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
    con.query("SELECT * FROM contacts", function (err, result, fields) {
      console.log(result);
      res.write(JSON.stringify(result));
      return res.end();
    });
  });
});

router.post("/add", function (req, res, next) {
  res.send("respond with a contact add");
});

router.post("/edit", function (req, res, next) {
  console.log("manisha >>", req.body);
  con.connect(function (err) {
    con.query(
      "update contacts set name='" +
        req.body.name +
        "', email='" +
        req.body.email +
        "', phone='" +
        req.body.phone +
        "', message='" +
        req.body.message +
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
      "SELECT * FROM contacts where id=" + req.params.id,
      function (err, result, fields) {
        console.log(result);
        res.send(JSON.stringify(result[0]));
      }
    );
  });

});
router.delete("/delete/:id", function (req, res, next) {
  con.query("DELETE FROM contacts WHERE id=" + req.params.id ,
  function (err, result, fields) {
    console.log(result);
    res.write(JSON.stringify(result));
    return res.end();
   
  }
  )
  res.send("respond with a contact delete");
});

module.exports = router;
