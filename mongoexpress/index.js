require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const studentRoutes = require('./routes/students.route')
const app = express()
const port = process.env.PORT || 3000
const uri = process.env.URI || 'http://localhost:27017/JPMCTraining'

mongoose.connect(uri).then(() => {
    console.log('Connected to MongoDB')
})
app.use(express.json())
app.use('/api/students', studentRoutes)

app.get('/',(req,res)=>{
    res.status(200).send("Welcome to Home Page!")
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})