var express = require('express')
var facts_router = express.Router()

facts_router.get("/", (req, res) => { res.render('../views/index') })

facts_router.get('/facts', (req, res) => {
   let topic = req.query.topic;
   let num = req.query.num;

   var arr = [];
   for (i = 0; i < num; i++) {
      var st = "";
      for (j = 0; j <= i; j++) {
         st += topic
      }
      arr.push(st);
   }
   res.render('facts_about', { arr })
});
module.exports = facts_router