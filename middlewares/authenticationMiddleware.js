
const jwt = require('jsonwebtoken')

const authenticationMiddleware = (req,res,next)=>{
    console.log("Inisde authenticationMiddleware");
    const token = req.headers['authorization'].split(" ")[1]
    console.log(token);
    if(token){
        try{
            const jwtResponse = jwt.verify(token,process.env.JWT_SECRET)
            console.log(jwtResponse);
            req.payload = jwtResponse.userMail
            req.role = jwtResponse.role
            next()
        }catch(err){
            res.status(401).json("Authorization failed... Invalid Token!!!")
        }
    }else{
        res.status(401).json("Authorization failed... Token Missing!!!")
    }
}

module.exports = authenticationMiddleware