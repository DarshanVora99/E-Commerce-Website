const Product = require("../models/productModel")
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");

// Create Product
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    })
});


// Displaying all products 
exports.getAllProducts = catchAsyncErrors(async (req, res) => {
    const resultPerPage = 5;


    const apiFeature = new ApiFeatures(Product.find(),req.query).search().filter().pagination(resultPerPage); 
    const products = await apiFeature.query;

    // We can also use search feature by - Product.find({name:"samosa"}); 
    // But it will only display those product with name samosa Not ("samosasamosa" , "Schewan samosa " ... etc)


    res.status(200).json({
        success: true,
        products
    })
});

// Displaying single product Get Product Details 
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {

    const product = await Product.findById(req.params.id);

    if (!product) {
        // res.status(500).json({
        //     success:false,
        //     message:"Product Not Found"
        // })
        return next(new ErrorHander("Product not found", 404));
    }

    res.status(200).json({
        success: true,
        message: "Product  Found",
        product
    })
}

);





// Update Product - Admin 
exports.updateProduct = catchAsyncErrors(async (req, res) => {

    let product = await Product.findById(req.params.id);

    if (!product) {
        // res.status(500).json({
        //     success:false,
        //     message:"Product Not Found"
        // })
        return next(new ErrorHander("Product not found", 404));
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        useFindAndModify: false,
        runValidators: true
    })

    res.status(200).json({
        success: true,
        product
    })
}
);




// Delete Product - Admin 
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {

    const product = await Product.findById(req.params.id);

    if (!product) {
        res.status(500).json({
            success: false,
            message: "Product Not Found"
        })
    }
    await product.deleteOne();

    res.status(200).json({
        success: true,

    })

}
);