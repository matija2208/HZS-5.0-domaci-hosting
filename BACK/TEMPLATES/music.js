const mg = require("mongoose");

const musicStruct = new mg.Schema({
    naziv:{
        type:String,
        trim:true,
        require:true
    },
    autor:{
        type:String,
        trim:true,
        require:true
    },
    path:{
        type:String,
        trim:true,
        require:true
    },
    region:{
        type:String,
        trim:true,
        require:true
    }
});

module.exports=mg.model("music",musicStruct);