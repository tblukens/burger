// Dependencies
// =============================================================
var express = require("express");
require('dotenv').config()

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8081;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory to be served
app.use(express.static("dist"));

// USING CORS FOR TESTING
//==============================================================
const cors = require('cors')
app.use(cors())

//--------------------------------------------------------------

// Routes
// =============================================================
var routes = require("./controllers/burgers_controller.js");
app.use(routes)

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
