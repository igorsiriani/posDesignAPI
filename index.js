//Import packages
const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config()

//Configures the app to use body-parser and transform req in JSON
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type, Accept");
	//Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    next();
})

//Mongo Connection
const connectionString = process.env.CONNECTION_URL;
mongoose.connect(connectionString,  {useNewUrlParser:true, useUnifiedTopology: true, useFindAndModify: false});

//Define the app port
const port = process.env.PORT || 3000;

//Define the Routes
const router = express.Router();//intercept all routes
const clientRoute = require('./src/routes/client-route');
const petRoute = require('./src/routes/pet-route');

//Link the app with the routes 
//client route
app.use('/api/client/', clientRoute);
app.use('/api/pet/', petRoute);

app.listen(port, () => {
    console.log("server is up and running...on port ", port);
});