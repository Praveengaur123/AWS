

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
      alert("Logged Out Succesfully")
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
const page=1;
axios.get(`http://localhost:5050/getExpanse?page=${page}`,{headers:{'Authorisation':token}})
.then(response=>{
    console.log("getting the data on page",response)
    const ex=response.data.AllExpanses
    const expList = document.getElementById('expanse-list');
    expList.innerHTML = ''; // clear previous entries
    ex.forEach(exp=>showExpanses(exp));
    
    showPagination(response.data);
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
const pagination=document.getElementById('pagination')
// render pagination button
function showPagination({
  currentPage,
  hasNextPage,
  nextPage,
  hasPreviousPage,
  previousPage,
  lastPage
}){
  pagination.innerHTML=''
  if(hasPreviousPage){
    const btn2=document.createElement('button')
    btn2.innerHTML=previousPage
    btn2.addEventListener('click',()=>getExpanse(previousPage))
    pagination.appendChild(btn2)
  }
  const btn1=document.createElement('button')
  btn1.innerHTML=`${currentPage}`
  btn1.addEventListener('click',()=>{
    getExpanse(currentPage)
  })
  pagination.appendChild(btn1)
  if(hasNextPage){
    const btn3=document.createElement('button')
    btn3.innerHTML=nextPage
    btn3.addEventListener('click',()=>getExpanse(nextPage))
    pagination.appendChild(btn3)
  }
  const btn4=document.createElement('button')
  btn4.innerHTML=lastPage
  btn4.addEventListener('click',()=>{
    getExpanse(lastPage)
  
})
pagination.appendChild(btn4)
  
}

function getExpanse(page){
  const token = localStorage.getItem('token');
  axios.get(`http://localhost:5050/getExpanse?page=${page}`,{headers:{'Authorisation':token}})
  .then(response=>{
    console.log("getting the data on page",response)

    const ex=response.data.AllExpanses
    const expList = document.getElementById('expanse-list');
    expList.innerHTML = ''; // Clear old data
    // render new expanses
    ex.forEach(exp => showExpanses(exp));
    showPagination(response.data);
    if(response.data.lastPage) {
      
    }
  })
  .catch(err=>console.log("error in pagination while getting products",err.message))
}
