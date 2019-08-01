var express = require('express');
var router = express.Router();
require('dotenv').config()
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var http = require('http');

var MyModel = mongoose.model('test', new Schema({ name: String }));
var schema = new mongoose.Schema({ name: 'string', size: 'string' });
var Tank = mongoose.model('Tank', schema);

/* GET home page. */
router.get('/', function(req, res, next) {
  
  // var contentData = Tank.find();
  // console.log(MyModel);
// Tank.find(function(err,Tanks){
//   res.send(Tank);
// });

  res.render('index', { title: 'Testing using MongoDb and Mongoose on Express.js server' , user:'Ricardo Furtado'});
});  


router.post('/send', function(req, res, next) {
var name = req.body.name;
var size = req.body.size;

var newItem = new Tank({ name: name ,size: size });
  newItem.save(function (err) {
    if (err) return handleError(err);
    console.log('Success saving the new item ')
  });

  res.redirect('/');
}); 

router.post('/delete', function(req, res, next) {
  var name = req.body.name;
  
  Tank.deleteOne({ name: req.body.name }, function (err) {
    if (err) return handleError(err);
    console.log('The item :' + name + ' has been deleted...')
  });
  
    res.redirect('/');
  }); 

module.exports = router;
