const mongooose = require('mongoose');

const userSchema = new mongooose.Schema({
    username :{
        type: String,
        required: [true,"Please Add User Name"],
    },
    email:{
        type: String,
        required: [true,"Please Add Email"],
        unique: [true, "Email Address Already Exists"],
    },
    password:{
        type: String,
        required: [true,"Please Add Password"],
    },
},{
    timestamps:true,
});

module.exports = mongooose.model("User",userSchema);