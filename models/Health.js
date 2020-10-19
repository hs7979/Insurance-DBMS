var mongoose = require("mongoose");

var HealthSchema = new mongoose.Schema({
    _id:{
        type:mongoose.Schema.Types.String,
        ref:"Insurance",
        required: true
    },
    BMI:String,
    gen_dis: String,
    gen_phys: String
});

module.exports = mongoose.model("Health",HealthSchema);