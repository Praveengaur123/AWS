const Sequelize=require('sequelize')

console.log("connection established")
const sequelize=new Sequelize('aws','root','Pra0@123',{
    dialect:'mysql',
    host:'localhost'
})

module.exports=sequelize
