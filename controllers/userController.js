const users = require('../models/userModel')

// register
exports.register = async (req,res)=>{
    console.log("Inside register controller");
    console.log(req.body);
    res.status(200).json("Register request recieved")
}

// login

// google login

// user updation