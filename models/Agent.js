var mongoose = require("mongoose");

var AgentSchema = new mongoose.Schema({
    _id:{
        type:String,
        required: true
    },
    a_name: String,
    email: String,
    a_loc_add:String,
    a_region: String
});

module.exports = mongoose.model("Agent",AgentSchema);