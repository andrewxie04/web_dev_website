var express = require('express');
var app = express();

const factsabout = require("../routes/factsabout.js")
const dogfishcat = require("../routes/dogfishcat.js")
const apod = require("../routes/apod.js")
const weather = require("../routes/weather.js")

app.use("/", factsabout)
app.use("/", dogfishcat)
app.use("/", apod)
app.use("/", weather)

app.set("view engine", "hbs");

var listener = app.listen(process.env.PORT || 8080, process.env.HOST || "0.0.0.0", function () {
   console.log("Express server started");
});

