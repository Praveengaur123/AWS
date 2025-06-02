
document.getElementById('reset-password-form').addEventListener('submit',(event)=>{
    event.preventDefault()
    const email=document.getElementById('userEmail').value

    axios.post('http://localhost:5050/forgot-password',{email})
    .then(response=>{
        console.log(response)
    })
    .catch(err=>{
        console.log("error while sending mail".err)
    })
})