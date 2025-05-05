
const singup=require('../model/signup')
const path=require('path')
console.log("here is the controller")
exports.addData=async(req,res)=>{
    console.log('signing user')
try {

    const name=req.body.name
    const email=req.body.email
    const password=req.body.password
    console.log("sending from backend",req.body)
    const userDetail=await singup.create({name:name,email:email,password:password})
    res.status(201).json({userDetail:userDetail})
} catch (error) {
    console.log("sending failed")
    res.status(500).json({error:error})
}

}
exports.getsignUp=(req,res)=>{
res.sendFile(path.join(__dirname,'../views','signup.html'))
}