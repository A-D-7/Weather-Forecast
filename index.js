
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,rep){
  rep.sendFile(__dirname + "/index.html");


});


app.post("/",function(req,rep){

    const query = req.body.City;
    const url = "https://api.openweathermap.org/data/2.5/weather?units=metric&appid=3f2dc0be44d985481b1999c00b11e5c5&q="+query;
    https.get(url,function(response){
      response.on("data",function(data){
        const res = JSON.parse(data);
        const temp = res.main.temp;
        const decp = res.weather[0].description;
        const icon = res.weather[0].icon;
        const imgurl = "http://openweathermap.org/img/wn/" + icon +"@2x.png";
        rep.write("<p>The weather is currently "+decp + "</p>");
        rep.write("<h1>The temperature in " + query + " is" + temp + " degree Celcius </h1>");
        rep.write("<img src=" +imgurl +">");
        rep.send();
      })
    });
});




app.listen(3000,function(){
  console.log("Server is running on port 3000");
})
