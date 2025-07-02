const Sequelize=require('sequelize')

const password=process.env.DB_PASSWORD
const DB_NAME=process.env.DB_NAME
const DB_USER=process.env.DB_USER

console.log("connection established")
const sequelize=new Sequelize(DB_NAME,DB_USER,password,{
    dialect:process.env.DIALECT,
    host:process.env.RDS_ENDPOINT,
    logging:false
})
 
module.exports=sequelize
