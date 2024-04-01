// This is our Entry Point 
const express = require("express");

const app = express();

const errorMiddleware = require("./middleware/error");
// Route Imports 

app.use(express.json());

const product = require("./routes/productRoute");
app.use("/api/v1", product);


module.exports = app;


// Middleware for error 

app.use(errorMiddleware);












// express(): This is a function call to the express module. When you call express(), it returns a new instance of the Express application. This instance represents your web application and allows you to define routes, middleware, and other configurations.

// So, const app = express(); is essentially creating a new Express application and assigning it to the variable app. This app variable is then used to configure routes, middleware, and other settings for your web server.