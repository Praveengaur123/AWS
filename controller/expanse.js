const expanses= require('../model/expanse')
const path=require('path')

// Post Expanses
exports.postExapanse=async(req,res)=>{
const amount=req.body.amount
const description=req.body.description
const category=req.body.category
console.log("requesting data",req.body)
try {
    const data=await expanses.create({amount:amount,description:description,category:category})
    res.status(201).json({newExpanse:data})

} catch (error) {
    res.status(500).json({error:"Error from backend in catch block"})
}
}

// get Expanses Page
exports.getExpansePage=(req,res)=>{
    res.sendFile(path.join(__dirname,'../views','expanse.html'))
}