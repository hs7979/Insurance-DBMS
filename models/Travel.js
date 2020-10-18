var mongoose = require("mongoose");

var TravelSchema = new mongoose.Schema({
    _id:{
        type:mongoose.Schema.Types.String,
        ref:"Insurance",
        required: true
    },
    mode:String,
    i_region: String,
    duration: String
});

module.exports = mongoose.model("Travel",TravelSchema);