var path        = require('path');
var url         = require('url');
var express     = require('express');
var browserify  = require('connect-browserify');
var ReactAsync  = require('react-async');
var nodejsx     = require('node-jsx').install();
var App         = require('./modules/App');
var Routes      = require('./routes.js');

var development = process.env.NODE_ENV !== 'production';

function renderApp(req, res, next) {
  var path = url.parse(req.url).pathname;
  var app = App({path: path});
  ReactAsync.renderComponentToStringWithAsyncState(app, function(err, markup) {
    if (err) {
      return next(err);
    }
    res.send(markup);
  });
}

var api = express()
  .get('/popular', Routes.vinePopular)
  .get('/search/:q', Routes.vineSearch)
  .get('/:videoId', Routes.vineGetVideo);


var app = express();

if (development) {
  app.get('/assets/bundle.js',
    browserify('./modules/App', {
      debug: true,
      watch: true
    }));
}

app
  .use('/assets', express.static(path.join(__dirname, 'assets')))
  .use('/vine', api)
  .use(renderApp)
  .listen(3010, function() {
    console.log('Point your browser at http://localhost:3010');
  });
