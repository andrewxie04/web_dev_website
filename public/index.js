var express = require('express');
var app = express();

const factsabout = require("../routes/factsabout.js")
const dogfishcat = require("../routes/dogfishcat.js")
const apod = require("../routes/apod.js")
const weather = require("../routes/weather.js")
const cookies_site = require("../routes/cookies_site.js")
const cookies_auth = require("../routes/cookieauth")

app.use("/", factsabout)
app.use("/", dogfishcat)
app.use("/", apod)
app.use("/", weather)
app.use("/", cookies_site)
app.use("/", cookies_auth)

app.set("view engine", "hbs");

var listener = app.listen(process.env.PORT || 8080, process.env.HOST || "0.0.0.0", function () {
   console.log("Express server started");
});

