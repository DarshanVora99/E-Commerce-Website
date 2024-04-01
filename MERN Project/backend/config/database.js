const mongoose = require("mongoose");



const connectDatabase = () =>{
    mongoose.connect(process.env.DB_URI).then((data)=> console.log(`Connected to Mongo Successfully With server:${data.connection.host}`));

    console.log("Connecting to DB");

}

module.exports = connectDatabase;