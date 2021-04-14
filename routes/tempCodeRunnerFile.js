newurl = obj.properties.forecastHourly;
                console.log("new url has been set: " + newurl)
                res.locals.city = obj.properties.relativeLocation.properties.city;
                res.locals.state = obj.properties.relativeLocation.properties.state;