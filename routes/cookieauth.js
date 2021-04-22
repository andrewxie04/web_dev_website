var express = require("express")
var router = express.Router()


var cookieSession = require('cookie-session')
var express = require('express')
const { AuthorizationCode } = require('simple-oauth2');


var https = require('https');

// -------------- express initialization -------------- //

router.use(cookieSession({
    name: 'snorkles',
    keys: ['SomeSecretKeys123', 'ThatYouShouldChange456']
}))


var ion_client_id = 'iqNSbQU8Su4UTlvfwfXKEMiONJPEdlTKHB0EcXJY';
var ion_client_secret = 'N20qEtau6WPSDJ54SMvU0ulO5LLGuGkvELbMcSeAah5IfoICUEzxl1AYdQxyRG3FBsPiUi2Oprr17hXOlZvDzfklRpwSJrQYZJEWaHjiT8AavNtd8XipOTkquhRY3rCp';
var ion_redirect_uri = 'http://localhost:8080/cookiesauth/login_worker';

// Here we create an oauth2 variable that we will use to manage out OAUTH operations

var client = new AuthorizationCode({
    client: {
        id: ion_client_id,
        secret: ion_client_secret,
    },
    auth: {
        tokenHost: 'https://ion.tjhsst.edu/oauth/',
        authorizePath: 'https://ion.tjhsst.edu/oauth/authorize',
        tokenPath: 'https://ion.tjhsst.edu/oauth/token/'
    }
});

var authorizationUri = client.authorizeURL({
    scope: "read",
    redirect_uri: ion_redirect_uri
});

console.log(authorizationUri)

// -------------- express 'get' handlers -------------- //

function checkAuthentication(req, res, next) {

    if ('authenticated' in req.session) {
        // the user has logged in
        next()
    }
    else {
        if(!('visit_count' in req.cookies)){
            res.cookie('visit_count', '1')
        }
        else{
            let count = Number(req.cookies.visit_count);
            res.cookie('visit_count', count+=1)
        }
    
        count = req.cookies.visit_count

        res.render('unverified', { 'login_link': authorizationUri, "count": count})
    }
}

function getUserName(req, res, next) {
    var access_token = req.session.token.access_token;
    var profile_url = 'https://ion.tjhsst.edu/api/profile?format=json&access_token=' + access_token;

    https.get(profile_url, function (response) {

        var rawData = '';
        response.on('data', function (chunk) {
            rawData += chunk;
        });

        response.on('end', function () {
            res.locals.profile = JSON.parse(rawData);
            next();
        });

    }).on('error', function (err) {
        next(err)
    });

}

router.get('/cookiesauth', [checkAuthentication, getUserName], function (req, res) {

    var profile = res.locals.profile;
    var first_name = profile.first_name;
    console.log(first_name)
    if(!('visit_count' in req.cookies)){
        res.cookie('visit_count', '1')
    }
    else{
        let count = Number(req.cookies.visit_count);
        res.cookie('visit_count', count+=1)
    }

    count = req.cookies.visit_count

    res.render('verified', { 'user': first_name, 'count': count });
});


router.get('/cookiesauth/logout', function (req, res) {

    delete req.session.authenticated;
    res.redirect('http://localhost:8080/cookiesauth');

});


// -------------- intermediary login_worker helper -------------- //
async function convertCodeToToken(req, res, next) {
    var theCode = req.query.code;
    var options = {
        'code': theCode,
        'redirect_uri': ion_redirect_uri,
        'scope': 'read'
    };

    try {
        var accessToken = await client.getToken(options);      // await serializes asyncronous fcn call
        res.locals.token = accessToken.token;
        next()
    }
    catch (error) {
        console.log('Access Token Error', error.message);
        res.sendStatus(403); // error creating token
    }
}


router.get('/cookiesauth/login_worker', [convertCodeToToken], function (req, res) {

    req.session.authenticated = true;
    req.session.token = res.locals.token;
    res.cookie('visit_count', 0)
    res.redirect('http://localhost:8080/cookiesauth');

});


router.get('/cookiesauth/reset', function(req, res){
	// log the incoming cookies
	console.log( req.cookies )
	// set the outgoing cookie
    res.cookie('visit_count', '1')
    count = req.cookies.visit_count
    res.render('cookies', {count})
    res.redirect('/cookiesauth')
});


module.exports = router