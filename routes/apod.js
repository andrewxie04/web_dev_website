var https = require("https")
var express = require('express')
var apod_router = express.Router()

apod_router.get('/apod', (req, res) => {
    const DATEFORMAT = "yyyy-mm-dd"
    let date = req.query.date;

    var url = 'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY';
    
    if(date){
        url += "&date="+date
    }

    https.get(url, function (response) {
        var s = "";
        response.on('data', function (chunk) {
			s+=chunk;
        });
        response.on('end', function () {
            var obj = JSON.parse(s);
            res.render('apod', obj)
        });
    });
 });


 



module.exports = apod_router