const Sequelize=require('sequelize')

console.log("connection established")
const sequelize=new Sequelize('aws','root','',{
    dialect:'mysql',
    host:'localhost',
    logging:false
})

module.exports=sequelize
