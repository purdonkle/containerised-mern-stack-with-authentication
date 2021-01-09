// server.js
import express from "express";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import "./src/database.js";

const app = express();
const PORT = process.env.PORT || 8080;
const CLIENT_BUILD_PATH = join(dirname(fileURLToPath(import.meta.url)), "../client/build");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// If the build is in production we serve the static files using express
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static(CLIENT_BUILD_PATH));

  // Serve React Client
  app.get("/", function (req, res) {
    res.sendFile(join(CLIENT_BUILD_PATH, "index.html"));
  });
}

app.listen(PORT, function () {
  console.log(`Server Listening on ${PORT}`);
});
