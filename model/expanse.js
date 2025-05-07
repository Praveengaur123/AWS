const Sequelize=require('sequelize')
const sequelize=require('../util/database')


const expanseTable=sequelize.define('expanse',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        nutNull:true,
        primaryKey:true,
        unique:true
    },
    amount:{
        type:Sequelize.INTEGER,
        notNull:true,
    },
    description:{
        type:Sequelize.STRING,
        notNull:true
    },
    category:{
        type:Sequelize.STRING,
        notNull:true
    }
})
module.exports=expanseTable