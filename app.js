const express=require('express')
const bodyParser=require('body-parser')
const Sequelize=require('./model/signup')
const path = require('path')


const signupRouter=require('./route/signup')
const app=express()

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname,'public')))

app.use('/signup/',signupRouter)

Sequelize.sync()
.then(response=>{
    console.log("server starts @ localhost: 5050")
    app.listen(5050)
})
.catch(err=>console.log(err))
