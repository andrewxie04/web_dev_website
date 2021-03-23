var express = require('express');
var app = express();

const factsabout = require("../routes/factsabout.js")
const dogfishcat = require("../routes/dogfishcat.js")
const apod = require("../routes/apod.js")

app.use("/", factsabout)
app.use("/", dogfishcat)
app.use("/", apod)

app.set("view engine", "hbs");

var listener = app.listen(process.env.PORT || 8080, process.env.HOST || "0.0.0.0", function () {
   console.log("Express server started");
});

