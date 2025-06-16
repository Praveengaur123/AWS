

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


function showExpanses(e,page){
    const expanseList=document.getElementById('expanse-list')
    const expanseRow=document.createElement('div')
    expanseRow.classList='expanse-item'
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
    const expanseCount=document.querySelectorAll('.expanse-item').length
    if(expanseCount==0) {
    page=page-1
  };
    getExpanse(page)
  })
  .catch((err)=>
    console.log("Error in deleting",err.message))
})

}

// page loaded 
document.addEventListener('DOMContentLoaded',(event)=>{
event.preventDefault()
// calling logout function
logOut();
const page=1;
const limitDropdown=document.getElementById('dynamicPagination')
const limit=limitDropdown.value
console.log("value for Dynamic Page",limit)
getExpanse(page,limit)
limitDropdown.addEventListener('change',()=>{
  const limit=limitDropdown.value
  getExpanse(page,limit)

})


// post request functionality for expanse form post request
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
            getExpanse(page)
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
  lastPage,
  limit
}){
  pagination.innerHTML=''
  if(hasPreviousPage){
    const btn2=document.createElement('button')
    btn2.innerHTML=previousPage
    btn2.addEventListener('click',()=>getExpanse(previousPage,limit))
    pagination.appendChild(btn2)
  }
  const btn1=document.createElement('button')
  btn1.innerHTML=`${currentPage}`
  btn1.addEventListener('click',()=>{
    getExpanse(currentPage,limit)
  })
  pagination.appendChild(btn1)
  if(hasNextPage){
    const btn3=document.createElement('button')
    btn3.innerHTML=nextPage
    btn3.addEventListener('click',()=>getExpanse(nextPage,limit))
    pagination.appendChild(btn3)
  }
//   if(hasNextPage || lastPage){
//   const btn4=document.createElement('button')
//   btn4.innerHTML=lastPage
//   btn4.addEventListener('click',()=>{
//     getExpanse(lastPage)
// })
// pagination.appendChild(btn4)
//   }
  
}

function getExpanse(page){
  const limitDropdown=document.getElementById('dynamicPagination')
  const limit=limitDropdown.value
  const token = localStorage.getItem('token');

  axios.get(`http://localhost:5050/getExpanse?page=${page}&limit=${limit}`,{headers:{'Authorisation':token}})
  .then(response=>{
    console.log("getting the data on page",response)

    const ex=response.data.AllExpanses
    const expList = document.getElementById('expanse-list');
    expList.innerHTML = ''; // Clear old data
    // render new expanses
    ex.forEach(exp => showExpanses(exp,page));
    showPagination(response.data);
  })
  .catch(err=>console.log("error in pagination while getting products",err.message))
}
