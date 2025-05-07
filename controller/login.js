const User=require('../model/signup')
const path=require('path')
exports.Login=async(req,res)=>{
    
    const email=req.body.loginEmail
    const password=req.body.loginPassword
    console.log(email)
        if(!email||!password){
             res.status(400).json({error:'username and password required'})
        }
    try {
        const user=await User.findOne({where:{email}})
        console.log("here is the user",user)
        if(!user){
            console.log("user not found")
            return res.status(401).json({error:'user not found'})
        }
        if(user.password!==password) {
            console.log("password Incorrect")
            return res.status(400).json({error:'Incorrect Password'});
        }
        res.status(200).json({message:'login Succesfull'})
    } catch (error) {
        console.log("error from catch block")
        return res.status(401).json({error:error.message})
    }

}

exports.getLoginPage=(req,res)=>{
    res.sendFile(path.join(__dirname,'../views','login.html'))
}