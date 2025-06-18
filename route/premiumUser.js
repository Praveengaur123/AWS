const express=require('express')

const router=express.Router()

const authorisation=require('../middleware/auth')

const premiumUser=require('../controller/premiumUser')

router.get('/premiumUser',authorisation.authenticate,premiumUser.getPremiumUser)

router.get('/leaderBoard',premiumUser.getLeaderBoard)

router.get('/premiumUser/download',authorisation.authenticate,premiumUser.downloadReport)

module.exports=router