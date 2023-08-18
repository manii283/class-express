const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/", (req, res) => {
  res.send("Hello World! post");
});

app.put("/", (req, res) => {
  res.send("Hello World! put");
});

app.delete("/", (req, res) => {
  res.send("Hello World! delete");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
