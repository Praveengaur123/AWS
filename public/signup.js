
document.addEventListener('DOMContentLoaded',()=>{
    event.preventDefault()
    const signup=document.getElementById('sign-up')

    signup.addEventListener('submit',(event)=>{
        event.preventDefault()

        const name=document.getElementById('username').value
        const email=document.getElementById('email').value
        const password=document.getElementById('password').value

        const data={name,email,password}
        console.log("sending data from frontend",data)
        axios.post('http://localhost:5050/signup/user',data)
        .then(response=>{
            console.log("data from backend")
            signup.reset()
            console.log(response)

        })
        .catch(err=>console.log("error from backend",err))
    })

})