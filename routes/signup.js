var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
   if(req.query["email"] ){
    res.send(req.query);
   }else{
    res.render('register');
   }
  
    
});
router.post('/', function(req, res, next) {
    res.json(req.body.email)
    //res.render('register');
  });

module.exports = router;
