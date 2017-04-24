var express = require('express'),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser');

var db;

if(process.env.ENV == 'Test') {
	db = mongoose.connect('mongodb://localhost/bookAPI_test');
} else {
	db = mongoose.connect('mongodb://localhost/bookAPI');
}
var Book = require('./models/bookModel');

var app = express();
var port = process.env.port || 3000;
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

bookRouter = require('./routes/bookRoutes')(Book, express);

app.use('/api/books', bookRouter);

app.get('/', function(req, res){
	res.send('welcome to my api!');
});

app.listen(port, function() {
	console.log('port is running on amazing', port);
})

module.exports = app;