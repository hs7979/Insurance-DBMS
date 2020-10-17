var mongoose = require("mongoose");

var NomineeSchema = new mongoose.Schema({
    _id:{
        type:String,
        required: true
    },
    n_name: String,
    email: String,
    n_loc_add:String,
    n_region: String,
    c_ssn:{
        id:{
            type:mongoose.Schema.Types.String,
            ref:"Customer"
        }
    }
});

module.exports = mongoose.model("Nominee",NomineeSchema);