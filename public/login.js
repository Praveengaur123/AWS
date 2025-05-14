// Log In functionality
const login=document.getElementById('login')
login.addEventListener('submit',(event)=>{
    event.preventDefault()
    const loginEmail=document.getElementById('loginEmail').value
    const loginPassword=document.getElementById('loginPassword').value
    const obj={loginEmail,loginPassword}
    
    axios.post(`http://localhost:5050/login/`,obj)
    .then(response=>{
        login.innerHTML+=`<h1>${loginEmail} Logged In Successfully</h1>`
        console.log(response)
        localStorage.setItem('token',response.data.token)
        window.location.href=response.data.redirectUrl
    })
    .catch(err=>{
        login.innerHTML+=`<h1>${loginEmail} Logged In unSuccessfull</h1>`
        console.log(err)
    })
})