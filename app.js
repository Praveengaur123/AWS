const express=require('express')
const bodyParser=require('body-parser')
const Sequelize=require('./util/database')
const path = require('path')

const {signupTable,expanseTable}=require('./model/association')

const signupRouter=require('./route/signup')

const loginRouter=require('./route/login')

const expanseRouter=require('./route/expanse')

const app=express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.use(express.static(path.join(__dirname,'public')))

app.use('/',expanseRouter)
app.use('/signup/',signupRouter)
app.use('/login/',loginRouter)

Sequelize.sync()
.then(response=>{
    
    app.listen(5050,()=>console.log("server starts @ localhost: 5050"))
})
.catch(err=>console.log(err))
