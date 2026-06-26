const users = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

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
exports.login = async (req,res)=>{
    console.log("Inside login controller");
    const {email,password} = req.body
    try{
        const existingUser = await users.findOne({email})
        if(existingUser){
            const isPasswordMatch = await bcrypt.compare(password,existingUser.password)
            if(isPasswordMatch){
                //generate token 
                const token = jwt.sign({userMail:email,role:existingUser.role},process.env.JWT_SECRET)
                res.status(200).json({user:existingUser,token})
            }else{
                res.status(409).json("Invalid Email / Password!!!")
            }
        }else{
            res.status(409).json("Invalid Email!!! Please Register to access Bookstore")
        }
    }catch(err){
        console.log(err);
        res.status(500).json(err)
    }
}

// google login
exports.googleLogin = async (req,res)=>{
    console.log("Inside googleLogin controller");
    const {email,password,username,picture} = req.body
    try{
        const existingUser = await users.findOne({email})
        if(existingUser){
            const token = jwt.sign({userMail:existingUser.email,role:existingUser.role},process.env.JWT_SECRET)
            res.status(200).json({user:existingUser,token})
        }else{
            let encryptPassword = await bcrypt.hash(password,10)
            //add user to db
            const newUser = await users.create({username,email,password:encryptPassword,picture})
            const token = jwt.sign({userMail:newUser.email,role:newUser.role},process.env.JWT_SECRET)
            res.status(200).json({user:newUser,token})
        }
    }catch(err){
        console.log(err);
        res.status(500).json(err)
    }
}

// user updation
exports.userProfileUpdate = async (req,res)=>{
    console.log("Iniside userProfileUpdate");
    const {id} = req.params
    const email = req.payload
    const role = req.role
    const {username,password,bio,picture} = req.body
    console.log(id,email,role,username,password,bio,picture);
    let encryptPassword = await bcrypt.hash(password,10)
    const updatedPicture = req.file?req.file.filename:picture
    console.log(updatedPicture);
    const updateUser = await users.findByIdAndUpdate({_id:id},{username,email,password:encryptPassword,picture:updatedPicture,bio,role},{new:true})
    res.status(200).json(updateUser)
}