const express = require("express");
const app = express();
const morgan = require("morgan");
const bp = require("body-parser");
const layout = require("./views/layout");
const { db, Page, User } = require("./models/index");

app.use(morgan("dev"));

app.use(express.static("public"));

app.use(bp.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  res.send(layout(""));
});

db.authenticate().then(() => {
  console.log("connected to the database");
});

const init = async () => {
  await db.sync({ force: true });
  app.listen(3000, () => {
    console.log(`Listening`);
  });
};

init();
