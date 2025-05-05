const Sequelize=require('sequelize')

const sequelize=require('../util/database')

console.log('creating table')
const signup=sequelize.define('SignUp',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        unique:true,
        notNull:true
    },
    name:{
        type:Sequelize.TEXT,
        notNull:true
    },
    email:{
        type:Sequelize.STRING,
        notNull:true,
        unique:true
    },
    password:{
        type:Sequelize.STRING,
        notNull:true
    }

})

module.exports=signup

