var express = require('express');
var router = express.Router({mergeParams:true});
var Product= require('../models/product');
var Comment= require('../models/comment')
var middleware= require("../middleware/index")

router.get("/:c_id" , middleware.isLoggedIn, middleware.commentOwner , function(req ,res){
  Comment.findById(req.params.c_id).exec(function(err, comment){
    if(err){
      res.send("error")
    }else{
      res.render("editComments", {comment:comment})
    }
  })
})

router.post("/", middleware.isLoggedIn, function(req, res){
      var author={
        id:req.user._id,
        username:req.user.username
      }
      var body=req.body.body
      Product.findById(req.params.id, function(err, product){
        if(err){
          res.render(error)
        }else{
          Comment.create({productId:req.params.id, body:body, author:author} , function(err, comment){
            if(err){
              res.render(error)
            }else{
              product.comment.unshift(comment)
              product.save()
          res.redirect("/products/"+req.params.id)
          
        }
      })
    }
  })
})

//baja comentarios
router.delete("/:c_id",middleware.isLoggedIn ,function(req, res){
 // return console.log("soy el id del comentario: " + req.params.c_id)
console.log(req.params.c_id)
 Comment.findByIdAndRemove(req.params.c_id , function(err, comment){
    if(err){
    res.render('error')
  }else{
  // var indice  = Product.comment.indexOf(req.params.c_id)
  // Product.comment.splice(indice, 1)
  res.redirect("back")
    }
  })
 })

//modificar comments

router.put( "/:c_id" , middleware.commentOwner, function(req, res){
    var comment={}
  // var product={}
  //  product.nameProduct=req.body.nameProduct
  //  product.descriptionProduct=req.body.descriptionProduct
  //  product.price=Number(req.body.price)
  //  product.urlImageProduct=req.body.urlImageProduct
  //  console.log(req.params.id)
  //  console.log(product)
 comment.body = req.body.commentBody

  Comment.findByIdAndUpdate(req.params.c_id, comment , function(err){
    if(err){
      res.render("error")
    }else{
      res.redirect("/products/"+req.params.id)
    }
  })
})
  




module.exports = router;