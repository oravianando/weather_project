const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

let wdata = [];

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

function checkweather(city='', req, res)
{
    console.log(city);
    var url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=bd88a3acb082cf938f05794f10cadafb&units=metric#";
    https.get(url, function(response){
        response.on("data",function(data){
            var da = JSON.parse(data);
            //  var img = "http://openweathermap.org/img/wn//"+da.weather[0].icon+"@2x.png";
             wdata.push(da);
             round = 2;
            //  console.log(wdata);
             return true;
        });
    });
}

app.get("/", function(req, res){
    res.render("home");
});
app.get("/result", function(req, res){
    setTimeout(function(){
        res.render("result", {wdata:wdata});
    }, 600);
});
app.post("/result", function(req, res){
    var city = req.body.city;
    if(city == "")
    {
        checkweather("Delhi",req,res);
        res.redirect("/result");
    }
    else
    {
        checkweather(city,req,res);
        res.redirect("/result");
    }
});
app.listen(3000);