var express = require("express")
var router = express.Router()

var cookieParser = require( 'cookie-parser' ) ;
router.use(cookieParser());


router.get('/cookies', function(req, res){
	// log the incoming cookies
	console.log( req.cookies )
	// set the outgoing cookie
	
    if(!('visit_count' in req.cookies)){
        res.cookie('visit_count', '1')
    }
    else{
        let count = Number(req.cookies.visit_count);
        
        res.cookie('visit_count', count+=1)
    }

    count = req.cookies.visit_count
    res.render('cookies', {count})
});

router.get('/ok', function(req, res){

	// send a page that does not have a cookie
    res.send('<!DOCTYPE html><html><body><h1> OK </h1></body></html>');
});

router.get('/cookies/reset', function(req, res){
	// log the incoming cookies
	console.log( req.cookies )
	// set the outgoing cookie
    res.cookie('visit_count', '1')
    count = req.cookies.visit_count
    res.render('cookies', {count})
    res.redirect('/cookies')
});



module.exports = router