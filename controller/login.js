const bcrypt=require('bcrypt')

const User=require('../model/signup')
const path=require('path')
const jwt=require('jsonwebtoken')

// generating token
function generatingToken(id){
    return jwt.sign({userId:id},'hnei379485bjinci3yuhf657489tyhfytie937457937hfurh')
}

exports.Login=async(req,res)=>{
    
    const email=req.body.loginEmail
    const password=req.body.loginPassword
    console.log(email)
        if(!email||!password){
             return res.status(400).json({error:'username and password required'})
        }
    try {
        const user=await User.findOne({where:{email}})
        console.log("here is the user",user)

        if(!user){
            console.log("user not found")
            return res.status(401).json({error:'user not found'})
        }
        const isCompared= await bcrypt.compare(password,user.password)
        if(isCompared) {
            
            return res.status(200).json({succes:true,message:'login Succesfull',redirectUrl:'/expanse', token:generatingToken(user.id)})
            
        }
        else  return res.status(400).json({ message: 'Password is incorrect' });

        
    } catch (error) {
        console.log("error from catch block")
        return res.status(401).json({error:error.message})
    }

}

exports.getLoginPage=(req,res)=>{
    res.sendFile(path.join(__dirname,'../views','login.html'))
}