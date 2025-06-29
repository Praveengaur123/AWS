
// token to fetch for verification
const token=localStorage.getItem('token')
// html div to display
const premiumUser=document.getElementById('premiumUser')
const leaderBoard=document.getElementById('leaderBoard')


// function to display the premium features
function showUser(){
    const premiumSection=document.createElement('div')
    //    leaderBoard Button
    const leaderboard=document.createElement('button')
    leaderboard.id="leaderBoard-btn"
    leaderboard.textContent="View Leaderboard"
    premiumUser.innerHTML=`You are Now a Premium User`
    premiumUser.appendChild(leaderboard)
    leaderboard.addEventListener('click',()=>{
        showLeader()
    })
    
// view detailed expanses
    const detailExpansesBtn=document.createElement('button')
    detailExpansesBtn.textContent='Detailed Expanse'
    premiumUser.appendChild(detailExpansesBtn)
    detailExpansesBtn.addEventListener('click',(event)=>{
    event.preventDefault()
    expanses()

    })

}
// function to show leader
function showLeader(){
    axios.get('http://localhost:5050/leaderBoard')
        .then(response=>{
            leaderBoard.innerHTML=`<h2>Leader Board</h2>`
            const l=response.data.leaderboard
            console.log(l)
            for(let i=0;i<l.length;i++){
               const row=document.createElement('tr')
                row.innerHTML+=`
                <td>${i+1}</td>
                <td>=></td>
                <td>Name: ${l[i].name}</td>
                <td>Total Expanses: ${l[i].totalExpanses}</td>`;
                leaderBoard.appendChild(row)
            }
        })
        .catch(err=>{
            leaderBoard.innerHTML= `<h4>Error while fetching leaderboard`;
            console.log("error from backend",err.message)
        })
}


// page loaded when refreshed
document.addEventListener('DOMContentLoaded',(event)=>{
event.preventDefault()

console.log("premium user data to fetch")
// url to know the premium user
axios.get('http://localhost:5050/premiumUser',{headers:{'Authorisation':token}})
.then(response=>{
    const premium=response.data.pUser
    if(premium.premiumUser==true){
        showUser()
    }
    else{
        premiumUser.innerHTML=`<h4 style="color:springgreen;">You are not Premium User</h4>`
    }
})
.catch(err=>{
    console.log("error from premium backend",err.message)
})
})
// day, weekly and monthly expanses
function expanses(){
        axios.get('http://localhost:5050/getExpanse',{headers:{'Authorisation':token}})
        .then(response=>{
            const expanseData=response.data.AllExpanses
            console.log("expanse Data",expanseData)
            for(let i=0;i<5;i++){
            expanseList(expanseData[i])
            }
        })
        .catch(err=>{
            console.log("error while generating table",err)
        })  
}
// expanse table
function expanseList(e){
    const d=document.getElementById('detailedExpanseSection')
    const row=document.createElement('div')
    
        row.innerHTML+=`
            <h4 class='mt-5'>Day to Day Expanses</h4>
            <table class='table'>
            <thead>
                <tr> 
                    <th>Date</th>
                    <th>Description</th>
                    <th>Category</th>
                    <th>Income</th>
                    <th>Expanse</th>
                </tr>
            </thead>
            <td>${e.id}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </table>`;
        detailedExpanseSection.appendChild(row)
    }
    