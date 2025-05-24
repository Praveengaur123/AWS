const cashfree = Cashfree({
                mode: "sandbox",
});
document.getElementById("renderBtn").addEventListener("click", async() => {
    try{
        // fetch payment Session id from backend
        const response = await fetch("http://localhost:5050/pay", {
        method: "POST",
        });
        const data=await response.json()
        const paymentSessionId=data.paymentSessionId

        // initialize checkout options
        let checkoutOptions={
            paymentSessionId:paymentSessionId,
            // new page payment options
            redirectTarget:"_self", // default
        }
        // start checkout process
        await cashfree.checkout(checkoutOptions);
        
    }
    catch(err){
        console.error("error",err)
    }
    });

    // if we are using axios
    /*
    axios.post('http://localhost:5050/pay')
    .then(response=>{
        const paymentSessionId=response.data.paymentSessionId
        })
    */