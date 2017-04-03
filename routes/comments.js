var express = require('express');
var router = express.Router({mergeParams:true});
var Product= require('../models/product');
var Comment= require('../models/comment')
var middleware= require("../middleware/index")

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

  Comment.findByIdAndRemove(req.params._c_id , function(err){
    if(err){
    res.render('error')
  }else{
  var indice  = Product.comment.indexOf(comment)
  Product.comment.splice(indice, 1)
  Product.save()
  res.redirect("back")
    }
  })
 })
module.exports = router;