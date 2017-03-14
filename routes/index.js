var express = require('express');
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

/* GET home page. */
router.get('/', function(req, res, next) {
res.render('index', { title: 'Express' });
});

router.get('/register' ,function(req,res,next){
res.render('register')
})


router.post('/register', function(req,res){
console.log(req.body.username)
var newuser = new User({username: req.body.username})
User.register(newuser, req.body.password, function (err, user) {
   if (err) {
     console.log(err);
     return res.send('hubo un error durante el registro');
   }
   res.send('Se creó el usuario ' + user.username);
 });
});

module.exports = router;
