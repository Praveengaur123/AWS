const signupTable=require('./signup')

const expanseTable=require('./expanse')

// one to many
signupTable.hasMany(expanseTable,{
    foreignKey:'userId'
})
expanseTable.belongsTo(signupTable,{
    foreignKey:'userId'
})
module.exports={signupTable,expanseTable}