const express = require('express')
const jwt = require('jsonwebtoken')

const app = express()
app.use(express.json())


function verifyToken(req, res, next) {
    const token = req.headers.authorization.split(' ')[1]
    req.token=token
    next()
}

app.get('/login',(req,res)=>{
    res.send("Please Login using ThunderClient!")
})
app.post('/login',(req,res)=>{
    const user = {
        un:"shady",
        pwd:"slim"
    }
    if(req.body.un === user.un && req.body.pwd === user.pwd){
        jwt.sign({user},"winchesters",{expiresIn:200000000000},(err,token)=>{
            res.status(200).json({token})
        })
    }
})
app.post('/profile',verifyToken,(req,res)=>{
    jwt.verify(req.token,"winchesters",(err, data)=>{
        console.log(req.token);
        if(!err) res.status(200).json({message:"Welcome, User!"})
        else res.status(400).json({message:"Invalid Token"})
    })
})

app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})