const mg = require("mongoose");

const kontaktStruct = new mg.Schema({
    telefon:{
        type:String,
        trim:true,
        require:true
    },
    adresa:{
        type:String,
        trim:true,
        require:true
    },
    mail:{
        type:String,
        trim:true,
        require:true
    },
});

const prodajaStruct = new mg.Schema({
    naziv:{
        type:String,
        trim:true,
        require:true
    },
    opis:{
        type:String,
        trim:true,
        require:true
    },
    cena:{
        type:String,
        trim:true,
        require:true
    },
    kontakt:{
        type:kontaktStruct,
        require:true
    },
    slika:{
        type:String,
        trim:true,
        require:true
    },
    korisnik:{
        type:String,
        trim:true,
        require:true
    }
});

module.exports = mg.model("prodaja", prodajaStruct);