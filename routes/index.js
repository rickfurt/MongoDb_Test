var express = require('express');
var router = express.Router();
require('dotenv').config();
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var http = require('http');
var db = mongoose.connection;
var cloudinary = require('cloudinary').v2;

cloudinary.config({ 
  cloud_name: process.env.cloud_name, 
  api_key: process.env.api_key, 
  api_secret: process.env.api_secret
});

// var MyModel = mongoose.model('test', new Schema({ name: String }));
// var schema = new mongoose.Schema({ name: 'string', size: 'string' });

var ImageSchema = new mongoose.Schema({ 
    title: {
      type:'string',
      required:true
    }, 
    description: 'string',
    url:{
      type:'string',
      required:true 
    }    
  });

  var UserSchema = new mongoose.Schema({ 
    username: {
      type:'string',
      required:true
    }, 
    password:{
      type:'string',
      required:true 
    }
  });


// User.create({ username:'admin' ,password:'1234' },
//  function (err, user) {
//   if (err) return handleError(err);
// console.log('model has been created...')
// });

// var Tank = mongoose.model('Tank', schema);
var Image = mongoose.model('Image', ImageSchema);
var User = mongoose.model('User',UserSchema);
var result;

// console.log(Tank.findOne({size:'big'}));

/* GET home page. */
router.get('/', function(req, res, next) {
  var message = 'Testing error login messages';
    res.render('index', {title:'Please login Bellow',message:message})
});  

/* GET Login page. */
router.get('/login', function(req, res, next) {  
  var message;
    res.render('login', {title:'Please login Bellow',message:message})
});  


router.post('/login', function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    Image.find(function (err, Image) {
      if (err) return console.error(err);
      result = Image;
      // console.log(Image);
    });

      User.findOne({
        username: username
        }, function (err, User) {
        if (err) {
          return console.log('err');
        }

        if(User){
          if(User.password === password){
            res.render('admin', { title: 'MongoDb | Express.js | Cloudinary API test' , user:'Ricardo Furtado',readDb:result});  
            
          }else{
            res.render('login', {title:'Please login Bellow',message:'User or password incorrect'})  
          }
          console.log(User.username);
        }else{
          res.render('login', {title:'Please login Bellow',message:'User or password incorrect'})
        }
        var x = User;
        // console.log(x.username,x.password);

        // if (x.username === username){
        //   console.log('user correct');
        // }else{
        //   res.send(200)
        //   console.log('user incorrect');
        //   res.redirect('/login');
        // }
      });
      // console.log(password);
    });
  // res.render('login', {title:'Please login Bellow',message:message})





/* GET Admin page. */
router.get('/admin', function(req, res, next) {
  var message;
    res.render('login', {title:'Please login Bellow',message:message})
  // //Get the content from Db
  // Image.find(function (err, Image) {
  //   if (err) return console.error(err);
  //   result = Image;
  //   // console.log(Image);
  // });

  // setTimeout(function(){
  //   res.render('admin', { title: 'MongoDb | Express.js | Cloudinary API test' , user:'Ricardo Furtado',readDb:result});  
  // },5000)
});  

//Creating item 
router.post('/send', function(req, res, next) {
var title = req.body.imgTitle;
var description = req.body.imgDescription;
var url = req.body.url;

var newItem = new Image({ title: title ,description:description,url:url });
  newItem.save(function (err) {
    if (err) return handleError(err);
    console.log('Success saving the new item ')
  });

  res.redirect('/admin');
}); 


// deleting from the db
router.post('/delete', function(req, res, next) {
  var title = req.body.imgTitleToDelete;
  
  Image.deleteOne({ title: title }, function (err) {
    if (err) return handleError(err);
    console.log('The item :' + title + ' has been deleted...')
  });
  
    res.redirect('/admin');
  }); 

module.exports = router;




/* 

API KEY CLOUDNARY  = 423916367253664
API SECRET =        ED7BJqHAYHjYmiKEQPxh6W7ZWhM
ENV = cloudinary://423916367253664:ED7BJqHAYHjYmiKEQPxh6W7ZWhM@rickfurt/

cloudinary://423916367253664:ED7BJqHAYHjYmiKEQPxh6W7ZWhM@rickfurt/
*/