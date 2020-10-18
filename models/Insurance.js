var mongoose = require("mongoose");

var InsuranceSchema = new mongoose.Schema({
    _id:{
        type:String,
        required: true
    },
    premium: String,
    issue: Date,
    expiry: Date,
    cssn:{
        id:{
            type:mongoose.Schema.Types.String,
            ref:"Customer"
        }
    },
    empid:{
        id:{
            type:mongoose.Schema.Types.String,
            ref:"Agent"
        }
    }
});

module.exports = mongoose.model("Insurance",InsuranceSchema);