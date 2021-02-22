const express = require('express');

const app = express();
const http = require('http');
const bodyParser = require('body-parser');
const fetch = require("node-fetch");

app.use(bodyParser.urlencoded({extended: true}));
app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
  const query = req.body.country;
  const url = "http://universities.hipolabs.com/search?country="+query;
  var names = "<h2>These are all the universities in "+query+":</h2>"+"<h4>";
  fetch(url)
  .then(response => response.json())
  .then(function(data){
    for(var i=0;i<data.length;i++)
    {
      names = names+data[i].name;
      names += "<br><br>";
    }
    names+="</h4>";
    res.send(names);
  });
})







app.listen(3000 || process.env.PORT, function(){
  console.log("Server is running on port 3000");
})
