// Define PORT to run express server 
const PORT = 4000;

// import dependencies
const express = require('express');
const app = express(); // creating app instance (object)

// initialize mongoose package 
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
// using path we can get access to backend directory in our express app
const cors = require('cors');
const exp = require('constants');

// use cors package for enabling cross origin resource sharing (CORS)

app.use(express.json());
// With help of express.json() whatever request we will get from response 
// that will be automatically passed through json   

app.use(cors());
// using this our reactjs project will connect to express app on 4000 PORT

// Connecting to mongoDB Atlas DB

mongoose.connect("mongodb+srv://darshanvora83659:Darshan%401212@cluster0.a2ov8yi.mongodb.net/e-commerce")


// API Creation

app.get('/', (req,res)=>{
    res.send("Express App is Running ");
})



// Image storage Engine 

const storage = multer.diskStorage(
    {
        destination:'./upload/images',
        filename:(req,file,cb)=>{
            return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
        }
    }  
)

const upload = multer({storage:storage});

// Creating Upload Endpoint for images upload

app.use('/images',express.static('upload/images'));

app.post('/upload', upload.single('product'), (req,res)=>{
    res.json({
        success:1,
        image_url :`http://localhost:${PORT}/images/${req.file.filename}`
    })
})



app.listen(PORT, (error)=>{
    if(!error){
        console.log("Server Running on Port " + PORT);
    }
    else{
        console.log("Error : " , error);
    }
})
