var express = require('express');
var router = express.Router();
require('dotenv').config();
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var http = require('http');
var db = mongoose.connection;
var cloudinary = require('cloudinary').v2;
const fetch = require('node-fetch');


cloudinary.config({ 
  cloud_name: process.env.cloud_name, 
  api_key: process.env.api_key, 
  api_secret: process.env.api_secret
});


var MyModel = mongoose.model('test', new Schema({ name: String }));
var schema = new mongoose.Schema({ name: 'string', size: 'string' });

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
var Tank = mongoose.model('Tank', schema);
var Image = mongoose.model('Image', ImageSchema);

// console.log(Tank.findOne({size:'big'}));

// Image.create({ title:'test' ,description: 'small',url:'www.' }, function (err, small) {
//   if (err) return handleError(err);
//   // saved!
// });

var result;

/* GET home page. */
router.get('/', function(req, res, next) {
  // //Get the content from Db
  var contentData = Image.find(function (err, Image) {
    if (err) return console.error(err);

    result = Image;
    // console.log(Image);
  });

  var xx = fetch('https://cloudinary.com/console/media_library/folders/all/samples/ecommerce')
    .then(res => res.JSON());

    console.log(xx)
    
  

  setTimeout(function(){
    res.render('index', { title: 'MongoDb | Express.js | Cloudinary API test' , user:'Ricardo Furtado',readDb:result});  
  },5000)
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

  res.redirect('/');
}); 

router.post('/cloud', function(req, res, next) {

cloudinary.v2.uploader.upload("dog.mp4", 
  {resource_type: "video", public_id: "my_folder/my_sub_folder/my_dog",
  overwrite: true, notification_url: "https://mysite.example.com/notify_endpoint"},
  function(error, result) {console.log(result, error)});
}); 


// deleting from the db
router.post('/delete', function(req, res, next) {
  var title = req.body.imgTitleToDelete;
  
  Image.deleteOne({ title: title }, function (err) {
    if (err) return handleError(err);
    console.log('The item :' + title + ' has been deleted...')
  });
  
    res.redirect('/');
  }); 

module.exports = router;




/* 

API KEY CLOUDNARY  = 423916367253664
API SECRET =        ED7BJqHAYHjYmiKEQPxh6W7ZWhM
ENV = cloudinary://423916367253664:ED7BJqHAYHjYmiKEQPxh6W7ZWhM@rickfurt/

cloudinary://423916367253664:ED7BJqHAYHjYmiKEQPxh6W7ZWhM@rickfurt/
*/