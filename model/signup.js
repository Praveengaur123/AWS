const Sequelize=require('sequelize')

const sequelize=require('../util/database')


const signup=sequelize.define('user',{
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
    },
    premiumUser:{
       type:Sequelize.BOOLEAN,
       defaultValue:false 
    }

})

module.exports=signup

