
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , lti = require('./routes/lti')
  , http = require('http')
  , path = require('path');

var app = express();
const port = process.env.PORT || 5000;
// all environments
//app.set('port', process.env.PORT || 5000);
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
app.enable('trust proxy');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.post('/lti/caliper', lti.caliper);
app.post('/lti/outcomes', lti.outcomes);
app.post('/lti/send_outcomes', lti.send_outcomes);
app.post('/lti', lti.got_launch);
app.get('/', routes.index);

// http.createServer(app).listen(app.get('port'), function(){
//   console.log('Express server listening on port ' + app.get('port'));
// });

app.listen(port, ()=>{
  console.log('listening on port ', port);
  })
