var express = require('express');
var router = express.Router();
require('dotenv').config()
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var http = require('http');
var db = mongoose.connection;

// Creating a collection on MongoDB
var MyModel = mongoose.model('test', new Schema({ name: String }));
//Creating model
var schema = new mongoose.Schema({ name: 'string', size: 'string' });
var Tank = mongoose.model('Tank', schema);
schema.set('toJSON', { getters: true, virtuals: false });
var result;

/* GET home page. */
router.get('/', function(req, res, next) {

  //Get the content from Db
  var contentData = Tank.find(function (err, Tank) {
    if (err) return console.error(err);
    result = Tank;
  });
  setTimeout(function(){
    res.render('index', { title: 'MongoDb Test on Express.js server' , user:'Ricardo Furtado',readDb:result});  
  },3000)
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
