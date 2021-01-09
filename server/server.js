// server.js
const express = require("express");
const path = require("path");

const app = express();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 8080;

// DB Configuration
require("./src/database");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const CLIENT_BUILD_PATH = path.join(__dirname, "../client/build");

// If the build is in production we serve the static files using express
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static(CLIENT_BUILD_PATH));

  // Serve React Client
  app.get("/", function (req, res) {
    res.sendFile(path.join(CLIENT_BUILD_PATH, "index.html"));
  });
}

app.listen(PORT, function () {
  console.log(`Server Listening on ${PORT}`);
});
