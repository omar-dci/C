const MongoClient=require('mongodb').MongoClient;
const dbUrl='mongodb+srv://omar:Passsowrd@cluster0-bnl9p.mongodb.net/test?retryWrites=true';
const dbName="prototypeDb";


function checkUserName(userName,callback){
    (async function mongo() { 
      let client ;
      try {
        client= await MongoClient.connect(dbUrl,{useNewUrlParser:true});
        const db=client.db(dbName);
  const col= await db.collection('users');
  //*with one result i cant use to array
  const user=await col.findOne({username:userName});
  client.close()
console.log(user)
  if(user){
    callback (false)
  }else{
    callback (true)}

      } catch (error) {
       //return error.message
       console.log(error.message)
       callback (false)
      }
  
     }())
  }
  module.exports=checkUserName
