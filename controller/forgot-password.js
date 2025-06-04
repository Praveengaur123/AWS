const path=require('path')
const User=require('../model/signup')
const sib=require('../services/sib')
const forgotPasswordRequest=require('../model/forgotPasswordRequest')
const bcrypt=require('bcrypt')
const sequelize = require('../util/database')


const {v4: uuidv4} = require('uuid');


// sending password link
exports.getPasswordLink=async(req,res)=>{
   try{
    const{email}=req.body
    const id=uuidv4()
    console.log(id)
    const userData=await User.findOne({where:{email:email}})

    const request=await forgotPasswordRequest.create({id:id,userId:userData.id})
    
    console.log("user Email",userData.email)
   if(userData.email){
       const sender={
         email:"praveensinghania2@gmail.com"
       }
       const reciever=[
         {
            email:`${email}`
         }
       ]
        sib.sendTransacEmail({
         sender,
         to:reciever,
         subject:'Password Reset Link',
         htmlContent:`Click the link to <a href="http://localhost:5050/password/resetpassword/${id}">Reset Password</a>`
       }).then(response=>console.log("email sent",response)).catch(err=>console.log("email not sent"))
    }
    res.json({email})
   }
   catch(err){
    console.log("error while sending mail",err.message)
    res.json({succes:false,error:err.message})
   }
}

// reset for password updating

exports.getResetForm=async(req,res)=>{
   try {
      const id=req.params.id
      const request=await forgotPasswordRequest.findOne({where:{id,isActive:true}})
      if(!request) return res.status(400).send("invalid or expired link");

      res.sendFile(path.join(__dirname,'../views','reset-password.html'))
   } catch (error) {
      console.log('error while reseting password ',error.message)
      return res.status(500).json({error:"Server Error"})
   }
}

// updating password 
exports.updatePassword=async(req,res)=>{
   try {
      const t= await sequelize.transaction()
      const {uuid}=req.params
      const newPassword=req.body.newPassword
      console.log("uuid",uuid,"password",newPassword)
      const requestData = await forgotPasswordRequest.findOne({isActive:true,where:{id:uuid},transaction:t})
      console.log("data for update",requestData)
      if(!requestData) return res.status(400).json({message:"invalid or expired link"});
      const hashedPassword=await bcrypt.hash(newPassword,10)

      await User.update(
         {password:hashedPassword},
         {where:{
            id:requestData.userId
         }},
         {transaction:t}
   )
      await forgotPasswordRequest.update(
         {isActive:false},
         {where:{id:uuid}},
         {transaction:t}
      )
      return res.json({message:"Password Reset successfull",redirectUrl:'/login'})
   } catch (error) {
      console.log(error.message)
      return res.json({error:"Password Reset Failed"})
   }
}

exports.getForgotPasswordPage=(req,res)=>{
res.sendFile(path.join(__dirname,'../views','forgot-password.html'))
}

