const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();
app.use(bodyParser.urlencoded({extended : true}));

app.use(express.static("public"));
app.get("/",function(req,res){
  res.sendFile(__dirname +"/index.html");
});
app.post("/",function(req,res){

  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;

const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields:{
          FNAME:firstName,
          LNAME:lastName
        }
      }
    ]
  };
const jsonData = JSON.stringify(data);

const url = "https://us17.api.mailchimp.com/3.0/lists/f226aa04d8";
const option = {
  method: "POST",
  auth: "kishan11:77a744d2eadd1ce1bec67f9d440f25e8-us17"

}

const request = https.request(url, option, function(response){
  if(response.statusCode === 200){
    res.sendFile(__dirname+"/success.html");
  }
  else{
    res.sendFile(__dirname+"/failure.html");
  }
  response.on("data",function(data){
    console.log(JSON.parse(data));
  })
})

request.write(jsonData);
request.end();
// console.log(response.statusCode);
});
app.post("/failure" ,function(req,res){
res.redirect("/");
})
app.listen(process.env.PORT || 3000 , function(){
  console.log("server is running in port 3000")
});
  // API key
  // 1632d23f15b4cba884d942c2f9064a15-us17

// 029a4ab2aa
