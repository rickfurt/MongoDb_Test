# Simple MongoDb test and usage

This project was created to test and learn the integration between a Server Side Rendered application and a non relational database , which in this case was mongoDb.

Stack
+ [ExpressJs](http://expressjs.com/)
+ [mongoDb](https://www.mongodb.com/)
+ [mongoose](https://mongoosejs.com/docs/)
+ [Cloudinary API](https://cloudinary.com/documentation/admin_api)
+ [Handlebars](https://handlebarsjs.com/)
+ Others

## Features or Example

Using the application the user is able store data into the database, which will be rendered in the main, also the user can store images using the cloudinary api integrated.

## Requirements

+ [mongoDb] Cluster & schema need to be created beforehand (https://www.mongodb.com/)
+ [Cloudinary] Get the API Keys (https://cloudinary.com/documentation/admin_api)

## Installation
	git clone https://github.com/rickfurt/MongoDb_Test
    cd MongoDb_Test
    npm install 
    npm start

## Usage

For this application run properly the user needs to create a cluster and create a collection called 'users' and also create two entries 'username' and 'password' according to the simple authentification created on ./routes    
