var express = require('express');
var router = express.Router();
var Product=require("../models/product")
var middleware = require("../middleware/index")

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index')});

router.get('/new',function(req,res){
  res.render("addItem")
});

router.post('/', middleware.isLoggedIn,function(req,res){
  console.log(req.body)
  res.render('index')
} )

app.post("/", middleware.isLoggedIn, function(req, res){
  var product=req.body.nameProduct
  var author={
    id:req.user._id,
    username: req.user.username
  }
  product.author=author
  product.descriptionProduct=reg.body.descriptionProduct
  product.urlImageProduct=req.body.urlImageProduct
  product.price=req.body.price
  Product.create(product, function(err, doc){
    if(err){
      console.log(err);
      // res.render("error")
      res.sendStatus(500);
    }else{
      //res.redirect("/products")
      res.sendStatus(200);
    }
  })

})

module.exports = router;
