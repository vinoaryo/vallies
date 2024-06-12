const bodyParser = require("body-parser");
const express = require("express");
const { bot } = require("../bot/index");

const app = express();

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.set(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index", { name: bot.user.tag, commands: bot.commands });
});

app.listen(8080, () => {
  console.log("Listening to 8080");
});
