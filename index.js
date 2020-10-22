var express        = require ("express"),
    mongoose       = require("mongoose"),
    methodOverride = require("method-override"),
    Agent          = require("./models/Agent"),
    Customer       = require("./models/Customer"),
    Nominee        = require("./models/Nominee"),
    Insurance      = require("./models/Insurance"),
    Health         = require("./models/Health"),
    Travel         = require("./models/Travel"),
    bodyParser     = require("body-parser");

var app = express();

mongoose.connect("mongodb://localhost/dbmspro",{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify:false });

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));
app.use(methodOverride("_method"));

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
app.get("/agent/:id/edit",(req,res)=>{
    Agent.findById(req.params.id,function(err,ag){
        if(err){
            console.log(err);
        }else{
            res.render("editagent",{ag})
        }
    })
});
app.patch("/agent/:id/edit",(req,res)=>{
    Agent.findOneAndUpdate({_id:req.params.id},req.body,(err,nag)=>{
        if(err){
            console.log(err);
        }else{
            res.redirect("/agent/"+req.params.id);
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
app.get("/customer/:id/edit", (req,res)=>{
    Customer.findById(req.params.id,function(err,cu){
        if(err){
            console.log(err);
        }else{
            res.render("editcustomer",{cu});
        }
    })
})
app.patch("/customer/:id/edit",(req,res)=>{
    var cssn = req.body._id,
        n = req.body.c_name,
        e = req.body.email,
        l = req.body.c_loc_add;
        r = req.body.c_region;
        ag= {id:req.body.emp_id};
    var newc = {_id:cssn,c_name:n,email:e,c_loc_add:l,c_region:r,empid:ag};
    Customer.findOneAndUpdate({_id:req.params.id},newc,(err,ec)=>{
        if(err){
            console.log(err);
        }else{
            res.redirect("/customer/"+req.params.id);
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
});
app.get("/nominee/:id/edit",(req,res)=>{
    Nominee.findById(req.params.id,(err,n)=>{
        if(err){
            console.log(err);
        }else{
            res.render("editnominee",{n});
        }
    })
});
app.patch("/nominee/:id/edit",(req,res)=>{
    var nssn = req.body._id,
        n = req.body.n_name,
        e = req.body.email,
        l = req.body.n_loc_add;
        r = req.body.n_region;
        cus= {id:req.body.c_ssn};
    var en = {_id:nssn,n_name:n,email:e,n_loc_add:l,n_region:r,c_ssn:cus};
    Nominee.findOneAndUpdate({_id:req.params.id},en,(err,nn)=>{
        if(err){
            console.log(err);
        }else{
            res.redirect("/customers")
        }
    })
})
//===========
//Insurance
//===========
app.get("/insurance",async (req,res)=>{
    const In = await Insurance.find({});
    res.render("insurance",{In});
});
app.get("/insurance/:id",async (req,res)=>{
    const In = await Insurance.findById(req.params.id);
    const Hi = await Health.findById(req.params.id);
    const Ti = await Travel.findById(req.params.id);
    res.render("showinsurance",{In,Hi,Ti});
});
app.get("/newinsurance/:cssn/:type", async (req,res)=>{
    var t = req.params.type;
    var c = req.params.cssn;
    const Cust = await Customer.findById(req.params.cssn);
    var a = Cust.empid.id;
    res.render("newinsurance",{t,c,a});
})
app.post("/newinsurance/:type",async (req,res)=>{
    var _id = req.body._id,
        premium = req.body.premium,
        issue = req.body.issue,
        expiry = req.body.expiry,
        cssn= {id:req.body.cssn},
        empid= {id:req.body.emp_id};
    var Ins = {_id,premium,issue,expiry,cssn,empid};
    Insurance.create(Ins,(err,I)=>{
        if(err){
            console.log(err);
        }else{
            if(req.params.type == "health"){
                res.redirect("/newi/health/"+_id);
            }else{
                res.redirect("/newi/travel/"+_id);
            }
        }
    })
})
app.get("/newi/:type/:id", (req,res)=>{
    var t = req.params.type;
    var i = req.params.id;
    res.render("new"+t,{i,t});
})
app.post("/health", async(req,res)=>{
    var _id = req.body._id,
        BMI = req.body.bmi,
        gen_dis = req.body.gen_dis,
        gen_phys = req.body.gen_phys;
    var he = {_id,BMI,gen_dis,gen_phys};
    Health.create(he,(err,h)=>{
        if(err){
            console.log(err);
        }else{
            res.redirect("/");
        }
    })
})
app.post("/travel", async(req,res)=>{
    var _id = req.body._id,
        mode = req.body.mode,
        i_region = req.body.i_region,
        duration = req.body.duration;
    var ti = {_id,mode,i_region,duration};
    Travel.create(ti,(err,t)=>{
        if(err){
            console.log(err);
        }else{
            res.redirect("/");
        }
    })
})
app.listen("3000",()=>{
    console.log("server started");
})