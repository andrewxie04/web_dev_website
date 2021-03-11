var express = require( 'express' ) ;
var app = express() ;

app.set("view engine", "hbs" );
app . get( '/' , function( req , res ) 
{
   res . render('index');
} ) ;

app . get( '/test' , function( req , res ) 
{
   console . log( 'user landed at page' ) ;
   res . render('test');
} ) ;

app . get( '/dog' , function( req , res ) 
{
   console . log( 'user landed at page' ) ;
   res . render('dog');
} ) ;

app . get( '/cat' , function( req , res ) 
{
   console . log( 'user landed at page' ) ;
   res . render('cat');
} ) ;

app . get( '/fish' , function( req , res ) 
{
   console . log( 'user landed at page' ) ;
   res . render('fish');
} ) ;

app . get( '/pet' , function( req , res ) 
{
      let type = req.query.type;
      if('dog' == type){
         res.render('dog')
      }
      if('cat' == type){
         res.render('cat')
      }
      if('fish' == type){
         res.render('fish')
      }
} ) ;

app . get( '/facts' , function( req , res ) 
{
      let topic = req.query.topic;
      let num = req.query.num;

      var arr = [];
      for(i = 0; i<num; i++) {
         var st = "";
         for(j = 0; j<=i; j++){
            st+=topic
         }
         arr.push(st);
      }

      res.render('facts_about', {arr})
} ) ;


var listener = app . listen( process . env . PORT || 8080 , process . env . HOST || "0.0.0.0" , function() {
   console . log( "Express server started" ) ;
} ) ;

