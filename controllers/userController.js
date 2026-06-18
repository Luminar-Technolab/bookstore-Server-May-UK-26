const users = require('../models/userModel')
const bcrypt = require('bcrypt')

// register
exports.register = async (req,res)=>{
    console.log("Inside register controller");
    const {username,email,password} = req.body
    try{
        const existingUser = await users.findOne({email})
        if(existingUser){
            res.status(409).json("User already exists.. Please Login!!!")
        }else{
            let encryptPassword = await bcrypt.hash(password,10)
            //add user to db
            const newUser = await users.create({username,email,password:encryptPassword})
            res.status(201).json(newUser)
        }
    }catch(err){
        console.log(err);
        res.status(500).json(err)
    }
}

// login

// google login

// user updation