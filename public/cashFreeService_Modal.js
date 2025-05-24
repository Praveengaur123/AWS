const cashfree = Cashfree({
                mode: "sandbox",
});

document.getElementById("renderBtn").addEventListener("click", async () => {
  try {
    // const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:5050/pay',{
      method:"POST",
    })
    const data=await response.json()
    const paymentSessionId=data.paymentSessionId
    const orderId=data.orderId

    let checkoutOptions = {
      paymentSessionId:paymentSessionId,

      // modal payment options
      redirectTarget: "_modal"
    };
    // start the checkout proccess
    const result = await cashfree.checkout(checkoutOptions);

    if (result.error) {
      console.log("Payment error:", result.error);
    } 
    if(result.redirect){
      console.log('payment will be redirected')
    }
    if (result.paymentDetails) {
      console.log("payment has been comlpeted, check for payment status")
      console.log(result.paymentDetails.paymentMessage)
      const response = await fetch(`http://localhost:5050/payment-status/${orderId}`,{
        method:"GET"
      })
      const data =await response.json()
      alert("your payment is"+data.orderStatus)
    }
  } catch (err) {
    console.error("Error: from frontend modal", err);
  }
});