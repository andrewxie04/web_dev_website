var https = require("https")
var express = require('express')
var weather_router = express.Router()

weather_router.get('/weather', (req, res) => {

    const example = "https://st.sites.tjhsst.edu/weather/?lat=38.627&long=-90.1994"

    let lat = Math.round(req.query.lat * 10000) / 10000;
    let long = Math.round(req.query.long * 10000) / 10000;

    var url = 'https://api.weather.gov/points/';

    var options = {
        headers: {
            'User-Agent': 'request'
        }
    }
    try {
        if (lat && long) {
            url += lat + "," + long
            https.get(url, options, function (response) {
                var rawData = '';
                response.on('data', function (chunk) {
                    rawData += chunk;
                });
                response.on('end', function () {
                    console.log(rawData);
                    console.log(url)
                    var obj = JSON.parse(rawData);
                    try{
                    newurl = obj.properties.forecastHourly;
                    console.log("new url has been set: " + newurl)
                    

                    res.locals.city = obj.properties.relativeLocation.properties.city;
                    res.locals.state = obj.properties.relativeLocation.properties.state;
                

                    https.get(newurl, options, function (response) {
                        var rawData = '';
                        response.on('data', function (chunk) {
                            rawData += chunk;
                        });
                        response.on('end', function () {
                            console.log(newurl)
                            var obj = JSON.parse(rawData);
                            console.log(obj)
                            //

                            let { updated, periods } = obj.properties
                            let formattedPeriods = []
                            periods.forEach((val, i) => {

                                let {
                                    icon,
                                    startTime,
                                    temperature,
                                    temperatureUnit,
                                    windSpeed,
                                    windDirection,
                                    shortForecast
                                } = val

                                formattedPeriods.push({
                                    icon,
                                    time: startTime,
                                    temperature: `${temperature} ${temperatureUnit}`,
                                    wind: `${windDirection} at ${windSpeed}`,
                                    shortForecast
                                })
                            })
                            const table_info = { updated, forecast: formattedPeriods.slice(0, 8), lat, long };
                            res.render('weather_table', table_info)
                        });
                    });
                }catch(e){res.render('weather_table', {error: true})}
                });
            });

        }
        else {
            res.render('weather')
        }
    } catch (e) {
        res.render('weather_table', {error: true})
    }
});

module.exports = weather_router