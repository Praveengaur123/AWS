const Sequelize=require('sequelize')

const database=require('../util/database')

const sequelize=database.define('forgotPasswordRequest',{
    id:{
        type:Sequelize.STRING,
        allowNull:false,
        primaryKey:true
    },
    
    isActive:{
        type:Sequelize.BOOLEAN,
        defaultValue:true
    }
})
module.exports=sequelize