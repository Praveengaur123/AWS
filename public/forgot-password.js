
const BaseUrl="http://13.235.75.213"
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