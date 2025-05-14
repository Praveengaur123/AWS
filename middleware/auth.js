const jwt=require('jsonwebtoken')

const User=require('../model/signup')

exports.authenticate=(req,res,next)=>{
    try {
        const token=req.header('Authorisation')
        console.log(token)
        const user =jwt.verify(token,'yetToDefine')
        console.log('user--->',user.userId)
        User.findByPk(user.userId)
            .then(user=>{
                req.SignUp=user
                next()
            })
        

    } catch (error) {
        console.log(error)
        return res.status(401).json({success:false,message:'error authorisation'})
    }

}