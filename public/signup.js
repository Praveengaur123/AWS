
document.addEventListener('DOMContentLoaded',()=>{
    event.preventDefault()
    const signup=document.getElementById('sign-up')

    signup.addEventListener('submit',(event)=>{
        event.preventDefault()

        const name=document.getElementById('username').value
        const email=document.getElementById('email').value
        const password=document.getElementById('password').value

        const data={name,email,password}
        
        axios.post('http://localhost:5050/signup/user',data)
        .then(response=>{
            signup.reset()
            console.log(response)

        })
        .catch(err=>console.log("error from backend",err))
    })
})