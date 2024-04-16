const express = require("express");
const morgan = require("morgan");
require("dotenv").config();

const ViteExpress = require("vite-express");

const app = express();
// MiddleWares
app.use(express.json());

// app.get("/hello", (req, res) => {
//   res.send("Hello Vite + React!");
// });

app.use("/api", require("./api"));
app.use("/auth", require("./api/auth"));

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000...")
);
