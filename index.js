var express = require ("express"),
    mongoose = require("mongoose"),
    methodOverride = require("method-override"),
    Agent = require("./models/Agent"),
    Customer = require("./models/Customer"),
    Nominee = require("./models/Nominee"),
    bodyParser = require("body-parser");

var app = express();

mongoose.connect("mongodb://localhost/dbmspro",{ useNewUrlParser: true, useUnifiedTopology: true });

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", (req,res)=>{
    res.render("home");
})
//=============
//Agent Routes
//=============
app.get("/agents", (req,res)=>{
    Agent.find({},function(err,ag){
        if(err){
            console.log(err);
        }else{
            res.render("agents",{ag});
        }
    })
})
app.get("/agent/:id", (req,res)=>{
    Agent.findById(req.params.id,function(err,ag){
        if(err){
            console.log(err);
        }else{
            res.render("showagent",{ag});
        }
    })
})
app.get("/newagent",(req,res)=>{
    res.render("newagent");
})
app.post("/newagent",(req,res)=>{
    Agent.create(req.body,function(err,ag){
        if(err){
            console.log(err);
        }else{
            res.redirect("/agents");
        }
    })
})
//====================
//CUSTOMER AND NOMINEE
//====================
app.get("/customers", (req,res)=>{
    Customer.find({},function(err,cu){
        if(err){
            console.log(err);
        }else{
            res.render("customers",{cu});
        }
    })
})
app.get("/customer/:id", (req,res)=>{
    Customer.findById(req.params.id,function(err,cu){
        if(err){
            console.log(err);
        }else{
            res.render("showcustomer",{cu});
        }
    })
})
app.get("/nominee/:cssn",(req,res)=>{
    var c = {id:req.params.cssn};
    Nominee.findOne({c_ssn:c},function(err,nn){
        if(err){
            console.log(err);
        }else{
            res.render("shownominee",{nn});
        }
    })
})
app.get("/newcustomer/:aid",(req,res)=>{
    res.render("newcustomer",{eid:req.params.aid});
})
app.post("/newcustomer",(req,res)=>{
    var cssn = req.body._id,
        n = req.body.c_name,
        e = req.body.email,
        l = req.body.c_loc_add;
        r = req.body.c_region;
        ag= {id:req.body.emp_id};
    var newc = {_id:cssn,c_name:n,email:e,c_loc_add:l,c_region:r,empid:ag}
    Customer.create(newc,function(err,cu){
        if(err){
            console.log(err);
        }else{
            res.redirect("/newnominee/"+cssn);
        }
    })
})
app.get("/newnominee/:cssn",(req,res)=>{
    res.render("newnominee",{cid:req.params.cssn});
})
app.post("/newnominee",(req,res)=>{
    var nssn = req.body._id,
        n = req.body.n_name,
        e = req.body.email,
        l = req.body.n_loc_add;
        r = req.body.n_region;
        cus= {id:req.body.c_ssn};
    var newn = {_id:nssn,n_name:n,email:e,n_loc_add:l,n_region:r,c_ssn:cus};
    Nominee.create(newn,function(err,nn){
        if(err){
            console.log(err);
        }else{
            res.redirect("/customers");
        }
    })
})
app.listen("3000",()=>{
    console.log("server started");
})