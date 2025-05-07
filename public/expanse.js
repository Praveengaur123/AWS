function showExpanses(){
    const expanseList=document.getElementById('expanse-list')
    expanseList.innerHTML=`
            <h3></h3>
            <h3></h3>
            <h3></h3>
            `;
}


document.addEventListener('DOMContentLoaded',(event)=>{
event.preventDefault()
// axios.get('http://localhost:5050/getExpanse')
// .then(response=>{
//     console.log("getting the data on page",response)
    
// })
// .catch(err=>console.log("error while getting",err))


// functionality for expanse form post request
const expanseForm=document.getElementById('expanse-form')
expanseForm.addEventListener('submit',(event)=>{
event.preventDefault()
const expanseAmount=document.getElementById('expanseAmount').value
const description=document.getElementById('description').value
const category=document.getElementById('category').value
const obj={expanseAmount,description,category}
console.log("Data from frontend",obj)
axios.post('http://localhost:5050/postExpanse',obj)
.then((response)=>{
    console.log("response from backend",response.data)
    const newdata=response.data.newExpanse
            //console.log(newEntries)
            for(let i=0;i<newdata.length;i++){
              //console.log(newdata[i])
              showExpanses(newdata[i])
            }
})
.catch(err=>console.log("error from backend",err))

})
})