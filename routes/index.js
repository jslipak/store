var express =require('express');
var router =express.Router();
var passport =require("passport");
var LocalStrategy = require('passport-local').Strategy; //lo puse porque lo vi en stack OverFlow
var User =require("../models/user");
var app = require("../app.js")
var bodyParser= require("body-parser")
var Product =require("../models/product");

/* GET home page. */
// router.get('/', function(req, res, next) {
// res.render('index', {product:products});
// });

router.get("/", function(req, res){
    Product.find({}, function(err, products){
    if(err){
      res.render("error")
    }else{
    res.render("index", {products:products})}
  })})


router.get('/register' ,function(req,res,next){
res.render('register')
})

router.post('/register', function(req,res){
console.log(req.body.username) //esto anda el parser
console.log(req.body.password) // anda
var newUser= new User({ username: req.body.username })
User.register(newUser, req.body.password, function (err, User){
   if (err) {
     console.log(err);
     return res.send('hubo un error durante el registro');
   }
   res.send('Se creó el usuario ' + User.username);
 });
});

router.get('/login',function(req , res){
  res.render('login')
})

router.post("/login",passport.authenticate("local",{
    //successRedirect:"/products",
    failureRedirect:"/register",
    }),function(res,req){
      console.log("logueado   ");
      req.redirect("/");
    })

router.get("/logout", function(req, res) {
    req.logout()
    res.redirect('/')
    
    })
module.exports = router;
