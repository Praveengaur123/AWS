

const Sib = require('sib-api-v3-sdk');

const client =Sib.ApiClient.instance;

const apiKey = client.authentications['api-key'];
apiKey.apiKey="";
/* TransactionalEmailsApi to send reset password link or comfirmation email 
email campaign is used for newsletter
*/
const transEmailApi=new Sib.TransactionalEmailsApi() 

const sender={
   email: "praveensinghania2@gmail.com"
}

const reciever=[
    {
        email:'haryp2011@gmail.com'
    }
]
transEmailApi.sendTransacEmail({
    sender,
    to:reciever,
    subject:"testing email",
    textContent:"this is just for testing purpose"
})
.then(response=>console.log("email sent"))
.catch(err=>console.log("email not sent",err.message))
