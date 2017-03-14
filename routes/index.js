var express =require('express');
var router =express.Router();
var passport =require("passport");
var user =require("../models/user.js");

/* GET home page. */
router.get('/', function(req, res, next) {
res.render('index', { title: 'Express' });
});

router.get('/register' ,function(req,res,next){
res.render('register')
})


router.post('/register', function(req,res){
 var newUser= new user({ username: req.body.username })
user.register(newUser, req.body.password, function (err, user){
   if (err) {
     console.log(err);
     return res.send('hubo un error durante el registro');
   }
   res.send('Se creó el usuario ' + user.username);
 });
});

module.exports = router;
