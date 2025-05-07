// Log In functionality
const login=document.getElementById('login')
login.addEventListener('submit',(event)=>{
    event.preventDefault()
    const loginEmail=document.getElementById('loginEmail').value
    const loginPassword=document.getElementById('loginPassword').value
    const obj={loginEmail,loginPassword}
    
    axios.post(`http://localhost:5050/login/${loginEmail}`,obj)
    .then(response=>{
        
        login.innerHTML=`<h1>${loginEmail} Logged In Successfully</h1>`
        login.reset()
        console.log(response)
    })
    .catch(err=>console.log(err))
})