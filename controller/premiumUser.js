const sequelize=require('../util/database')

const users=require('../model/signup')

const expanses=require('../model/expanse')

console.log('premium controller')
// to know the premium user 
exports.getPremiumUser=async(req,res)=>{
    const id=req.user.id
    if(!id) console.log('id missing');
    console.log("id in premium controller",id)
    try {
        const pUser=await users.findOne({where:{id}})
        console.log("Premium User data:",pUser)
            return res.json({pUser})
        
    } catch (error) {
        console.error("error fetching user",error.message)
         res.json({error:error})
    }
}
// to get the leaderboard data
exports.getLeaderBoard=async(req,res)=>{
try {
    const [leaderboard,data]=await sequelize.query(`
        SELECT users.name,
        IFNULL(SUM(expanses.amount),0) as TotalExpanses
        FROM users
        LEFT JOIN expanses ON users.id=expanses.userId
        GROUP By users.name
        ORDER BY TotalExpanses DESC`)
    return res.json({leaderboard})
} catch (error) {
    console.log("error in leaderBoard controller",error.message)
    res.json({error})
}
}