// Log In functionality
const login=document.getElementById('login')
login.addEventListener('submit',(event)=>{
    event.preventDefault()
    const loginEmail=document.getElementById('loginEmail').value
    const loginPassword=document.getElementById('loginPassword').value
    const obj={loginEmail,loginPassword}
    
    axios.post(`${baseUrl}/login/`,obj)
    .then(response=>{
        login.innerHTML+=`<h1>${loginEmail} Logged In Successfully</h1>`
        console.log(response.data)
        localStorage.setItem('token',response.data.token)
        localStorage.setItem('email',loginEmail)
        window.location.href=response.data.redirectUrl
    })
    .catch(err=>{
        login.innerHTML+=`<h1>${loginEmail} Logged In unSuccessfull</h1>`
        console.log(err)
    })
})
document.getElementById('forgot-password-btn').addEventListener('click',(event)=>{
    event.preventDefault()
    axios.get(`${baseUrl}/forgot-password`)
    .then(response=>{
        console.log(response)
        window.location.href='/forgot-password'
    })
    .catch(err=>{
        console.log("error in forgot password from frontned",err.message)
        
    })
})