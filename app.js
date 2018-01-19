require('app-module-path').addPath(__dirname);

const path = require("path");
const fs = require("fs-extra");

var compression = require('compression'),
	express = require('express'),
	marko = require('marko/node-require').install(),
	markoPre = require('arc-plugin-marko').beforeCreate;

var app = express();
app.use(compression());

app.set('view cache', true);

app.set('trust_proxy', 1);

var lassoConfig;

switch(app.get('env')){
	case 'development':
		lassoConfig = {
			"outputDir": "public/static",
			"urlPrefix": "static/",
			"minify": false,
			"plugins": [
				"lasso-marko",
				"lasso-autoprefixer",
				"lasso-sass"
			],
			"resolveCssUrls": true,
			"bundlingEnabled": false,
			"fingerprintsEnabled": false
		};
		require('lasso').configure(lassoConfig);

		app.use(require('morgan')('dev'));
		break;
	case 'production':

		lassoConfig = './lasso-config.json';
		let cwd = process.cwd();

		require('lasso').configure(require(require.resolve(path.resolve(cwd, lassoConfig))));

		break;
	}

// ******* Static handler *************
app.use(express.static(__dirname + '/public'));

// ******* Routes handler *************
// ------- Home ---------------------------

app.get('/', function(req, res){
	require('./src/pages/home')(req, res, app);
});

// ------- Category -----------------------

//Send back JSON let browser render
app.post('/cat/:catID', function(req, res){
  req.sendJSON = true;
  require('./src/pages/category')(req, res, app);
});

//Directly visited page, render on server
app.get('/cat/:catID', function(req, res){
  req.sendJSON = false;
  require('./src/pages/category')(req, res, app);
});

// ------- Errors -----------------------

// 404 catch-all error handler (middleware)
app.use(function(req, res, next){
    res.status(404);
    res.send('404 error');
});

// custom 500 page
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500);
    res.send('500 error');
});

var server;
var PORT = process.env.PORT || 8082;
server = app.listen(PORT, function(){
	console.log('App listening on port' + PORT);
	console.log('Press Ctrl+C to quit.');
});
