const bcrypt=require('bcrypt')

const singup=require('../model/signup')
const path=require('path')

exports.SingupData=async(req,res)=>{
    console.log('signing user')
try {

    const name=req.body.name
    const email=req.body.email
    const password=req.body.password
    const hashedPassword= await bcrypt.hash(password,10)
    const userDetail=await singup.create({name:name,email:email,password:hashedPassword})
    res.status(201).json({userDetail:userDetail})
} catch (error) {
    console.log("sending failed")
    res.status(500).json({error:error})
}

}
exports.getsignUp=(req,res)=>{
res.sendFile(path.join(__dirname,'../views','signup.html'))
}