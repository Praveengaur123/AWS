const userTable=require('./signup')

const expanseTable=require('./expanse')

const paymentTable=require('./payment')

const forgotPasswordRequest=require('./forgotPasswordRequest')

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

userTable.hasMany(forgotPasswordRequest,{
    foreignKey:'userId'
})
forgotPasswordRequest.belongsTo(userTable,{
    foreignKey:'userId'
})

module.exports={userTable,expanseTable,paymentTable,forgotPasswordRequest}