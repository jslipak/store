var express = require('express');
var router = express.Router();
var Product=require("../models/product")
var middleware = require("../middleware/index")

// /* GET home page. */
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
      res.send("error")
    }else{
      res.render("idProduct", {product:product})
    }
  })
})

//editar productos
//1ro render lo que hay BD
router.get("/:id/edit", function(req, res){
  Product.findById(req.params.id).exec(function(err, product){
    if(err){
      res.render("error")
    }else{
      res.render("editProduct", {product:product})
    }
  })
})


//baja productos
router.delete("/:id",middleware.isLoggedIn, middleware.productOwner ,function(req, res){
  Product.findByIdAndRemove(req.params.id, function(err){
    if(err){
      res.render("error")
    }else{
    res.redirect("/new")
    }
  })
})

router.put("/:id", middleware.producOwner, function(req, res){
  var product= new Product ()
   product.nameProduct=req.body.nameProduct
   product.descriptionProduct=req.body.descriptionProduct
   product.price=Number(req.body.price)
   product.urlImageProduct=req.body.urlImageProduct

  Product.findByIdAndUpdate(req.params.id,product, function(err){
    if(err){
      res.render("error")
    }else{
      res.redirect("/products/"+req.params.id)
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
