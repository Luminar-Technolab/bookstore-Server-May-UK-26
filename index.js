require('dotenv').config()
const express = require('express')
const cors = require('cors')

const bookstoreServer = express()

bookstoreServer.use(cors())

const PORT = process.env.PORT

bookstoreServer.listen(PORT,()=>{
    console.log("Server Started... and waiting for client request");    
})

bookstoreServer.get('/',(req,res)=>{
    res.status(200).send(`<h1>Server Started... and waiting for client request</h1>`)
})

