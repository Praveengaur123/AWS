const expanses= require('../model/expanse')
const path=require('path')
const User=require('../model/signup')
const sequelize=require('../util/database')
// Post Expanses
exports.postExapanse=async(req,res)=>{
const amount=req.body.expanseAmount
const description=req.body.description
const category=req.body.category
const notes=req.body.notes


try {
    const t=await sequelize.transaction()
    const data=await expanses.create({amount:amount,description:description,category:category,notes:notes,userId:req.user.id},
        {transaction:t})
        const totalExpanses=Number(req.user.totalExpanses)+Number(amount)
        console.log("total Expanse",totalExpanses)
        await User.update(
            {totalExpanses:totalExpanses},
            {
                where:{id:req.user.id},
                transaction:t
            },
        )
            await t.commit()
            return res.status(201).json({newExpanse:data})

} catch (error) {
    await t.rollback()
    return res.status(500).json({error:"Error from backend in catch block while posting"})
}
}
exports.getExpanse=async(req,res)=>{
    
    try {
        const page=parseInt(req.query.page)||1  // current page number 
        const limit=parseInt(req.query.limit) // limit set dynamically
        // console.log("limit for page",limit)
        const offset=(page-1)*limit
        const userId=req.user.id

        // get total count
        const totalCount= await expanses.count({where:{userId}})

        console.log("userId while getting expanses",userId)
        const data=await expanses.findAll({
            where:{userId},
            attributes:['id','amount','category','description','notes'],
            limit:limit,
            offset:offset,
            order:[['createdAt','DESC']] // latest first

        });
        return res.status(200).json({
            currentPage:page,
            hasNextPage:limit*page<totalCount,
            nextPage:(page+1),
            limit:limit,
            hasPreviousPage:page>1,
            previousPage:page-1,
            totalPages:Math.ceil(totalCount/limit),
            lastPage:Math.ceil(totalCount/limit),
            AllExpanses:data})
    } catch (error) {
        console.log("error while fetching expanses:",error.message)
        res.status(500).json({message:'Error while fetching expanses'})
    }
}

// deleteing the data
exports.deleteExpanse=async(req,res)=>{
    const t=await sequelize.transaction()
    try {
    const id=req.params.id
    const userId=req.user.id
    console.log("user id while deleting",userId)
    const expanse=await expanses.findByPk(id)
    
    console.log("data to be deleted",expanse.userId)
    if(!expanse) return res.status(404).json({message:'expanse not found'});
    if(expanse.userId!==userId) return res.status(403).json({message:'Unauthorised access'});
    else await expanses.destroy({where:{id}},{transaction:t});
    const totalExpanses=Number(req.user.totalExpanses)-Number(expanse.amount)
    console.log("total Expanses",totalExpanses)
    await User.update({totalExpanses:totalExpanses},
        {
            where:{id:userId},transaction:t
        },
    )
    await t.commit()
    return res.status(200).json({id:id})

    } catch (error) {
        await t.rollback()
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

// download report
const AWS=require('aws-sdk')

exports.downloadReport=async(req,res)=>{
try {
    const userId=req.user.id
    const expenseReport= await expanses.findAll({where:{userId}})
    const premiumUser= await User.findOne(
        {where:{id:userId},
        attributes:['premiumUser']
    })
    console.log("premum user or Not",premiumUser.premiumUser)
    if(premiumUser.premiumUser==true) {
        console.log("Premium User")
        const stringifiedExpanse=JSON.stringify(expenseReport)
        // console.log("expanse report",stringifiedExpanse)
        const fileName= `expanse_${userId}_${Date.now()}.csv`
        const fileUrl= await uploadToS3(stringifiedExpanse,fileName)

        res.status(200).json({fileUrl,success:true})
    }
    else{
        console.log("Bad Request")
        return res.status(401).json({message:"Unauthorized"})
    }
} catch (error) {
    console.log("while downloading",error.message)
    res.status(500).json({fileUrl:'',success:false,error:error})
}
}
function uploadToS3(data,fileName){
    const BUCKET_NAME=process.env.BUCKET_NAME
    const IAM_USER_KEY=process.env.IAM_USER_KEY
    const IAM_USER_SECRET=process.env.IAM_USER_SECRET_KEY

    let s3bucket= new AWS.S3({
        accessKeyId:IAM_USER_KEY,
        secretAccessKey:IAM_USER_SECRET,
    })
    // console.log("S3",s3bucket)
    var params={
        Bucket:BUCKET_NAME,
        Key:fileName,
        Body:data,
        ACL:'public-read'
    }
    return new Promise((resolve,reject)=>{
        s3bucket.upload(params,(err,s3response)=>{
        if(err){
            console.log("something went wrong",err.message)
            reject(err)
        }
        else{
            // console.log("success",s3response)
            resolve(s3response.Location)
        }
    })
    })
}
