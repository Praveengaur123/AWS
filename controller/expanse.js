const expanses= require('../model/expanse')
const path=require('path')
const User=require('../model/signup')

// Post Expanses
exports.postExapanse=async(req,res)=>{
const amount=req.body.expanseAmount
const description=req.body.description
const category=req.body.category


try {
    const data=await expanses.create({amount:amount,description:description,category:category,userId:req.user.id})
        const totalExpanses=Number(req.user.totalExpanses)+Number(amount)
        console.log("total Expanse",totalExpanses)
        User.update(
            {totalExpanses:totalExpanses},
            {
                where:{id:req.user.id}
            }
        )
    return res.status(201).json({newExpanse:data})

} catch (error) {
    return res.status(500).json({error:"Error from backend in catch block while posting"})
}
}
exports.getExpanse=async(req,res)=>{
    
    try {
        const userId=req.user.id
        console.log("userId while getting expanses",userId)
        const data=await expanses.findAll({where:{userId}},{
            attributes:['id','amount','category','description']
        });
        return res.status(200).json({AllExpanses:data})
    } catch (error) {
        console.log("error while fetching expanses:",error.message)
        res.status(500).json({message:'Error while fetching expanses'})
    }
}

// deleteing the data
exports.deleteExpanse=async(req,res)=>{
    try {
    const id=req.params.id
    const userId=req.user.id
    console.log("user id while deleting",userId)
    const expanse=await expanses.findByPk(id)
    console.log("data to be deleted",expanse.userId)
    if(!expanse) return res.status(404).json({message:'expanse not found'});
    if(expanse.userId!==userId) return res.status(403).json({message:'Unauthorised access'});
    else await expanses.destroy({where:{id}});
    return res.status(200).json({id:id})

    } catch (error) {
        console.log("error while deleting ",error.message)
        return res.status(500).json({err:"Error in Deleting Expanse"})
    }
    
}
// logout the page and redirect tu login page
exports.logOut=async(req,res)=>{
    try {
        return res.json({succces:true,redirectUrl:'/login'})
    } catch (error) {
        console.log("error in logout controller",error.message)
        return res.status(500).json({error:error})
    }
    
}
// get Expanses Page
exports.getExpansePage=(req,res)=>{
    res.sendFile(path.join(__dirname,'../views','expanse.html'))
}

