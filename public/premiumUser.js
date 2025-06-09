
// html div to display
const premiumUser=document.getElementById('premiumUser')
const leaderBoard=document.getElementById('leaderBoard')
// token to fetch for verify
const token=localStorage.getItem('token')
// function to show leader
function showLeader(l,i){
const row=document.createElement('tr')

row.innerHTML+=`
<td>${i+1}</td>
<td>=></td>
<td>Name: ${l.name}</td>
<td>Total Expanses: ${l.totalExpanses}</td>`;
leaderBoard.appendChild(row)

}

// function to display the leaderboard
function showUser(){
    const premiumSection=document.createElement('div')
    //    leaderBoard Button
    const leaderboard=document.createElement('button')
    leaderboard.id="leaderBoard-btn"
    leaderboard.textContent="View Leaderboard"
    premiumUser.innerHTML=`You are Now a Premium User`
    premiumUser.appendChild(leaderboard)
    leaderboard.addEventListener('click',()=>{
        premiumSection.innerHTML=`<h1>Here is the leader</h1>`
        axios.get('http://localhost:5050/leaderBoard')
        .then(response=>{
            leaderBoard.innerHTML=`<h2>Leader Board</h2>`
            const l=response.data.leaderboard
            for(let i=0;i<l.length;i++){
                showLeader(l[i],i)
            }
        })
        .catch(err=>{
            premiumSection.innerHTML= `<h4>Error while fetching leaderboard`;
            console.log("error from backend",err.message)
        })
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
        downloadReport()
        expanses()
    }
    else{
        premiumUser.innerHTML=`<h4>You are not Premium User</h4>`
    }
})
.catch(err=>{
    console.log("error from premium backend",err.message)
})
})
function  downloadReport(){
// download report
const downloadBtn=document.createElement('button')
downloadBtn.textContent="Download Your Expanses"
premiumUser.appendChild(downloadBtn);
downloadBtn.addEventListener('click',(event)=>{
    event.preventDefault()
    axios.get('http://localhost:5050/premiumUser/download',{headers:{'Authorisation':token}})
    .then(response=>{
        const a=document.createElement('a')
        a.href=response.data.fileUrl
        a.download="myExpanse.csv";
    })
    .catch(err=>{
        console.log("Error while downloading",err)
    })
})
}
// day, weekly and monthly expanses
function expanses(){
    const expansesBtn=document.createElement('button')
    expansesBtn.textContent=''
    
}
