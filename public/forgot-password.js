const BaseUrl="http://15.206.163.80"

const resetPasswordForm=document.getElementById('reset-password-form')
resetPasswordForm.addEventListener('submit',(event)=>{
    event.preventDefault()
    const email=document.getElementById('userEmail').value

    axios.post(`${BaseUrl}/forgot-password`,{email})
    .then(response=>{
        console.log(response)
        resetPasswordForm.reset()
    })
    .catch(err=>{
        console.log("error while sending mail".err)
    })
})