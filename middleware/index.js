
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
        Product.findById(req.param.id , function(err , product){
            if (err) {
              res.render('error')
                  }else if (product.author.id.equals(req.user._id)){
                    next()
                  }else{
                    //aca deberia algun mensaje , de errro , que no es el dueño 
                     res.redirect("/products/"+req.params.id)
                  }
                                                                }
                         )
                              }
                                                }

module.exports = middleware
