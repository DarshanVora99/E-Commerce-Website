const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const app = express();
// mongodb://localhost:27017
// Connecting MongoDB
const mongoURI = "mongodb://127.0.0.1:27017/SampleEG";
mongoose.connect(mongoURI).then(()=> console.log("Connected to Mongo Successfully")).catch(err => console.log(err));

app.use(bodyParser.urlencoded({extended:false}))

app.use(express.json())

// Defining the Product Schema (Every Product will have name , desc , price) We will Perform 
// CURD Operation on this 

const productSchema = new mongoose.Schema({
    name:String,
    desciption:String,
    price:Number,

})


// Creating a model / Collection

const Product = new mongoose.model("Product", productSchema);

// API for Creating a Product (C) (Add a new Product)

app.post("/api/v1/product/new" , async (req,res)=>{
    // Whenever we will go to this link , This call back function will be called Below Code is Executed 
    const product = await  Product.create(req.body)            // req.body Because we will provide data from frontend 
    // await because we want to ensure that when the Product.create() is Completed then only Below Code is Executed 
    // With await we have to use async 

    // product is just use to send response nothing else 
    // When Product is Created a new Document is Added 

    // Sending Response 
    res.status(201).json({
        success : true ,
        product
    })

})

// API Read Product (R)  Display All Products
app.get("/api/v1/products", async(req,res)=>{
    const products = await Product.find();

    res.status(200).json({
        success:true,
        products
    })
})


// API Update Product (U)
app.put("/api/v1/product/:id", async(req,res)=>{
    let product = await Product.findById(req.params.id);

    if(!product)    {
        res.status(500).json({
            success:false,
        message:"Product Not Found"
        })
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body,{
        new:true ,
        useFindAndModify:false ,
        runValidators:true
    })

    res.status(200).json({
        success:true,
        product
    })
})




// API Delete  Product (D)
app.delete("/api/v1/product/:id", async(req,res)=>{
    const product = await Product.findById(req.params.id);

    if(!product){
        res.status(500).json({
            success:false,
            message:"Product Not Found"
        })
    }
    await product.deleteOne();
    
    res.status(200).json({
        success:true,
       
    })
})




app.get('/', (req,res)=>{
    res.send("Hello World");
})

// Creating a server by app.listen 
app.listen(4500, ()=>{
    console.log(`Server is working on http://localhost:4500`)
})




