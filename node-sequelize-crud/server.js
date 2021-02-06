const express = require("express");
const app = express();

//Body Pareser
app.use(express.json());

//Model
const Post = require("./models/Post");

//Database
const db = require("./config/db");

//Routes
app.use("/", require("./routes/postRoutes"));

const PORT = process.env.PORT || 5000;

//Test DB
db.sync({
  logging: console.log,
  force: true,
})
  .then(() => {
    console.log("Connection has been established successfully.");
    app.listen(PORT, () => {
      console.log(`Example app listening at http://localhost:${PORT}`);
    });
  })
  // .then(() => {
  //   Post.create({
  //     title: "Jane",
  //     description: "Doe",
  //     published: "false",
  //   });
  // })
  .catch((err) => {
    console.error("Unable to connect to the database", err);
  });

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Post application." });
});
