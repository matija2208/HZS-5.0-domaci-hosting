const mg = require("mongoose");
const komentar = require("./komentar");

const UserStruct = new mg.Schema({
    ime:{
        type:String,
        trim:true,
        require:true
    },
    prezime:{
        type:String,
        trim:true,
        require:true
    },
    username:{
        type:String,
        trim:true,
        require:true,
        unique:true
    },
    password:{
        type:String,
        trim:true,
        require:true
    },
    mail:{
        type:String,
        trim:true,
        require:true,
        unique:true
    },
    komentari:[{
        type:mg.Schema.Types.ObjectId,
        ref:"komentar"
    }]
});

module.exports = mg.model("user",UserStruct);