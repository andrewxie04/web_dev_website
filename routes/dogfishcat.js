var express = require('express')
var dog_router = express.Router()

dog_router.get("/", (req, res) => { res.render('../views/index') })

dog_router.get("./views/test", (req, res) => {
   console.log('user landed at page');
   res.render('./views/test');
})

dog_router.get('/dog', (req, res) =>{
   console.log('user landed at page');
   res.render('dog');
});

dog_router.get('/cat', (req, res) => {
   console.log('user landed at page');
   res.render('cat');
});

dog_router.get('/fish', (req, res) => {
   console.log('user landed at page');
   res.render('fish');
});

dog_router.get('/pet', (req, res) => {
   let type = req.query.type;
   if ('dog' == type) {
      res.render('cat')
   }
   if ('cat' == type) {
      res.render('dog')
   }
   if ('fish' == type) {
      res.render('fish')
   }
});

module.exports = dog_router