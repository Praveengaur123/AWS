

const Sib = require('sib-api-v3-sdk');

const client =Sib.ApiClient.instance;

const apiKey = client.authentications['api-key'];
apiKey.apiKey=process.env.SibAPi;
/* TransactionalEmailsApi to send reset password link or comfirmation email 
email campaign is used for newsletter
*/
const transEmailApi=new Sib.TransactionalEmailsApi() 

module.exports=transEmailApi
