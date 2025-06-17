require('dotenv').config();
const express=require('express')
const bodyParser=require('body-parser')
const Sequelize=require('./util/database')
const path = require('path')
const cors=require('cors')

const {userTable,expanseTable,paymentTable}=require('./model/association')

const signupRouter=require('./route/signup')

const loginRouter=require('./route/login')

const expanseRouter=require('./route/expanse')

const paymentRouter=require('./route/payment')

const premiumRouter=require('./route/premiumUser')

const forgotPasswordRouter=require('./route/forgot-password')

const app=express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.use(express.static(path.join(__dirname,'public')))
// router
app.use('/',paymentRouter)
app.use('/',expanseRouter)
app.use('/signup/',signupRouter)
app.use('/login/',loginRouter)
app.use(premiumRouter)
app.use(forgotPasswordRouter)

Sequelize.sync({})
.then(response=>{
    
    app.listen(5050,()=>console.log("server starts @ localhost: 5050"))
})
.catch(err=>console.log(err))
