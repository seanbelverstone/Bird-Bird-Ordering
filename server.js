const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
require("dotenv").config();

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

var models = require("./models");



// Send every request to the React app
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, function() {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
