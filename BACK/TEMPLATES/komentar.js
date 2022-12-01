const mg = require("mongoose");
const user = require("./user");

const komentarStruct = new mg.Schema({
    sadrzaj:{
        type:String,
        trim:true,
        require:true
    },
    like:{
        type:Number,
        require:true
    },
    oblast:{
        type:String,
        trim:true,
        require:true
    },
    korisnik:{
        type: mg.Schema.Types.ObjectId,
        strictPopulate:false,
        ref: "user"
    }
});

module.exports = mg.model("komentar",komentarStruct);