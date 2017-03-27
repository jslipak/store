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

router.post('/', function(req,res){
  console.log(req.body)
  res.render('index')
} )

module.exports = router;
