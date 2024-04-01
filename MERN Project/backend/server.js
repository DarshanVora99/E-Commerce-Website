const path = require("path");

const app = require("./app");
const connectDatabase = require("./config/database")

// Handling Uncaught Exception
// Writting it on start is vimp 
//  To handle Error of Type 
// console.log(youtuber) 
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
});


// console.log(youtuber) 



// Config 
const dotenv = require("dotenv");

dotenv.config({path:"config/config.env"});


// Connecting to database 
connectDatabase();


// Creating a server by app.listen 
const server = app.listen(process.env.PORT, ()=>{
    console.log(`Server is working on http://localhost:${process.env.PORT}`)
})





  // Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);
  
    server.close(() => {
      process.exit(1);
    });
  });






















// Notes Below 


// const app = require("./app");: This line imports the app module from a file named app.js located in the same directory as the current file. This app.js file likely contains the main Express application setup, including route definitions, middleware configurations, and other application logic. By requiring this module, you're essentially loading your Express application into the app variable.

// const dotenv = require("dotenv");: This line imports the dotenv module. dotenv is a popular Node.js module used for loading environment variables from a .env file into process.env. Environment variables are often used to store sensitive or configurable information such as API keys, database connection strings, or server ports.

// dotenv.config({path:"backend/config/config.env"});: This line configures dotenv to load environment variables from a specific file named config.env located in a directory named config within a directory named backend. This file likely contains environment-specific configuration variables such as the database connection URL, API keys, etc. By calling dotenv.config(), you're telling dotenv to load these variables into process.env.

// app.listen(process.env.PORT, ()=>{ ... }): This line starts the Express application server and listens for incoming HTTP requests on the port specified by the PORT environment variable (process.env.PORT). When a request is received, Express will invoke the provided callback function. Inside this callback function, a log message is printed to the console indicating that the server is running and specifying the URL where it's accessible (usually http://localhost:PORT).