const userTable=require('./signup')

const expanseTable=require('./expanse')

const paymentTable=require('../model/payment')

// one to many
userTable.hasMany(expanseTable,{
    foreignKey:'userId'
})
expanseTable.belongsTo(userTable,{
    foreignKey:'userId'
})

userTable.hasMany(paymentTable,{
    foreignKey:'userId'
})
paymentTable.belongsTo(userTable,{
    foreignKey:'userId'
})
module.exports={userTable,expanseTable,paymentTable}