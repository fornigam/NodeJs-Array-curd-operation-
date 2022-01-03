const morgan = require('morgan');
const fs = require('fs')
const path = require('path')
const courses = require('./routes/courses')

//const helment = require('helmet');
//const config = require('config');
const dotenv = require('dotenv');
const express = require('express');
const app = express();
const result = dotenv.config()//
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

app.use('/api/courses',courses)
//app.use('/',home)

var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
app.use(morgan('combined', { stream: accessLogStream }))



const port = process.env.port || 3000;
app.listen(port,()=>{
    console.log(`App is running on ${port} port`);
    console.log(process.env.NODE_ENV);
    console.log(app.get('env'));
})