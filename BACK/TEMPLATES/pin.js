const mg = require("mongoose");
const band = require("./pinTemplates/band");
const svirka = require("./pinTemplates/svirka");
//const prodaja = require("./pinTemplates/prodaja");

const pinStruct = new mg.Schema({
    lokacija:{
        lat:{
            type:Number,
            require:true
        },
        lon:{
            type:Number,
            require:true
        }
    },
    ocena:{
        type:String,
        trim:true,
        require:true
    },
    tip:{
        type:Number,
        require:true
    },
    BAND:{
        type:band
    },
    KONCERT:{
        type:svirka
    }
    //OGLAS:prodaja
});

module.exports = mg.model("pin", pinStruct);