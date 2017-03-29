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

router.post("/", middleware.isLoggedIn, function(req, res){
  //console.log(req.body.nameProduct)
  //console.log(req.user._id)
  var product= new Product ()
   product.nameProduct=req.body.nameProduct
   product.descriptionProduct=req.body.descriptionProduct
   product.price=Number(req.body.price)
   product.urlImageProduct=req.body.urlImageProduct
   var author={
    id:req.user._id,
    user: req.user.username
  }
   product.author=author
   console.log(product)
   Product.create(product, function(err, doc){
    if(err){
      console.log(err);
      res.render("error")
      //res.sendStatus(500);
    }else{
      res.redirect("/")
      //res.sendStatus(200);
    }
  })

})

module.exports = router;
