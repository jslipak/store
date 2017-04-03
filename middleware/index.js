
var middleware={}
var Comment = require("../models/comment"),
    Product = require("../models/product")

middleware.isLoggedIn=function(req, res, next){
  if(req.isAuthenticated()){
    return next()
  }else{
    res.redirect("/login")
  }
}

middleware.productOwner=function(req, res , next){
    if(req.isAuthenticated()){
        Product.findById(req.params.id , function(err , product){
            if (err) {
              res.render('error')
                  }else if (product.author.id.equals(req.user.id)){
                    next()
                  }else{
                    //aca deberia algun mensaje , de errro , que no es el dueño 
                     res.redirect("/products/"+req.params.id)
                  }
                                                                }
                         )
                              }
                                                }
                                                

middleware.commentOwnership=function(req,res,next){
  if(req.isAuthenticated()){
    Comment.findById(req.params.c_id, function(err, comment){

      if(err){
        res.redirect("back")

      }else if(comment.author.id.equals(req.user.id)){
        next()
      }else{
        
        res.redirect("back")
      }
    })
    }else{
      res.redirect("back")
    }
  }
module.exports = middleware
