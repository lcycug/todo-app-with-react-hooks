const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json()); // handle json data
app.use(bodyParser.urlencoded({ extended: true })); // handle URL-encoded data

app.get("/", (req, res) => res.send("Success!"));

app.use("/api/todo", require("./routes/todos"));

mongoose
  .connect(require("./config/keys").mongoURI, { useNewUrlParser: true })
  .then(() => console.log("DB connected."))
  .catch(err => console.error(err));

const port = process.env.NODE_PATH || 5000;
app.listen(port, console.log(`Server is listening to port ${port}`));
