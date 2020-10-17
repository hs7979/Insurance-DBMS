var mongoose = require("mongoose");

var CustomerSchema = new mongoose.Schema({
    _id:{
        type:String,
        required: true
    },
    c_name: String,
    email: String,
    c_loc_add:String,
    c_region: String,
    empid:{
        id:{
            type:mongoose.Schema.Types.String,
            ref:"Agent"
        }
    }
});

module.exports = mongoose.model("Customer",CustomerSchema);