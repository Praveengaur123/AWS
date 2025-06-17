const Sequelize=require('sequelize')

const password=process.env.DB_PASSWORD
console.log("connection established")
const sequelize=new Sequelize('aws','root',password,{
    dialect:'mysql',
    host:'localhost',
    logging:false
})

module.exports=sequelize
