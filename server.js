const express = require("express");
const app = express();
const crypto = require("crypto");

require("dotenv").config();
const port = process.env.PORT || 3000;

app.use(express.json()); // row
app.use(express.urlencoded()); // urlencoded

app.get("/", (req, res) => res.send("Hello world"));
let records = [];

app.post("/api/user", (req, res) => {
  const { name, email, mobile } = req.body;
  if (!name || !email || !mobile) {
    res.send("all filed are require ");
  } else {
    records.push({ name, email, mobile, id: crypto.randomUUID() });
    res.send("data inserted");
  }
});

app.get("/api/user", (req, res) => {
  res.send({ success: true, records });
});

app.get("/api/user/:id", (req, res) => {
  const singleRecord = records.find((ele) => ele.id == req.params.id);
  res.send({ success: true, singleRecord });
});

app.delete("/api/user/:userId", (req, res) => {
  console.log(req.params);
  const { userId } = req.params;
  const filterData = records.filter((ele) => ele.id !== userId);
  records = filterData;
  res.send("data is deleted");
});

app.put("/api/user", (req, res) => {
  console.log(req.query);
  const { id } = req.query;
  const { name, email, mobile } = req.body;
  const index = records.findIndex((ele) => ele.id == id);
  if (index != -1) {
    records[index] = { name, email, mobile, id };
  }
  res.send("updated");
});
app.listen(port, () => console.log(` port http://localhost:${port}`));
