var express = require ("express"),
    mysql   = require("mysql"),
    bodyParse = require("body-parser");

var app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));

app.listen("3000",()=>{
    console.log("server started");
})