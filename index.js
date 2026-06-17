require('dotenv').config()
const express = require('express')
const cors = require('cors')
require('./config/db')
const router = require('./routes/bookstoreRoutes')

const bookstoreServer = express()

bookstoreServer.use(cors())
bookstoreServer.use(express.json())
bookstoreServer.use(router)

const PORT = process.env.PORT

bookstoreServer.listen(PORT,()=>{
    console.log("Server Started... and waiting for client request");    
})

bookstoreServer.get('/',(req,res)=>{
    res.status(200).send(`<h1>Server Started... and waiting for client request</h1>`)
})

