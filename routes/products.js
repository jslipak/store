var express = require('express');
var router = express.Router();
var Product=require("../models/product")
var middleware = require("../middleware/index")

/* GET home page. */
router.get("/", function(req, res){
    Product.find({}, function(err, products){
    if(err){
      res.render("error")
    }else{
    res.render("index", {products:products})}
  })})


router.get('/new',function(req,res){
  res.render("addItem")
});


router.get("/:id", function(req, res){
  Product.findById(req.params.id).exec(function(err, product){
    if(err){
      res.send("gato")
    }else{
      res.render("idProduct", {product:product})
    }
  })
})


//Alta de productos ok
router.post("/", middleware.isLoggedIn, function(req, res){
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
