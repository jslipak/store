var mongoose= require("mongoose")
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var passport = require("passport")
var localStrategy = require("passport-local");
var Users = require("./models/user");
var bodyParser= require("body-parser");
var index = require('./routes/index');
var products = require('./routes/products');
var comments = require('./routes/comments');
var app = express();
var methodOverride  = require("method-override");
mongoose.connect("mongodb://localhost/store2")

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public','images','favicon.ico')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//passportConfigurate
app.use(require("express-session")({
   secret:"ksdjflskf sfsdjfdsk fjds fdsñkf jñsflk sñfl skdfjsdfñlkjsf dsafds afsfj",
   resave: false,
   saveUninitialized: false
 }))

app.use(passport.initialize());
app.use(passport.session());
// Todas estas funciones nos las da el plugin de Mongoose. Acá las conectamos con Passport
passport.use(new localStrategy(Users.authenticate('local'))); // Aca creamos la estragegia

// La funcion authenticate() devuelve datos del usuario si es un usuario autenticado y false si no.
passport.serializeUser(Users.serializeUser()); // Función que guarda los datos en la db de sesiones.
passport.deserializeUser(Users.deserializeUser()); // Función que recupera los datos de la db de sesiones.

  app.use(function(req, res, next){
      res.locals.currentUser=req.user //
      next()
    })

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
//app.use('/users', users);
app.use('/products', products)
//app.use('product/:id',products)
app.use('comments', comments)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
