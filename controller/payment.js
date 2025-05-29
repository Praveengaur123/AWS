const payment=require('../model/payment')
const {
    createOrder,getPaymentStatus
}=require('../cashfree/cashFreeService')


const user=require('../model/signup')

exports.processPayment=async(req,res)=>{
    const orderId="ORDER-" + Date.now()
    const orderAmount=2000
    const orderCurrency="INR"
    const customerID="1"
    const customerPhone="9999999999"
    const userId=req.user.id
    console.log("user Id for payment",userId)
    try {
        // create an order in cashfree and get payment session Id
        const paymentSessionId=await createOrder(
            orderId,
            orderAmount,
            orderCurrency,
            customerID,
            customerPhone,
        );
        // save payment details to database
        await payment.create({
            orderId,
            orderAmount,
            orderCurrency,
            paymentStatus:"Pending",
            paymentSessionId,
            userId,
        })
        console.log('PAYMENT Session ID while creating',paymentSessionId)
        res.json({paymentSessionId,orderId})

    } catch (error) {
        console.error("error processing payment:",error.message)
        res.status(500).json({message:'failed to upgrade from payment controller',error:error.message})
    }
}

exports.getPayStatus=async(req,res)=>{
    const orderId=req.params.orderId

    console.log("order Id in controller ",orderId)
    try{
        // fetch order from database
        const order=await payment.findOne({where:{orderId}})
        // console.log("order",order)
        if(!order) return res.status(404).json({ message: "Order not found" });

        // update payment status in database
        const orderStatus=await getPaymentStatus(order.orderId)

        console.log("orderStatus",orderStatus)
       
        // update the order status
        order.paymentStatus=orderStatus;
        await order.save()
         // fetch user data to update the premium User
        const id=order.userId
        const User=await user.findOne({where:{id}})
        // console.log("User data to update premuim user",User)
        if(User!==undefined) {
            User.premiumUser=true;
            await User.save()
        }

        res.json({redirectUrl:'/expanse',orderStatus:orderStatus})
    }
    catch(err){
    console.error("Error fetching payment status:", err.message);
    res.status(500).json({ message: "Error fetching payment status" });
    }
}