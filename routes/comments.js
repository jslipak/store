var express = require('express');
var router = express.Router({mergeParams:true});
var Product= require('../models/product');
var Comment= require("../models/comment")
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

//baja productos
router.delete("/:id",middleware.isLoggedIn ,function(req, res){
  Comment.CommentfindByIdAndRemove(req.params.id, function(err){
    if(err){
      res.render("error")
    }else{
    res.redirect("/new")
    }
  })
 })
module.exports = router;