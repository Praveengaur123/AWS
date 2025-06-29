
const users=require('../model/signup')
const expanses=require('../model/expanse')
const path=require('path')
const fs=require('fs')
// console.log('premium controller')
// to know the premium user 
exports.getPremiumUser=async(req,res)=>{
    const id=req.user.id
    if(!id) console.log('id missing');
    // console.log("id in premium controller",id)
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
    try {
        const userId=req.user.id
        console.log("userId",userId)
        // get expanse from DB
        const data=await expanses.findAll({where:{userId}})
        // format csv data
        let csvData='Date,Amount,Category,Description\n'
        data.forEach(exp => {
            csvData+=`${exp.createdAt.toString().split('GMT')[0].trim()},${exp.amount},${exp.category},${exp.description}\n`
        });
        // saving the file
        if (!fs.existsSync('./exports')) {
            fs.mkdirSync('./exports');
        }
        const fileName= `expanse_${userId}_${Date.now()}.csv`
        const filePath=path.join(__dirname,'..','exports',fileName)

        fs.writeFileSync(filePath,csvData)

        // const fileUrl = `http://localhost:5050/exports/${fileName}`;
        
        // sending the file to frontend
        res.download(filePath,fileName,(err)=>{
            if(err){
                console.log("err sending file",err.message)
                return res.json({err:"donwload failed"})
            }
        })

    } catch (error) {
        console.log("error generating report",error)
        return res.json({message:"internal server error"})
    }
}
