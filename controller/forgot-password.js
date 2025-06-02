const path=require('path')
const user=require('../model/signup')
exports.getPassword=async(req,res)=>{
   try{
    const{email}=req.body
    const userEmail=await user.findOne({where:{email:email}})
    console.log("user Email",userEmail.email)
    res.json({email})
   }
   catch(err){
    console.log("error while sending mail",err.message)
    res.json({succes:false,error:err.message})
   }
}

exports.getForgotPasswordPage=(req,res)=>{
res.sendFile(path.join(__dirname,'../views','forgot-password.html'))
}