var express = require('express')
, routes = require('./routes')
, user = require('./routes/user')
, http = require('http')
, path = require('path')
, mongoDB = require('./mongoDB').mongoDB;
var TablaProvider = require('./tablaProvider').TablaProvider;
var PtsProvider = require('./ptsProvider').PtsProvider;
var app = express();

app.configure(function(){
app.set('port', process.env.PORT || 3000);
app.set('front', __dirname + '/front');
//app.set('view engine', 'jade');
app.set('view options', {layout: false});
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));
app.engine('html', require('jade').renderFile);
});

app.configure('development', function(){
app.use(express.errorHandler());
});

//create new database object 
var mongoDB= new mongoDB('mongodb', 27017);//estasvariables llaman a el js recipePorvider

//var tablaProvider= new TablaProvider('localhost', 27017);
//var ptsProvider= new PtsProvider('localhost', 27017);
// set up our routes for the site
// get and display the recipes on the front page
app.get('/', function(req, res){
  mongoDB.findAll(function(error, recip){//recip==nombre d ela coleccion
      res.render('index', {
          title: "Recipes",
          recipes:recip
      });
  });
});

/*
  app.post('/recipe/:id/edit', function(req, res){
  mongoDB.findOne(req.param('_id'), function(error, recip){
      res.render("edit_recipe", {
          title: "Edit Recipe",
          recipe:recip
      });
  });
  console.log("Found recipe id #"+req.param('_id'));
});

app.get('/recipe/new', function(req, res){
  res.render("recipe_new", {
      title: "New Recipe"
  });
});

// save data to the database
app.post('/recipe/new', function(req, res){
  mongoDB.save({
      Ticket: req.param('Ticket'),
      SLO: req.param('SLO'),
      Asignado: req.param('Asignado'),
      Grupo_de_cierre: req.param('Grupo_de_cierre'),
      Fecha_de_cierre: req.param('Fecha_de_cierre'),
      Fecha_de_apertura: req.param('Fecha_de_apertura'),
      Categoria: req.param('Categoria'),
      Subcategoria: req.param('Subcategoria'),
      Nivel1: req.param('Nivel1'),
      Nivel2: req.param('Nivel2'),
      
  }, function(error, docs) {
          res.redirect('/')
  });
});

app.post('/recipe/:id/delete', function(req, res){
  mongoDB.delete(req.param('_id'), function(error, docs){
      res.redirect('/')
  });
});

app.post('/recipe/search', function(req, res){
  mongoDB.search(req.param('searchterm'), function(error, recip){
          res.render("search", {
          title: "Search Results",
          recipe:recip
      });
  });
});

*/
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
/*
app.post('/recipe/:id/update', function(req, res){
  mongoDB.update(req.param('_id'), {
      Ticket: req.param('Ticket'),
      SLO: req.param('SLO'),
      Asignado: req.param('Asignado'),
      Fecha_de_apertura: req.param('Fecha_de_apertura'),
      Grupo_de_cierre: req.param('Grupo_de_cierre'),
      Categoria: req.param('Categoria'),
      Subcategoria: req.param('Subcategoria'),
      Nivel1: req.param('Nivel1'),
      Nivel2: req.param('Nivel2'),
  },
      function(error, docs){
      res.redirect('/')
  });
});
*/
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
/*
app.get('/recipe/principal', function(req, res){
  tablaProvider.findAll(function(error, total){
  res.render("principal", {
      title: "Recipes",
      total:total

  });
});
});

*/
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////

/*
app.get('/recipe/pts', function(req, res){
  ptsProvider.findAll(function(error, pt){
  res.render("pts", {
      title: "Recipes",
      pts:pt
  });
});
});
*/
///////////////////////////////////////////////////////////////////////
/*
app.post('/recipe/:id/ale', function(req, res){
  ptsProvider.update(req.param('_id'), {
      Alegaciones: req.param('Alegaciones'),
      
  },
      function(error, docs){
      res.redirect('/recipe/pts')
  });
});

  app.post('/recipe/:id/alegado', function(req, res){
  ptsProvider.findOne(req.param('_id'), function(error, recip){
      res.render("alegados", {
          title: "Edit Recipe",
          pts:recip
      });
  });
  console.log("Found recipe id #"+req.param('_id'));
});
*/
app.listen(3000);