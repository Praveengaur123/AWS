// user name and sign out
function logOut(){
  const userLogged=localStorage.getItem('email')
  const userLogdiv=document.getElementById('user-name')
  const LogOutBtn=document.createElement('button')
  LogOutBtn.id='logOut-btn';
  LogOutBtn.textContent='Log Out'

  userLogdiv.innerHTML=`<h3>User Logged In: ${userLogged}</h3>`
  userLogdiv.appendChild(LogOutBtn)
  LogOutBtn.addEventListener('click',()=>{
    axios.get('http://localhost:5050/logOut')
    .then(response=>{
      
      window.location.href=response.data.redirectUrl
    })
    .catch(err=>{
      console.log("error in logout",err)
    })
  })
}


function showExpanses(e){
    const expanseList=document.getElementById('expanse-list')
    const expanseRow=document.createElement('div')
    const premiumDiv=document.createElement('div')
    expanseList.appendChild(expanseRow).innerHTML+=`
            
            <span>${e.amount}-${e.description}-${e.category}</span>
            <button type='submit' data-id='e.id' class='deleteBtn'>Delete Expanses</button>
            `;

// delete functionality
  expanseRow.querySelector('.deleteBtn').addEventListener('click',()=>{
  const token=localStorage.getItem('token')
  axios.delete(`http://localhost:5050/deleteExpanse/${e.id}`,{headers:{'Authorisation':token}})
  .then(response=>{
    console.log("deleted",response)
    expanseList.removeChild(expanseRow)
  })
  .catch((err)=>
    console.log("Error in deleting",err.message))
})

}

// page loaded 
document.addEventListener('DOMContentLoaded',(event)=>{
event.preventDefault()
const token=localStorage.getItem('token')
// calling logout function
logOut();

axios.get('http://localhost:5050/getExpanse',{headers:{'Authorisation':token}})
.then(response=>{
    console.log("getting the data on page",response)
    const ex=response.data.AllExpanses
    for(let i=0;i<ex.length;i++){
      showExpanses(ex[i])
    }
    
})
.catch(err=>console.log("error while getting",err))


// functionality for expanse form post request
const expanseForm=document.getElementById('expanse-form')
expanseForm.addEventListener('submit',(event)=>{
event.preventDefault()

const expanseDetail={
  expanseAmount:event.target.expanseAmount.value,
  description:event.target.description.value,
  category:event.target.category.value,
  userId:1
}
const token=localStorage.getItem('token')
console.log(token)
axios.post('http://localhost:5050/postExpanse',expanseDetail,{headers:{'Authorisation':token}})
.then((response)=>{
    // console.log("response from backend",response.data)
    const newdata=response.data.newExpanse
            console.log("rte",newdata)
            showExpanses(newdata)
            expanseForm.reset()
})
.catch(err=>console.log("error from backend",err))

})

})

