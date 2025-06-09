
const users=require('../model/signup')

console.log('premium controller')
// to know the premium user 
exports.getPremiumUser=async(req,res)=>{
    const id=req.user.id
    if(!id) console.log('id missing');
    console.log("id in premium controller",id)
    try {
        const pUser=await users.findOne({where:{id}})
        // console.log("Premium User data:",pUser)
            return res.json({pUser})
        
    } catch (error) {
        console.error("error fetching user",error.message)
         res.json({error:error})
    }
}
// to get the leaderboard data
exports.getLeaderBoard=async(req,res)=>{
try {
    const leaderboard=await users.findAll({
        attributes:['name','totalExpanses'],
        order:[['totalExpanses','DESC']]
    })
    // console.log("leadderboard: ",leaderboard)
    return res.json({leaderboard})
} catch (error) {
    console.log("error in leaderBoard controller",error.message)
    return res.json({error})
}
}

exports.downloadReport=async(req,res)=>{
    
}