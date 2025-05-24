const payment=require('../model/payment')
const {
    createOrder,getPaymentStatus
}=require('../cashfree/cashFreeService')

exports.processPayment=async(req,res)=>{
    const orderId="ORDER-" + Date.now()
    const orderAmount=2000
    const orderCurrency="INR"
    const customerID="1"
    const customerPhone="9999999999"
    try {
        // create an order in cashfree and get payment session Id
        const paymentSessionId=await createOrder(
            orderId,
            orderAmount,
            orderCurrency,
            customerID,
            customerPhone,
        );
        console.log("orderId",orderId,"paymentSessionId",paymentSessionId)
        // save payment details to database
        await payment.create({
            orderId,
            paymentSessionId,
            orderAmount,
            orderCurrency,
            paymentStatus:"Pending"
        })
        res.json({paymentSessionId,orderId})

    } catch (error) {
        console.error("error processing payment:",error.message)
        res.status(500).json({message:'failed to upgrade from payment controller',error:error.message})
    }
}

exports.getPaymentStatus=async(req,res)=>{
    const paymentSessionId=req.params.paymentSessionId
    try{
        const orderStatus=await getPaymentStatus(paymentSessionId)
        
    // update payment status in database
    const order=await payment.findOne({where:{paymentSessionId}})

    // update the order status
    order.status=orderStatus;
    await order.save()

    res.json({orderStatus})
    }
    catch(err){
    console.error("Error fetching payment status:", err.message);
    res.status(500).json({ message: "Error fetching payment status" });
    }
}