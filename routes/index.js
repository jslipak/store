var express =require('express');
var router =express.Router();
var passport =require("passport");
var LocalStrategy = require('passport-local').Strategy;
var user =require("../models/user");

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

router.get('/login',function(req , res){
  res.render('login')
})

router.post("/login",passport.authenticate("local",{
    failureRedirect:"/login",
        }),function(req,res){
      console.log('logueado');
      res.redir(200);
    })

module.exports = router;
