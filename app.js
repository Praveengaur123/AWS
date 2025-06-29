require('dotenv').config();
const express=require('express')
const bodyParser=require('body-parser')
const fs=require('fs')
const Sequelize=require('./util/database')
const path = require('path')
const cors=require('cors')
const https=require('https')

const {userTable,expanseTable,paymentTable}=require('./model/association')

const signupRouter=require('./route/signup')

const loginRouter=require('./route/login')

const expanseRouter=require('./route/expanse')

const paymentRouter=require('./route/payment')

const premiumRouter=require('./route/premiumUser')

const forgotPasswordRouter=require('./route/forgot-password')

// const privateKey=fs.readFileSync('server.key')
// const certificate=fs.readFileSync('server.cert')

const app=express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))


app.use('/exports', express.static(path.join(__dirname, 'exports')));

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
    
    // https.createServer({key:privateKey,cert:certificate},app)
    app.listen(process.env.PORT||5050,()=>console.log(`server starts @ localhost: ${process.env.PORT}`))
})
.catch(err=>console.log(err))
