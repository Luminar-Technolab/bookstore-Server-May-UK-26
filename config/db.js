const mongoose = require('mongoose')

const connectionString = process.env.DB_URL

mongoose.connect(connectionString).then((res)=>{
    console.log("Database connection successfull");    
}).catch(err=>{
    console.log("Database connection failed");
    console.log(err);    
})