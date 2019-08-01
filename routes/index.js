var express = require('express');
var router = express.Router();
require('dotenv').config()
var bodyParser = require('body-parser');
const mongoose = require('mongoose');

var schema = new mongoose.Schema({ name: 'string', size: 'string' });
var Tank = mongoose.model('Tank', schema);



// Rick.find({ name: 'john', age: { $gte: 18 }});


/* GET home page. */
router.get('/', function(req, res, next) {
  
  var contentData = Tank.find();
  console.log(contentData);
  
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

  res.render('index', { title: 'Testing using MongoDb and Mongoose on Express.js server' , user:'Ricardo Furtado'});
}); 

router.post('/delete', function(req, res, next) {
  var name = req.body.name;
  
  Tank.deleteMany({ name: req.body.name }, function (err) {
    if (err) return handleError(err);
    alert('The item :' + name + ' has been deleted...')
  });
  
    res.render('index', { title: 'Testing using MongoDb and Mongoose on Express.js server' , user:'Ricardo Furtado'});
  }); 



router.get('/test', function(req, res, next) {
  // res.render('index', { body:  });


  // db.connect.find(function (err, sample_airbnb) {
  //   if (err) return console.error(err);
  //   console.log(kittens);
  // });  
  console.log('test de conexao')
});


module.exports = router;
